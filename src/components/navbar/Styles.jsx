import styled from "@emotion/styled";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";

export const StyledAppBar = styled(AppBar)`
	border-radius: 15px;
	margin: 30px 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Heading = styled(Typography)`
	color: rgba(0, 183, 255, 1);
`;

export const Image = styled.img`
	margin-left: 15px;
`;

export const BrandContainer = styled.div`
	display: flex;
	align-items: center;
	margin-left: 20px;
`;

export const StyledToolbar = styled(Toolbar)`
	display: flex;
	justify-content: flex-end;
`;

export const Profile = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 10px;
`;

export const StyledAvatar = styled(Avatar)`
	color: theme.palette.getContrastText(deepPurple[500]);
	backgroundcolor: deepPurple[500];
	margin-right: 20px;
`;

export const Username = styled(Typography)`
	display: flex;
	alignitems: center;
	textalign: center;
	margin-right: 20px;
`;

export const LogoutButton = styled(Button)`
	marginleft: "20px";
`;
