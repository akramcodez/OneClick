import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Editor from './Editor';
import Preview from './Preview';
import { useTheme } from '../context/ThemeContext';
import { Terminal, MessageSquare } from 'lucide-react';

const Layout: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [showTerminal, setShowTerminal] = useState(true);
  const [showChat, setShowChat] = useState(false);
  
  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`w-64 border-r ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} overflow-auto`}>
          <Sidebar />
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className={`flex ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border-b`}>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'code' 
                  ? theme === 'dark' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-blue-600 text-blue-700' 
                  : theme === 'dark'
                    ? 'border-transparent text-gray-400 hover:text-gray-300'
                    : 'border-transparent text-gray-600 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'preview' 
                  ? theme === 'dark' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-blue-600 text-blue-700' 
                  : theme === 'dark'
                    ? 'border-transparent text-gray-400 hover:text-gray-300'
                    : 'border-transparent text-gray-600 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
          </div>
          
          {/* Content area */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'code' ? <Editor /> : <Preview />}
          </div>
          
          {/* Terminal/Chat area */}
          <div className={`border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'}`}>
            <div className="flex items-center px-3 py-1.5">
              <div className="flex">
                <button 
                  className={`p-1.5 rounded mr-1 ${
                    showTerminal 
                      ? theme === 'dark' 
                        ? 'bg-gray-700 text-blue-400' 
                        : 'bg-gray-200 text-blue-700' 
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-600 hover:text-gray-700'
                  }`}
                  onClick={() => setShowTerminal(!showTerminal)}
                >
                  <Terminal size={16} />
                </button>
                <button 
                  className={`p-1.5 rounded ${
                    showChat 
                      ? theme === 'dark' 
                        ? 'bg-gray-700 text-blue-400' 
                        : 'bg-gray-200 text-blue-700' 
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-600 hover:text-gray-700'
                  }`}
                  onClick={() => setShowChat(!showChat)}
                >
                  <MessageSquare size={16} />
                </button>
              </div>
              <div className="ml-2 text-xs font-mono">
                {theme === 'dark' ? (
                  <span className="text-gray-400">press <span className="text-white">u + enter</span> to show server url</span>
                ) : (
                  <span className="text-gray-600">press <span className="text-black">u + enter</span> to show server url</span>
                )}
              </div>
            </div>
            
            {showTerminal && (
              <div className={`p-3 font-mono text-xs ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} h-48 overflow-auto`}>
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  <div>press <span className={theme === 'dark' ? 'text-white' : 'text-black'}>u + enter</span> to show server url</div>
                  <div>press <span className={theme === 'dark' ? 'text-white' : 'text-black'}>o + enter</span> to open in browser</div>
                  <div>press <span className={theme === 'dark' ? 'text-white' : 'text-black'}>c + enter</span> to clear console</div>
                  <div>press <span className={theme === 'dark' ? 'text-white' : 'text-black'}>q + enter</span> to quit</div>
                </div>
              </div>
            )}
            
            {showChat && (
              <div className={`p-3 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} h-48 overflow-auto`}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto mb-2">
                    <div className={`p-2 rounded-lg mb-2 max-w-[80%] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      How can I help you today?
                    </div>
                  </div>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="How can Bolt help you today?"
                      className={`flex-1 px-3 py-2 rounded-md text-sm ${
                        theme === 'dark' 
                          ? 'bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500' 
                          : 'bg-gray-100 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600'
                      }`}
                    />
                    <button className={`ml-2 px-3 py-2 rounded-md bg-blue-600 text-white text-sm`}>
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;