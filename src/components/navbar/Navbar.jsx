import {
	StyledAppBar,
	Heading,
	Image,
	BrandContainer,
	StyledToolbar,
	Profile,
	LogoutButton,
	Username,
	StyledAvatar,
} from "./Styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutProfile } from "../auth/AuthSlice";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const [user, setUser] = useState(
		localStorage.getItem("profile") !== undefined
			? JSON.parse(localStorage.getItem("profile"))
			: null
	);

	useEffect(() => {
		const token = user?.token;
		if (token) {
			const decodedToken = jwtDecode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	const logout = () => {
		dispatch(logoutProfile());
		navigate("/");
		setUser(null);
	};

	return (
		<StyledAppBar position="static" color="inherit">
			<BrandContainer>
				<Heading component={Link} to="/" variant="h2" align="center">
					Inspiro
				</Heading>
				<Image src={'https://i.ibb.co/GFnY9B3/Inspiro-only-logo.jpg'} alt="inspiro" height="60" />
			</BrandContainer>
			<StyledToolbar>
				{user ? (
					<Profile>
						<StyledAvatar alt={user.name} src={user?.picture}>
							{user.name.charAt(0)}
						</StyledAvatar>
						<Username variant="h6">{user.name}</Username>
						<LogoutButton
							variant="contained"
							color="secondary"
							onClick={logout}
						>
							Logout
						</LogoutButton>
					</Profile>
				) : (
					<Button
						component={Link}
						to="/auth"
						variant="contained"
						color="primary"
					>
						Sign In
					</Button>
				)}
			</StyledToolbar>
		</StyledAppBar>
	);
};

export default Navbar;
