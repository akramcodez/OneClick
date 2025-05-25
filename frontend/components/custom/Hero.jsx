'use client';
import Lookup from '@/data/Lookup';
import { ArrowRight, Link } from 'lucide-react';
import React, { useState, useContext, useEffect } from 'react';
import { MessagesContext } from '@/context/messages.context';
import { UserDetailContext } from '@/context/user.detail.context';
import LoginPage from './LoginPage';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { SidebarStateContext } from '@/context/sidebarState.context';
import { toast } from 'sonner';

const Hero = () => {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDailog, setOpenDailog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();
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

  const onGenerate = async (input) => {
    if (!userDetail || !userDetail._id) {
      setOpenDailog(true);
      return;
    }
    if (userDetail?.token < 10) {
      toast('You dont have enough token!');
      return;
    }
    const msg = {
      role: 'user',
      content: input,
    };

    setMessages(msg);

    try {
      const workspaceId = await CreateWorkspace({
        user: userDetail._id,
        message: [msg],
      });
      router.push(`/workspace/${workspaceId}`);
    } catch (err) {
      console.error('Failed to create workspace:', err);
    }
  };

  return (
    <div className="flex flex-col items-center mt-36 gap-2 p-4">
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

      <h2 className="font-bold text-4xl text-center">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
      <div className="relative max-w-xl w-full mt-3 rounded-xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-border">
        <div className="rounded-xl bg-[#141414] p-5">
          <div className="flex gap-2">
            <textarea
              placeholder={Lookup.INPUT_PLACEHOLDER}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
            />
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-blue-500 p-2 h-9 w-11 rounded-md cursor-pointer hover:bg-blue-600"
              />
            )}
          </div>
          <div>
            <Link className="h-5 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap max-w-2xl items-center justify-center gap-3 mt-5">
        {Lookup?.SUGGSTIONS.map((suggestions, index) => (
          <h2
            onClick={() => {
              onGenerate(suggestions);
            }}
            className="p-1 px-2 border rounded-full bg-[#141414] cursor-pointer text-xs text-gray-400 hover:bg-gray-500 hover:text-black font-bold"
            key={index}
          >
            {suggestions}
          </h2>
        ))}
      </div>
      <LoginPage
        openDailog={openDailog}
        closeDailog={(v) => setOpenDailog(v)}
      />
    </div>
  );
};

export default Hero;
