import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import {
	fetchPost,
	selectPosts,
	fetchPostsBySearch,
} from "../posts/PostsSlice";
import {
	CircularProgress,
	Paper,
	Typography,
	Divider,
	Grid,
} from "@mui/material";
import {
	StyledCard,
	StyledSection,
	StyledImageSection,
	StyledImg,
	LoadingPaper,
} from "./Styles";
import Post from "../posts/Post/Post";
import CommentSection from "./CommentSection";

const PostDetails = () => {
	const { post, posts, status } = useSelector(selectPosts);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchPost(id));
	}, [id]);

	useEffect(() => {
		if (post) {
			dispatch(
				fetchPostsBySearch({ search: "none", tags: post?.tags.join(",") })
			);
		}
	}, [post]);

	if (!post) return null;

	if (status === "loading") {
		return (
			<LoadingPaper elevation={6}>
				<CircularProgress size="7em"></CircularProgress>
			</LoadingPaper>
		);
	}

	const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

	return (
		<Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
			<StyledCard>
				<StyledSection>
					<Typography variant="h4" component="h1">
						{post.title}
					</Typography>
					<Typography
						gutterBottom
						variant="subtitle2"
						color="textSecondary"
						component="h2"
					>
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
					<Typography gutterBottom variant="body1" component="p">
						{post.message}
					</Typography>
					<Typography variant="subtitle1">Created by: {post.name}</Typography>
					<Typography variant="subtitle2">
						{moment(post.createdAt).fromNow()}
					</Typography>

					<Divider style={{ margin: "20px 0" }} />
					<CommentSection></CommentSection>
					<Divider style={{ margin: "20px 0" }} />
				</StyledSection>
				<StyledImageSection>
					<StyledImg src={post.selectedFile} alt={post.title} />
				</StyledImageSection>
			</StyledCard>
			{recommendedPosts && (
				<Grid container alignItems="stretch" spacing={3}>
					{recommendedPosts.map((post) => (
						<Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
							<Post post={post}></Post>
						</Grid>
					))}
				</Grid>
			)}
		</Paper>
	);
};

export default PostDetails;
