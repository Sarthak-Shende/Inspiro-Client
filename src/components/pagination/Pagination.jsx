import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../posts/PostsSlice";
import { selectPosts } from "../posts/PostsSlice";

const Paginate = ( page ) => {
	const dispatch = useDispatch();
	const { numberOfPages } = useSelector(selectPosts);
	
	useEffect(() => {
		if (page.page) {
			dispatch(fetchPosts(page));
		}
	}, [page.page]);
	
	return (
		<Pagination
			count={numberOfPages}
			page={Number(page.page) || 1}
			color="primary"
			renderItem={(item) => (
				<PaginationItem
					{...item}
					component={Link}
					to={`/posts?page=${item.page}`}
				/>
			)}
		/>
	);
};

export default Paginate;
