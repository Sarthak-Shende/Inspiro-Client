import { Container } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import PostDetails from "./components/post details/PostDetails";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
	const user = JSON.parse(localStorage.getItem("profile"));

	return (
		<BrowserRouter>
			<Container maxWidth="xl">
				<Navbar />
				<Routes>
					<Route path="/" element={<Navigate to="/posts" replace />} />
					<Route path="/posts" element={<Home />} />
					<Route path="/posts/search" element={<Home />} />
					<Route path="/posts/:id" element={<PostDetails />} />
					<Route
						path="/auth"
						element={!user ? <Auth /> : <Navigate to="/posts" replace />}
					/>
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

export default App;
