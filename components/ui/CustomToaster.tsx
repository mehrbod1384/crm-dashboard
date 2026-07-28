"use client";

import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

function CustomeToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: "",
        style: {
          backgroundColor: theme === "dark" ? "#18181b" : "#f8fafc",
          border: `1px solid ${theme === "dark" ? " #71717b" : "#90a1b9"}`,
          padding: "16px",
          color: theme === "dark" ? "white" : "black",
        },
      }}
    />
  );
}

export default CustomeToaster;
