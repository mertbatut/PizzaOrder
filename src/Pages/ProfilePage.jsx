import React, { useEffect, useState } from 'react';
// Auth context and Firestore imports need to be referenced from the project root.
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../firebase/config';

/**
 * ProfilePage
 *
 * This page displays the authenticated user's profile information.  It pulls
 * extended profile details from Firestore if available and falls back to
 * whatever is loaded in AuthContext.  If no user is logged in, it prompts
 * the visitor to log in first.  While data is loading a simple message
 * is shown.
 */
const ProfilePage = () => {
  const { currentUser, userProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch extended profile details from Firestore once the user is available.
  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }
      try {
        const ref = doc(db, 'userProfiles', currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error('[ProfilePage] fetch error:', err);
        setError(err.message || 'Profil verisi okunamadı');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [currentUser]);

  // Show a prompt if the user isn't authenticated
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-700 font-medium">Lütfen profil bilgilerinizi görüntülemek için giriş yapın.</p>
      </div>
    );
  }

  // Show loading state while profile data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-700 font-medium">Profil verileri yükleniyor...</p>
      </div>
    );
  }

  // Show an error message if there was an issue fetching profile data
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-red-600 font-medium">Hata: {error}</p>
      </div>
    );
  }

  // Merge firestore profile data with context fallback for missing fields
  const p = profile || {};
  const merged = {
    firstName: p.firstName || userProfile?.firstName || '',
    lastName: p.lastName || userProfile?.lastName || '',
    email: currentUser.email || '',
    phone: p.phone || '',
    birthDate: p.birthDate || '',
    gender: p.gender || '',
    address: p.address || '',
    city: p.city || '',
    district: p.district || '',
    loyaltyPoints: p.loyaltyPoints ?? userProfile?.loyaltyPoints ?? 0,
    favoriteCount: (p.favoriteProducts?.length ?? userProfile?.favoriteProducts?.length ?? 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Profil Bilgileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ad</label>
            <p className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
              {merged.firstName || '-'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Soyad</label>
            <p className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
              {merged.lastName || '-'}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">E-posta</label>
            <p className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
              {merged.email}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
            <p className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
              {merged.phone || '-'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Doğum Tarihi</label>
            <p className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
              {merged.birthDate || '-'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cinsiyet</label>
            <p className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
              {merged.gender || '-'}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Adres</label>
            <p className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
              {merged.address || '-'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Şehir</label>
            <p className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
              {merged.city || '-'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">İlçe</label>
            <p className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
              {merged.district || '-'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sadakat Puanı</label>
            <p className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
              {merged.loyaltyPoints}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Favori Ürün Sayısı</label>
            <p className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
              {merged.favoriteCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;