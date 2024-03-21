import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../components/posts/PostsSlice";
import authReducer from "../components/auth/AuthSlice";

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		auth: authReducer,
	},
});
