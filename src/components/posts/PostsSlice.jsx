import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchPostsAPI,
	createPostAPI,
	updatePostAPI,
	deletePostAPI,
	likePostAPI,
	fetchPostsBySearchAPI,
} from "../../api/index";

const initialState = {
	posts: [],
	status: "idle",
	error: null, // Your initial state value
	// ...other state properties if needed
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	try {
		const response = await fetchPostsAPI();
		return response;
	} catch (error) {
		console.log(error);
	}
});

export const fetchPostsBySearch = createAsyncThunk(
	"posts/fetchPostsBySearch",
	async (searchQuery) => {
		try {
			const response = await fetchPostsBySearchAPI(searchQuery);
			//console.log(response);
			return response;
		} catch (error) {
			console.log(error);
		}
	}
);

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
	try {
		const response = await createPostAPI(post);
		return response;
	} catch (error) {
		console.log(error);
	}
});

export const updatePost = createAsyncThunk(
	"posts/updatePost",
	async ({ id, updatedPost }) => {
		try {
			const response = await updatePostAPI({ id, updatedPost });
			return response;
		} catch (error) {
			console.log(error);
		}
	}
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
	try {
		await deletePostAPI(id);
		return id;
	} catch (error) {
		console.log(error);
	}
});

export const likePost = createAsyncThunk("posts/likePost", async (id) => {
	try {
		const response = await likePostAPI(id);
		return response;
	} catch (error) {
		console.log(error);
	}
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
				//console.log(action.payload);
				state.error = null;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error;
			})
			.addCase(fetchPostsBySearch.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchPostsBySearch.fulfilled, (state, action) => {
				state.status = "succedded";
				state.posts = action.payload;
				//console.log(action.payload);
				state.error = null;
			})
			.addCase(fetchPostsBySearch.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error;
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
				state.error = action.error;
			})
			.addCase(updatePost.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				state.status = "succedded";
				state.posts = state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				);
				state.error = null;
			})
			.addCase(updatePost.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error;
			})
			.addCase(deletePost.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.status = "succedded";
				state.posts = state.posts.filter((post) => post._id !== action.payload);
				state.error = null;
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error;
			})
			.addCase(likePost.pending, (state) => {
				state.status = "loading";
			})
			.addCase(likePost.fulfilled, (state, action) => {
				state.status = "succedded";
				state.posts = state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				);
				state.error = null;
			})
			.addCase(likePost.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error;
			});
	},
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts;
