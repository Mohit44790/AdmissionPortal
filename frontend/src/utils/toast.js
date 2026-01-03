import { toast } from "react-toastify";

const baseToast = {
  style: {
    background: "#ffffff",
    color: "#1f2937",
    fontSize: "13px",
    fontWeight: 500,
    padding: "8px 14px",
    borderRadius: "8px",
    minHeight: "unset",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },
  autoClose: 1400,
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    ...baseToast,
    style: {
      ...baseToast.style,
      borderLeft: "4px solid #22c55e", // subtle success indicator
    },
    iconTheme: {
      primary: "#22c55e",
      secondary: "#ffffff",
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    ...baseToast,
    style: {
      ...baseToast.style,
      borderLeft: "4px solid #ef4444",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#ffffff",
    },
  });
};

export const showInfoToast = (message) => {
  toast.info(message, {
    ...baseToast,
    style: {
      ...baseToast.style,
      borderLeft: "4px solid #3b82f6",
    },
    iconTheme: {
      primary: "#3b82f6",
      secondary: "#ffffff",
    },
  });
};
