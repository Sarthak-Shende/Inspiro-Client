import { Container } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";

function App() {
	return (
		<BrowserRouter>
			<Container maxWidth="lg">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/auth" element={<Auth />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

export default App;
