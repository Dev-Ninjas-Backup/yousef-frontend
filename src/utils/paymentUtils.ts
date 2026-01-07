export const openPaymentInNewTab = (url: string) => {
  const paymentWindow = window.open(
    url,
    "_blank",
    "width=800,height=600,scrollbars=yes,resizable=yes"
  );

  if (paymentWindow) {
    // Check if payment window is closed (user cancelled or completed)
    const checkClosed = setInterval(() => {
      if (paymentWindow.closed) {
        clearInterval(checkClosed);
        // Refresh current page to update subscription status
        window.location.reload();
      }
    }, 1000);
  }
};
