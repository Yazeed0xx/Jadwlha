"use client"
import React, { useState } from 'react'
import { motion } from "framer-motion";
import Link from 'next/link';
import logo from "../../public/logo-jadw.png"
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GoogleSignup from './GoogleSignup';
import { FcGoogle } from "react-icons/fc";

function Login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState('')
  const [error, setError] = useState(""); 
  const router = useRouter()
  const [showModal, setShowModal] = useState<boolean>(false);

  const [isGoogleLogin, setIsGoogleLogin] = useState(false); // New state for Google login


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email|| !password){
      setError('ALl fileds Reqiurd')
      setShowModal(true)
      return 

      
    }
 
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        
      });

      
  
      if (res && !res.error) {
       router.replace('/');
      } else {
        setError("Invalid credentials");
        setShowModal(true)
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred");
    }
  };
  // const handleGoogleLogin = async () => {
  //   setIsGoogleLogin(!isGoogleLogin); // Indicate Google login is in process
  //   const result = await signIn('google', { callbackUrl: '/' });

  //   if (result && !result.error) {
  //     router.replace('/');
  //   } else {
  //     setError("Google login failed");
  //     setShowModal(true);
  //   }

  //   setIsGoogleLogin(false); // Reset Google login state
  // };


  const closeModal = () => {
    setShowModal(false);
  };

  return (
<div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5 bg-black-100">
      <div className="bg-white text-black-500 max-sm:w-[100%] overflow-hidden w-[50vw]">
        <div className="md:flex w-full rounded-lg border-2 border-[#9685CF]">
          <div className="md:block w-[50vw] max-sm:w-[100%] bg-[#9685CF] py-10 px-10 max-sm:hidden">
            <Link href="/">
              <Image src={logo} alt='logo' className="mt-20" />
            </Link>
          </div>
          <div className="w-full py-10 max-sm:p-0 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold pt-5 text-2xl text-[#9685CF]">
                مرحبًا بك مرة اخرى, الرجاء ادخال بياناتك لتسجيل الدخول
              </h1>
            </div>
            <div>
            <form onSubmit={handleLogin}>
            <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="email" className="text-xs font-semibold px-1">
                    الإيميل
                  </label>
                  <div className="flex">

                    <input
                      type="email"
                      className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                      placeholder="ali@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold px-1"
                  >
                    كلمة المرور
                  </label>
                  <div className="flex">
                    <input
                      type="password"
                      className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                      placeholder="************"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                  </div>
                  
                </div>
                
              </div>

              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    className="block w-full max-w-xs mx-auto bg-[#9685CF] hover:bg-[#FFA842] focus:bg-[#FFA842] text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    تسجيل دخول
                  </button>
                  {/* <div><FcGoogle /></div> */}
                  
                  
                  <p className="text-center p-3 text-black">
                    ليس لديك حساب؟ <Link href="/register" className="text-[#9685CF] hover:underline">قم بإنشاء حساب</Link>
                  </p>
                  <p className="text-center p-1 ">
                  <Link href="/" className="text-[#9685CF] hover:underline">الرجوع للصفحة الرئيسية</Link>
                  </p>
                </div>
              </div>
            </form>

            
              
            </div>
            
            
          </div>

        </div>
        
      </div>
     
      {/* Modal for error handling */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mx-auto text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01m-6.936-6.2a9.951 9.951 0 010-5.6A9.951 9.951 0 0112 2a9.951 9.951 0 015.9 2.2 9.951 9.951 0 010 5.6A9.951 9.951 0 0112 22a9.951 9.951 0 01-5.9-2.2z"
                />
              </svg>
            </motion.div>
            <p className="mb-4">{error}</p>
            <button
              className="bg-[#9685CF] hover:bg-[#FFA842] text-white font-semibold px-4 py-2 rounded"
              onClick={closeModal}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>  )
}

export default Login