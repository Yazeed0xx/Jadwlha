import Link from 'next/link'
import React from 'react'
import img from "../../public/landingggg.png"
import Image from 'next/image'

function Landing() {
  return (
    <div className="w-full flex bg-[#9685CF] h-auto justify-center items-center md:h-full py-10 md:py-0">
    <div className="w-full flex bg-[#9685CF] h-auto justify-center items-center md:h-full py-10 md:py-0 max-sm:w-full">
      <div className="w-full max-w-7xl md:h-full px-4 md:px-0">
        <div className="flex flex-col md:h-full md:flex-row-reverse">
          <div className="mr-14 md:w-1/2 flex justify-center md:h-full md:mb-0 max-sm:items-center max-sm:ml-10">
            <Image src={img} className="h-auto pb-4 w-full md:w-auto md:h-full" alt='logo' />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center text-center md:text-right">
            <h1 className="text-3xl lIN mt-1 md:text-5xl font-bold text-white">
              نظم مشاويرك بفعالية مع<strong className="text-3xl gd mt-9 md:text-5xl text-[#FFA842]"> جّدولها</strong>
            </h1>
            <p className="mt-5 text-white font-bold Par text-lg md:text-xl">
              هل تعاني من صعوبة تنظيم مشاويرك؟ هل تجد نفسك تهدر الكثير من الوقت في التنقل بين الأماكن المختلفة؟ لدينا الحل الأمثل لك.
            </p>
            <Link href="/schedulepage">
              <button className="mt-5 btn bg-[#FFA842] text-white font-bold px-4 py-2 md:px-6 md:py-2 hover:bg-[#E6D7FA] transition duration-300 md:text-base max-sm:self-center">
                ابدأ الان
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>  )
}

export default Landing