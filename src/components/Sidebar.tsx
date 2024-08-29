"use clinet"
import Link from "next/link";
import { useEffect, useState } from "react";


const Sidebar = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

 

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="h-screen w-32 bg-white transition-transform duration-300 ease-in-out"
    >
      <div className="flex flex-col h-full p-4">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-8">
          <Link href="/">
            {/* <img src={logo} alt="brand" className="w-20 h-20" /> */}
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-col items-center gap-4">
          <div
            role="button"
            onClick={onMenuClick}
            className="flex flex-col justify-center items-center w-full p-2 rounded-lg hover:bg-[#9685cf] text-white transition-transform hover:bg-opacity-80 active:bg-opacity-60"
          >
            <svg
              width="48px"
              height="48px"
              viewBox="0 0 1024 1024"
              className="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
            >
              <path
                d="M224.3 251.4h556.2c14.3 0 25.9 11.6 25.9 25.9v501.8c0 14.3-11.6 25.9-25.9 25.9H224.3c-14.3 0-25.9-11.6-25.9-25.9V277.3c0-14.3 11.6-25.9 25.9-25.9z"
                fill="#FFFFFF"
              />
              <path
                d="M780.5 830.8H224.3c-28.5 0-51.7-23.2-51.7-51.7V277.3c0-28.5 23.2-51.7 51.7-51.7h556.2c28.5 0 51.7 23.2 51.7 51.7v501.8c0 28.5-23.2 51.7-51.7 51.7zM224.3 277.3v501.8h556.2V277.3H224.3z"
                fill="#333333"
              />
              <path d="M224.3 277h568.5v152.1H224.3z" fill="#9685CF" />
              <path
                d="M198.4 399.5h633.8v51.8H198.4zM495.6 638.8l101-101c11.8-11.8 30.9-11.8 42.7 0l0.1 0.1c11.8 11.8 11.8 30.9 0 42.7L518.7 701.2c-6.3 6.3-14.8 9.3-23.1 8.8-8.3 0.5-16.7-2.5-23.1-8.8l-76-76c-11.8-11.8-11.8-30.9 0-42.7l0.1-0.1c11.8-11.8 30.9-11.8 42.7 0l56.3 56.4z"
                fill="#333333"
              />
              <path
                d="M327.7 166.8c14.3 0 25.9 11.6 25.9 25.9v38.8h-51.7v-38.8c0-14.4 11.6-25.9 25.8-25.9zM664.1 166.8c14.3 0 25.9 11.6 25.9 25.9v38.8h-51.7v-38.8c-0.1-14.4 11.5-25.9 25.8-25.9z"
                fill="#333333"
              />
            </svg>
            <p className="text-sm font-semibold mt-2 text-white"></p>
          </div>

          <div
            role="button"
            className="flex flex-col justify-center items-center w-full p-2 rounded-lg transition-transform hover:bg-[#9685cf] hover:bg-opacity-80 hover:text-white"
          >
              <div
                role="button"
                className="flex flex-col justify-center items-center w-full gap-2 p-2 leading-tight "
              >
                <div className="grid gap-2 p-2 place-items-center ">
                  <Link href="/profile">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-[48px] h-[48px]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
