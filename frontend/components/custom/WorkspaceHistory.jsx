'use client';
import React, { useContext } from 'react';
import { UserDetailContext } from '@/context/user.detail.context';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';

const WorkspaceHistory = () => {
  const { userDetail } = useContext(UserDetailContext);

  const workspaceList = useQuery(api.workspace.GetAllWorkspaces, {
    userId: userDetail?._id,
  });

  if (!userDetail) {
    return <p>Please sign in to see your chat history.</p>;
  }

  return (
    <div>
      <h2 className="font-medium text-md">Chat History</h2>
      <div>
        {workspaceList?.length > 0 ? (
          workspaceList.map((workspace, index) => (
            <Link href={`/workspace/${workspace._id}`} key={index}>
              <div className="p-2 bg-[#262525] border rounded-2xl flex items-center justify-center mt-3 hover:bg-[#424141] cursor-pointer">
                <h2 className="text-sm text-gray-400 leading-relaxed">
                  {workspace?.message?.[0]?.content || 'No messages yet'}
                </h2>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 mt-3">No chat history found.</p>
        )}
      </div>
    </div>
  );
};

export default WorkspaceHistory;
