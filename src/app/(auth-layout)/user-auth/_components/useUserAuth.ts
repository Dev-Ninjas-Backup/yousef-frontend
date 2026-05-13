import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { getRedirectPath, storeAuthData } from "@/lib/auth";
import {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useGoogleLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@/store/api/authApi";

export const useUserAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // API hooks
  const [login, { isLoading }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();

  // State
  const [authMode, setAuthMode] = useState("signin");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showForgotForm, setShowForgotForm] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [otp, setOtp] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleTabChange = (value: string) => {
    if (value === "garage-owner") {
      router.push("/garage-auth");
    }
  };

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      const { token, user } = result.result.data;

      if (user.role !== "CAR_OWNER") {
        setError("This login is for Car Owners only. Please use the correct portal.");
        return;
      }

      storeAuthData(token, user);
      dispatch(setCredentials({
        user: {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role as any,
          avatar: user.profilePhoto || undefined,
        },
        token,
      }));

      const redirectPath = getRedirectPath(user.role);
      router.push(redirectPath);
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  const handleSignUp = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    try {
      const result = await register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: "CAR_OWNER"
      }).unwrap();

      setVerifyToken(result.verifyToken);
      setShowOtpForm(true);
      setError("");
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const result = await verifyOtp({
        resetToken: verifyToken,
        emailOtp: otp
      }).unwrap();

      const { token, user } = result.data?.data || {};

      if (!token || !user) {
        setError("Invalid response from server. Please try again.");
        return;
      }

      storeAuthData(token, user);
      dispatch(setCredentials({
        user: {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role as any,
          avatar: user.profilePhoto || undefined,
        },
        token,
      }));

      const redirectPath = getRedirectPath(user.role);
      // Hard redirect so AuthContext re-initializes from cookie with fresh token
      window.location.href = redirectPath;
    } catch (error: any) {
      console.error("OTP verification error:", error);
      setError(error?.data?.message || "OTP verification failed. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setError("Please enter your email address");
      return;
    }

    try {
      const result = await forgotPassword({ email: forgotEmail }).unwrap();
      setResetToken(result.data.resetToken);
      setShowResetForm(true);
      setError("");
    } catch (error: any) {
      console.error("Forgot password error:", error);
      setError(error?.data?.message || "Failed to send reset email. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPassword({
        resetToken: resetToken,
        password: newPassword
      }).unwrap();

      setShowForgotForm(false);
      setShowResetForm(false);
      setOtp("");
      setNewPassword("");
      setConfirmNewPassword("");
      setForgotEmail("");
      setError("");
      
      alert("Password reset successful! Please login with your new password.");
    } catch (error: any) {
      console.error("Reset password error:", error);
      setError(error?.data?.message || "Failed to reset password. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleGoogleCallback,
      });
      
      window.google.accounts.id.prompt();
    }
  };

  const handleGoogleCallback = async (response: any) => {
    try {
      const result = await googleLogin({
        idToken: response.credential
      }).unwrap();

      const { token, user } = result.data;

      if (user.role !== "CAR_OWNER") {
        setError("This login is for Car Owners only. Please use the correct portal.");
        return;
      }

      storeAuthData(token, user);
      dispatch(setCredentials({
        user: {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role as any,
          avatar: user.profilePhoto || undefined,
        },
        token,
      }));

      const redirectPath = getRedirectPath(user.role);
      router.push(redirectPath);
    } catch (error: any) {
      console.error("Google login error:", error);
      setError(error?.data?.message || "Google login failed. Please try again.");
    }
  };

  return {
    // State
    authMode,
    setAuthMode,
    showOtpForm,
    showForgotForm,
    showResetForm,
    formData,
    error,
    otp,
    setOtp,
    forgotEmail,
    setForgotEmail,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    
    // Loading states
    isLoading,
    isRegistering,
    isVerifying,
    isGoogleLoading,
    isForgotLoading,
    isResetLoading,
    
    // Handlers
    handleInputChange,
    handleTabChange,
    handleSignIn,
    handleSignUp,
    handleVerifyOtp,
    handleForgotPassword,
    handleResetPassword,
    handleGoogleLogin,
    
    // State setters
    setShowOtpForm,
    setShowForgotForm,
    setShowResetForm,
    setError,
  };
};