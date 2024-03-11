import { CardContent, Button, Typography } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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

const Post = ({ post, setCurrentId }) => {
	const dispatch = useDispatch();

	return (
		<CardStyled>
			<CardMediaStyled
				image={post.selectedFile}
				title={post.title}
			></CardMediaStyled>
			<Overlay>
				<Typography variant="h6">{post.creator}</Typography>
				<Typography variant="body2">
					{moment(post.createdAt).fromNow()}
				</Typography>
			</Overlay>
			<Overlay2>
				<Button
					style={{ color: "white" }}
					size="small"
					onClick={() => setCurrentId(post._id)}
				>
					<MoreHorizIcon fontSize="default" />
				</Button>
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
			<CardActionsStyled>
				<Button
					size="small"
					color="primary"
					onClick={() => dispatch(likePost(post._id))}
				>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp; Like &nbsp;
					{post.likeCount}
				</Button>
				<Button
					size="small"
					color="primary"
					onClick={() => dispatch(deletePost(post._id))}
				>
					<DeleteIcon fontSize="small" />
					Delete
				</Button>
			</CardActionsStyled>
		</CardStyled>
	);
};

export default Post;
