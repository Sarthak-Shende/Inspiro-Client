import styled from "@emotion/styled";
import { Paper } from "@mui/material";

export const LoadingPaper = styled(Paper)`
	display: flex;
	justifycontent: center;
	alignitems: center;
	padding: 20px;
	borderradius: 15px;
	height: 39vh;
`;

export const StyledCard = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	[theme.breakpoints.down(sm)]: {
		flexwrap: wrap;
		flexdirection: column;
	}
`;

export const StyledSection = styled.div`
	borderradius: 20px;

	margin: 10px;
	flex: 1;
`;

export const StyledImageSection = styled.div`
	marginleft: 20px;
	[theme.breakpoints.down(sm)]: {
		marginleft: 0;
	}
`;

export const StyledImg = styled.img`
	borderradius: 20px;
	objectfit: cover;
	maxheight: 600px;
`;

export const CommentsOuterContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: start;
	justify-content: space-between;
`;

export const CommentsInnerContainer = styled.div`
	height: 200px;
	overflowy: auto;
	marginright: 30px;
`;