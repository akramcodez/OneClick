import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

const SideBarFooter = () => {
  const options = [
    {
      name: 'Settings',
      icon: Settings,
    },
    {
      name: 'Help',
      icon: HelpCircle,
    },
    {
      name: 'My Subscription',
      icon: Wallet,
    },
    {
      name: 'Sign Out',
      icon: LogOut,
    },
  ];
  return (
    <div className="p-4 mb-5">
      {options.map((option, index) => (
        <Button
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
