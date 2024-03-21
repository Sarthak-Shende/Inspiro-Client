import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	auth: null,
	status: "idle",
	error: null, // Your initial state value
	// ...other state properties if needed
};

const authSlice = createSlice({
	name: "auth", // A unique name for this slice of state

	initialState, // The initial state value

	reducers: {
		// Define reducers for handling actions
		fetchProfile(state, action) {
			state.value = action.payload;
			localStorage.setItem("profile", JSON.stringify(action.payload));
		},
		logoutProfile(state) {
			state.value = null;
			localStorage.clear();
		},
	},
	extraReducers(builder) {},
});

export const { fetchProfile, logoutProfile } = authSlice.actions;
export default authSlice.reducer;
