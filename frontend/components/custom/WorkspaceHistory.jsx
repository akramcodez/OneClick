'use client';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserDetailContext } from '@/context/user.detail.context';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { useSidebar } from '../ui/sidebar';

const WorkspaceHistory = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceList, setWorkspaceList] = useState();

  useEffect(() => {
    userDetail && GetAllWorkspaces();
  }, [userDetail]);

  const GetAllWorkspaces = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspaces, {
      userId: userDetail?._id,
    });
    setWorkspaceList(result);
    console.log('All Workspaces:', result);
  };
  return (
    <div>
      <h2 className="font-medium text-md">Chat History</h2>
      <div>
        {workspaceList &&
          workspaceList?.map((workspace, index) => (
            <Link href={`/workspace/${workspace?._id}`} key={index}>
              <div className="p-2 bg-[#262525] border rounded-2xl flex items-center justify-center mt-3 hover:bg-[#424141] cursor-pointer">
                <h2 className="text-sm text-gray-400 leading-relaxed">
                  {workspace?.message[0].content}
                </h2>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default WorkspaceHistory;
