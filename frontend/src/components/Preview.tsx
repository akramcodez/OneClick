import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { RefreshCw } from 'lucide-react';

const Preview: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="h-full flex flex-col">
      {/* Preview bar */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="flex items-center">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Preview
          </span>
        </div>
        
        <div className="flex items-center">
          <button className={`p-1.5 rounded ${
            theme === 'dark' ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'
          }`}>
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
      
      {/* Preview content */}
      <div className="flex-1 overflow-hidden">
        <iframe
          title="Preview"
          src="about:blank"
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts"
        />
        
        {/* Placeholder content (would be removed in a real implementation) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`text-center p-6 rounded-lg border-2 border-dashed max-w-md ${
            theme === 'dark' 
              ? 'border-gray-700 bg-gray-800/50 text-gray-300' 
              : 'border-gray-300 bg-gray-50/50 text-gray-700'
          }`}>
            <h3 className="text-lg font-medium mb-2">Preview Not Available</h3>
            <p className="text-sm">
              In a real implementation, this would render the live preview of your application.
              For this demo, we're showing this placeholder instead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;