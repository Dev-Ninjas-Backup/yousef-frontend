import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { getRedirectPath, storeAuthData } from "@/lib/auth";
import {
  useLoginMutation,
  useGarageRegisterMutation,
  useVerifyOtpMutation,
  useGoogleLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@/store/api/authApi";

export const useGarageAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // API hooks
  const [login, { isLoading }] = useLoginMutation();
  const [garageRegister, { isLoading: isRegistering }] = useGarageRegisterMutation();
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
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    garageName: "",
    address: "",
    city: "",
    emirate: "",
    serviceCategories: [] as string[],
    garageLogo: null as File | null,
    tradeLicense: null as File | null,
    agreeToTerms: false,
  });
  const [error, setError] = useState("");

  const handleInputChange = (
    field: string,
    value: string | boolean | string[] | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleTabChange = (value: string) => {
    if (value === "car-owner") {
      router.push("/user-auth");
    }
  };

  const handleServiceToggle = (service: string) => {
    const currentServices = formData.serviceCategories;
    const updatedServices = currentServices.includes(service)
      ? currentServices.filter((s) => s !== service)
      : [...currentServices, service];
    handleInputChange("serviceCategories", updatedServices);
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

      if (user.role !== "GARAGE_OWNER") {
        setError("This login is for Garage Owners only. Please use the correct portal.");
        return;
      }

      if (!user.isGarageVerified) {
        setError("Your garage is not verified yet. Please wait for admin approval or contact support.");
        return;
      }

      storeAuthData(token, user);
      dispatch(setCredentials({
        user: {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role as any,
          avatar: user.garageLogo || undefined,
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
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.garageName || !formData.address || !formData.city || !formData.emirate) {
      setError("Please fill in all garage information");
      return;
    }

    if (formData.serviceCategories.length === 0) {
      setError("Please select at least one service category");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('confirmPassword', formData.confirmPassword);
      formDataToSend.append('garageName', formData.garageName);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('emirate', formData.emirate);
      formDataToSend.append('serviceCategories', JSON.stringify(formData.serviceCategories));
      formDataToSend.append('role', 'GARAGE_OWNER');

      if (formData.garageLogo) {
        formDataToSend.append('garageLogo', formData.garageLogo);
      }
      if (formData.tradeLicense) {
        formDataToSend.append('tradeLicense', formData.tradeLicense);
      }

      const result = await garageRegister(formDataToSend).unwrap();

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
        resetToken: verifyToken || "",
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
          avatar: user.garageLogo || undefined,
        },
        token,
      }));

      const redirectPath = getRedirectPath(user.role);
      router.push(redirectPath);
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
    handleFileUpload,
    handleTabChange,
    handleServiceToggle,
    handleSignIn,
    handleSignUp,
    handleVerifyOtp,
    handleForgotPassword,
    handleResetPassword,
    
    // State setters
    setShowOtpForm,
    setShowForgotForm,
    setShowResetForm,
    setError,
  };
};