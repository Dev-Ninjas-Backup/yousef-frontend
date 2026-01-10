import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface ErrorHandlerOptions {
  showToast?: boolean;
  redirectTo?: string;
  logError?: boolean;
}

export const useErrorHandler = () => {
  const router = useRouter();

  const handleError = (
    error: Error | string,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      redirectTo,
      logError = true
    } = options;

    const errorMessage = typeof error === 'string' ? error : error.message;

    // Log error for debugging
    if (logError) {
      console.error('Error handled:', error);
    }

    // Show toast notification
    if (showToast) {
      toast.error(errorMessage || 'An unexpected error occurred');
    }

    // Redirect if specified
    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  const handleApiError = (error: any, fallbackMessage = 'Something went wrong') => {
    let message = fallbackMessage;

    if (error?.data?.message) {
      message = error.data.message;
    } else if (error?.message) {
      message = error.message;
    } else if (error?.status) {
      switch (error.status) {
        case 400:
          message = 'Bad request. Please check your input.';
          break;
        case 401:
          message = 'Unauthorized. Please login again.';
          router.push('/user-auth');
          break;
        case 403:
          message = 'Access denied. You don\'t have permission.';
          break;
        case 404:
          message = 'Resource not found.';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          break;
        default:
          message = fallbackMessage;
      }
    }

    handleError(message, { showToast: true, logError: true });
  };

  const handleNetworkError = () => {
    handleError('Network error. Please check your connection.', {
      showToast: true,
      logError: true
    });
  };

  return {
    handleError,
    handleApiError,
    handleNetworkError
  };
};