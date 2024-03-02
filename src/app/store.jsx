import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../components/posts/PostsSlice";

export const store = configureStore({
	reducer: {
		posts: postsReducer,
	},
});
