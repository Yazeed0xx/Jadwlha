import React from 'react'
import { signOut } from 'next-auth/react'

export default function Logout() {
  return (
    <div>
    <button onClick={() => signOut({ callbackUrl: '/' })}>
      Logout
    </button>
  </div>  )
}
