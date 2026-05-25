"use client";

import { Toaster } from "react-hot-toast";

// Global toast container for app-wide success and error notifications.
export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#0a0a0a",
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.12)",
        },
      }}
    />
  );
}