"use client";
import axios from "axios";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image';
import logo from "../../public/logo-jadw.png";

import { User } from "@/types/Types";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { json } from "stream/consumers";

function Signup() {
  const router = useRouter()
  const [user, setUser] = useState<User>({
    firstname: "",
    lastname: '',
    email: '',
    password: '',
    phone: '',
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  // const ref = useRef<HTMLFormElement>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser(prevUser => ({
      ...prevUser,
      [name]: value, 
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   

    // if (!user.firstname || !user.email || !user.lastname || !user.password || !user.phone) {
    //     setError("All fields are required");
    //     setShowModal(true);
    //     return; 
    // }

    try {
      const resUserExists = await axios.post(`/api/userExists`, {
        email: user.email
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    
      const { user2 } = resUserExists.data;
    
      if (user2) {

      
        
        setError("User already exists");
        setShowModal(true);
        return;
      }
    
    
    



        const res = await axios.post('/api/register', {
          name: `${user.firstname} ${user.lastname}`, 
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          phone: user.phone
      }, );

        if (res.status === 200 || res.status === 201) {
          await fetch("/api/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              firstname: user.firstname,
            }),
          });
          const form = e.target as HTMLFormElement;
          form.reset();
          router.push('/login')
          console.log("User registration successful.");
        } else {
          console.log("User registration failed.");
        }
      } catch (error) {
        console.log("Error during registration: ", error);
      }
    }
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5 bg-black-100">
      <div className="bg-white text-black-500 overflow-hidden w-[60vw] max-sm:w-full">
        <div className="md:flex w-full">
          <div className="md:block w-[50vw] max-sm:hidden bg-[#9685CF] py-10 px-10">
            <Link href="/">
              <Image src={logo} alt="logo" className="mt-20" />
            </Link>
          </div>
          <div className="w-full py-10 px-5 md:px-10 max-sm:p-0">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-[#9685CF]">
                قم بإدخال معلوماتك للتسجيل
              </h1>
            </div>
            <form onSubmit={handleSignup}>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="firstname" className="text-xs font-semibold px-1">
                    الأسم الأول
                  </label>
                  <input
                    type="text"
                    name="firstname" // Ensure the name attribute is set
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                    placeholder="Ali"
                    value={user.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="lastname" className="text-xs font-semibold px-1">
                    الأسم الاخير
                  </label>
                  <input
                    type="text"
                    name="lastname" 
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                    placeholder="Hakami"
                    value={user.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="email" className="text-xs font-semibold px-1">
                    الإيميل
                  </label>
                  <input
                    type="email"
                    name="email" // Ensure the name attribute is set
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                    placeholder="ali@gmail.com"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="password" className="text-xs font-semibold px-1">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    name="password" // Ensure the name attribute is set
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                    placeholder="************"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="phone" className="text-xs font-semibold px-1">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone" // Ensure the name attribute is set
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                    placeholder="123-456-7890"
                    value={user.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                  
                    type="submit"
                    className="block w-full max-w-xs mx-auto bg-[#9685CF] hover:bg-[#FFA842] focus:bg-[#FFA842] text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    تسجيل
                  </button>
                  <p className="text-center p-3 text-black">
                    لديك حساب؟{" "}
                    <Link href="/login" className="text-[#9685CF] hover:underline">
                      قم بتسجيل الدخول
                    </Link>
                  </p>
                  <p className="text-center p-1">
                    <Link href="/" className="text-[#9685CF] hover:underline">
                      الرجوع للصفحة الرئيسية
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

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
                className={`w-16 h-16 mx-auto ${error ? 'text-red-500' : 'text-green-500'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {error ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01m-6.936-6.2a9.951 9.951 0 010-5.6A9.951 9.951 0 0112 2a9.951 9.951 0 015.9 2.2 9.951 9.951 0 010 5.6A9.951 9.951 0 0112 22a9.951 9.951 0 01-5.9-2.2z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                )}
              </svg>
            </motion.div>
            <p className="mb-4 text-red-500">{error || "تم إنشاء الحساب بنجاح"}</p>
            <button
              onClick={closeModal}
              className="bg-[#9685CF] hover:bg-[#FFA842] text-white font-semibold px-4 py-2 rounded"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
