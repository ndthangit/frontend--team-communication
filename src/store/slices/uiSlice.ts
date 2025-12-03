import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NavigationView } from '../../types';

interface UIState {
    currentView: NavigationView;
}

const initialState: UIState = {
    currentView: 'posts',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setCurrentView: (state, action: PayloadAction<NavigationView>) => {
            state.currentView = action.payload;
        },
    },
});

export const { setCurrentView } = uiSlice.actions;
export default uiSlice.reducer;
