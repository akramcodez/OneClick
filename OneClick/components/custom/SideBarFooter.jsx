'use client';
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { SidebarStateContext } from '@/context/sidebarState.context';
import { toast } from 'sonner';
import { SignoutContext } from '@/context/SignoutContext';
import { UserDetailContext } from '@/context/user.detail.context';

const SideBarFooter = () => {
  const { sidebarState, setSidebarState } = useContext(SidebarStateContext);
  const { setSignout } = useContext(SignoutContext);
  const { setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const options = [
    {
      name: 'Settings',
      icon: Settings,
      path: null, // Will show toast
    },
    {
      name: 'Help',
      icon: HelpCircle,
      path: '/help',
    },
    {
      name: 'My Subscription',
      icon: Wallet,
      path: '/pricing',
    },
    {
      name: 'Sign Out',
      icon: LogOut,
      path: '/', // After logout, redirect to home
    },
  ];

  const handleClick = (option) => {
    if (option.name === 'Sign Out') {
      localStorage.removeItem('user');
      setUserDetail(null);
      setSignout(false);
      toast.success('Logged out successfully');
      router.push('/');
    } else if (option.name === 'Settings') {
      toast.warning('Settings not available yet');
    } else if (option.path) {
      router.push(option.path);
    }

    setSidebarState(false);
  };

  return (
    <div className="p-4 mb-5">
      {options.map((option, index) => (
        <Button
          onClick={() => handleClick(option)}
          variant="ghost"
          className="w-full m-0.5 flex justify-start gap-2"
          key={index}
        >
          <option.icon className="mr-2 h-5 w-5" />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
