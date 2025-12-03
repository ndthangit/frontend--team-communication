import React from 'react';
import { ThumbsUp, MessageSquare, MoreVertical } from 'lucide-react';
import type {Post} from "../../../types";
import {formatDate} from "../../../utils/userHelper.ts";


interface PostCardProps {
    post: Post;
    teamName: string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, teamName }) => {
    const authorName = `${post.author.firstName} ${post.author.lastName}`;
    const authorInitials = `${post.author.firstName.charAt(0)}${post.author.lastName.charAt(0)}`.toUpperCase();

    return (
        <article className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-3 mb-4">
                {post.author.avatarUrl ? (
                    <img
                        src={post.author.avatarUrl}
                        alt={authorName}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {authorInitials}
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-gray-900">{authorName}</h3>
                        <span className="text-xs text-gray-500">{formatDate(post.createdAt)}</span>
                    </div>
                    <p className="text-sm text-blue-600">{teamName}</p>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            <div className="mb-4">
                <p className="text-sm text-gray-900 whitespace-pre-wrap">{post.content}</p>
            </div>

            {post.attachments && post.attachments.length > 0 && (
                <div className="mb-4 space-y-2">
                    {post.attachments.map((attachment, index) => (
                        <img
                            key={index}
                            src={attachment}
                            alt="Post attachment"
                            className="rounded-lg max-w-full"
                        />
                    ))}
                </div>
            )}

            <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes > 0 && post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments.length > 0 && post.comments.length}</span>
                    </button>
                </div>

                {post.comments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                        {post.comments.map((comment) => {
                            const commentAuthorName = `${comment.author.firstName} ${comment.author.lastName}`;
                            const commentInitials = `${comment.author.firstName.charAt(0)}${comment.author.lastName.charAt(0)}`.toUpperCase();

                            return (
                                <div key={comment.id} className="flex items-start gap-3">
                                    {comment.author.avatarUrl ? (
                                        <img
                                            src={comment.author.avatarUrl}
                                            alt={commentAuthorName}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                                            {commentInitials}
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">
                        {commentAuthorName}
                      </span>
                                            <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                                        </div>
                                        <p className="text-sm text-gray-700">{comment.content}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </article>
    );
};
