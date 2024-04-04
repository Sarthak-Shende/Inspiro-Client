import styled from "@emotion/styled";
import { Paper, Avatar, Button } from "@mui/material";

export const StyledPaper = styled(Paper)`
	margintop: theme.spacing(8);
	display: flex;
	flex-wrap: wrap;
	flexdirection: column;
	alignitems: center;
	padding: theme.spacing(2);
	justify-content: center;
`;

export const StyledAvatar = styled(Avatar)`
	margin: theme.spacing(1);
	backgroundcolor: theme.palette.secondary.main;
	justify-content: center;
`;

export const Form = styled.form`
	width: "100%";
	margintop: theme.spacing(3);
`;

export const SubmitButton = styled(Button)`
	margin: theme.spacing(3, 0, 2);
`;
