'use client';

import React, { useContext } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { Button } from '../ui/button';
import { MessageCircleCode } from 'lucide-react';
import WorkerspaceHistory from './WorkspaceHistory';
import Link from 'next/link';
import { CircleArrowLeft } from 'lucide-react';
import { SidebarStateContext } from '@/context/sidebarState.context';
import SideBarFooter from './SideBarFooter';

export function AppSideBar() {
  const { sidebarState, setSidebarState } = useContext(SidebarStateContext);
  return (
    <Sidebar>
      <SidebarHeader className="p-5 flex flex-row justify-between">
        <Link href="/" className="cursor-pointer">
          <Image src={'/OneClick.png'} alt="Logo" width={38} height={38} />
        </Link>
        <CircleArrowLeft
          onClick={() => setSidebarState(!sidebarState)}
          className="mt-1 cursor-pointer"
        />
      </SidebarHeader>
      <SidebarHeader>
        <Link
          href="/"
          onClick={() => setSidebarState(!sidebarState)}
          className="cursor-pointer w-full px-4"
        >
          <Button className="bg-gray-400 w-full">
            <MessageCircleCode /> Start New Chat
          </Button>
        </Link>
        <div className="py-1"></div>
      </SidebarHeader>
      <SidebarContent className="p-5">
        <SidebarGroup>
          <WorkerspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
