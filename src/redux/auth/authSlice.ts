import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    user: object;
}

const initialState: AuthState = {
    user: {}
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{ user: object }>
        ) => {
            state.user = action.payload
        },
        defaultState: (state) => {
            state = initialState;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;