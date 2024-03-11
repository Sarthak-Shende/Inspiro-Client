import { Container, Grow, Grid } from "@mui/material";
import inspiroLogo from "./images/Inspiro_only_logo.jpg";
import Posts from "./components/posts/Posts";
import Form from "./components/form/Form";
import { StyledAppBar, Heading, Image } from "./Styles";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "./components/posts/PostsSlice";

function App() {
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(null);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [currentId, dispatch]);

	return (
		<Container maxWidth="lg">
			<StyledAppBar position="static" color="inherit">
				<Heading variant="h2" align="center">
					Inspiro
				</Heading>
				<Image src={inspiroLogo} alt="inspiro" height="60" />
			</StyledAppBar>
			<Grow in>
				<Container>
					<Grid
						container
						sx={{ flexDirection: { xs: "column-reverse", sm:"row" } }}
						justify="space-between"
						alignItems="stretch"
						spacing="3"
					>
						<Grid item xs={12} sm={7}>
							<Posts setCurrentId={setCurrentId} />
						</Grid>

						<Grid item xs={12} sm={4}>
							<Form currentId={currentId} setCurrentId={setCurrentId} />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
}

export default App;
