import React from 'react';
import { TeamLayout } from '../components/TeamLayout';
import { ChannelsView } from '../components/ChannelsView';
import { FilesView } from '../components/FilesView';
import { MembersView } from '../components/MembersView';
import { CallsView } from '../components/CallsView';
import { PostsView } from '../components/PostsView';
import { ChatView } from '../components/ChatView';
import { useApp } from '../context/AppContext';

export const TeamPage: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'channels':
        return <ChannelsView />;
      case 'chat':
        return <ChatView />;
      case 'files':
        return <FilesView />;
      case 'members':
        return <MembersView />;
      case 'calls':
        return <CallsView />;
      case 'posts':
        return <PostsView />;
      default:
        return <ChannelsView />;
    }
  };

  return <TeamLayout>{renderView()}</TeamLayout>;
};

