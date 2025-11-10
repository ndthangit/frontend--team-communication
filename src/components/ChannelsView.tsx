import React, { useState } from 'react';
import { Hash, Lock, Plus } from 'lucide-react';
import type {Channel} from '../types';
import { useApp } from '../context/AppContext';

export const ChannelsView: React.FC = () => {
  const { currentTeam } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const [channels, setChannels] = useState<Channel[]>([
    {
      id: 'channel-1',
      teamId: currentTeam?.id || '',
      name: 'General',
      description: 'General team discussions',
      isPrivate: false,
    },
    {
      id: 'channel-2',
      teamId: currentTeam?.id || '',
      name: 'Random',
      description: 'Casual conversations',
      isPrivate: false,
    },
  ]);

  const handleCreateChannel = () => {
    if (channelName.trim() && currentTeam) {
      const newChannel: Channel = {
        id: `channel-${Date.now()}`,
        teamId: currentTeam.id,
        name: channelName,
        description: channelDescription,
        isPrivate,
      };
      setChannels((prev) => [...prev, newChannel]);
      setChannelName('');
      setChannelDescription('');
      setIsPrivate(false);
      setShowCreateModal(false);
    }
  };

  return (
    <div className="h-full flex">
      <div className="w-80 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Channels</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="space-y-1">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannel(channel.id)}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                selectedChannel === channel.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {channel.isPrivate ? (
                <Lock className="w-4 h-4 mr-2" />
              ) : (
                <Hash className="w-4 h-4 mr-2" />
              )}
              <span className="font-medium">{channel.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChannel ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center">
                <Hash className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {channels.find((c) => c.id === selectedChannel)?.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {channels.find((c) => c.id === selectedChannel)?.description}
              </p>
            </div>

            <div className="flex-1 p-6 overflow-auto">
              <div className="text-center text-gray-500 mt-8">
                <Hash className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-lg font-medium">
                  Welcome to #{channels.find((c) => c.id === selectedChannel)?.name}
                </p>
                <p className="text-sm mt-1">This is the start of your conversation</p>
              </div>
            </div>

            <div className="bg-white border-t border-gray-200 p-4">
              <input
                type="text"
                placeholder={`Message #${
                  channels.find((c) => c.id === selectedChannel)?.name
                }`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Hash className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Select a channel to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Channel</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel Name
              </label>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="e.g., marketing"
                autoFocus
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={channelDescription}
                onChange={(e) => setChannelDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                rows={3}
                placeholder="What's this channel about?"
              />
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Make private</span>
              </label>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setChannelName('');
                  setChannelDescription('');
                  setIsPrivate(false);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChannel}
                disabled={!channelName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
