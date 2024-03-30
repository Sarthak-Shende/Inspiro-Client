import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { selectPosts } from "./PostsSlice";
import { Grid, CircularProgress } from "@mui/material";

const Posts = () => {
	const { posts, status } = useSelector(selectPosts);
	if (status === "succedded" && !posts) {
		return <p>No Posts</p>;
	}
	if (status === "loading") {
		return <CircularProgress></CircularProgress>;
	} else if (status === "failed") {
		return <p>Error fetching posts: {error}</p>; // Handle errors
	}
	if (posts) {
		return (
			<Grid container alignItems="stretch" spacing={3}>
				{posts.map((post) => (
					<Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
						<Post post={post}></Post>
					</Grid>
				))}
			</Grid>
		);
	} else {
		return <CircularProgress></CircularProgress>;
	}
};

export default Posts;
