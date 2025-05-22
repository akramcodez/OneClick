'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import axios from 'axios';

import { api } from '@/convex/_generated/api';
import { MessagesContext } from '@/context/messages.context';
import Prompt from '@/data/Prompt';
import { ArrowRight, Loader2Icon } from 'lucide-react';
import { UserDetailContext } from '@/context/user.detail.context';

const ChatView = () => {
  const { id } = useParams();
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState('');
  const isLoading = useRef(false);
  const { userDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  // Fetch workspace messages
  const result = useQuery(api.workspace.GetWorkspace, { workspaceId: id });

  useEffect(() => {
    if (result && Array.isArray(result.message)) {
      setMessages(result.message);
    } else {
      setMessages([]);
    }
  }, [result, setMessages]);

  useEffect(() => {
    if (!Array.isArray(messages)) return;

    const last = messages.at(-1);
    const secondLast = messages.at(-2);

    if (
      last?.role === 'user' &&
      secondLast?.role !== 'assistant' &&
      !isLoading.current
    ) {
      isLoading.current = true;
      handleAiResponse(messages).finally(() => {
        isLoading.current = false;
      });
    }
  }, [messages]);

  const handleAiResponse = async (messagesArr) => {
    const prompt = JSON.stringify(messagesArr) + Prompt.CHAT_PROMPT;
    setLoading(true);
    const response = await axios.post('/api/ai-cha', { prompt });
    setMessages([
      ...messagesArr,
      { role: 'assistant', content: response.data.message },
    ]);
    setLoading(false);
  };

  const onGenerate = (input) => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setUserInput('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col h-auto md:h-[90vh]">
      {/* Messages container - scrollable */}
      <div className="flex-1 overflow-y-auto space-y-4">
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
              <p>{msg.content}</p>
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
      <div className="mt-6 rounded-xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-border bg-[#141414] md:sticky md:bottom-0 md:z-50">
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
  );
};

export default ChatView;
