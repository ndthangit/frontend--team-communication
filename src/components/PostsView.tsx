import React, { useState } from 'react';
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Paperclip,
  Send,
  Bold,
  Italic,
  Link as LinkIcon,
  List,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type {Post} from '../types';

export const PostsView: React.FC = () => {
  const { posts, addPost, likePost, addComment, currentUser, currentTeam } = useApp();
  const [postContent, setPostContent] = useState('');
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState('');
  const [showFormatting, setShowFormatting] = useState(false);

  const handleCreatePost = () => {
    if (postContent.trim() && currentTeam) {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        teamId: currentTeam.id,
        authorId: currentUser.id,
        author: currentUser,
        content: postContent,
        createdAt: new Date(),
        likes: 0,
        comments: [],
      };
      addPost(newPost);
      setPostContent('');
      setShowFormatting(false);
    }
  };

  const handleAddComment = (postId: string) => {
    if (commentContent.trim()) {
      addComment(postId, commentContent);
      setCommentContent('');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share something with your team..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              rows={3}
              onFocus={() => setShowFormatting(true)}
            />
          </div>

          {showFormatting && (
            <div className="mb-3 flex items-center gap-2 pl-13">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bold className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Italic className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <LinkIcon className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <List className="w-4 h-4 text-gray-600" />
              </button>
              <div className="flex-1" />
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Paperclip className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleCreatePost}
              disabled={!postContent.trim()}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 mr-2" />
              Post
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {post.author.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                    <span className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{post.author.role}</p>
                </div>
              </div>

              <p className="text-gray-900 mb-4 whitespace-pre-wrap">{post.content}</p>

              <div className="flex items-center gap-6 py-3 border-t border-gray-200">
                <button
                  onClick={() => likePost(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {post.likes > 0 ? post.likes : 'Like'}
                  </span>
                </button>
                <button
                  onClick={() =>
                    setShowComments(showComments === post.id ? null : post.id)
                  }
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {post.comments.length > 0 ? post.comments.length : 'Comment'}
                  </span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>

              {showComments === post.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-4 mb-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {comment.author.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm text-gray-900">
                              {comment.author.name}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddComment(post.id);
                          }
                        }}
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentContent.trim()}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No posts yet</p>
              <p className="text-sm mt-1">Be the first to share something with your team</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
