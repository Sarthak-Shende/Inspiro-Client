import { TextField, Button, Typography } from "@mui/material";
import { FormContainer, FileInput, SubmitButton, PaperStyled } from "./Styles";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../posts/PostsSlice";

const Form = ({ currentId, setCurrentId }) => {
	const dispatch = useDispatch();

	const [postData, setPostData] = useState({
		creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});

	const post = useSelector((state) =>
		currentId ? state.posts.posts.find((p) => p._id === currentId) : null
	);

	useEffect(() => {
		if (post) {
			setPostData(post);
		}
	}, [post]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (currentId) {
			dispatch(updatePost({ id: currentId, updatedPost: postData }));
			//console.log(postData);
		} else {
			dispatch(createPost(postData));
		}

		clear();
	};

	const clear = () => {
		setCurrentId(null);
		setPostData({
			creator: "",
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setPostData({ ...postData, selectedFile: reader.result });
		};
	};

	return (
		<PaperStyled>
			<FormContainer autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Typography variant="h6">
					{currentId ? "Edit" : "Create"} post
				</Typography>
				<TextField
					name="creator"
					variant="outlined"
					label="Creator"
					fullWidth
					value={postData.creator}
					onChange={(e) =>
						setPostData({ ...postData, creator: e.target.value })
					}
				/>
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.split(",") })
					}
				/>
				<div>
					<FileInput type="file" onChange={handleFileChange}></FileInput>
				</div>
				<SubmitButton
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					SUBMIT
				</SubmitButton>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</FormContainer>
		</PaperStyled>
	);
};

export default Form;
