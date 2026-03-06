"use client";

import Footer from "@/components/layout/Footer";

export default function ShopLayout({ children }) {
  return (
    <>
      <main className="bg-gray-50">{children}</main>
      <Footer />
    </>
  );
}
