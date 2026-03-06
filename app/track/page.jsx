"use client";

import { useState } from "react";
import { PackageCheck, Truck, Clock, MapPin } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleTrack = () => {
    if (!orderId) return;
    setShowResult(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-3">تتبع طلبك</h1>
        <p className="text-gray-300">
          أدخل رقم الطلب لمعرفة حالته الحالية
        </p>
      </section>

      {/* Track Box */}
      <section className="max-w-xl mx-auto px-4 py-12">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <label className="block mb-2 text-gray-700 font-medium">
            رقم الطلب
          </label>
          <input
            type="text"
            placeholder="أدخل رقم الطلب هنا"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleTrack}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            تتبع الطلب
          </button>
        </div>
      </section>

      {/* Result */}
      {showResult && (
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-8 text-center">
              حالة الطلب
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              {/* Step */}
              <StatusItem
                icon={<Clock />}
                title="قيد التجهيز"
                active
              />
              <StatusItem
                icon={<PackageCheck />}
                title="تم الشحن"
                active
              />
              <StatusItem
                icon={<Truck />}
                title="في الطريق"
              />
              <StatusItem
                icon={<MapPin />}
                title="تم التسليم"
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function StatusItem({ icon, title, active }) {
  return (
    <div
      className={`flex flex-col items-center p-4 rounded-lg border
      ${active ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
    >
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full mb-3
        ${active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
      >
        {icon}
      </div>
      <span
        className={`font-medium
        ${active ? "text-blue-600" : "text-gray-500"}`}
      >
        {title}
      </span>
    </div>
  );
}
