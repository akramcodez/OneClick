'use client';

import React, { useEffect, useState } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';
import Lookup from '@/data/Lookup';
import { MessagesContext } from '@/context/messages.context';
import axios from 'axios';
import { useContext } from 'react';
import Prompt from '@/data/Prompt';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import { countToken } from './ChatView';
import { UserDetailContext } from '@/context/user.detail.context';
import SandpackPreviewClient from './SandpackPreviewClient';

const CodeView = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const updateToken = useMutation(api.users.UpdateToken);

  const [loadingWorkspace, setLoadingWorkspace] = useState(true);
  const [loadingGeneration, setLoadingGeneration] = useState(false);

  const result = useQuery(api.workspace.GetWorkspace, { workspaceId: id });

  useEffect(() => {
    if (!result) {
      setLoadingWorkspace(true);
    } else {
      setLoadingWorkspace(false);
      if (result.fileData) {
        const merged = { ...Lookup.DEFAULT_FILE, ...result.fileData };
        setFiles(merged);
      }
    }
  }, [result]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        generateCode(lastMessage.content);
      }
      console.log('Messages:', messages);
    }
  }, [messages]);

  const generateCode = async (prompt) => {
    setLoadingGeneration(true);
    const PROMPT = `${prompt} ${Prompt.CODE_GEN_PROMPT}`;
    const response = await axios.post('/api/gen-ai-code', { prompt: PROMPT });
    const code = response.data;

    const mergeFiles = { ...Lookup.DEFAULT_FILE, ...code?.files };
    setFiles(mergeFiles);

    console.log(code);

    const currentToken = Number(userDetail?.token) || 0;
    const cost = Number(countToken(JSON.stringify(code)));
    const newTokenBalance = currentToken - cost;

    setUserDetail((prev) => ({
      ...prev,
      token: token,
    }));

    await updateToken({
      userId: userDetail._id,
      token: newTokenBalance,
    });

    await UpdateFiles({
      workspaceId: id,
      files: code?.files,
    });
    setLoadingGeneration(false);
  };

  return (
    <div className="p-4">
      <div>
        <div className="bg-[#181818] w-full p-2 border">
          <div className="flex items-center flex-wrap shrink-0 bg-gray-950 p-1 w-[140px] gap-3 justify-center rounded-full">
            <h2
              onClick={() => setActiveTab('code')}
              className={`text-sm cursor-pointer ${
                activeTab === 'code'
                  ? 'text-blue-500 bg-gray-900 p-1 px-2 rounded-full'
                  : 'text-white'
              }`}
            >
              Code
            </h2>
            <h2
              onClick={() => setActiveTab('preview')}
              className={`text-sm cursor-pointer ${
                activeTab === 'preview'
                  ? 'text-blue-500 bg-gray-900 p-1 px-2 rounded-full'
                  : 'text-white'
              }`}
            >
              Preview
            </h2>
          </div>
        </div>
      </div>

      <SandpackProvider
        key={JSON.stringify(files)}
        template="react"
        theme="dark"
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY,
          },
        }}
        files={files}
        options={{
          externalResources: [
            'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
          ],
        }}
      >
        <SandpackLayout>
          {(loadingWorkspace || loadingGeneration) && (
            <div className="p-10 bg-gray-900 opacity-80 absolute top-0 left-0 rounded-lg w-full h-full flex flex-col items-center justify-center z-50">
              <Loader2Icon className="animate-spin h-10 w-10 text-white" />
              <h2 className="text-white mt-4">
                {loadingGeneration
                  ? 'Generating files...'
                  : 'Loading workspace...'}
              </h2>
            </div>
          )}
          {activeTab === 'code' ? (
            <div className="flex flex-col md:flex-row w-full">
              <div className="w-full md:w-1/3" style={{ height: '78vh' }}>
                <SandpackFileExplorer style={{ height: '100%' }} />
              </div>
              <div className="w-full md:w-2/3" style={{ height: '78vh' }}>
                <SandpackCodeEditor style={{ height: '100%', width: '100%' }} />
              </div>
            </div>
          ) : (
            <SandpackPreviewClient />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeView;
