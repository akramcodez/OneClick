import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/user.detail.context';
import { Download, Rocket } from 'lucide-react';
import LoginPage from './LoginPage';
import Link from 'next/link';
import { Star } from 'lucide-react';

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDailog, setOpenDailog] = useState(false);
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
              className="h-[30px]"
              onClick={() => setOpenDailog(!openDailog)}
            >
              Sign In
            </Button>
            <Button
              className="text-white h-[30px]"
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
            <Button variant="ghost" className="h-[30px] flex gap-2">
              <Download />
              Export
            </Button>
            <Button
              className="text-white h-[30px] flex gap-2"
              style={{
                backgroundColor: Colors.BLUE,
              }}
            >
              <Rocket /> Deploy
            </Button>
          </div>
        )}
        <Link href="https://github.com/akramcodez/OneClick">
          <Button className="h-[30px] bg-gray-900 hover:bg-gray-700 text-white">
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
