"use client";

// import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-content">
        {/* <Image
          src="/hero.png"
          alt="El-Hodah Logo"
          width={220}
          height={120}
          className="hero-logo opacity-80"
          priority
        /> */}

        <h1 className="hero-title">راحة تليق بنومك</h1>

        <p className="hero-subtitle">
          لمسة نعومة في كل نومة
        </p>

        <div className="hero-actions">
          <Link href="/shop" className="hero-btn primary">
            تسوق الآن
          </Link>

          <Link href="/about" className="hero-btn secondary">
            اعرف أكتر
          </Link>
        </div>
      </div>
    </section>
  );
}
