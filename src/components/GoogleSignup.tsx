import { signIn } from 'next-auth/react';
import React from 'react';
import { FcGoogle } from "react-icons/fc";

function  GoogleSignup() {

  return (
    <div>
      <div className='flex justify-center '>
      <button onClick={() => signIn('google', { callbackUrl: '/' })}>
        <FcGoogle size={50}/>

        </button>      </div>
    </div>
  );
}

export default GoogleSignup;
