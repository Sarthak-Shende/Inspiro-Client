import { useState } from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import { StyledPaper, StyledAvatar, Form, SubmitButton } from "./Styles";
import Input from "./Input";
import LockIcon from "@mui/icons-material/Lock";

const Auth = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const handleSubmit = () => {};
	const handleChange = () => {};
	let handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const switchMode = () => {
		setIsSignup((prevIsSignup) => !prevIsSignup);
		handleShowPassword = false;
	};

	return (
		<Container component="main" maxWidth="xs">
			<StyledPaper elevation={3}>
				<StyledAvatar>
					<LockIcon />
				</StyledAvatar>
				<Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
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
								handleChage={handleChange}
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
	);
};

export default Auth;
