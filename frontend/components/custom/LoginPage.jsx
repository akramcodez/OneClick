'use client';
import React, { useContext } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Lookup from '@/data/Lookup';
import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserDetailContext } from '@/context/user.detail.context';
import { v4 as uuid4 } from 'uuid';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const LoginPage = ({ openDailog, closeDailog }) => {
  const { setUserDetail } = useContext(UserDetailContext);
  const createOrGetUser = useMutation(api.users.CreateOrGetUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          },
        );

        const user = userInfo.data;

        const dbUser = await createOrGetUser({
          name: user.name,
          email: user.email,
          picture: user.picture,
          uid: uuid4(),
        });

        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(dbUser));
        }

        setUserDetail(dbUser);

        closeDailog(false);
      } catch (err) {
        console.error('Google login error:', err);
      }
    },
    onError: (errorResponse) => console.log('Login Failed:', errorResponse),
  });

  return (
    <Dialog open={openDailog} onOpenChange={closeDailog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription
            className="flex items-center flex-col justify-center"
            asChild
          >
            <div>
              <h2 className="font-bold text-2xl text-white text-center">
                {Lookup.SIGNIN_HEADING}
              </h2>
              <p className="mt-2 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
              <Button
                onClick={googleLogin}
                className="bg-blue-500 text-white outline-none hover:bg-blue-600 mt-5"
              >
                Sign In With Google
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPage;
