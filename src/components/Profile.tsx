"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/logo-jadw.png";

function Profile() {
  const [tasks, setTasks] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/Tasks'); // Adjust this endpoint if needed
        const data = await response.json();
        setTasks(data.tasks || []); // Ensure `tasks` is set
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="profile text-right">
      <div className="contentProfile">
        <div className="flex justify-center w-[80vw] mr-56 mt-[17vh] max-sm:mr-2 ">
          <div className="sidebar w-[20%] h-[54vh] flex-shrink-0 max-sm:mt-28">
            <Link href="/">
              <Image src={logo} className="h-48 mr-[4.6vw] max-sm:hidden" alt="Logo" />
            </Link>
            <ul className="sidebar-menu">
              <div className="box sidebar-item text-[16px] flex mb-[10px]">
                <li className="mb-[10px] text-center m-[auto] flex justify-between text-black">
                  <Link href="#">البيانات الشخصية</Link>
                </li>
                <span className="ml-[30px] mt-[-5px] text-gray-800">
                  <i className="fa-regular fa-user"></i>
                </span>
              </div>
              <div className="box sidebar-item text-[16px] flex mb-[10px]" onClick={() => setShowSchedule(!showSchedule)}>
                <li className="mb-[0px] text-center m-[auto] flex justify-between text-black">
                  جدولك
                </li>
                <span className="ml-[30px] mt-[-5px] text-gray-800">
                  <i className="fa-solid fa-table"></i>
                </span>
              </div>
              <Link href="/schedulepage">
                <div className="box sidebar-item text-[16px] flex mb-[10px]">
                  <li className="mb-[3px] text-center m-[auto] flex justify-between text-black">
                    الخريطة
                  </li>
                  <span className="ml-[30px] mt-[-5px] text-gray-800">
                    <i className="fa-solid fa-location-pin mt-[-20px]"></i>
                  </span>
                </div>
              </Link>
              <div className="box sidebar-item text-[16px] flex mb-[10px]" onClick={() => localStorage.clear()}>
                <li className="mb-[10px] text-center m-[auto] flex justify-between text-gray-800">
                  تسجيل خروج
                </li>
                <span className="ml-[30px] mt-[-5px] text-gray-800">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </span>
              </div>
            </ul>
          </div>

          <div className="form w-[60%] ml-4 flex-grow max-sm:w-full">
            <div className="inputs bg-white p-8 shadow-xl rounded-[4px] h-full max-sm:mr-3 w-full">
              {showSchedule ? (
                <div className="schedule mt-8">
                  {tasks.length > 0 ? (
                    <table className="schedule-table">
                      <thead>
                        <tr>
                          <th>العنوان</th>
                          <th>الموعد النهائي</th>
                          <th>أفضل وقت</th>
                          <th>أفضل مسار</th>
                          <th>المسافة</th>
                          <th>المدة</th>
                          <th>اليوم</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((task, index) => (
                          <tr key={index}>
                            <td>{task.address || "N/A"}</td>
                            <td>{new Date(task.deadline).toLocaleDateString() || "N/A"}</td>
                            <td>{task.routeDetails.bestTime ? new Date(task.routeDetails.bestTime).toLocaleTimeString() : "N/A"}</td>
                            <td>{task.routeDetails.bestRoute || "N/A"}</td>
                            <td>{task.routeDetails.distance || "N/A"}</td>
                            <td>{task.routeDetails.duration || "N/A"}</td>
                            <td>{task.routeDetails.day || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>لا توجد مهام</p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center mb-6">
                  <div className="profile-pic bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center text-3xl text-white">
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                  {/* Display User Info */}
                  </h3>
                  <div className="inputs w-full items-start grid grid-cols-2 gap-4 mt-4 max-sm:w-[50vw]">
                    <div className="box max-sm:w-full">
                      <label htmlFor="firstName" className="block text-gray-600 mb-[5px]">
                        الاسم الأول
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="field w-full p-2 border border-gray-300 rounded-[3px]"
                        readOnly
                      />
                    </div>
                    <div className="box max-sm:w-full">
                      <label htmlFor="lastName" className="block text-gray-600 mb-[5px]">
                        الاسم الأخير
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="field w-full p-2 border border-gray-300 rounded-[3px]"
                        readOnly
                      />
                    </div>
                    <div className="box max-sm:w-full">
                      <label htmlFor="email" className="block text-gray-600 mb-[5px]">
                        الإيميل
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="field w-full p-2 border border-gray-300 rounded-[3px]"
                        readOnly
                      />
                    </div>
                    <div className="box max-sm:w-full">
                      <label htmlFor="phone" className="block text-gray-600 mb-[5px]">
                        الهاتف
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className="field w-full p-2 border border-gray-300 rounded-[3px]"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* start mobile */}
      <div className="mobileSidebar max-lg:hidden max-sm:ml-9">
        <div className="flex justify-between">
          <Link href="/">
            <span>
              <i className="hidden fa-solid fa-house"></i>
            </span>
          </Link>
          <span>
            <i className="fa-regular fa-user"></i>
          </span>
          <Link href="">
            <span>
              <i className="fa-solid fa-table"></i>
            </span>
          </Link>
          <Link href="/schedulepage">
            <span>
              <i className="fa-solid fa-location-pin"></i>
            </span>
          </Link>
          <Link href="/login">
            <span>
              <i className="fa-solid fa-right-from-bracket"></i>
            </span>
          </Link>
        </div>
      </div>
      {/* end mobile */}
    </div>
  );
}

export default Profile;
