import React from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import type {Team} from "../../../types/team.ts";

interface TeamSidebarProps {
    team: Team;
    onBack: () => void;
    activeChannel: string;
    onChannelSelect: (channelId: string) => void;
}

const navigationItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'notebook', label: 'Class Notebook' },
    { id: 'exercises', label: 'Bài tập trên lớp' },
    { id: 'assignments', label: 'Bài tập' },
    { id: 'grades', label: 'Grades' },
    { id: 'reflect', label: 'Reflect' },
];

const channels = [
    { id: 'general', label: 'Chung' },
];

export const TeamSidebar: React.FC<TeamSidebarProps> = ({
                                                            team,
                                                            onBack,
                                                            activeChannel,
                                                            onChannelSelect,
                                                        }) => {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">Tất cả các nhóm</span>
                </button>

                <div className="flex items-center gap-3">
                    {team.avatarUrl ? (
                        <img src={team.avatarUrl} alt={team.name} className="w-10 h-10 rounded" />
                    ) : (
                        <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white font-bold text-sm">
                            {team.name.substring(0, 2).toUpperCase()}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h2 className="font-semibold text-sm text-gray-900 truncate">{team.name}</h2>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-2">
                {navigationItems.map((item) => (
                    <button
                        key={item.id}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="border-t border-gray-200 py-2">
                <div className="px-4 py-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Kênh chính</h3>
                    {channels.map((channel) => (
                        <button
                            key={channel.id}
                            onClick={() => onChannelSelect(channel.id)}
                            className={`w-full px-2 py-1.5 text-left text-sm rounded ${
                                activeChannel === channel.id
                                    ? 'bg-gray-200 text-gray-900 font-medium'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {channel.label}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};
