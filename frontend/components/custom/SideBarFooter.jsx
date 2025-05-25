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
  const { signout, setSignout } = useContext(SignoutContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const router = useRouter();
  const options = [
    {
      name: 'Settings',
      icon: Settings,
      path: '/',
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
      path: '/',
    },
  ];

  const handleClick = (option) => {
    if (option.name === 'Sign Out') {
      localStorage.removeItem('user');
      setUserDetail(null);
      setSignout(false);
      toast('Log out successfully');
      router.push('/');
    } else if (option.name === 'Settings') {
      toast('Settings not available');
    } else {
      router.push(option.path);
    }

    setSidebarState(!sidebarState);
  };

  const checks = (option) => {
    if (option.name === 'Settings') {
      toast('Settings not available');
    }
    if (option.name === 'Sign Out' && userDetail && signout) {
      setUserDetail(null);
      setSignout(false);
      toast('Log out successfully');
    }
  };

  return (
    <div className="p-4 mb-5">
      {options.map((option, index) => (
        <Button
          onClick={() => handleClick(option)}
          variant="ghost"
          className="w-full m-0.5 flex justify-start"
          key={index}
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
