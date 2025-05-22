import Image from 'next/image';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/user.detail.context';

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="sticky top-0 bg-black p-4 flex justify-between items-center">
      <Image src={'/logo.webp'} alt="Logo" width={30} height={30} />
      {!userDetail?.name && (
        <div className="flex gap-5">
          <Button variant="ghost" className="h-[30px]">
            Sign In
          </Button>
          <Button
            className="text-white h-[30px]"
            style={{
              backgroundColor: Colors.BLUE,
            }}
          >
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
