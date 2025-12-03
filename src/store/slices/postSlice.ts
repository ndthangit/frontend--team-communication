import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post, Comment } from '../../types';

interface PostState {
    posts: Post[];
}

const initialState: PostState = {
    posts: [],
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.unshift(action.payload);
        },
        likePost: (state, action: PayloadAction<string>) => {
            const post = state.posts.find((p) => p.id === action.payload);
            if (post) {
                post.likes += 1;
            }
        },
        addComment: (
            state,
            action: PayloadAction<{ postId: string; comment: Comment }>
        ) => {
            const post = state.posts.find((p) => p.id === action.payload.postId);
            if (post) {
                post.comments.push(action.payload.comment);
            }
        },
    },
});

export const { setPosts, addPost, likePost, addComment } = postSlice.actions;
export default postSlice.reducer;
