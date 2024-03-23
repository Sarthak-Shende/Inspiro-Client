import { useState } from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import { StyledPaper, StyledAvatar, Form, SubmitButton } from "./Styles";
import Input from "./Input";
import LockIcon from "@mui/icons-material/Lock";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchProfile } from "./AuthSlice";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "./AuthSlice";

let initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Auth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const [formData, setFormData] = useState(initialState);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignup) {
			dispatch(signup(formData, navigate));
		} else {
			dispatch(signin(formData, navigate));
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	let handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const switchMode = () => {
		setIsSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	};

	const googleSuccess = async (response) => {
		const data = jwtDecode(response?.credential);

		try {
			dispatch(fetchProfile(data));
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = (error) => {
		console.log(error);
	};

	return (
		<>
			<Container component="main" maxWidth="xs">
				<StyledPaper elevation={3}>
					<StyledAvatar>
						<LockIcon />
					</StyledAvatar>
					<Typography variant="h5">
						{isSignup ? "Sign up" : "Sign in"}
					</Typography>
					<Form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							{isSignup && (
								<>
									<Input
										name="firstName"
										label="First Name"
										handleChange={handleChange}
										half
									/>
									<Input
										name="lastName"
										label="Last Name"
										handleChange={handleChange}
										half
									/>
								</>
							)}
							<Input
								name="email"
								label="Email Address"
								handleChange={handleChange}
								type="email"
							/>
							<Input
								name="password"
								label="Password"
								handleChange={handleChange}
								type={showPassword ? "text" : "password"}
								handleShowPassword={handleShowPassword}
							/>
							{isSignup && (
								<Input
									name="confirmPassword"
									label="Repeat Password"
									handleChange={handleChange}
									type="password"
								/>
							)}
						</Grid>
						<SubmitButton
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
						>
							{isSignup ? "Sign Up" : "Sign In"}
						</SubmitButton>
						<GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
						<Grid Container justify="flex-end">
							<Grid item>
								<Button onClick={switchMode}>
									{isSignup
										? "Already have an account? Sign In"
										: "Don't have an account? Sign Up"}
								</Button>
							</Grid>
						</Grid>
					</Form>
				</StyledPaper>
			</Container>
		</>
	);
};

export default Auth;
