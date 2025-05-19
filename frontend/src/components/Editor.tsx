import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Search, File } from 'lucide-react';

const Editor: React.FC = () => {
  const { theme } = useTheme();
  
  const sampleCode = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bolt.new Clone</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  
  return (
    <div className="h-full flex flex-col">
      {/* File bar */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="flex items-center">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Files
          </span>
          <div className={`ml-4 flex items-center px-2 py-1 rounded ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-white'
          }`}>
            <Search size={14} className={`mr-1.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <input 
              type="text" 
              placeholder="Search"
              className={`bg-transparent text-sm border-none focus:outline-none ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ width: '120px' }}
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <div className={`px-3 py-1 text-xs font-medium border-b-2 ${
            theme === 'dark' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-blue-600 text-blue-700'
          }`}>
            index.html
          </div>
        </div>
      </div>
      
      {/* Editor content */}
      <div className={`flex-1 overflow-auto font-mono text-sm ${
        theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-800'
      }`}>
        <table className="w-full border-collapse">
          <tbody>
            {sampleCode.split('\n').map((line, index) => (
              <tr key={index} className={`leading-relaxed ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
              }`}>
                <td className={`text-right select-none pr-3 w-12 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {index + 1}
                </td>
                <td className="px-4">
                  <pre className="font-mono">
                    {line.replace(/</g, '&lt;').replace(/>/g, '&gt;').split('&lt;').map((part, i, arr) => {
                      if (i === 0) return part;
                      const tagParts = part.split('&gt;');
                      return (
                        <React.Fragment key={i}>
                          <span className={theme === 'dark' ? 'text-orange-300' : 'text-orange-600'}>&lt;</span>
                          <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                            {tagParts[0]}
                          </span>
                          <span className={theme === 'dark' ? 'text-orange-300' : 'text-orange-600'}>&gt;</span>
                          {tagParts[1]}
                        </React.Fragment>
                      );
                    })}
                  </pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Editor;