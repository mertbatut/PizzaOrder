import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Import the auth context relative to project root
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, resolveMfaSignIn, startEnrollMfaPhone, finalizeEnrollMfaPhone, error, loading, currentUser, toE164 } = useAuth();
  // MFA aşaması state
  const [mfa, setMfa] = useState({
    required: false,
    resolver: null,
    verificationId: '',
    code: '',
    enroll: false,
    phone: '',
    sending: false,
    verifying: false,
    error: '',
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateField(name, type === 'checkbox' ? checked : value);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = 'E-posta adresi gerekli';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!formData.password) {
      errors.password = 'Şifre gerekli';
    } else if (formData.password.length < 6) {
      errors.password = 'Şifre en az 6 karakter olmalı';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const result = await login(formData.email, formData.password);
      if (result.mfaRequired) {
        setMfa({
          required: true,
          resolver: result.resolver,
          verificationId: result.verificationId,
          code: '',
          enroll: false,
          phone: '',
          sending: false,
          verifying: false,
          error: '',
        });
      } else if (result.success) {
        // MFA kaydı yoksa SMS MFA enroll modalı aç
        if (currentUser && currentUser.multiFactor && currentUser.multiFactor.enrolledFactors.length === 0) {
          setMfa(mfa => ({ ...mfa, required: true, enroll: true, phone: '', sending: false, verifying: false, error: '' }));
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('❌ Login error:', error);
    }
  };

  // MFA kodunu doğrulama veya enroll
  const handleVerifyCode = async () => {
    if (!mfa.code) return;
    if (mfa.enroll) {
      setMfa((s) => ({ ...s, verifying: true, error: '' }));
      // SMS MFA enroll akışı
      try {
        const res = await finalizeEnrollMfaPhone(mfa.verificationId, mfa.code);
        if (res.success) {
          setMfa({ required: false, resolver: null, verificationId: '', code: '', enroll: false, phone: '', sending: false, verifying: false, error: '' });
          navigate('/');
        } else {
          setMfa((s) => ({ ...s, verifying: false, code: '', error: 'Kod doğrulanamadı. Tekrar deneyin.' }));
        }
      } catch (err) {
        setMfa((s) => ({ ...s, verifying: false, code: '', error: 'Kod doğrulanamadı. Tekrar deneyin.' }));
      }
    } else {
      const ok = await resolveMfaSignIn(mfa.resolver, mfa.verificationId, mfa.code);
      if (ok.success) {
        setMfa({ required: false, resolver: null, verificationId: '', code: '', enroll: false, phone: '', sending: false, verifying: false, error: '' });
        navigate('/');
      } else {
        setMfa((s) => ({ ...s, code: '' }));
      }
    }
  };

  // SMS MFA enroll başlat
  const handleStartEnroll = async () => {
    if (!mfa.phone) {
      setMfa((s) => ({ ...s, error: 'Telefon numarası gerekli.' }));
      return;
    }
    setMfa((s) => ({ ...s, sending: true, error: '' }));
    const { success, verificationId, error: err } = await startEnrollMfaPhone(mfa.phone);
    if (success) {
      setMfa((s) => ({ ...s, verificationId, sending: false, error: '', code: '' }));
    } else {
      setMfa((s) => ({ ...s, sending: false, error: err?.message || 'SMS gönderilemedi.' }));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      if (result.mfaRequired) {
        setMfa({
          required: true,
          resolver: result.resolver,
          verificationId: result.verificationId,
          code: '',
        });
      } else if (result.success) {
        navigate('/');
      }
    } catch (error) {
      // error state already handled in context
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9l-5.22 5.74L18.18 22 12 18.27 5.82 22l1.4-7.26L2 9l6.91-.74L12 2z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Teknolojik Yemekler</h1>
          </Link>
        </div>

        {/* MFA kodu isteniyorsa */}
        {mfa.required ? (
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">SMS Doğrulama</h2>
              <p className="text-gray-600">
                {mfa.enroll ? 'Telefon numaranızı girin ve SMS ile doğrulayın.' : 'Telefonunuza gelen SMS kodunu girin'}
              </p>
            </div>
            {mfa.enroll && (
              <div className="mb-4">
                <input
                  type="tel"
                  value={mfa.phone}
                  onChange={e => setMfa(s => ({ ...s, phone: e.target.value }))}
                  placeholder="+90 555 123 4567"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100"
                  disabled={mfa.verificationId}
                />
                <button
                  onClick={handleStartEnroll}
                  disabled={mfa.sending || mfa.verificationId}
                  className="w-full mt-2 py-2 px-4 rounded-xl font-bold text-md bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300"
                >
                  {mfa.sending ? 'SMS Gönderiliyor...' : 'SMS Gönder'}
                </button>
              </div>
            )}
            {mfa.verificationId && (
              <div className="mb-6">
                <input
                  type="text"
                  value={mfa.code}
                  onChange={e => setMfa(s => ({ ...s, code: e.target.value }))}
                  placeholder="123456"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100"
                  maxLength={8}
                  autoFocus
                  disabled={mfa.verifying}
                />
                <button
                  onClick={handleVerifyCode}
                  disabled={mfa.verifying || !mfa.code}
                  className="w-full mt-2 py-2 px-4 rounded-xl font-bold text-md bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300"
                >
                  {mfa.verifying ? 'Doğrulanıyor...' : 'Doğrula'}
                </button>
              </div>
            )}
            {mfa.error && (
              <div className="mb-3 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <span className="text-sm text-red-700">{mfa.error}</span>
              </div>
            )}
          </div>
        ) : (
          <React.Fragment>
            {/* Login Form */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Hoş Geldiniz</h2>
                <p className="text-gray-600">Hesabınıza giriş yapın</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700 text-sm font-medium">
                      {error === 'Firebase: Error (auth/user-not-found).' ? 'Kullanıcı bulunamadı' :
                        error === 'Firebase: Error (auth/wrong-password).' ? 'Hatalı şifre' :
                        error === 'Firebase: Error (auth/invalid-email).' ? 'Geçersiz e-posta adresi' :
                        'Giriş yapılırken hata oluştu'}
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-11 border-2 rounded-xl transition-all duration-300 ${
                    formErrors.email 
                      ? 'border-red-500 focus:border-red-500 bg-red-50' 
                      : 'border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white'
                  } focus:outline-none focus:ring-4 focus:ring-red-100`}
                  placeholder="ornek@email.com"
                />
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-11 pr-11 border-2 rounded-xl transition-all duration-300 ${
                    formErrors.password 
                      ? 'border-red-500 focus:border-red-500 bg-red-50' 
                      : 'border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white'
                  } focus:outline-none focus:ring-4 focus:ring-red-100`}
                  placeholder="••••••••"
                />
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-2 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-700">Beni hatırla</span>
              </label>
              <button type="button" className="text-sm text-red-600 hover:text-red-700 font-medium">
                Şifremi unuttum
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Giriş yapılıyor...
                </div>
              ) : (
                'Giriş Yap'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">veya</span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google ile Giriş Yap</span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Hesabınız yok mu?{' '}
              <Link to="/auth/register" className="text-red-600 hover:text-red-700 font-semibold transition-colors">
                Üye Ol
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-gray-800 font-medium flex items-center justify-center space-x-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default LoginPage;