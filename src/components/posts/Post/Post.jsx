import { CardContent, Button, Typography } from "@mui/material";
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
	ButtonBaseStyled,
} from "./Styles";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../PostsSlice";
import { useNavigate } from "react-router-dom";
import { setId } from "../PostsSlice";

const Post = ({ post}) => {
	//, setCurrentId
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("profile"));

	const openPost = () => {
		navigate(`/posts/${post._id}`);
	};

	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find((like) => like === (user?.sub || user?._id)) ? (
				<>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize="small" />
					&nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
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
			<ButtonBaseStyled onClick={openPost}>
				<CardMediaStyled
					image={post.selectedFile}
					title={post.title}
				></CardMediaStyled>
				<Overlay>
					<Typography variant="h6">{post.name}</Typography>
					<Typography variant="body2">
						{moment(post.createdAt).fromNow()}
					</Typography>
				</Overlay>
				<Overlay2>
					{(user?.sub === post.creator || user?._id === post.creator) && (
						<Button
							style={{ color: "white" }}
							size="small"
							onClick={() => dispatch(setId(post._id))}
						>
							<EditIcon fontSize="small" />
							&nbsp;Edit
						</Button>
					)}
				</Overlay2>
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
			</ButtonBaseStyled>
			<CardActionsStyled>
				<Button
					size="small"
					color="primary"
					disabled={!user?.name}
					onClick={() => dispatch(likePost(post._id))}
				>
					<Likes />
				</Button>
				{(user?.sub === post.creator || user?._id === post.creator) && (
					<Button
						size="small"
						color="primary"
						onClick={() => dispatch(deletePost(post._id))}
					>
						<DeleteIcon fontSize="small" />
						Delete
					</Button>
				)}
			</CardActionsStyled>
		</CardStyled>
	);
};

export default Post;
