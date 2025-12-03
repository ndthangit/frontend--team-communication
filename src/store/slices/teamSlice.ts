import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {Team} from "../../types/team.ts";

interface TeamState {
    teams: Team[];
    currentTeam: Team | null;
}

const initialState: TeamState = {
    teams: [
        { id: 'team1', name: 'Development Team', hidden: false },
        { id: 'team2', name: 'Marketing Team', hidden: false },
    ],
    currentTeam: { id: 'team1', name: 'Development Team', hidden: false },
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setTeams: (state, action: PayloadAction<Team[]>) => {
            state.teams = action.payload;
        },
        setCurrentTeam: (state, action: PayloadAction<Team | null>) => {
            state.currentTeam = action.payload;
        },
        addTeam: (state, action: PayloadAction<Team>) => {
            state.teams.push(action.payload);
        },
        updateTeam: (state, action: PayloadAction<Team>) => {
            const index = state.teams.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
                state.teams[index] = action.payload;
            }
        },
        removeTeam: (state, action: PayloadAction<string>) => {
            state.teams = state.teams.filter((t) => t.id !== action.payload);
        },
    },
});

export const { setTeams, setCurrentTeam, addTeam, updateTeam, removeTeam } = teamSlice.actions;
export default teamSlice.reducer;
