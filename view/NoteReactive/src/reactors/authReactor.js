export const authReactor = {
  onSuccess: ({ payload, action }) => {
    if (payload.isSuccess) {
      window.dispatchEvent(
        new CustomEvent(`dnt:${action}`, { detail: { value: true, action } }),
      );
    } else {
      window.dispatchEvent(
        new CustomEvent(`dnt:${action}`, { detail: { value: false, action } }),
      );
    }
  },
  onError: () => {
    console.log("error authService");
  },
};
