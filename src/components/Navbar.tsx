"use client"
import React, { useState, useEffect } from "react";
import logo from "../../public/logo-jadw.png"
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Logout from "./Logout";
import {auth} from "auth";


function Navbar() {
  const {data: seesion}=  useSession()
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
  }, []);

 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full">
      <nav className="bg-[#9685CF] h-[10vh]">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center mr-2 hover:text-gray-300">
            <Image src={logo} className="w-auto mr-4 h-[15vh] max-sm:h-[10vh]" alt="Logo" />
          </Link>
          <div className=" hidden md:flex items-center gap-4">
            {seesion ? (
              <> <button
              className="py-2 px-3 ml-3  text-2xl bg-[#FFA842] text-white rounded-lg transition duration-300"
            >
        <Logout/>
        </button>
        <p>{seesion.user?.name}</p>
        
        </>
             

          
            ) : (
              <>
                <Link
                  href="/login"
                  className="py-2 px-3 text-2xl border border-[#FFA842] text-white hover:text-[#9685CF] rounded-lg transition duration-300"
                >
                  تسجيل دخول
                </Link>
                <Link
                  href="/register"
                  className="py-2 px-3 ml-3 text-2xl bg-[#FFA842] text-white rounded-lg transition duration-300"
                >
                  تسجيل جديد
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button" onClick={toggleMenu}>
              <svg
                className="w-6 h-6 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${menuOpen ? "block" : "hidden"} md:hidden bg-white`}>
          {seesion ? (
 <button
 className="py-2 px-3 ml-3  text-2xl bg-[#FFA842] text-white rounded-lg transition duration-300"
>
<Logout/>
</button>          ) : (
            <>
              <Link
                href="/login"
                className="block py-2 px-4 text-black hover:bg-gray-300 border border-[#9685CF] rounded"
              >
                تسجيل دخول
              </Link>
              <Link
                href="/register"
                className="block py-2 px-4 text-white bg-[#9685CF] hover:bg-[#7d6eb0] rounded"
              >
                  تسجيل جديد
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
