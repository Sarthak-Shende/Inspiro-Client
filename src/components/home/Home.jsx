import {
	Container,
	Grow,
	Grid,
	Paper,
	TextField,
	Chip,
	Box,
} from "@mui/material";
import { StyledAppBar, SearchButton } from "./Styles";
import Posts from "../posts/Posts";
import Form from "../form/Form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchPostsBySearch } from "../posts/PostsSlice";
import Pagination from "../pagination/Pagination";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}
const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [tags, setTags] = useState([]);
	const query = useQuery();

	const page = query.get("page") || 1;
	const searchQuery = query.get("searchQuery");
	
	const handleAdd = (tag) => {
		if (!tags.includes(tag)) {
			setTags([...tags, tag]);
		}
	};
	const handleDelete = (tagToDelete) =>
		setTags(tags.filter((tag) => tag !== tagToDelete));

	const handleKeyPressTags = (e) => {
		if (e.key === "Enter") {
			handleAdd(e.target.value);
			e.target.value = "";
		}
	};

	const searchPost = () => {
		if (search.trim() || tags) {
			dispatch(fetchPostsBySearch({ search, tags: tags.join(",") }));
			navigate(
				`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
			);
		} else {
			navigate("/");
		}
	};

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid
					container
					sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}
					justify="space-between"
					alignItems="stretch"
					spacing="3"
				>
					<Grid item xs={12} sm={6} md={9}>
						<Posts />
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<StyledAppBar position="static" color="inherit">
							<TextField
								name="search"
								variant="outlined"
								label="Search Posts"
								fullWidth
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<TextField
								name="tags"
								variant="outlined"
								label="Search Tags"
								fullWidth
								onKeyDown={handleKeyPressTags}
							/>
							<Box>
								{tags.map((tag) => (
									<Chip
										key={tag}
										label={tag}
										onDelete={() => {
											handleDelete(tag);
										}}
									/>
								))}
							</Box>
							<SearchButton
								onClick={searchPost}
								color="primary"
								variant="contained"
							>
								Search
							</SearchButton>
						</StyledAppBar>
						<br />
						<Form />
						<br />
						{!searchQuery && !tags.length && (
							<Paper elevation={6}>
								<Pagination page={page} />
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
