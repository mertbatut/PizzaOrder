// reCAPTCHA Enterprise token alma helper
const getRecaptchaToken = async (action = 'REGISTER') => {
  if (!window.grecaptcha || !window.grecaptcha.enterprise) return null;
  await window.grecaptcha.enterprise.ready();
  return await window.grecaptcha.enterprise.execute('6LfPTLQrAAAAAPprUOwCrTUN4r6Vo0DHULacKIFk', { action });
};
// src/Pages/auth/RegisterPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    loginWithGoogle,
    startEnrollMfaPhone,
    finalizeEnrollMfaPhone,
    error,
    loading,
    toE164,
  } = useAuth();

  // SMS Modal state
  const [sms, setSms] = useState({
    show: false,
    verificationId: "",
    code: "",
    sending: false,
    verifying: false,
    error: "",
    canResend: false,
    remaining: 30,
  });
  // E-posta doğrulama modalı
  const [emailModal, setEmailModal] = useState({ show: false, email: "" });
  // Kayıt submit fonksiyonu (örnek, gerçek kodda form submit ile entegre edin)
  const handleRegister = async (e) => {
    e.preventDefault();
    // ...validasyonlar...
    try {
      const result = await register(formData.email, formData.password, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        birthDate: formData.birthDate,
        address: formData.address.trim(),
        gender: formData.gender,
        city: formData.city.trim(),
        district: formData.district.trim(),
        acceptMarketing: formData.acceptMarketing,
      });
      if (result.success) {
        if (auth.currentUser && !auth.currentUser.emailVerified) {
          await sendEmailVerification(auth.currentUser);
        }
        await signOut(auth);
        setEmailModal({ show: true, email: formData.email });
      }
    } catch (err) {
      // hata mesajı context'te yönetiliyor
      console.error('Register error:', err);
    }
  };


  // Sayaç (resend) efekti
  useEffect(() => {
    if (!sms.show) return;
    setSms((s) => ({ ...s, remaining: 30, canResend: false }));
    const id = setInterval(() => {
      setSms((s) =>
        s.remaining > 0
          ? { ...s, remaining: s.remaining - 1 }
          : { ...s, canResend: true }
      );
    }, 1000);
    return () => clearInterval(id);
  }, [sms.show]);

  // Çok adımlı form
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Temel Bilgiler
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Step 2 - Kişisel Bilgiler
    phone: "",
    birthDate: "",
    gender: "",
    // Step 3 - Adres Bilgileri
    address: "",
    city: "",
    district: "",
    // Terms
    acceptTerms: false,
    acceptMarketing: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateField(name, type === "checkbox" ? checked : value);
  };

  // --- SMS MFA ENROLL FLOW ---
  const startSmsEnrollFlow = async (phoneRaw) => {
    const phone = toE164(phoneRaw);
    if (!phone) {
      setSms((s) => ({ ...s, error: "Geçerli bir telefon giriniz." }));
      return;
    }
    setSms((s) => ({ ...s, sending: true, error: "" }));
    const { success, verificationId, error: err } = await startEnrollMfaPhone(
      phone
    );
    if (success) {
      setSms({
        show: true,
        verificationId,
        code: "",
        sending: false,
        verifying: false,
        error: "",
        canResend: false,
        remaining: 30,
      });
    } else {
      setSms((s) => ({
        ...s,
        sending: false,
        error: err?.message || "SMS gönderilemedi.",
      }));
    }
  };

  const handleVerifySms = async () => {
    if (!sms.code) return;
    setSms((s) => ({ ...s, verifying: true, error: "" }));
    const res = await finalizeEnrollMfaPhone(sms.verificationId, sms.code);
    if (res.success) {
      setSms((s) => ({ ...s, show: false, code: "" }));
      navigate("/");
    } else {
      setSms((s) => ({
        ...s,
        verifying: false,
        code: "",
        error: "Kod doğrulanamadı. Tekrar deneyin.",
      }));
    }
  };

  const handleResend = async () => {
    if (!sms.canResend) return;
    await startSmsEnrollFlow(formData.phone);
  };

  // Google ile kayıt → telefon yoksa Step 2’ye götür, varsa SMS başlat
  const handleGoogleRegister = async () => {
    try {
      const result = await loginWithGoogle();
      if (result.success) {
        if (!formData.phone) {
          setCurrentStep(2);
          return;
        }
        // E.164 formatına çevirerek MFA enroll başlat
        const phone = toE164(formData.phone);
        const enrollRes = await startEnrollMfaPhone(phone);
        if (!enrollRes.success) {
          console.error('[MFA] enroll error:', enrollRes.error);
        }
      }
    } catch (err) {
      console.error("❌ Google registration error:", err);
    }
  };
  // --- EMAIL VERIFICATION MODAL RENDER ---
  const renderEmailModal = () => (
    emailModal.show && (
      <div className="fixed inset-0 z-[999] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative bg-white w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-gray-100 p-6 animate-fadeInUp">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">E-posta Doğrulama Gerekli</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Lütfen <b>{emailModal.email}</b> adresine gönderilen doğrulama e-postasını onaylayın. Ardından giriş yapabilirsiniz.
          </p>
          <button
            onClick={() => {
              setEmailModal({ show: false, email: "" });
              navigate("/auth/login");
            }}
            className="w-full py-3 px-4 rounded-xl font-bold text-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 mt-2"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    )
  );

  // --- VALIDASYONLAR ---
  const validateStep1 = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "İsim gerekli";
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = "İsim en az 2 karakter olmalı";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Soyisim gerekli";
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = "Soyisim en az 2 karakter olmalı";
    }

    if (!formData.email) {
      errors.email = "E-posta adresi gerekli";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Geçerli bir e-posta adresi girin";
    }

    if (!formData.password) {
      errors.password = "Şifre gerekli";
    } else if (formData.password.length < 6) {
      errors.password = "Şifre en az 6 karakter olmalı";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Şifre tekrarı gerekli";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Şifreler eşleşmiyor";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};

    if (!formData.phone.trim()) {
      errors.phone = "Telefon numarası gerekli";
    } else if (!/^(\+90|0)?[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      errors.phone = "Geçerli bir telefon numarası girin";
    }

    if (!formData.birthDate) {
      errors.birthDate = "Doğum tarihi gerekli";
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13) {
        errors.birthDate = "En az 13 yaşında olmalısınız";
      }
    }

    if (!formData.gender) {
      errors.gender = "Cinsiyet seçimi gerekli";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors = {};

    if (!formData.address.trim()) {
      errors.address = "Adres gerekli";
    } else if (formData.address.trim().length < 10) {
      errors.address = "Adres en az 10 karakter olmalı";
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms = "Kullanım koşullarını kabul etmelisiniz";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    }

    if (isValid && currentStep < 3) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  // Kayıt → başarıyla açıldıysa email doğrulama gönder, çıkış yap, modal aç
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;
    try {
      const result = await register(formData.email, formData.password, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        birthDate: formData.birthDate,
        address: formData.address.trim(),
        gender: formData.gender,
        city: formData.city.trim(),
        district: formData.district.trim(),
        acceptMarketing: formData.acceptMarketing,
      });
          if (result.success) {
            // E-posta doğrulama linki gönder
            if (auth.currentUser && !auth.currentUser.emailVerified) {
              await sendEmailVerification(auth.currentUser);
            }
            // Otomatik login'i engelle
            await signOut(auth);
            // E-posta doğrulama modalı aç
            setEmailModal({ show: true, email: formData.email });
          }
    } catch {
          // hata mesajı context'te yönetiliyor
          console.error('Register error:', err);
    }
  };

  // --- RENDER HELPERS ---
  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            İsim *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
              formErrors.firstName
                ? "border-red-500 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white"
            } focus:outline-none focus:ring-4 focus:ring-red-100`}
            placeholder="Adınız"
          />
          {formErrors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.firstName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Soyisim *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
              formErrors.lastName
                ? "border-red-500 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white"
            } focus:outline-none focus:ring-4 focus:ring-red-100`}
            placeholder="Soyadınız"
          />
          {formErrors.lastName && (
            <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          E-posta Adresi *
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
                ? "border-red-500 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white"
            } focus:outline-none focus:ring-4 focus:ring-red-100`}
            placeholder="ornek@email.com"
          />
          <svg
            className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </div>
        {formErrors.email && (
          <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
        )}
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Şifre *
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 pl-11 pr-11 border-2 rounded-xl transition-all duration-300 ${
                formErrors.password
                  ? "border-red-500 focus:border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white"
              } focus:outline-none focus:ring-4 focus:ring-red-100`}
              placeholder="••••••••"
            />
            <svg
              className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {formErrors.password && (
            <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Şifre Tekrarı *
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 pl-11 pr-11 border-2 rounded-xl transition-all duration-300 ${
                formErrors.confirmPassword
                  ? "border-red-500 focus:border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white"
              } focus:outline-none focus:ring-4 focus:ring-red-100`}
              placeholder="••••••••"
            />
            <svg
              className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {formErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Telefon Numarası *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
            formErrors.phone
              ? "border-red-500 focus:border-red-500 bg-red-50"
              : "border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white"
          } focus:outline-none focus:ring-4 focus:ring-red-100`}
          placeholder="+90 555 123 4567"
        />
        {formErrors.phone && (
          <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
        )}
      </div>

      {/* Birth Date */}
      <div>
        <label
          htmlFor="birthDate"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Doğum Tarihi *
        </label>
        <input
          id="birthDate"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
            formErrors.birthDate
              ? "border-red-500 focus:border-red-500 bg-red-50"
              : "border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white"
          } focus:outline-none focus:ring-4 focus:ring-red-100`}
        />
        {formErrors.birthDate && (
          <p className="mt-1 text-sm text-red-600">{formErrors.birthDate}</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Cinsiyet *
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "male", label: "Erkek", icon: "👨" },
            { value: "female", label: "Kadın", icon: "👩" },
            { value: "other", label: "Diğer", icon: "👤" },
          ].map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all duration-300 ${
                formData.gender === option.value
                  ? "border-red-400 bg-red-50 text-red-700"
                  : "border-gray-200 hover:border-red-200 hover:bg-red-25"
              }`}
            >
              <input
                type="radio"
                name="gender"
                value={option.value}
                checked={formData.gender === option.value}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="text-2xl mb-2">{option.icon}</div>
              <div className="font-medium">{option.label}</div>
            </label>
          ))}
        </div>
        {formErrors.gender && (
          <p className="mt-1 text-sm text-red-600">{formErrors.gender}</p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Address */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Adres *
        </label>
        <textarea
          id="address"
          name="address"
          rows={3}
          value={formData.address}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 resize-none ${
            formErrors.address
              ? "border-red-500 focus:border-red-500 bg-red-50"
              : "border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white"
          } focus:outline-none focus:ring-4 focus:ring-red-100`}
          placeholder="Detaylı adresinizi yazın..."
        />
        {formErrors.address && (
          <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
        )}
      </div>

      {/* City & District */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Şehir
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 bg-gray-50 focus:bg-white focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100"
            placeholder="İstanbul"
          />
        </div>

        <div>
          <label
            htmlFor="district"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            İlçe
          </label>
          <input
            id="district"
            name="district"
            type="text"
            value={formData.district}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 bg-gray-50 focus:bg-white focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100"
            placeholder="Kadıköy"
          />
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <label className="flex items-start space-x-3">
          <input
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2 mt-1"
          />
          <span className="text-sm text-gray-700">
            <strong className="text-red-600">*</strong> Kullanım koşullarını ve
            gizlilik politikasını kabul ediyorum
          </span>
        </label>
        {formErrors.acceptTerms && (
          <p className="text-sm text-red-600">{formErrors.acceptTerms}</p>
        )}

        <label className="flex items-start space-x-3">
          <input
            name="acceptMarketing"
            type="checkbox"
            checked={formData.acceptMarketing}
            onChange={handleInputChange}
            className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2 mt-1"
          />
          <span className="text-sm text-gray-700">
            Kampanya ve indirim bilgileri almak istiyorum
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      {renderEmailModal()}
      <div className="max-w-lg w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9l-5.22 5.74L18.18 22 12 18.27 5.82 22l1.4-7.26L2 9l6.91-.74L12 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Teknolojik Yemekler
            </h1>
          </Link>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Üye Ol</h2>
            <p className="text-gray-600">Lezzetli yolculuğunuz başlasın</p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step <= currentStep
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < currentStep ? "✓" : step}
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded transition-all duration-300 ${
                      step < currentStep ? "bg-red-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div
              className={`text-sm font-medium ${
                currentStep >= 1 ? "text-red-600" : "text-gray-400"
              }`}
            >
              Hesap Bilgileri
            </div>
            <div
              className={`text-sm font-medium ${
                currentStep >= 2 ? "text-red-600" : "text-gray-400"
              }`}
            >
              Kişisel Bilgiler
            </div>
            <div
              className={`text-sm font-medium ${
                currentStep >= 3 ? "text-red-600" : "text-gray-400"
              }`}
            >
              Adres & Onay
            </div>
          </div>

          {/* Error Message (global) */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-700 text-sm font-medium">
                  {error === "Firebase: Error (auth/email-already-in-use)."
                    ? "Bu e-posta adresi zaten kullanılıyor"
                    : error === "Firebase: Error (auth/weak-password)."
                    ? "Şifre çok zayıf"
                    : error === "Firebase: Error (auth/invalid-email)."
                    ? "Geçersiz e-posta adresi"
                    : "Kayıt olurken hata oluştu"}
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step Content */}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Geri
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  İleri
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Kaydediliyor...
                    </div>
                  ) : (
                    "Üye Ol"
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Google Register - Sadece 1. adımda göster */}
          {currentStep === 1 && (
            <>
              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">veya</span>
                </div>
              </div>

              {/* Google Register Button */}
              <button
                type="button"
                onClick={handleGoogleRegister}
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Google ile Üye Ol</span>
              </button>
            </>
          )}

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Zaten hesabınız var mı?{" "}
              <Link
                to="/auth/login"
                className="text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>

      {/* SMS Doğrulama Modal (TEK KERE) */}
      {sms.show && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div
            role="dialog"
            aria-modal="true"
            className="relative bg-white w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-gray-100 p-6 animate-fadeInUp"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">SMS Doğrulama</h3>
              <button
                onClick={() => setSms((s) => ({ ...s, show: false }))}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                aria-label="Kapat"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Telefonunuza gönderilen 6 haneli kodu girin.{" "}
              {sms.canResend ? "" : `Yeniden gönder (${sms.remaining}s)`}
            </p>

            {sms.error && (
              <div className="mb-3 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <span className="text-sm text-red-700">{sms.error}</span>
              </div>
            )}

            <input
              inputMode="numeric"
              maxLength={8}
              autoFocus
              value={sms.code}
              onChange={(e) =>
                setSms((s) => ({ ...s, code: e.target.value }))
              }
              placeholder="123456"
              className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 border-gray-200 mb-4"
            />

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handleResend}
                disabled={!sms.canResend || sms.sending}
                className={`px-4 py-2 rounded-lg border-2 ${
                  sms.canResend && !sms.sending
                    ? "border-gray-200 hover:bg-gray-50"
                    : "border-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Kodu Yeniden Gönder
              </button>
              <button
                onClick={handleVerifySms}
                disabled={sms.verifying || !sms.code}
                className={`px-5 py-2 rounded-lg font-semibold text-white ${
                  sms.verifying || !sms.code
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                }`}
              >
                {sms.verifying ? "Doğrulanıyor..." : "Doğrula"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
