import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Conversation, ChatMessage } from '../../types';

interface ConversationState {
    conversations: Conversation[];
    currentConversation: Conversation | null;
    messages: ChatMessage[];
}

const initialState: ConversationState = {
    conversations: [],
    currentConversation: null,
    messages: [],
};

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setConversations: (state, action: PayloadAction<Conversation[]>) => {
            state.conversations = action.payload;
        },
        addConversation: (state, action: PayloadAction<Conversation>) => {
            state.conversations.unshift(action.payload);
        },
        setCurrentConversation: (state, action: PayloadAction<Conversation | null>) => {
            state.currentConversation = action.payload;
        },
        addMessage: (state, action: PayloadAction<ChatMessage>) => {
            state.messages.push(action.payload);
            const conversation = state.conversations.find(
                (c) => c.id === action.payload.conversationId
            );
            if (conversation) {
                conversation.lastMessage = action.payload;
                conversation.updatedAt = new Date();
            }
        },
    },
});

export const { setConversations, addConversation, setCurrentConversation, addMessage } =
    conversationSlice.actions;
export default conversationSlice.reducer;
