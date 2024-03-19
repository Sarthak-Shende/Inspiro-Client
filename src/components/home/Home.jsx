import { Container, Grow, Grid } from "@mui/material";
import Posts from "../posts/Posts";
import Form from "../form/Form";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../posts/PostsSlice";

const Home = () => {
  const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(null);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [currentId, dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid
					container
					sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}
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
	);
};

export default Home;
