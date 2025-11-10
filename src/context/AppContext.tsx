import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type {Call, ChatMessage, Conversation, FileItem, Member, NavigationView, Post, Team} from "../types";

interface AppContextType {
  teams: Team[];
  currentTeam: Team | null;
  currentView: NavigationView;
  members: Member[];
  files: FileItem[];
  posts: Post[];
  currentCall: Call | null;
  incomingCall: Call | null;
  currentUser: Member;
  conversations: Conversation[];
  currentConversation: Conversation | null;
  addTeam: (team: Team) => void;
  setCurrentTeam: (team: Team | null) => void;
  setCurrentView: (view: NavigationView) => void;
  addMember: (member: Member) => void;
  removeMember: (memberId: string) => void;
  updateMemberRole: (memberId: string, role: 'Owner' | 'Member' | 'Guest') => void;
  addFile: (file: FileItem) => void;
  deleteFile: (fileId: string) => void;
  renameFile: (fileId: string, newName: string) => void;
  addPost: (post: Post) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  startCall: (type: 'voice' | 'video', participants: Member[]) => void;
  endCall: () => void;
  answerCall: () => void;
  declineCall: () => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  isMuted: boolean;
  isVideoOff: boolean;
  createConversation: (participants: Member[], type: 'direct' | 'group', name?: string) => Conversation;
  setCurrentConversation: (conversation: Conversation | null) => void;
  sendMessage: (conversationId: string, content: string) => void;
  getMessages: (conversationId: string) => ChatMessage[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const mockCurrentUser: Member = {
  id: 'user-1',
  teamId: '',
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Owner',
  status: 'online',
  avatarUrl: undefined,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [currentView, setCurrentView] = useState<NavigationView>('channels');
  const [members, setMembers] = useState<Member[]>([mockCurrentUser]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentCall, setCurrentCall] = useState<Call | null>(null);
  const [incomingCall, setIncomingCall] = useState<Call | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addTeam = (team: Team) => {
    setTeams((prev) => [...prev, team]);
  };

  const addMember = (member: Member) => {
    setMembers((prev) => [...prev, member]);
  };

  const removeMember = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  const updateMemberRole = (memberId: string, role: 'Owner' | 'Member' | 'Guest') => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role } : m))
    );
  };

  const addFile = (file: FileItem) => {
    setFiles((prev) => [...prev, file]);
  };

  const deleteFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const renameFile = (fileId: string, newName: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, name: newName } : f))
    );
  };

  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const addComment = (postId: string, content: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: `comment-${Date.now()}`,
                  postId,
                  authorId: mockCurrentUser.id,
                  author: mockCurrentUser,
                  content,
                  createdAt: new Date(),
                },
              ],
            }
          : p
      )
    );
  };

  const startCall = (type: 'voice' | 'video', participants: Member[]) => {
    const call: Call = {
      id: `call-${Date.now()}`,
      teamId: currentTeam?.id || '',
      participants,
      type,
      status: 'active',
      startedAt: new Date(),
    };
    setCurrentCall(call);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const endCall = () => {
    setCurrentCall(null);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const answerCall = () => {
    if (incomingCall) {
      setCurrentCall({ ...incomingCall, status: 'active', startedAt: new Date() });
      setIncomingCall(null);
    }
  };

  const declineCall = () => {
    setIncomingCall(null);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleVideo = () => {
    setIsVideoOff((prev) => !prev);
  };

  const createConversation = (participants: Member[], type: 'direct' | 'group', name?: string): Conversation => {
    const newConversation: Conversation = {
      id: `conversation-${Date.now()}`,
      teamId: currentTeam?.id || '',
      type,
      name: name || (type === 'group' ? 'New Group' : undefined),
      participants: [mockCurrentUser, ...participants],
      updatedAt: new Date(),
      unreadCount: 0,
    };
    setConversations((prev) => [newConversation, ...prev]);
    return newConversation;
  };

  const sendMessage = (conversationId: string, content: string) => {
    const newMessage: ChatMessage = {
      id: `message-${Date.now()}`,
      conversationId,
      senderId: mockCurrentUser.id,
      sender: mockCurrentUser,
      content,
      createdAt: new Date(),
      isRead: false,
    };
    setMessages((prev) => [...prev, newMessage]);

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? { ...conv, lastMessage: newMessage, updatedAt: new Date() }
          : conv
      )
    );
  };

  const getMessages = (conversationId: string): ChatMessage[] => {
    return messages.filter((msg) => msg.conversationId === conversationId);
  };

  const value: AppContextType = {
    teams,
    currentTeam,
    currentView,
    members,
    files,
    posts,
    currentCall,
    incomingCall,
    currentUser: mockCurrentUser,
    conversations,
    currentConversation,
    addTeam,
    setCurrentTeam,
    setCurrentView,
    addMember,
    removeMember,
    updateMemberRole,
    addFile,
    deleteFile,
    renameFile,
    addPost,
    likePost,
    addComment,
    startCall,
    endCall,
    answerCall,
    declineCall,
    toggleMute,
    toggleVideo,
    isMuted,
    isVideoOff,
    createConversation,
    setCurrentConversation,
    sendMessage,
    getMessages,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
