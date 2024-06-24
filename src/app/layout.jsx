"use client";

import React, { useState, useEffect, createContext } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/modeToggle";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "TSEC WEBSITE",
  description: "Created by batch 2024-2025",
};

export const UserContext = createContext({
  loggedIn: false,
  setLoggedIn: (value) => {},
  user: { type: "", email: "", name: "" },
  setUser: (user) => {},
});

export default function RootLayout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    type: "",
    email: "",
    name: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setLoggedIn(true);
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${inter.className} w-screen h-screen`}>
        {/* <ToastContainer> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
              {children}
            </UserContext.Provider>
          </ThemeProvider>
        {/* </ToastContainer>   */}
      </body>
    </html>
  );
}