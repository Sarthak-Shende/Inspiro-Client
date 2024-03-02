import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./PostsSlice";

const Posts = () => {
	const posts = useSelector(selectAllPosts);

	return (
		<>
			<h1>Posts</h1>
			<Post></Post>
		</>
	);
};

export default Posts;
