import React from 'react';
import { PenSquare } from 'lucide-react';
import { PostCard } from './PostCard';
import type {Post} from "../../../types";

interface PostFeedProps {
    posts: Post[];
    teamName: string;
}

export const PostFeed: React.FC<PostFeedProps> = ({ posts, teamName }) => {
    return (
        <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="max-w-4xl mx-auto py-6 px-6">
                <button className="w-full mb-6 px-4 py-3 bg-white border border-gray-300 rounded-lg text-left text-gray-500 hover:bg-gray-50 flex items-center gap-2">
                    <PenSquare className="w-5 h-5" />
                    <span>Đăng trong kênh</span>
                </button>

                <div className="space-y-4">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} teamName={teamName} />
                    ))}
                </div>
            </div>
        </div>
    );
};
