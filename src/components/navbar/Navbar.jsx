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
import inspiroLogo from "../../images/Inspiro_only_logo.jpg";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";


const Navbar = () => {
	const user = null;
	return (
		<StyledAppBar position="static" color="inherit">
			<BrandContainer>
				<Heading component={Link} to="/" variant="h2" align="center">
					Inspiro
				</Heading>
				<Image src={inspiroLogo} alt="inspiro" height="60" />
			</BrandContainer>
			<StyledToolbar>
				{user ? (
					<Profile>
						<StyledAvatar alt={user.result.name} src={user.result.imageUrl}>
							{user.result.name.charAt(0)}
						</StyledAvatar>
						<Username variant="h6">{user.result.name}</Username>
						<LogoutButton variant="contained" color="secondary">
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
