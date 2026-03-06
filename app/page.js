import Categories from "@/components/home/Categories";
import Featured from "@/components/home/Featured";
import WhyUs from "@/components/home/WhyUs";
import Hero from "@/components/home/Hero";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">

      <Header />

      <Hero />

      <Categories />

      <Featured />

      <WhyUs />

      <Footer />

    </div>
  );
}
