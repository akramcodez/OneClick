import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown, Cog, Download, Rocket } from 'lucide-react';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header 
      className={`h-12 flex items-center justify-between px-4 border-b ${
        theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center">
        <div className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          bolt
        </div>
        
        <div className="mx-4 h-6 border-r border-gray-300"></div>
        
        <div className="flex items-center">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Bolt.new Clone
          </span>
          <button className={`ml-1 p-1 rounded-sm ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <ChevronDown size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center">
        <button 
          className={`flex items-center px-3 py-1.5 rounded text-sm mr-2 transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Cog size={16} className="mr-1.5" />
          <span>Integrations</span>
          <ChevronDown size={16} className="ml-1" />
        </button>
        
        <button 
          className={`flex items-center px-3 py-1.5 rounded text-sm mr-2 transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Download size={16} className="mr-1.5" />
          <span>Export</span>
          <ChevronDown size={16} className="ml-1" />
        </button>
        
        <button 
          className="flex items-center px-3 py-1.5 rounded text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Rocket size={16} className="mr-1.5" />
          <span>Deploy</span>
        </button>
      </div>
    </header>
  );
};

export default Header;