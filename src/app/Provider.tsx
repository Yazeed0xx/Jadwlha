"use client";

import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { QueryClient,QueryClientProvider } from "react-query";



export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
    <QueryClientProvider client={queryClient}>

  <SessionProvider>{children}

  </SessionProvider>
  </QueryClientProvider>
  </>


)
};
