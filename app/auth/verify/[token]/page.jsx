'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { endPoints } from '@/config';
import { toast } from 'react-hot-toast';

import '@/styles/verify.css';

const Verify = () => {
  const router = useRouter();
  const { token } = useParams();

  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let isMounted = true;

    const verifyUser = async () => {
      if (!token) {
        setStatus('error');
        setErrMsg('رابط التحقق غير صالح أو مفقود.');
        return;
      }

      try {
        const res = await fetch(endPoints.activateUser, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          credentials: 'include',
        });

        const json = await res.json();

        if (!isMounted) return;

        if (json.successful) {
          setStatus('success');
          toast.success("تم تفعيل الحساب بنجاح! 🎉");
          setTimeout(() => {
            router.push('/');
            router.refresh();
          }, 2000);
        } else {
          setStatus('error');
          const msg = json.msg || 'فشلت عملية التحقق. قد يكون الرابط منتهياً.';
          setErrMsg(msg);
          toast.error(msg);
          setTimeout(() => {
            router.push('/auth/signup');
          }, 3000);
        }
      } catch (error) {
        console.error("Verification error:", error);
        if (!isMounted) return;
        setStatus('error');
        setErrMsg('حدث خطأ أثناء الاتصال بالخادم.');
        toast.error('حدث خطأ أثناء الاتصال بالخادم.');
        setTimeout(() => {
          router.push('/auth/signup');
        }, 3000);
      }
    };

    verifyUser();

    return () => {
      isMounted = false;
    };
  }, [token, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center">
        {status === 'verifying' && (
          <div className="flex flex-col items-center gap-4">
            <div className="three-dots-loading">
              <div className="first dot"></div>
              <div className="second dot"></div>
              <div className="third dot"></div>
            </div>
            <p className="text-gray-600 font-medium">جاري التحقق من حسابك...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">تم تفعيل الحساب بنجاح!</h2>
            <p className="text-gray-600">سيتم توجيهك إلى الصفحة الرئيسية خلال لحظات...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">فشل التحقق</h2>
            <p className="text-red-600 font-medium">{errMsg}</p>
            <p className="text-gray-500 text-sm">سيتم توجيهك لإنشاء حساب جديد...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verify
