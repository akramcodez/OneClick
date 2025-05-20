import React, { useState } from 'react';
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

const LoginPage = ({ openDailog, closeDailog }) => {
  const [userDetail, setUserDetail] = useState(UserDetailContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
      );

      console.log(userInfo);
      setUserDetail(userInfo?.data);
      closeDailog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={openDailog} onOpenChange={closeDailog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
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
