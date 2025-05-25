'use client';

import PricingModel from '@/components/custom/PricingModel';
import { UserDetailContext } from '@/context/user.detail.context';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import React, { useContext, useEffect } from 'react';
import { SidebarStateContext } from '@/context/sidebarState.context';
import { Menu } from 'lucide-react';

const PricingPage = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { sidebarState, setSidebarState } = useContext(SidebarStateContext);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        if (window.innerWidth < 768) {
          setSidebarState(true);
        }
      };

      checkScreenSize();

      window.addEventListener('resize', checkScreenSize);

      return () => {
        window.removeEventListener('resize', checkScreenSize);
      };
    }
  }, [setSidebarState]);

  return (
    <div className="mt-5 flex flex-col items-center justify-center p-10 md:px-30 lg:px-40 overflow-auto">
      {userDetail && (
        <div
          className={`group w-fit transition-opacity duration-300 ${
            sidebarState ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Menu
            onClick={() => setSidebarState(true)}
            className="rounded-full absolute top-18 left-4 w-7 h-7 cursor-pointer opacity-60 z-200"
          />
          <div
            className="absolute top-19 left-12 opacity-0 group-hover:opacity-50 z-200
                 bg-gray-800 text-white text-xs rounded-md py-1 px-3"
          >
            Open Sidebar
          </div>
        </div>
      )}
      <h2 className="font-bold text-3xl">Subscriptions</h2>
      <p className="text-gray-400 max-w-xl text-center mt-2">
        {Lookup.PRICING_DESC}
      </p>
      <div
        className="p-3 px-4 border rounded-xl mt-7 w-full flex justify-between items-center"
        style={{
          backgroundColor: Colors.CHAT_BACKGROUND,
        }}
      >
        <h2 className="text-lg m-1">
          <span className="font-bold m-1">{userDetail?.token}</span>
          <span className="hidden sm:inline">← Token Left</span>
        </h2>
        <div className="flex flex-col items-end">
          <h2 className="font-medium">Needmore token?</h2>
          <p className="hidden sm:inline">Upgrade your plan below</p>
        </div>
      </div>
      <PricingModel />
    </div>
  );
};

export default PricingPage;
