import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FileItem } from '../../types';

interface FileState {
    files: FileItem[];
}

const initialState: FileState = {
    files: [],
};

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFiles: (state, action: PayloadAction<FileItem[]>) => {
            state.files = action.payload;
        },
        addFile: (state, action: PayloadAction<FileItem>) => {
            state.files.push(action.payload);
        },
        deleteFile: (state, action: PayloadAction<string>) => {
            state.files = state.files.filter((f) => f.id !== action.payload);
        },
        renameFile: (state, action: PayloadAction<{ id: string; newName: string }>) => {
            const file = state.files.find((f) => f.id === action.payload.id);
            if (file) {
                file.name = action.payload.newName;
            }
        },
    },
});

export const { setFiles, addFile, deleteFile, renameFile } = fileSlice.actions;
export default fileSlice.reducer;
