"use client";

import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

function CustomeToaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: "",
        style: {
          backgroundColor: resolvedTheme === "dark" ? "#18181b" : "#f8fafc",
          border: `1px solid ${resolvedTheme === "dark" ? " #71717b" : "#90a1b9"}`,
          padding: "16px",
          color: resolvedTheme === "dark" ? "white" : "black",
        },
      }}
    />
  );
}

export default CustomeToaster;
