import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/navbar";
import ScrollToTop from "../components/helper/scroll-to-top";
import Footer from "../components/footer";

export default function RootLayout({ children }) {
  return (
    <>
      <ToastContainer />
      <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
        <Navbar />
        {children}
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
};
