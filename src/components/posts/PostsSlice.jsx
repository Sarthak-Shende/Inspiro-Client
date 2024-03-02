import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPostsAPI, createPostAPI } from "../../api/index";

const initialState = {
	posts: [],
	status: "idle",
	error: null, // Your initial state value
	// ...other state properties if needed
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await fetchPostsAPI();
	return response.data;
});

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
	const response = await createPostAPI(post);
	return response.data;
});

const postsSlice = createSlice({
	name: "posts", // A unique name for this slice of state

	initialState, // The initial state value

	reducers: {
		// Define reducers for handling actions
		fetchAll(state) {
			state.value += 1;
		},
		create(state) {
			state.value -= 1;
		},
		incrementByAmount(state, action) {
			state.value += action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succedded";
				state.posts = action.payload;
				state.error = null;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createPost.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.status = "succedded";
				state.posts.push(action.payload);
				state.error = null;
			})
			.addCase(createPost.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;
