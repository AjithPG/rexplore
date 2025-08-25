"use client";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
const providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme=""
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default providers;
