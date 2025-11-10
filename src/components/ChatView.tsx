import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  Search,
  Plus,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  X,
  Users as UsersIcon,
  Video,
  Phone,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type {Conversation} from '../types';

export const ChatView: React.FC = () => {
  const {
    conversations,
    currentConversation,
    setCurrentConversation,
    createConversation,
    sendMessage,
    getMessages,
    members,
    currentUser,
    startCall,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [chatType, setChatType] = useState<'direct' | 'group'>('direct');
  const [groupName, setGroupName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  const messages = currentConversation ? getMessages(currentConversation.id) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredConversations = conversations.filter((conv) => {
    const searchLower = searchQuery.toLowerCase();
    if (conv.type === 'group' && conv.name) {
      return conv.name.toLowerCase().includes(searchLower);
    }
    return conv.participants.some((p) =>
      p.name.toLowerCase().includes(searchLower)
    );
  });

  const handleSendMessage = () => {
    if (messageInput.trim() && currentConversation) {
      sendMessage(currentConversation.id, messageInput);
      setMessageInput('');
    }
  };

  const handleCreateChat = () => {
    if (selectedMembers.length === 0) return;

    const participants = members.filter((m) => selectedMembers.includes(m.id));
    const type = chatType === 'group' || selectedMembers.length > 1 ? 'group' : 'direct';
    const name = type === 'group' ? groupName : undefined;

    const newConversation = createConversation(participants, type, name);
    setCurrentConversation(newConversation);
    setShowNewChatModal(false);
    setSelectedMembers([]);
    setGroupName('');
    setChatType('direct');
  };

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  const getConversationName = (conversation: Conversation) => {
    if (conversation.type === 'group' && conversation.name) {
      return conversation.name;
    }
    const otherParticipants = conversation.participants.filter(
      (p) => p.id !== currentUser.id
    );
    return otherParticipants.map((p) => p.name).join(', ');
  };

  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.type === 'group') {
      return (
        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
          <UsersIcon className="w-6 h-6" />
        </div>
      );
    }
    const otherParticipant = conversation.participants.find((p) => p.id !== currentUser.id);
    return (
      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold relative">
        {otherParticipant?.name.charAt(0).toUpperCase()}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            otherParticipant?.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
          }`}
        />
      </div>
    );
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    return messageDate.toLocaleDateString();
  };

  return (
    <div className="h-full flex bg-white">
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Chat</h2>
            <button
              onClick={() => setShowNewChatModal(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8 px-4 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs mt-1">Start a new chat to begin messaging</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setCurrentConversation(conversation)}
                  className={`w-full flex items-start p-3 rounded-lg transition-colors ${
                    currentConversation?.id === conversation.id
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-shrink-0 mr-3">
                    {getConversationAvatar(conversation)}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {getConversationName(conversation)}
                      </h3>
                      {conversation.lastMessage && (
                        <span className="text-xs text-gray-500 ml-2">
                          {formatTime(conversation.lastMessage.createdAt)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage?.content || 'Start a conversation'}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
              <div className="flex items-center">
                <div className="mr-3">{getConversationAvatar(currentConversation)}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {getConversationName(currentConversation)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentConversation.type === 'group'
                      ? `${currentConversation.participants.length} members`
                      : currentConversation.participants.find((p) => p.id !== currentUser.id)
                          ?.status}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const participants = currentConversation.participants.filter(
                      (p) => p.id !== currentUser.id
                    );
                    startCall('video', participants);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Video className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => {
                    const participants = currentConversation.participants.filter(
                      (p) => p.id !== currentUser.id
                    );
                    startCall('voice', participants);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Phone className="w-5 h-5 text-gray-700" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>No messages yet</p>
                  <p className="text-sm mt-1">Start the conversation</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => {
                    const showDate =
                      index === 0 ||
                      formatDate(messages[index - 1].createdAt) !== formatDate(message.createdAt);
                    const isCurrentUser = message.senderId === currentUser.id;

                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="flex items-center justify-center my-4">
                            <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                              {formatDate(message.createdAt)}
                            </span>
                          </div>
                        )}
                        <div
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          {!isCurrentUser && (
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-2 flex-shrink-0">
                              {message.sender.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div
                            className={`max-w-md ${
                              isCurrentUser ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'
                            } rounded-lg px-4 py-2 shadow-sm`}
                          >
                            {!isCurrentUser && currentConversation.type === 'group' && (
                              <p className="text-xs font-semibold mb-1 opacity-75">
                                {message.sender.name}
                              </p>
                            )}
                            <p className="whitespace-pre-wrap break-words">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                              }`}
                            >
                              {formatTime(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex items-end gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Smile className="w-5 h-5 text-gray-600" />
                </button>
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">Select a conversation</p>
              <p className="text-sm mt-1">Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>

      {showNewChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">New Chat</h2>
              <button
                onClick={() => {
                  setShowNewChatModal(false);
                  setSelectedMembers([]);
                  setGroupName('');
                  setChatType('direct');
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setChatType('direct')}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    chatType === 'direct'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Direct Message
                </button>
                <button
                  onClick={() => setChatType('group')}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    chatType === 'group'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Group Chat
                </button>
              </div>

              {chatType === 'group' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Name
                  </label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Members
              </label>
              <div className="max-h-64 overflow-auto border border-gray-300 rounded-lg">
                {members
                  .filter((m) => m.id !== currentUser.id)
                  .map((member) => (
                    <label
                      key={member.id}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-200 last:border-b-0"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => toggleMemberSelection(member.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-600 mr-3"
                      />
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                    </label>
                  ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowNewChatModal(false);
                  setSelectedMembers([]);
                  setGroupName('');
                  setChatType('direct');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChat}
                disabled={
                  selectedMembers.length === 0 ||
                  (chatType === 'group' && !groupName.trim())
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
