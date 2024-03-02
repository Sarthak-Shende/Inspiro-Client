import styled from "@emotion/styled";
import { Paper } from "@mui/material";

/* export const RootContainer = styled.div`
	"& .muitextfield-root": {
		margin: theme.spacing(1);
	}
`;
*/

export const PaperStyled = styled(Paper)`
	.MuiTextField-root {
		margin: 2rem};
	}
`;

export const FormContainer = styled.form`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

export const FileInput = styled.input`
	width: 97%;
	margin: 10px 0;
`;

export const SubmitButton = styled.button`
	margin-bottom: 10px;
`;
