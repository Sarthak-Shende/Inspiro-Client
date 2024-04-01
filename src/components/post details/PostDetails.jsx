import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();
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
		<Paper>
			<StyledCard>
				<StyledSection>
					<Typography variant="h3" component="h2">
						{post.title}
					</Typography>
					<Typography
						gutterBottom
						variant="h6"
						color="textSecondary"
						component="h2"
					>
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
					<Typography gutterBottom variant="body1" component="p">
						{post.message}
					</Typography>
					<Typography variant="h6">Created by: {post.name}</Typography>
					<Typography variant="body1">
						{moment(post.createdAt).fromNow()}
					</Typography>
					<Divider style={{ margin: "20px 0" }} />
					<Typography variant="body1">
						<strong>Realtime Chat - coming soon!</strong>
					</Typography>
					<Divider style={{ margin: "20px 0" }} />
					<CommentSection></CommentSection>
					<Divider style={{ margin: "20px 0" }} />
				</StyledSection>
				<StyledImageSection>
					<StyledImg
						src={
							post.selectedFile ||
							"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
						}
						alt={post.title}
					/>
				</StyledImageSection>
			</StyledCard>
			{recommendedPosts && (
				<Grid container alignItems="stretch" spacing={3}>
					{recommendedPosts.map((post) => (
						<Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
							<Post post={post}></Post>
						</Grid>
						//setCurrentId={setCurrentId}
					))}
				</Grid>
			)}
		</Paper>
	);
};

export default PostDetails;
