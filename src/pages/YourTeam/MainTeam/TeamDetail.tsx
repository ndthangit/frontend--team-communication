import React, { useState } from 'react';
import type {Team} from "../../../types/team.ts";
import {TeamSidebar} from "./TeamSidebar.tsx";
import {PostFeed} from "./PostFeed.tsx";
import {TeamDetailHeader} from "./TeamDetailHeader.tsx";
import { useAppSelector } from '../../../store/hooks.ts';

interface TeamDetailProps {
    team: Team;
    onBack: () => void;
}

export const TeamDetail: React.FC<TeamDetailProps> = ({ team, onBack }) => {
    const [activeTab, setActiveTab] = useState('posts');
    const [activeChannel, setActiveChannel] = useState('general');

    return (
        <div className="flex h-screen bg-gray-50">
            <TeamSidebar
                team={team}
                onBack={onBack}
                activeChannel={activeChannel}
                onChannelSelect={setActiveChannel}
            />

            <main className="flex-1 flex flex-col overflow-hidden">
                <TeamDetailHeader activeTab={activeTab} onTabChange={setActiveTab} />
                <PostFeed teamName={team.name} />
            </main>
        </div>
    );
};
