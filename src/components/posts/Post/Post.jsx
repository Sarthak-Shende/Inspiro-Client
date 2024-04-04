import { useState } from "react";
import { CardContent, Button, Typography, CardActionArea } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
	CardStyled,
	CardMediaStyled,
	Overlay,
	Overlay2,
	Details,
	Title,
	CardActionsStyled,
} from "./Styles";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../PostsSlice";
import { useNavigate } from "react-router-dom";
import { setId } from "../PostsSlice";

const Post = ({ post }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("profile"));
	const [likes, setLikes] = useState(post?.likes);
	const userId = user?.sub || user?._id;
	const hasLikedPost = post.likes.find((like) => like === userId);
	const openPost = () => {
		navigate(`/posts/${post._id}`);
	};

	const handleLike = async () => {
		dispatch(likePost(post._id));
		if (hasLikedPost) {
			setLikes(post.likes.filter((id) => id !== userId));
		} else {
			setLikes([...post.likes, userId]);
		}
	};

	const Likes = () => {
		if (likes.length > 0) {
			return likes.find((like) => like === userId) ? (
				<>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp;
					{likes.length > 2
						? `You and ${likes.length - 1} others`
						: `${likes.length} like${likes.length > 1 ? "s" : ""}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize="small" />
					&nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
				</>
			);
		}

		return (
			<>
				<ThumbUpAltOutlined fontSize="small" />
				&nbsp;Like
			</>
		);
	};

	return (
		<CardStyled raised elevation={5}>
			<CardActionArea onClick={openPost}>
				<CardMediaStyled
					image={post.selectedFile}
					alt={post.title}
				></CardMediaStyled>

				<Overlay>
					<Typography variant="h6">{post.name}</Typography>
					<Typography variant="body2">
						{moment(post.createdAt).fromNow()}
					</Typography>
				</Overlay>
				<Overlay2></Overlay2>
				<Details>
					<Typography variant="body2" color="textSecondary">
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
				</Details>
				<Title variant="h5" gutterBottom>
					{post.title}
				</Title>
				<CardContent>
					<Title variant="body2" color="textSecondary" component="p">
						{post.message}
					</Title>
				</CardContent>
			</CardActionArea>

			<CardActionsStyled>
				<Button
					size="small"
					color="primary"
					disabled={!user?.name}
					onClick={handleLike}
				>
					<Likes />
				</Button>
				{(user?.sub === post.creator || user?._id === post.creator) && (
					<>
						<Button
							color="primary"
							size="small"
							onClick={() => dispatch(setId(post._id))}
						>
							<EditIcon fontSize="small" />
							&nbsp;Edit
						</Button>
						<Button
							size="small"
							color="primary"
							onClick={() => dispatch(deletePost(post._id))}
						>
							<DeleteIcon fontSize="small" />
							Delete
						</Button>
					</>
				)}
			</CardActionsStyled>
		</CardStyled>
	);
};

export default Post;
