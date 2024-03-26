import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./PostsSlice";
import { Grid, CircularProgress } from "@mui/material";

const Posts = ({ setCurrentId }) => {
	const { posts, status } = useSelector(selectAllPosts);
	if (status === "loading") {
		return <CircularProgress></CircularProgress>;
	} else if (status === "failed") {
		return <p>Error fetching posts: {error}</p>; // Handle errors
	}
	if (posts) {
		return (
			<Grid className="" container alignItems="stretch" spacing={3}>
				{posts.map((post) => (
					<Grid key={post._id} item xs={12} sm={6}>
						<Post post={post} setCurrentId={setCurrentId}></Post>
					</Grid>
				))}
			</Grid>
		);
	} else {
		return <CircularProgress></CircularProgress>;
	}
};

export default Posts;
