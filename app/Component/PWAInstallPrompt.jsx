"use client";
import { useState, useEffect } from "react";

const PWAInstallPrompt = ({ promptText = "Add this app to your home screen!", buttonText = "Install", customStyles = {} }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
    }
    setShowPrompt(false);
  };

  const handleCloseClick = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "10px",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        ...customStyles, // merge with optional custom styles
        width: "300px",
        borderRadius: "8px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={handleCloseClick}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        &times;
      </button>
      <p>{promptText}</p>
      <button onClick={handleInstallClick}>{buttonText}</button>
    </div>
  );
};

export default PWAInstallPrompt;
