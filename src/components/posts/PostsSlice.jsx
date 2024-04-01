import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchPostAPI,
	fetchPostsAPI,
	createPostAPI,
	updatePostAPI,
	deletePostAPI,
	likePostAPI,
	fetchPostsBySearchAPI,
	commentPostAPI,
} from "../../api/index";

const initialState = {
	posts: [],
	post: null,
	page: null,
	numberOfPages: null,
	id: null,
	status: "idle",
	error: null, // Your initial state value
	// ...other state properties if needed
};

export const fetchPost = createAsyncThunk("posts/fetchPost", async (id) => {
	try {
		const response = await fetchPostAPI(id);
		//console.log(response);
		return response;
	} catch (error) {
		console.log(error);
	}
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (page) => {
	try {
		const response = await fetchPostsAPI(page);
		//console.log(response);
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

export const createPost = createAsyncThunk(
	"posts/createPost",
	async ({ post, navigate }) => {
		try {
			const response = await createPostAPI(post);
			console.log(navigate);
			navigate(`/posts/${response._id}`);
			return response;
		} catch (error) {
			console.log(error);
		}
	}
);

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

export const commentPost = createAsyncThunk(
	"posts/commentPost",
	async ({ value, id }) => {
		try {
			const response = await commentPostAPI({ value, id });
			return response;
		} catch (error) {
			console.log(error);
		}
	}
);

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
		setId(state, action) {
			state.id = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPost.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchPost.fulfilled, (state, action) => {
				state.status = "succedded";
				state.post = action.payload;
				state.error = null;
			})
			.addCase(fetchPost.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error;
			})
			.addCase(fetchPosts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succedded";
				state.posts = action.payload.data;
				state.page = action.payload.currentPage;
				state.numberOfPages = action.payload.numberOfPages;
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
			})
			.addCase(commentPost.pending, (state) => {
				state.status = "loading";
			})
			.addCase(commentPost.fulfilled, (state, action) => {
				state.status = "succedded";
				state.posts = state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				);
				state.post = action.payload;
				state.error = null;
			})
			.addCase(commentPost.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error;
			});
	},
});

export const { setId } = postsSlice.actions;
export default postsSlice.reducer;

export const selectPosts = (state) => state.posts;
