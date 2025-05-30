'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import axios from 'axios';

import { api } from '@/convex/_generated/api';
import { MessagesContext } from '@/context/messages.context';
import Prompt from '@/data/Prompt';
import { ArrowRight, Loader2Icon } from 'lucide-react';
import { UserDetailContext } from '@/context/user.detail.context';
import ReactMarkdown from 'react-markdown';
import { Menu } from 'lucide-react';
import { SidebarStateContext } from '@/context/sidebarState.context';
import { toast } from 'sonner';

export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

const ChatView = () => {
  const { id } = useParams();
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState('');
  const isLoading = useRef(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { sidebarState, setSidebarState } = useContext(SidebarStateContext);
  const updateToken = useMutation(api.users.UpdateToken);

  const result = useQuery(api.workspace.GetWorkspace, { workspaceId: id });

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

  useEffect(() => {
    if (result && Array.isArray(result.message)) {
      setMessages(result.message);
    } else {
      setMessages([]);
    }
  }, [result, setMessages]);

  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const last = messagesRef.current[messagesRef.current.length - 1];
    const secondLast = messagesRef.current[messagesRef.current.length - 2];

    if (
      last?.role === 'user' &&
      secondLast?.role !== 'OnClick' &&
      !isLoading.current
    ) {
      isLoading.current = true;
      handleAiResponse(messagesRef.current).finally(() => {
        isLoading.current = false;
      });
    }
  }, [messages]);

  const handleAiResponse = async (messagesArr) => {
    const prompt = JSON.stringify(messagesArr) + Prompt.CHAT_PROMPT;
    setLoading(true);
    isLoading.current = true;

    const response = await axios.post('/api/ai-chat', { prompt });
    const AiResponse = { role: 'OnClick', content: response.data.message };
    setMessages((prev) => [...prev, AiResponse]);

    const currentToken = Number(userDetail?.token) || 0;
    const cost = Number(countToken(JSON.stringify(AiResponse)));
    const newTokenBalance = currentToken - cost;

    setUserDetail((prev) => ({
      ...prev,
      token: newTokenBalance,
    }));

    await updateToken({
      userId: userDetail._id,
      token: newTokenBalance,
    });

    await UpdateMessages({
      messages: [...messagesArr, AiResponse],
      workspaceId: id,
    });
    setLoading(false);
    isLoading.current = false;
  };

  const onGenerate = async (input) => {
    if (!input.trim()) return;

    if (userDetail?.token < 10) {
      toast('You dont have enough token!');
      return;
    }

    const newMessages = [...messages, { role: 'user', content: input }];

    setMessages(newMessages);
    await UpdateMessages({
      messages: newMessages,
      workspaceId: id,
    });

    setUserInput('');
    handleAiResponse(newMessages);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col h-auto md:h-[90vh]">
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
                       bg-black text-white text-xs rounded-md py-1 px-3"
          >
            Open Sidebar
          </div>
        </div>
      )}

      {/* Messages container - scrollable */}
      <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide">
        {Array.isArray(messages) &&
          messages.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-400 text-black'
              }`}
            >
              <strong>
                {msg.role === 'user'
                  ? `${userDetail?.name || 'User'}`
                  : 'OneClick'}
                :
              </strong>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
        {loading && (
          <div className="flex gap-2 mx-2">
            <Loader2Icon className="animate-spin" />
            <p>Loading...</p>
          </div>
        )}
      </div>

      {/* Sticky input container */}
      <div>
        <div className="mt-6 rounded-xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-border bg-[#141414] md:sticky md:bottom-0 md:z-10">
          <div className="rounded-xl bg-[#141414] p-5">
            <div className="flex gap-2">
              <textarea
                placeholder="Type your message..."
                className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-white"
                onChange={(e) => setUserInput(e.target.value)}
                value={userInput}
              />
              {userInput && (
                <ArrowRight
                  onClick={() => onGenerate(userInput)}
                  className="bg-blue-500 p-2 h-9 w-11 rounded-md cursor-pointer hover:bg-blue-600 text-white"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
