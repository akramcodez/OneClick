import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown, ChevronRight, File, Folder, Check } from 'lucide-react';

interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileItem[];
  expanded?: boolean;
  completed?: boolean;
}

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  
  const [projectName, setProjectName] = useState('Bolt.new Clone');
  const [isProjectExpanded, setIsProjectExpanded] = useState(true);
  
  const [files, setFiles] = useState<FileItem[]>([
    {
      name: 'Create initial files',
      path: '',
      type: 'file',
      completed: true
    },
    {
      name: 'Install dependencies',
      path: '',
      type: 'file',
      completed: true
    },
    {
      name: 'Update src/App.tsx',
      path: 'src/App.tsx',
      type: 'file',
      completed: true
    },
    {
      name: 'Create src/components/Layout.tsx',
      path: 'src/components/Layout.tsx',
      type: 'file',
      completed: true
    },
    {
      name: 'Create src/components/Header.tsx',
      path: 'src/components/Header.tsx',
      type: 'file',
      completed: true
    },
    {
      name: 'Create src/components/Sidebar.tsx',
      path: 'src/components/Sidebar.tsx',
      type: 'file',
      completed: true
    },
    {
      name: 'Create src/components/Editor.tsx',
      path: 'src/components/Editor.tsx',
      type: 'file',
      completed: true
    },
    {
      name: 'Create src/components/Preview.tsx',
      path: 'src/components/Preview.tsx',
      type: 'file',
      completed: true
    },
    {
      name: 'Create src/context/ThemeContext.tsx',
      path: 'src/context/ThemeContext.tsx',
      type: 'file',
      completed: true
    },
    {
      name: 'Update tailwind.config.js',
      path: 'tailwind.config.js',
      type: 'file',
      completed: true
    },
    {
      name: 'Update index.html',
      path: 'index.html',
      type: 'file',
      completed: true
    },
    {
      name: 'Start application',
      path: '',
      type: 'file',
      completed: false
    }
  ]);
  
  const [isFilesExpanded, setIsFilesExpanded] = useState(true);
  const [fileStructure, setFileStructure] = useState<FileItem[]>([
    {
      name: 'src',
      path: 'src',
      type: 'directory',
      expanded: true,
      children: [
        {
          name: 'components',
          path: 'src/components',
          type: 'directory',
          expanded: true,
          children: [
            {
              name: 'Editor.tsx',
              path: 'src/components/Editor.tsx',
              type: 'file'
            },
            {
              name: 'Header.tsx',
              path: 'src/components/Header.tsx',
              type: 'file'
            },
            {
              name: 'Layout.tsx',
              path: 'src/components/Layout.tsx',
              type: 'file'
            },
            {
              name: 'Preview.tsx',
              path: 'src/components/Preview.tsx',
              type: 'file'
            },
            {
              name: 'Sidebar.tsx',
              path: 'src/components/Sidebar.tsx',
              type: 'file'
            }
          ]
        },
        {
          name: 'context',
          path: 'src/context',
          type: 'directory',
          expanded: true,
          children: [
            {
              name: 'ThemeContext.tsx',
              path: 'src/context/ThemeContext.tsx',
              type: 'file'
            }
          ]
        },
        {
          name: 'App.tsx',
          path: 'src/App.tsx',
          type: 'file'
        },
        {
          name: 'index.css',
          path: 'src/index.css',
          type: 'file'
        },
        {
          name: 'main.tsx',
          path: 'src/main.tsx',
          type: 'file'
        },
        {
          name: 'vite-env.d.ts',
          path: 'src/vite-env.d.ts',
          type: 'file'
        }
      ]
    },
    {
      name: '.gitignore',
      path: '.gitignore',
      type: 'file'
    },
    {
      name: 'eslint.config.js',
      path: 'eslint.config.js',
      type: 'file'
    },
    {
      name: 'index.html',
      path: 'index.html',
      type: 'file'
    }
  ]);
  
  const toggleDirectory = (path: string) => {
    const updateDirectories = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.path === path) {
          return { ...item, expanded: !item.expanded };
        }
        
        if (item.children) {
          return {
            ...item,
            children: updateDirectories(item.children)
          };
        }
        
        return item;
      });
    };
    
    setFileStructure(updateDirectories(fileStructure));
  };
  
  const renderFileTree = (items: FileItem[], depth = 0) => {
    return items.map(item => (
      <div key={item.path} style={{ paddingLeft: `${depth * 16}px` }}>
        <div 
          className={`flex items-center py-1 px-2 hover:bg-${theme === 'dark' ? 'gray-700' : 'gray-200'} rounded cursor-pointer`}
          onClick={() => item.type === 'directory' && toggleDirectory(item.path)}
        >
          {item.type === 'directory' ? (
            <>
              {item.expanded ? 
                <ChevronDown size={16} className={`mr-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} /> : 
                <ChevronRight size={16} className={`mr-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              }
              <Folder size={16} className={`mr-1.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            </>
          ) : (
            <>
              <div className="w-[16px] mr-1"></div>
              <File size={16} className={`mr-1.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            </>
          )}
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {item.name}
          </span>
        </div>
        
        {item.type === 'directory' && item.expanded && item.children && (
          renderFileTree(item.children, depth + 1)
        )}
      </div>
    ));
  };
  
  return (
    <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div 
        className={`flex items-center py-2 px-3 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        onClick={() => setIsProjectExpanded(!isProjectExpanded)}
      >
        {isProjectExpanded ? 
          <ChevronDown size={16} className={`mr-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} /> : 
          <ChevronRight size={16} className={`mr-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
        }
        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {projectName}
        </span>
      </div>
      
      {isProjectExpanded && (
        <div className="px-2">
          {files.map((file, index) => (
            <div 
              key={index}
              className={`flex items-center py-1 px-2 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            >
              <div className="w-5 h-5 flex items-center justify-center mr-2">
                {file.completed ? (
                  <div className={`rounded-full p-0.5 ${theme === 'dark' ? 'bg-green-500' : 'bg-green-600'}`}>
                    <Check size={12} className="text-white" />
                  </div>
                ) : (
                  <div className={`w-3 h-3 rounded-full border ${theme === 'dark' ? 'border-gray-500' : 'border-gray-400'}`}></div>
                )}
              </div>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {file.name}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4">
        <div 
          className={`flex items-center py-2 px-3 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          onClick={() => setIsFilesExpanded(!isFilesExpanded)}
        >
          {isFilesExpanded ? 
            <ChevronDown size={16} className={`mr-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} /> : 
            <ChevronRight size={16} className={`mr-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          }
          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Files
          </span>
        </div>
        
        {isFilesExpanded && (
          <div className="px-2">
            {renderFileTree(fileStructure)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;