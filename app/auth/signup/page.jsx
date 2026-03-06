"use client";

import Link from "next/link";
import { endPoints } from "@/config";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("كلمتا المرور غير متطابقتين ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(endPoints.signup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          pwd: form.password,
        }),
      });

      const json = await res.json();

      if (json.successful) {
        toast.success("تم إرسال رابط التحقق إلى بريدك الإلكتروني بنجاح! 🎉");
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
      } else {
        toast.error(json.msg || "حدث خطأ ما أثناء إنشاء الحساب");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("فشل الاتصال بالخادم. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          إنشاء حساب جديد
        </h1>
        <p className="text-center text-gray-500 mb-8">
          انضم إلى الهدى الآن
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="الاسم بالكامل"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="البريد الإلكتروني"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="كلمة المرور"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <Input
            label="تأكيد كلمة المرور"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "جاري المعالجة..." : "إنشاء الحساب"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          لديك حساب بالفعل؟{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline font-medium"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </main>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        required
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
