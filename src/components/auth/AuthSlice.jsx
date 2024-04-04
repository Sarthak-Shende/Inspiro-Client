import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signinAPI, signupAPI } from "../../api";

const initialState = {
	auth: null,
	status: "idle",
	error: null,
};

export const signin = createAsyncThunk(
	"user/signin",
	async ({ formData, navigate }) => {
		try {
			const response = await signinAPI(formData);
			navigate("/");
			response.result.token = response.token;
			return response.result;
		} catch (error) {
			console.log(error);
		}
	}
);

export const signup = createAsyncThunk(
	"user/signup",
	async ({ formData, navigate }) => {
		try {
			const response = await signupAPI(formData);
			navigate("/");
			response.result.token = response.token;
			return response.result;
		} catch (error) {
			console.log(error);
		}
	}
);

const authSlice = createSlice({
	name: "auth", 

	initialState, 

	reducers: {
		fetchProfile(state, action) {
			state.value = action.payload;
			localStorage.setItem("profile", JSON.stringify(action.payload));
		},
		logoutProfile(state) {
			state.value = null;
			localStorage.clear();
		},
	},
	extraReducers(builder) {
		builder
			.addCase(signin.pending, (state) => {
				state.status = "loading";
			})
			.addCase(signin.fulfilled, (state, action) => {
				state.status = "succedded";
				state.value = action.payload;
				localStorage.setItem("profile", JSON.stringify(action.payload));
				state.error = null;
			})
			.addCase(signin.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error;
			})
			.addCase(signup.pending, (state) => {
				state.status = "loading";
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.status = "succedded";
				state.value = action.payload;
				localStorage.setItem("profile", JSON.stringify(action.payload));
				state.error = null;
			})
			.addCase(signup.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error;
			});
	},
});

export const { fetchProfile, logoutProfile } = authSlice.actions;
export default authSlice.reducer;
