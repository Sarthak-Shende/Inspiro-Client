import styled from "@emotion/styled";
import { Paper } from "@mui/material";

export const LoadingPaper = styled(Paper)`
	display: "flex";
	justifycontent: "center";
	alignitems: "center";
	padding: "20px";
	borderradius: "15px";
	height: "39vh";
`;

export const StyledCard = styled.div`
	display: "flex";
	width: "100%";
  [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    };
`;

export const StyledSection = styled.div`
	borderradius: "20px";
	margin: "10px";
	flex: 1;
`;

export const StyledImageSection = styled.div`
	marginleft: "20px";
	[theme.breakpoints.down("sm")]: {
		marginleft: 0;
	}
`;

export const StyledImg = styled.img`
	borderradius: "20px";
	objectfit: "cover";
	width: "100%";
	maxheight: "600px";
`;

/* 
media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
*/
