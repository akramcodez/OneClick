import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { SidebarStateContext } from '@/context/sidebarState.context';

const SideBarFooter = () => {
  const { sidebarState, setSidebarState } = useContext(SidebarStateContext);
  const router = useRouter();
  const options = [
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings',
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
      path: '/signout',
    },
  ];

  const onOptionClick = (option) => {
    router.push(option.path);
  };
  return (
    <div className="p-4 mb-5">
      {options.map((option, index) => (
        <Button
          onClick={() => {
            onOptionClick(option);
            setSidebarState(!sidebarState);
          }}
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
