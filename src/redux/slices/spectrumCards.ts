import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SpectrumCard {
    [key: string]: Array<Array<string>>;
}


// Define a type for the slice state
interface SpectrumCardState {
    value: SpectrumCard;
}

// Define the initial state using that type
const initialState: SpectrumCardState = {
    value: {"easy": [], "hard": []},
};

export const spectrumCardsSlice = createSlice({
    name: "spectrumCards",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        set: (state, action: PayloadAction<SpectrumCard>) => {
            state.value = action.payload;
        },
    },
});

export const {set} = spectrumCardsSlice.actions;

export default spectrumCardsSlice.reducer;