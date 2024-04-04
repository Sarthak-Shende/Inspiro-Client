import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { selectPosts } from "./PostsSlice";
import { Grid, CircularProgress } from "@mui/material";

const Posts = () => {
	const { posts, status } = useSelector(selectPosts);
	if (status === "succedded" && !posts.length) {
		return <p>No Posts</p>;
	} else if (status === "loading" && !posts.length) {
		return <CircularProgress></CircularProgress>;
	} else if (status === "failed") {
		return <p>Error fetching posts: {error}</p>;
	} else {
		return (
			<Grid container alignItems="stretch" spacing={3}>
				{posts.map((post) => (
					<Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
						<Post post={post}></Post>
					</Grid>
				))}
			</Grid>
		);
	}
};

export default Posts;
