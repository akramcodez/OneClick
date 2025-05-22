import React from 'react';
import ChatView from '@/components/custom/ChatView';
import CodeView from '@/components/custom/CodeView';

export default function Workspace() {
  return (
    <div className="h-screen p-0 m-0 overflow-hidden flex flex-col md:flex-row">
      {/* ChatView */}
      <div
        className="
          flex-shrink-0 
          w-full h-1/2 
          md:h-full md:w-[30%] 
          lg:w-[35%] 
          overflow-auto
        "
      >
        <ChatView />
      </div>

      {/* CodeView */}
      <div
        className="
          flex-grow 
          w-full h-1/2 
          md:h-[90%] md:w-[70%] 
          lg:w-[65%] 
          overflow-auto
          md:overflow-hidden
        "
      >
        <CodeView />
      </div>
    </div>
  );
}
