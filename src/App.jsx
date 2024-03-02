import { Container, Grow, Grid } from "@mui/material";
import inspiroLogo from "./images/Inspiro_only_logo.jpg";
import Posts from "./components/posts/Posts";
import Form from "./components/form/Form";
import { StyledAppBar, Heading, Image } from "./Styles";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "./components/posts/PostsSlice";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPosts());
	},[]);

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
						justify="space-between"
						alignItems="stretch"
						spacing="3"
					>
						<Grid item xs={12} sm={7}>
							<Posts />
						</Grid>

						<Grid item xs={12} sm={4}>
							<Form />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
}

export default App;
