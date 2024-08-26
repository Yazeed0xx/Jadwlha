"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image';
import logo from "../../public/logo-jadw.png"
function Profile() {
    const [showSchedule, setShowSchedule] = useState(false);
    const [schedule, setSchedule] = useState(null);

  return (
    <div className='profile text-right'>
    <div className='contentProfile'>
      <div className='flex justify-center w-[80vw] mr-56 mt-[17vh] max-sm:mr-2 '>
        <div className='sidebar w-[20%] h-[54vh] flex-shrink-0 max-sm:mt-28'>
          <Link href="/">
            <Image src={logo} className="h-48 mr-[4.6vw] max-sm:hidden" alt="Logo"/>
          </Link>
          <ul className='sidebar-menu'>
            <div className='box sidebar-item text-[16px] flex mb-[10px]'>
              <li className='mb-[10px] text-center m-[auto] flex justify-between text-black'>
                <Link href="#" 
                // onClick={handleShowProfileClick}
                
                
                >
                  البيانات الشخصية
                </Link>
              </li>
              <span className='ml-[30px] mt-[-5px] text-gray-800'>
                <i className="fa-regular fa-user"></i>
              </span>
            </div>
            <div className='box sidebar-item text-[16px] flex mb-[10px]' 
            
            // onClick={handleShowScheduleClick} 
            
            >
              <li className='mb-[0px]  text-center m-[auto] flex justify-between text-black'>
                جدولك
              </li>
              <span className='ml-[30px] mt-[-5px] text-gray-800'>
                <i className="fa-solid fa-table"></i>
              </span>
            </div>
            <Link href='/scheduler'>
            <div className='box sidebar-item text-[16px] flex mb-[10px] ' >
              <li className='mb-[3px]  text-center m-[auto] flex justify-between text-black'>
              الخريطة
              </li>
              <span className='ml-[30px] mt-[-5px] text-gray-800'>
                <i className="fa-solid fa-location-pin mt-[-20px]"></i>
              </span>
            </div>
            </Link>
              <div
              
            //   onClick={handleLogout} 
              
              className='box sidebar-item text-[16px] flex mb-[10px]'>
                <li className='mb-[10px]  text-center m-[auto] flex justify-between text-gray-800' onClick={() => localStorage.clear()}>
                  تسجيل خروج
                </li>
                <span className='ml-[30px] mt-[-5px] text-gray-800'>
                 <i className="fa-solid fa-right-from-bracket"></i>
                </span>
              </div>
          </ul>
        </div>
        <div className="form w-[60%] ml-4 flex-grow max-sm:w-full">
          <div className="inputs bg-white p-8 shadow-xl rounded-[4px] h-full max-sm:mr-3 w-full">
            {showSchedule ? (
             <div className="schedule mt-8">
             {schedule && schedule.tasks && schedule.tasks.length > 0 ? (
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
                   {schedule.tasks.map((task, index) => (
                     <tr key={index}>
                       <td>{task.address || 'N/A'}</td>
                       <td>{task.deadline || 'N/A'}</td>
                       <td>{task.bestTime || 'N/A'}</td>
                       <td>{task.bestRoute || 'N/A'}</td>
                       <td>{task.distance || 'N/A'}</td>
                       <td>{task.duration || 'N/A'}</td>
                       <td>{task.day || 'N/A'}</td>
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
                  {/* {getInitials(currentUser.firstName, currentUser.lastName)} */}
                </div>
                <h3 className="mt-4 text-xl font-semibold">
                  {/* {currentUser.firstName} {currentUser.lastName} */}
                </h3>
                <div className="inputs w-full items-start grid grid-cols-2 gap-4 mt-4  max-sm:w-[50vw]">
                  <div className='box max-sm:w-full'>
                    <label htmlFor="firstName" className="block text-gray-600 mb-[5px]">الاسم الأول</label>
                    <input
                      type="text"
                      name="firstName"
                      className="field w-full p-2 border border-gray-300 rounded-[3px]"
                    //   value={currentUser.firstName}
                      readOnly
                    />
                  </div>
                  <div className='box max-sm:w-full' >
                    <label htmlFor="lastName" className="block text-gray-600 mb-[5px]">الاسم الأخير</label>
                    <input
                      type="text"
                      name="lastName"
                      className="field w-full p-2 border border-gray-300 rounded-[3px]"
                    //   value={currentUser.lastName}
                      readOnly
                    />
                  </div>
                  <div className='box max-sm:w-full'>
                    <label htmlFor="email" className="block text-gray-600 mb-[5px]">الإيميل</label>
                    <input
                      type="email"
                      name="email"
                      className="field w-full p-2 border border-gray-300 rounded-[3px]"
                    //   value={currentUser.email}
                      readOnly
                    />
                  </div>
                  <div className='box max-sm:w-full'>
                    <label htmlFor="phone" className="block text-gray-600 mb-[5px]">الهاتف</label>
                    <input
                      type="text"
                      name="phone"
                      className="field w-full p-2 border border-gray-300 rounded-[3px]"
                    //   value={currentUser.phone}
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
      <div className="mobileSidebar max-lg::hidden  max-sm:ml-9">
            <div className="flex justify-between">
            <Link href='/'>
            <span> <i className="hidden fa-solid fa-house "></i></span>
            </Link>
            <span><i className="fa-regular fa-user"></i></span>
            <Link href=''>
            <span><i className="fa-solid fa-table "></i></span>
            </Link>
            <Link href='/scheduler'>
            <span><i className="fa-solid fa-location-pin "></i></span>
            </Link>
            <Link href="/login">
            <span><i className="fa-solid fa-right-from-bracket"></i></span>
            </Link>
            </div>
          </div>
          {/* end mobile */}
  </div>  )
}

export default Profile