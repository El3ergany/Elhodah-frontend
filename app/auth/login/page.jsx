"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { endPoints } from "@/config";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("يرجى ملء جميع الحقول ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(endPoints.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          pwd: form.password,
        }),
      });

      const json = await res.json();

      if (json.successful) {
        toast.success("تم تسجيل الدخول بنجاح! 🎉");
        setForm({ email: "", password: "" });
        router.push("/");
        router.refresh();
      } else {
        toast.error(json.msg || "البريد الإلكتروني أو كلمة المرور غير صحيحة ❌");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("فشل الاتصال بالخادم. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          تسجيل الدخول
        </h1>
        <p className="text-center text-gray-500 mb-8">
          مرحبًا بعودتك إلى الهدى
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex justify-between items-center text-sm">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ليس لديك حساب؟{" "}
          <Link
            href="/auth/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            إنشاء حساب
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
