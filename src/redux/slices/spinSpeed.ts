import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum SpinSpeed {
    FAST = 0,
    SLOW = 1
}

// Define a type for the slice state
interface SpinSpeedState {
    value: SpinSpeed
}

// Define the initial state using that type
const initialState: SpinSpeedState = {
    value: SpinSpeed.FAST,
};

export const spinSpeedSlice = createSlice({
    name: "spinSpeed",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<SpinSpeed>) => {
            state.value = action.payload;
        },
    },
});

export const {set} = spinSpeedSlice.actions;

export default spinSpeedSlice.reducer;