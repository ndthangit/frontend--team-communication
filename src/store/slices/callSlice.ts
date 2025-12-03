import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Call } from '../../types';

interface CallState {
    calls: Call[];
}

const initialState: CallState = {
    calls: [],
};

const callSlice = createSlice({
    name: 'call',
    initialState,
    reducers: {
        setCalls: (state, action: PayloadAction<Call[]>) => {
            state.calls = action.payload;
        },
        addCall: (state, action: PayloadAction<Call>) => {
            state.calls.unshift(action.payload);
        },
        updateCallStatus: (
            state,
            action: PayloadAction<{ id: string; status: 'ringing' | 'active' | 'ended' }>
        ) => {
            const call = state.calls.find((c) => c.id === action.payload.id);
            if (call) {
                call.status = action.payload.status;
            }
        },
    },
});

export const { setCalls, addCall, updateCallStatus } = callSlice.actions;
export default callSlice.reducer;
