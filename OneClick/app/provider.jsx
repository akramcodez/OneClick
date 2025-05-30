'use client';
import React, { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Header from '@/components/custom/Header';
import { MessagesContext } from '@/context/messages.context';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserDetailContext } from '@/context/user.detail.context';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSideBar } from '@/components/custom/AppSideBar';
import { SidebarStateContext } from '@/context/sidebarState.context';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ActionContext } from '@/context/ActionContext';
import { useRouter } from 'next/navigation';
import { SignoutContext } from '@/context/SignoutContext';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

function Provider({ children }) {
  const [messages, setMessages] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [sidebarState, setSidebarState] = useState(false);
  const [action, setAction] = useState();
  const [signout, setSignout] = useState(false);

  const router = useRouter();

  useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.email) {
        setUserDetail(null);
        router.push('/');
        return;
      }
      // Use convex client to call query
      const result = await convex.query(api.users.GetUser, {
        email: user.email,
      });
      setUserDetail(result);
      console.log('result', result);
    }
  };

  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
      >
        <PayPalScriptProvider
          options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
        >
          <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <MessagesContext.Provider value={{ messages, setMessages }}>
              <SidebarStateContext.Provider
                value={{ sidebarState, setSidebarState }}
              >
                <ActionContext.Provider value={{ action, setAction }}>
                  <SignoutContext.Provider value={{ signout, setSignout }}>
                    <NextThemesProvider
                      attribute="class"
                      defaultTheme="dark"
                      enableSystem
                      disableTransitionOnChange
                    >
                      <Header />
                      {children}
                      <SidebarProvider defaultOpen={false} open={sidebarState}>
                        <AppSideBar />
                      </SidebarProvider>
                    </NextThemesProvider>
                  </SignoutContext.Provider>
                </ActionContext.Provider>
              </SidebarStateContext.Provider>
            </MessagesContext.Provider>
          </UserDetailContext.Provider>
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Provider;
