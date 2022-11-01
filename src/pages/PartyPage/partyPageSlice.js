import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    roomID: "",
    role: "host"
};

export const partyPageSlice = createSlice({
    name: 'party',
    initialState: defaultState,
    reducers: {
        setRoom: {
            reducer: (state,action) => {
                state.roomID = action.payload;
            },
            prepare: (roomID) => {
                return {payload: roomID};
            }
        },
        setRole: {
            reducer: (state,action) => {
                state.role = action.payload;
            },
            prepare: (role) => {
                return {payload: role};
            }
        },
    }
});

export const { setRoom, setRole } = partyPageSlice.actions;
export default partyPageSlice.reducer;