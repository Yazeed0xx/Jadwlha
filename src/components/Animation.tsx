"use client"
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


function Animation() {
 
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white py-10">
         <div className="mb-4">
         <h1 className="font-bold text-3xl text-center p-10 md:text-4xl lg:text-5xl font-heading text-gray-900">
          كيف نستخدم <strong className="text-[#FFA842]">جّدولها</strong> ؟
         </h1>
         </div>
      <div className="relative w-full flex justify-center items-center">
      
        <div className="relative w-[90%] bg--500 z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-sm:">
          <div className="step z-50 bg-white border-4 border-purple-400 card p-4 rounded-badge flex flex-col items-center w-96 h-40">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex justify-center rounded-full w-[30px] mb-4">
              <p className="text-white text-2xl">1</p>
            </div>
            <p className="text-center font-bold">ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع. </p>
          </div>

          <div className="step z-50 bg-white border-4 border-purple-400 mt-32 card p-4 rounded-badge flex flex-col items-center w-96 h-40 max-sm:mt-2">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex justify-center rounded-full w-[30px] mb-4">
              <p className="text-white text-2xl">2</p>
            </div>
            <p className="text-center font-bold">ادخل مكان عملك ومنزلك</p>
          </div>

          <div className="step z-50 bg-white border-4 border-purple-400 card p-4 rounded-badge flex flex-col items-center w-96 h-40 max-sm:mt-2">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex justify-center rounded-full w-[30px] mb-4">
              <p className="text-white text-2xl">3</p>
            </div>
            <p className="text-center font-bold">حدد الأوقات التي تكون فيها مشغولًا لتجنب جدولة أي مشوار خلالها. </p>
          </div>
          <div className="step z-50 bg-white border-4 border-purple-400 mt-52 card p-4 rounded-badge flex flex-col items-center w-96 h-40 max-sm:mt-2">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex justify-center rounded-full w-[30px] mb-4">
              <p className="text-white text-2xl">4</p>
            </div>
            <p className="text-center font-bold text-xl">سنقوم بتحليل جميع البيانات المدخلة لإنشاء جدول زمني مثالي  </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Animation;