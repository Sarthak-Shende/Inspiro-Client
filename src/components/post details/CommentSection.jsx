import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommentsOuterContainer, CommentsInnerContainer } from "./Styles";
import { Typography, TextField, Button } from "@mui/material";
import { commentPost } from "../posts/PostsSlice";
import { selectPosts } from "../posts/PostsSlice";

const CommentSection = () => {
	const dispatch = useDispatch();
	const { post } = useSelector(selectPosts);
	const [comments, setComments] = useState(post?.comments || []);
	const [comment, setComment] = useState("");

	const user = JSON.parse(localStorage.getItem("profile"));
	const commentsRef = useRef();

	const handleClick = () => {
		const finalComment = `${user.name}: ${comment}`;
		dispatch(commentPost({ value: finalComment, id: post._id }));

		setComment("");
	};

	useEffect(() => {
		setComments(post?.comments || []);
		commentsRef.current.scrollIntoView({ behaviour: "smooth" });
	}, [post]);

	return (
		<div>
			<CommentsOuterContainer>
				<CommentsInnerContainer>
					<Typography gutterBottom variant="h6">
						Comments
					</Typography>
					{comments.map((comment, index) => (
						<Typography key={index} gutterBottom variant="subtitle1">
							<strong>{comment.split(": ")[0]}</strong>
							{comment.split(":")[1]}
						</Typography>
					))}
					<div ref={commentsRef} />
				</CommentsInnerContainer>
				{user && (
					<div style={{ width: "70%" }}>
						<Typography gutterBottom variant="h6">
							Write a Comment
						</Typography>
						<TextField
							fullWidth
							rows={4}
							variant="outlined"
							label="Comment"
							multiline
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						></TextField>
						<Button
							style={{ marginTop: "10px" }}
							fullWidth
							disabled={!comment}
							variant="contained"
							onClick={handleClick}
							color="primary"
						>
							Comment
						</Button>
					</div>
				)}
			</CommentsOuterContainer>
		</div>
	);
};

export default CommentSection;
