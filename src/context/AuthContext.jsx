import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as fbUpdateProfile,
  signOut as fbSignOut,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  RecaptchaVerifier,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  getMultiFactorResolver,
  multiFactor,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore/lite';
// Import configuration from the project root. In this monorepo structure there is no firebase folder.
import { auth, db, googleProvider } from '../firebase/config';

const AuthContext = createContext(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// Profil eşleme (FireStore ile birleşik)
const mapUserToProfile = (user, fsProfile) => {
  if (!user) return null;
  const [firstName = '', lastName = ''] = (user.displayName || '').split(' ');
  return {
    uid: user.uid,
    email: user.email || '',
    firstName: fsProfile?.firstName || firstName,
    lastName: fsProfile?.lastName || lastName,
    photoURL: user.photoURL || fsProfile?.photoURL || '',
    loyaltyPoints: fsProfile?.loyaltyPoints ?? 0,
    favoriteProducts: fsProfile?.favoriteProducts ?? [],
  };
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const providerRef = useRef(new GoogleAuthProvider());
  const redirectHandledRef = useRef(false);
  const recaptchaRef = useRef(null);

  // E.164 phone format helper
  const toE164 = (raw) => {
    const d = (raw || "").replace(/\D/g, "");
    if (!d) return "";
    if (d.startsWith("90")) return `+${d}`;
    if (d.startsWith("0")) return `+90${d.slice(1)}`;
    if (d.startsWith("9")) return `+${d}`;
    return `+90${d}`;
  };

  // Ensure recaptcha container exists and RecaptchaVerifier is initialized
  const ensureRecaptcha = React.useCallback(() => {
    let container = document.getElementById('recaptcha-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'recaptcha-container';
      container.style.display = 'none';
      document.body.appendChild(container);
    }
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
      recaptchaRef.current.render();
    }
    return recaptchaRef.current;
  }, []);

  // Firestore profilini yükle/oluştur
  const loadOrCreateFsProfile = async (user, provider = 'email', seed = {}) => {
    const ref = doc(db, 'userProfiles', user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      // Google provider'dan ek alanlar
      const providerData = user.providerData && user.providerData[0] ? user.providerData[0] : {};
      const names = (user.displayName || providerData.displayName || '').split(' ');
      const first = seed.firstName || names[0] || 'User';
      const last = seed.lastName || names.slice(1).join(' ') || '';
      const payload = {
        uid: user.uid,
        email: user.email || providerData.email || '',
        firstName: seed.firstName || providerData.givenName || first,
        lastName: seed.lastName || providerData.familyName || last,
        phone: seed.phone || user.phoneNumber || providerData.phoneNumber || '',
        photoURL: user.photoURL || providerData.photoURL || '',
        // ...diğer alanlar...
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        provider,
        // ...diğer seed ve default alanlar...
      };
      await setDoc(ref, payload);
      return payload;
    } else {
      return snap.data();
    }
  };

  // Redirect sonucu (mobil Google) yakala
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (redirectHandledRef.current) return;
      redirectHandledRef.current = true;
      try {
        const res = await getRedirectResult(auth);
        if (res?.user && !cancelled) {
          const fs = await loadOrCreateFsProfile(res.user, 'google');
          setCurrentUser(res.user);
          setUserProfile(mapUserToProfile(res.user, fs));
        }
      } catch (err) {
        console.error('[Auth] getRedirectResult error:', err);
        if (!cancelled) setError('Google login error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setCurrentUser(null);
        setUserProfile(null);
        setLoading(false);
        return;
      }
      // Firestore profilini oku (offline guard)
      const ref = doc(db, 'userProfiles', u.uid);
      let fs = null;
      try {
        const snap = await getDoc(ref);
        fs = snap.exists() ? snap.data() : null;
      } catch (e) {
        console.warn('[Auth] getDoc offline/failed:', e?.message);
      }
      setCurrentUser(u);
      setUserProfile(mapUserToProfile(u, fs));
      setLoading(false);
    }, (err) => {
      console.error('[Auth] onAuthStateChanged error:', err);
      setError('Oturum dinleme hatası');
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // ---- Actions ----
  const register = async (email, password, extra = {}) => {
    setError(null);
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      // Display name set
      const displayName = [extra.firstName, extra.lastName].filter(Boolean).join(' ');
      if (displayName) {
        await fbUpdateProfile(user, { displayName });
      }
      // FS profil
      const fs = await loadOrCreateFsProfile(user, 'email', extra);
      setCurrentUser(auth.currentUser);
      setUserProfile(mapUserToProfile(auth.currentUser, fs));
      return { success: true, user };
    } catch (err) {
      console.error('[Auth] register error:', err);
      setError(err?.message || 'Kayıt başarısız');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // MFA-aware email login
  const login = async (email, password) => {
    setError(null);
    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user };
    } catch (err) {
      if (err?.code === 'auth/multi-factor-auth-required') {
        // MFA challenge
        const resolver = getMultiFactorResolver(auth, err);
        const verifier = ensureRecaptcha();
        const phoneInfoOptions = { multiFactorHint: resolver.hints[0], session: resolver.session };
        const verificationId = await new PhoneAuthProvider(auth).verifyPhoneNumber(phoneInfoOptions, verifier);
        return { success: false, mfaRequired: true, resolver, verificationId };
      }
      console.error('[Auth] login error:', err);
      setError(err?.message || 'Giriş başarısız');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Google login (popup / redirect) + MFA aware
  const loginWithGoogle = async ({ mode = 'popup' } = {}) => {
    setError(null);
    try {
      setLoading(true);
      if (mode === 'redirect') {
        await signInWithRedirect(auth, providerRef.current);
        return { success: true, pendingRedirect: true };
      }
      try {
        const res = await signInWithPopup(auth, providerRef.current);
        const fs = await loadOrCreateFsProfile(res.user, 'google');
        setCurrentUser(res.user);
        setUserProfile(mapUserToProfile(res.user, fs));
        return { success: true, user: res.user };
      } catch (err) {
        if (err?.code === 'auth/multi-factor-auth-required') {
          const resolver = getMultiFactorResolver(auth, err);
          const verifier = ensureRecaptcha();
          const phoneInfoOptions = { multiFactorHint: resolver.hints[0], session: resolver.session };
          const verificationId = await new PhoneAuthProvider(auth).verifyPhoneNumber(phoneInfoOptions, verifier);
          return { success: false, mfaRequired: true, resolver, verificationId };
        }
        throw err;
      }
    } catch (err) {
      console.error('[Auth] Google login error:', err);
      setError('Google login error');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // MFA: telefona ikinci faktör kayıt (enroll)
  const startEnrollMfaPhone = async (phoneNumber) => {
    if (!auth.currentUser) return { success: false, error: 'No user' };
    try {
      const mfaSession = await multiFactor(auth.currentUser).getSession();
      const verifier = ensureRecaptcha();
      const verificationId = await new PhoneAuthProvider(auth).verifyPhoneNumber({ phoneNumber, session: mfaSession }, verifier);
      return { success: true, verificationId };
    } catch (err) {
      console.error('[MFA] startEnroll error:', err);
      return { success: false, error: err };
    }
  };

  const finalizeEnrollMfaPhone = async (verificationId, smsCode, displayName = 'Phone') => {
    try {
      const cred = PhoneAuthProvider.credential(verificationId, smsCode);
      const assertion = PhoneMultiFactorGenerator.assertion(cred);
      await multiFactor(auth.currentUser).enroll(assertion, displayName);
      setCurrentUser({ ...auth.currentUser });
      return { success: true };
    } catch (err) {
      console.error('[MFA] finalizeEnroll error:', err);
      return { success: false, error: err };
    }
  };

  const resolveMfaSignIn = async (resolver, verificationId, smsCode) => {
    try {
      const cred = PhoneAuthProvider.credential(verificationId, smsCode);
      const assertion = PhoneMultiFactorGenerator.assertion(cred);
      const userCred = await resolver.resolveSignIn(assertion);
      // FS profilini yinele
      const fs = await loadOrCreateFsProfile(userCred.user);
      setCurrentUser(userCred.user);
      setUserProfile(mapUserToProfile(userCred.user, fs));
      return { success: true };
    } catch (err) {
      console.error('[MFA] resolveSignIn error:', err);
      return { success: false, error: err };
    }
  };

  const unenrollMfaFactor = async (factorUid) => {
    if (!auth.currentUser) return { success: false, error: 'No user' };
    try {
      await multiFactor(auth.currentUser).unenroll(factorUid);
      setCurrentUser({ ...auth.currentUser });
      return { success: true };
    } catch (err) {
      console.error('[MFA] unenroll error:', err);
      return { success: false, error: err };
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await fbSignOut(auth);
      setCurrentUser(null);
      setUserProfile(null);
      return { success: true };
    } catch (err) {
      console.error('[Auth] signOut error:', err);
      setError('Çıkış başarısız');
      return { success: false, error: err };
    }
  };

  const value = useMemo(() => ({
    currentUser,
    userProfile,
    loading,
    error,
    // actions
    register,
    login,
    loginWithGoogle,
    logout,
    // MFA actions
    startEnrollMfaPhone,
    finalizeEnrollMfaPhone,
    resolveMfaSignIn,
    unenrollMfaFactor,
    isAuthenticated: !!currentUser,
    clearError: () => setError(null),
    toE164,
    ensureRecaptcha,
  }), [currentUser, userProfile, loading, error]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
