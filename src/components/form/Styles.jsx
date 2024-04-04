import styled from "@emotion/styled";
import { Paper, Button, Input } from "@mui/material";

export const PaperStyled = styled(Paper)`
	.MuiTextField-root {
		margin: 0.3rem};
	}
`;

export const FormContainer = styled.form`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

export const FileInput = styled(Input)`
	background-color: #088d96;
	color: white;
	margin-bottom: 5px;
`;

export const SubmitButton = styled(Button)`
	margin-bottom: 5px;
`;
