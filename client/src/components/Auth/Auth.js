import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
	TextField,
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlineIcon from '@material-ui/icons/LockOutlined';

import { FIRSTNAME_AND_LASTNAME_REGEXP, EMAIL_REGEXP, PASSWORD_REGEXP, PHONENUMBER_REGEXP } from '../../constants/regExps';
import { FIRSTNAME_ERROR_TEXT, LASTNAME_ERROR_TEXT, EMAIL_ERROR_TEXT, PASSWORD_ERROR_TEXT, PHONENUMBER_ERROR_TEXT } from '../../constants/validationErrorText';

import { GoogleLogin } from 'react-google-login';

import Icon from './icon';
import Input from './Input';

import { signin, signup } from '../../actions/auth';

import useStyles from './styles';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
	phoneNumber: '',
}

const Auth = () => {
  const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const [errors, setErrors] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		phoneNumber: '',
		isError: '',
	});
	const [success, setSuccess] = useState(false);
	const [open, setOpen] = useState();

	const snackbarMessage = success ? 'Success' : 'Form Is Not Valid';


	useEffect(() => {
		setErrors((prevErr) => ({
			...prevErr,
			firstName: null,
			lastName: null,
			email: null,
			password: null,
			confirmPassword: null,
			phoneNumber: null,
			isError: '',
		}))
}, [])

	const handleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword );
	}
	const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

	function validateData() {
		Object.keys(formData).forEach((item) => isSignup ? signUpValidation('', item) : signInValidation('', item));
	}

	const signUpValidation = (e, value) => {
		const switchValue = value || e?.target?.name;

		const isFirstNameValid = FIRSTNAME_AND_LASTNAME_REGEXP.test(formData.firstName);
		const isLastNameValid = FIRSTNAME_AND_LASTNAME_REGEXP.test(formData.lastName);
		const isEmailValid = EMAIL_REGEXP.test(formData.email);
		const isPasswordValid = PASSWORD_REGEXP.test(formData.password);
		const isConfirmPasswordValid = PASSWORD_REGEXP.test(formData.confirmPassword);
		const isPhoneNumberValid = PHONENUMBER_REGEXP.test(formData.phoneNumber);

		switch(switchValue) {
			case('firstName'): {
				const errorText = isFirstNameValid ? null : FIRSTNAME_ERROR_TEXT;
					setErrors((prevErr) => ({
						...prevErr,
						firstName: errorText
					}));

					if (e?.target?.name) {
						break;
					}
			}
			case('lastName'): {
				const errorText = isLastNameValid ? null : LASTNAME_ERROR_TEXT;

				setErrors((prevErr) => ({
					...prevErr,
					lastName: errorText
				}));

				if (e?.target?.name) {
					break;
				}
			} 
			case('email'): {
				const errorText = isEmailValid ? null : EMAIL_ERROR_TEXT;

				setErrors((prevErr) => ({
					...prevErr,
					email: errorText
				}));

				if (e?.target?.name) {
					break;
				}
			}
			case('password'): {
				const errorText = isPasswordValid ? null : PASSWORD_ERROR_TEXT;

				setErrors((prevErr) => ({
					...prevErr,
					password: errorText,
				}));

				if (e?.target?.name) {
					break;
				}
			}
			case('confirmPassword'): {
				const errorText = isConfirmPasswordValid ? null : PASSWORD_ERROR_TEXT;

				setErrors((prevErr) => ({
					...prevErr,
					confirmPassword: errorText,
				}));

				if (e?.target?.name) {
					break;
				}
			}
			case('phoneNumber'): {
				const errorText = isPhoneNumberValid ? null : PHONENUMBER_ERROR_TEXT;

				setErrors((prevErr) => ({
					...prevErr,
					phoneNumber: errorText,
				}));

				if (e?.target?.name) {
					break;
				}
			}
			
		}
		if(isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isPhoneNumberValid) {
			setErrors((prevErr) => ({ ...prevErr, isError: null }));
		}
	}

	const signInValidation = (e, value) => {
		const switchValue = value || e?.target?.name;

		const isEmailValid = EMAIL_REGEXP.test(formData.email);
		const isPasswordValid = PASSWORD_REGEXP.test(formData.password);

		switch(switchValue) {
			case('email'): {
				const errorText = isEmailValid ? null : EMAIL_ERROR_TEXT;

				setErrors((prevErr) => ({
					...prevErr,
					email: errorText
				}));

				if (e?.target?.name) {
					break;
				}
			}
			case('password'): {
				const errorText = isPasswordValid ? null : PASSWORD_ERROR_TEXT;

				setErrors((prevErr) => ({
					...prevErr,
					password: errorText,
					confirmPassword: null,
				}));

				if (e?.target?.name) {
					break;
				}
			}
		}
			if(isEmailValid && isPasswordValid) {
				setErrors((prevErr) => ({ ...prevErr, isError: null }));
			}
	}
  
  const handleSubmit = async (event) => {
		event.preventDefault();

		validateData();
		const isFormValid = Object.keys(errors).every((item) => errors[item] === null);

		if(isFormValid) {
			if(isSignup) {
				const resp = await dispatch(signup(formData, history));
				setSuccess(resp?.success);
				setErrors((prevErr) => ({
					...prevErr,
					email: resp?.messageUser || null,
					confirmPassword: resp?.messagePassword || null,
					isError: '',
				}));
				setOpen(true);
			} else {
				const resp = await dispatch(signin(formData, history));
				setSuccess(resp?.success);
				setErrors((prevErr) => ({
					...prevErr,
					email: resp?.messageUser || null,
					password: resp?.messagePassword || null,
					isError: '',
				}));
				setOpen(true);
			}
		} else {
			setSuccess(false);
		}
		setOpen(true);
  }

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	}

	const switchMode = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp);
		setShowPassword(false);
		setErrors((prevErr) => ({
			...prevErr,
			firstName: null,
			lastName: null,
			email: null,
			password: null,
			isError: '',
		}))
		setFormData(initialState);
	}
	
	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: 'AUTH', data: { result, token }});
			
			history.push('/');
		} catch (error) {
			console.log(error)
		}
	}

	const googleFailure = (error) => {
		console.log(error)
		console.log('Google Sign In was unsuccessful. Try again later');
	}

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlineIcon />
        </Avatar>
        <Typography variant='h5'>
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
						{ isSignup && (
								<React.Fragment>
									<Input
										name='firstName'
										error={errors?.firstName}
										helperText={errors?.firstName || null}
										value={formData.firstName}
										label='First Name'
										handleChange={handleChange}
										handleValidation={signUpValidation}
										half
									/>
									<Input
										name='lastName'
										error={errors?.lastName}
										helperText={errors?.lastName || null}
										value={formData.lastName}
										label='Last Name'
										handleChange={handleChange}
										handleValidation={signUpValidation}
										half
									/>
									<Input
										name='phoneNumber'
										error={errors?.phoneNumber}
										helperText={errors?.phoneNumber || null}
										value={formData.phoneNumber}
										label='Phone Number'
										handleChange={handleChange}
										handleValidation={signUpValidation}
									/>	
								</React.Fragment>
						)}
						<Input
							name='email'
							error={errors?.email}
							helperText={errors?.email || null}
							value={formData.email}
							label='Email Address'
							handleChange={handleChange}
							handleValidation={isSignup ? signUpValidation : signInValidation}
							type='email'
						/>
						<Input
							name='password'
							error={errors?.password}
							helperText={errors?.password || null}
							value={formData.password}
							label='Password'
							handleChange={handleChange}
							handleValidation={isSignup ? signUpValidation : signInValidation}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name='confirmPassword'
								error={errors?.confirmPassword}
								helperText={errors?.confirmPassword || null}
								value={formData.confirmPassword}
								label='Repeat Password'
								handleChange={handleChange}
								handleValidation={signUpValidation}
								type={showPassword ? 'text' : 'password'}
								handleShowPassword={handleShowPassword}
							/>
						)}
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>
					<GoogleLogin
						clientId='721990302286-27ou6086f8l42gkflb6p48e5c89hj6j4.apps.googleusercontent.com'
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color='primary'
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant='contained'
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy='single_host_origin'
					/>
					<Grid container justify='flex-end'>
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
							</Button>
						</Grid>
					</Grid>
        </form>
				<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
				<MuiAlert
					elevation={6}
					variant="filled"
					severity={success ? 'success' : 'error'}
					onClose={handleClose}
				>
					{snackbarMessage}
				</MuiAlert>
			</Snackbar>
      </Paper>
    </Container>
  )
}

export default Auth
