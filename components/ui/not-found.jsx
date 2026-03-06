'use client';
import Lottie from "lottie-react";
import loginAnimation from "@/animations/404page.json";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Lottie 
        animationData={loginAnimation} 
        loop={true} 
        style={{ width: 400, height: 400 }}
      />
    </div>
  )
}

export default NotFound;
