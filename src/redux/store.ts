import {configureStore} from "@reduxjs/toolkit";
import {difficultyModeSlice} from "./slices/difficultyMode";
import {spectrumCardsSlice} from "./slices/spectrumCards";
import {spinSpeedSlice} from "./slices/spinSpeed";

const store = configureStore({
    reducer: {
        difficulty: difficultyModeSlice.reducer,
        spectrumCards: spectrumCardsSlice.reducer,
        spinSpeed: spinSpeedSlice.reducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;