import { createSlice } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";

let initialState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            //state.user = action.payload.user;
            state.token = action.payload.token;
            state.user = jwt.decode(action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;