import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum DifficultyMode {
    EASY = 0,
    HARD = 1
}

// Define a type for the slice state
interface DifficultyModeState {
    value: DifficultyMode
}

// Define the initial state using that type
const initialState: DifficultyModeState = {
    value: DifficultyMode.EASY,
};

export const difficultyModeSlice = createSlice({
    name: "difficultyMode",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        flip: (state) => {
            state.value = state.value == DifficultyMode.EASY ? DifficultyMode.HARD : DifficultyMode.EASY;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        set: (state, action: PayloadAction<DifficultyMode>) => {
            state.value = action.payload;
        },
    },
});

export const {flip, set} = difficultyModeSlice.actions;

export default difficultyModeSlice.reducer;