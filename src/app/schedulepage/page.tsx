'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';

const Google = dynamic(() => import('../../components/Google'), { ssr: false });


function schedule() {
  
  return (
    <>    
    <div>
    {/* <UserForm onSubmit={handleFormSubmit} /> */}
    </div>
    <div><Google /></div>
</>
  )
}

export default schedule