import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/user.detail.context';
import { Download, Rocket } from 'lucide-react';
import LoginPage from './LoginPage';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { ActionContext } from '@/context/ActionContext';

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDailog, setOpenDailog] = useState(false);
  const { action, setAction } = useContext(ActionContext);

  const onActionBtn = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  return (
    <div className="sticky top-0 bg-black p-4 flex justify-between items-center">
      <a href="/">
        {' '}
        <Image src={'/OneClick.png'} alt="Logo" width={30} height={30} />
      </a>
      <div className="flex gap-3">
        {!userDetail?.name && (
          <div className="flex gap-5">
            <Button
              variant="ghost"
              className="h-[30px] cursor-pointer"
              onClick={() => setOpenDailog(!openDailog)}
            >
              Sign In
            </Button>
            <Button
              className="text-white h-[30px] cursor-pointer"
              onClick={() => setOpenDailog(!openDailog)}
              style={{
                backgroundColor: Colors.BLUE,
              }}
            >
              Get Started
            </Button>
          </div>
        )}
        {userDetail?.name && (
          <div className="flex gap-5">
            <Button
              variant="ghost"
              className="h-[30px] flex gap-2 cursor-pointer"
              onClick={() => onActionBtn('export')}
            >
              <Download />
              Export
            </Button>
            <Button
              className="text-white h-[30px] flex gap-2 cursor-pointer"
              style={{
                backgroundColor: Colors.BLUE,
              }}
              onClick={() => onActionBtn('deploy')}
            >
              <Rocket /> Deploy
            </Button>
          </div>
        )}
        <Link href="https://github.com/akramcodez/OneClick">
          <Button className="h-[30px] bg-gray-900 hover:bg-gray-700 text-white cursor-pointer">
            <Star className="text-[#fffb00] text-2xl" />
            Give It Star
          </Button>
        </Link>
      </div>
      <LoginPage
        openDailog={openDailog}
        closeDailog={(v) => setOpenDailog(v)}
      />
    </div>
  );
};

export default Header;
