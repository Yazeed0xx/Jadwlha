"use client";
import axios from "axios";
import { FieldValues, useForm, FieldErrors } from 'react-hook-form';
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image';
import logo from "../../public/logo-jadw.png";

import { useRouter } from "next/navigation";
import { Register, signup } from "@/types/Types";
import {zodResolver} from "@hookform/resolvers/zod"

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Register>({
    resolver: zodResolver(signup),
  });

  

 

  const onSubmit = async(data: Register) => {
    await axios.post('/api/register', data)


    reset();
  };


  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5 bg-black-100">
      <div className="bg-white text-black-500 overflow-hidden w-[60vw] max-sm:w-full">
        <div className="md:flex w-full">
          <div className="md:block w-[60vw] bg-[#9685CF] py-10 px-10 max-sm:w-full max-sm:py-1">
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="firstname" className="text-xs font-semibold px-1">
                    الأسم الأول
                  </label>
                  <input
                    {...register('firstname', {
                      required: 'فضلا قم بادخال الاسم الاول',
                      minLength: {
                        value: 1,
                        message: 'الرجاء قم بادخال اسم صالح',
                      },
                    })}
                    type="text"
                    name="firstname"
                    className={`w-full pl-4 pr-3 py-2 rounded-lg border-2 ${
                      errors.firstname ? 'border-red-500' : 'border-black-200'
                    } outline-none focus:border-[#FFA842]`}
                    placeholder="Ali"
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="lastname" className="text-xs font-semibold px-1">
                    الأسم الاخير
                  </label>
                  <input
                    {...register('lastname', {
                      required: 'فضلا قم بادخال الاسم الاخير',
                      minLength: {
                        value: 1,
                        message: 'الرجاء قم بادخال اسم صالح',
                      },
                    })}
                    type="text"
                    name="lastname"
                    className={`w-full pl-4 pr-3 py-2 rounded-lg border-2 ${
                      errors.lastname ? 'border-red-500' : 'border-black-200'
                    } outline-none focus:border-[#FFA842]`}
                    placeholder="Hakami"
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="email" className="text-xs font-semibold px-1">
                    الإيميل
                  </label>
                  <input
                    {...register('email', {
                      required: 'قم بادخال ايميل صالح',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'قم بادخال ايميل صالح',
                      },
                    })}
                    type="email"
                    name="email"
                    className={`w-full pl-4 pr-3 py-2 rounded-lg border-2 ${
                      errors.email ? 'border-red-500' : 'border-black-200'
                    } outline-none focus:border-[#FFA842]`}
                    placeholder="ali@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="password" className="text-xs font-semibold px-1">
                    كلمة المرور
                  </label>
                  <input
                    {...register('password', {
                      required: 'كلمة المرور مطلوبه',
                      minLength: {
                        value: 6,
                        message: 'كلمة المرور يجب الا تقل عن ستة خانات',
                      },
                    })}
                    type="password"
                    name="password"
                    className={`w-full pl-4 pr-3 py-2 rounded-lg border-2 ${
                      errors.password ? 'border-red-500' : 'border-black-200'
                    } outline-none focus:border-[#FFA842]`}
                    placeholder="************"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Phone field is commented out */}
              {/* 
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="phone" className="text-xs font-semibold px-1">
                    رقم الهاتف
                  </label>
                  <input
                    {...register('phone')}
                    type="phone"
                    name="phone"
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                    placeholder="123-456-7890"
                  />
                </div>
              </div>
              */}
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="block w-full max-w-xs mx-auto bg-[#9685CF] hover:bg-[#FFA842] focus:bg-[#FFA842] text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    تسجيل
                  </button>
                  <p className="text-center p-3 text-black">
                    لديك حساب؟{' '}
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

      {/* {showModal && (
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
                className={`w-16 h-16 mx-auto ${
                  isError ? 'text-red-500' : 'text-green-500'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isError ? (
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
            <p className={`mb-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
              {modalMessage}
            </p>
            <button
              onClick={closeModal}
              className="bg-[#9685CF] hover:bg-[#FFA842] text-white font-semibold px-4 py-2 rounded"
            >
              إغلاق
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Signup;
