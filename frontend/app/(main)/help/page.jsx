'use client';

import { SidebarStateContext } from '@/context/sidebarState.context';
import { UserDetailContext } from '@/context/user.detail.context';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Menu } from 'lucide-react';

const HelpPage = () => {
  const { sidebarState, setSidebarState } = useContext(SidebarStateContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

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
    <div>
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
      <div className="flex items-start justify-center min-h-screen bg-black p-6">
        <div className="px-6 py-8 max-w-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-xl text-white mt-18">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            🛠️ Need Help?
          </h2>
          <p className="mb-4 text-base">
            Welcome to the Help Page! Here’s how to get started and make the
            most out of your experience:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Menu icon</strong> (top-left): Click it to open the
              sidebar and access navigation Only available for large screen
              size.
            </li>
            <li>
              Use the sidebar to visit important areas like{' '}
              <span className="font-medium text-blue-400">Dashboard</span>,{' '}
              <span className="font-medium text-blue-400">History</span>, and{' '}
              <span className="font-medium text-blue-400">many more</span>.
            </li>
            <li>
              <strong>Mobile friendly:</strong> Little bit responsive for small
            </li>
            <li>Write prompt and generate code in one click</li>
            <li>Remember: export and deploy only works on workspace</li>
          </ul>
          <div className="mt-6 text-sm border-t border-gray-700 pt-4">
            <p className="mb-2">
              Still need assistance? Reach out to our support team or check out
              the full documentation.
            </p>
            <a
              href="#"
              className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white text-xs transition-colors"
            >
              Visit Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
