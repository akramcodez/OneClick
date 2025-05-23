'use client';

import React, { useEffect, useState } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';
import Lookup from '@/data/Lookup';
import { MessagesContext } from '@/context/messages.context';
import axios from 'axios';
import { useContext } from 'react';
import Prompt from '@/data/Prompt';

const CodeView = () => {
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        generateCode(lastMessage.content);
      }
    }
  }, [messages]);

  const generateCode = async (prompt) => {
    const PROMPT = `${prompt} ${Prompt.CODE_GEN_PROMPT}`;
    const response = await axios.post('/api/gen-ai-code', { prompt: PROMPT });

    const code = response.data;
    const mergeFiles = { ...Lookup.DEFAULT_FILE, ...code?.files };
    setFiles(mergeFiles);

    console.log('Generated code:', code);
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
          {activeTab === 'code' ? (
            <>
              <SandpackFileExplorer style={{ height: '78vh' }} />
              <SandpackCodeEditor style={{ height: '78vh', flex: 1 }} />
            </>
          ) : (
            <SandpackPreview
              style={{ height: '78vh', width: '100%' }}
              showNavigator={true}
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeView;
