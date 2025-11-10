import React, { useState } from 'react';
import { Upload, Folder, File, MoreVertical, Download, Trash2, CreditCard as Edit2, FolderPlus, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type {FileItem} from '../types';

export const FilesView: React.FC = () => {
  const { files, addFile, deleteFile, renameFile } = useApp();
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [showContextMenu, setShowContextMenu] = useState<string | null>(null);
  const [showRenameModal, setShowRenameModal] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const currentPathString = '/' + currentPath.join('/');

  const currentFiles = files.filter((file) => file.path === currentPathString);

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (uploadedFiles) {
      Array.from(uploadedFiles).forEach((file) => {
        const newFile: FileItem = {
          id: `file-${Date.now()}-${Math.random()}`,
          name: file.name,
          type: 'file',
          size: file.size,
          modifiedAt: new Date(),
          path: currentPathString,
        };
        addFile(newFile);
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      const newFolder: FileItem = {
        id: `folder-${Date.now()}`,
        name: folderName,
        type: 'folder',
        modifiedAt: new Date(),
        path: currentPathString,
      };
      addFile(newFolder);
      setFolderName('');
      setShowCreateFolderModal(false);
    }
  };

  const handleRename = (fileId: string) => {
    if (newName.trim()) {
      renameFile(fileId, newName);
      setShowRenameModal(null);
      setNewName('');
    }
  };

  const openFolder = (folder: FileItem) => {
    setCurrentPath([...currentPath, folder.name]);
  };

  const navigateToPath = (index: number) => {
    setCurrentPath(currentPath.slice(0, index));
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateFolderModal(true)}
              className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              New Folder
            </button>
            <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Upload
              <input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <button
            onClick={() => setCurrentPath([])}
            className="hover:text-blue-600 transition-colors"
          >
            Files
          </button>
          {currentPath.map((folder, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="w-4 h-4 mx-1" />
              <button
                onClick={() => navigateToPath(index + 1)}
                className="hover:text-blue-600 transition-colors"
              >
                {folder}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div
        className="flex-1 overflow-auto p-6"
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {dragOver && (
          <div className="absolute inset-0 bg-blue-50 border-2 border-dashed border-blue-400 flex items-center justify-center z-10 m-6 rounded-lg">
            <div className="text-center">
              <Upload className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="text-lg font-medium text-blue-600">Drop files here to upload</p>
            </div>
          </div>
        )}

        {currentFiles.length === 0 ? (
          <div className="text-center text-gray-500 mt-16">
            <Folder className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium">No files yet</p>
            <p className="text-sm mt-1">Upload files or create folders to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {currentFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div
                  className="flex items-center flex-1 cursor-pointer"
                  onClick={() => file.type === 'folder' && openFolder(file)}
                >
                  {file.type === 'folder' ? (
                    <Folder className="w-5 h-5 text-blue-600 mr-3" />
                  ) : (
                    <File className="w-5 h-5 text-gray-600 mr-3" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {file.modifiedAt.toLocaleDateString()} {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() =>
                      setShowContextMenu(showContextMenu === file.id ? null : file.id)
                    }
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>

                  {showContextMenu === file.id && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                      <button
                        onClick={() => {
                          setShowRenameModal(file.id);
                          setNewName(file.name);
                          setShowContextMenu(null);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Rename
                      </button>
                      {file.type === 'file' && (
                        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                      )}
                      <button
                        onClick={() => {
                          deleteFile(file.id);
                          setShowContextMenu(null);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Folder</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Folder Name
              </label>
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter folder name"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCreateFolderModal(false);
                  setFolderName('');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                disabled={!folderName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {showRenameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rename</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">New Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRenameModal(null);
                  setNewName('');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRename(showRenameModal)}
                disabled={!newName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
