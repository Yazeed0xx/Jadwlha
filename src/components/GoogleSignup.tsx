import { signIn } from 'next-auth/react';
import React from 'react';

function GoogleSignup() {
  return (
    <div>
      <h1>Google Signup</h1>
      <div>
      <button onClick={() => signIn('google', { callbackUrl: '/' })}>
          Login with Google
        </button>      </div>
    </div>
  );
}

export default GoogleSignup;
