import React from 'react';
import { Video, Search, MoreHorizontal } from 'lucide-react';

interface TeamDetailHeaderProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const TeamDetailHeader: React.FC<TeamDetailHeaderProps> = ({
                                                                      activeTab,
                                                                      onTabChange,
                                                                  }) => {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="flex gap-1">
                    <button
                        onClick={() => onTabChange('posts')}
                        className={`px-4 py-2 text-sm font-medium rounded-t ${
                            activeTab === 'posts'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Chung
                    </button>
                    <button
                        onClick={() => onTabChange('files')}
                        className={`px-4 py-2 text-sm font-medium rounded-t ${
                            activeTab === 'files'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Bài đăng
                    </button>
                    <button
                        onClick={() => onTabChange('assignments')}
                        className={`px-4 py-2 text-sm font-medium rounded-t ${
                            activeTab === 'assignments'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Tệp
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded">
                    <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                    <Search className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
            </div>
        </header>
    );
};
