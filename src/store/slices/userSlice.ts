import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';

interface UserState {
    currentUser: User | null;
    users: User[];
}

const initialState: UserState = {
    currentUser: {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        status: 'online',
    },
    users: [
        {
            email: 'john.doe@example.com',
            firstName: 'John',
            lastName: 'Doe',
            status: 'online',
        },
        {
            email: 'jane.smith@example.com',
            firstName: 'Jane',
            lastName: 'Smith',
            status: 'online',
        },
        {
            email: 'bob.johnson@example.com',
            firstName: 'Bob',
            lastName: 'Johnson',
            status: 'offline',
        },
    ],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((u) => u.email !== action.payload);
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex((u) => u.email === action.payload.email);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
    },
});

export const { setCurrentUser, addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
