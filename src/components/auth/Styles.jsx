import styled from "@emotion/styled";
import { Paper, Avatar, Button } from "@mui/material";

export const StyledPaper = styled(Paper)`
	margintop: theme.spacing(8);
	display: "flex";
	flexdirection: "column";
	alignitems: "center";
	padding: theme.spacing(2);
`;

export const StyledAvatar = styled(Avatar)`
	margin: theme.spacing(1);
	backgroundcolor: theme.palette.secondary.main;
`;

export const Form = styled.form`
	width: "100%";
	margintop: theme.spacing(3);
`;

export const SubmitButton = styled(Button)`
	margin: theme.spacing(3, 0, 2);
`;

/*
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  }, 
*/
