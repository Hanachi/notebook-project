/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { TextField, Button, Typography, Paper } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from './styles';
import { AUTHOR_AND_TITLE_REGEXP, TAGS_REGEXP, MESSAGE_REGEXP } from '../../constants/regExps';
import { AUTHOR_AND_TITLE_ERROR_TEXT, TAGS_ERROR_TEXT, MESSAGE_ERROR_TEXT } from '../../constants/validationErrorText';
import { createPost, getPosts, updatePost } from '../../actions/posts';


const Form = ({ currentId, setCurrentId, formRef }) => {
	const [postData, setPostData] = useState({
		author: '',
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
		selectedBackgroundFile: '',
	});
	const [errors, setErrors] = useState({
		author: '',
		title: '',
		tags: '',
		message: '',
		isError: '',
	});

  const [open, setOpen] = useState(false);
	const [success, setSuccess] = useState(false);
	
	const post = useSelector((state) => currentId ? (state.posts.list?.find((post) => post._id === currentId) || {}) : null)

	const formTitle = currentId ? 'Editing a Post' : 'Creating a Post';
	const snackbarMessage = success ? 'Message Posted!' : 'Form Is Not Valid';

	const classes = useStyles();
	const dispatch = useDispatch();
	
	useEffect(() => {
		if (currentId) {
			setPostData((prevState) => ({
				...prevState,
				author: post.author,
				title: post.title,
				tags: post.tags,
				message: post.message
			}));
		}
	}, [currentId])

	useEffect(() => {
		if(currentId) {
			validateData();
		}
	}, [postData, currentId])

	useEffect(() => {
		setErrors((prevErr) => ({
			...prevErr,
			author: null,
			title: null,
			tags: null,
			message: null,
			isError: '',
		}))
}, [])

	function validateData() {
		Object.keys(postData).forEach((item) => handleValidation('', item));
	}
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

	const handleValidation = (e, value) => {
		const switchValue = value || e?.target?.name;

		const isAuthorValid = AUTHOR_AND_TITLE_REGEXP.test(postData.author);
		const isTitleValid = AUTHOR_AND_TITLE_REGEXP.test(postData.title);
		const isTagsValid = TAGS_REGEXP.test(postData.tags);
		const isMessageValid = MESSAGE_REGEXP.test(postData.message);

		switch(switchValue) {
			case('author'): {
				const errorText = isAuthorValid ? null : AUTHOR_AND_TITLE_ERROR_TEXT;
					setErrors((prevErr) => ({
						...prevErr,
						author: errorText
					}));

					if (e?.target?.name) {
						break;
					}
			}
			case('title'): {
				const errorText = isTitleValid ? null : AUTHOR_AND_TITLE_ERROR_TEXT;

				setErrors((prevErr) => ({
					...prevErr,
					title: errorText
				}));

				if (e?.target?.name) {
					break;
				}
			} 
			case('tags'): {
				const errorText = isTagsValid ? null : TAGS_ERROR_TEXT;

				setErrors((prevErr) => ({
					...prevErr,
					tags: errorText
				}));

				if (e?.target?.name) {
					break;
				}
			}
			case('message'): {
				const errorText = isMessageValid ? null : MESSAGE_ERROR_TEXT;

				setErrors((prevErr) => ({
					...prevErr,
					message: errorText,
				}));

				if (e?.target?.name) {
					break;
				}
			}
			
		}
		if(isAuthorValid && isTitleValid && isTagsValid && isMessageValid) {
			setErrors((prevErr) => ({ ...prevErr, isError: null }));
		}
	}

	const handleSubmitPost = async (event) => {
		event.preventDefault();

		validateData();

		const isFormValid = Object.keys(errors).every((item) => errors[item] === null);

		if(isFormValid) {
			const callFunc = currentId ? (updatePost(currentId, postData)) : (createPost(postData));
			const resp = await callFunc(dispatch);
			setSuccess(resp?.success);
			await dispatch(getPosts());
			clearOnSubmit();
			setOpen(true);
		} else {
			setSuccess(false);
		}
		setOpen(true);

	}

	const clearForm = () => {
		setCurrentId(null);
		setPostData({
			...postData,
			author: '',
			title: '',
			tags: '',
			message: '',
			selectedFile: '',
			selectedBackgroundFile: '',
		});
		setErrors((prevErr) => ({
			...prevErr,
			author: null,
			title: null,
			tags: null,
			message: null,
			isError: '',
		}))
	} 
	const clearOnSubmit = () => {
		setCurrentId(null);
		setPostData({
			...postData,
			author: `${postData.author}`,
			title: '',
			tags: '',
			message: '',
			selectedFile: '',
			selectedBackgroundFile: '',
		});
		setErrors((prevErr) => ({
			...prevErr,
			author: null,
			title: null,
			tags: null,
			message: null,
			isError: '',
		}))
	}

	return (
		<Paper className={classes.paper}>
			<form
				ref={formRef}
				autoComplete='off'
				className={`${classes.root} ${classes.form}`}
				onReset={clearForm}
				onSubmit={handleSubmitPost}
			>
				<Typography variant='h6'>{formTitle}</Typography>
				<TextField 
					name='author'
					placeholder={'firstName or firstName lastName'}
					error={errors?.author}
					helperText={errors?.author || null}
					variant='outlined'
					label='Author' 
					fullWidth
					value={postData.author}
					onBlur={handleValidation}
					onChange={(event) => setPostData({ ...postData, author: event.target.value })}
				/>
				<TextField 
					name='title'
					error={errors?.title}
					helperText={errors?.title || null} 
					variant='outlined'
					label='Title' 
					fullWidth
					value={postData.title}
					onBlur={handleValidation}
					onChange={(event) => setPostData({ ...postData, title: event.target.value })} 
				/>
				<TextField 
					name='tags'
					error={errors?.tags}
					helperText={errors?.tags || null}  
					variant='outlined'
					label='Tags (coma separated)'
					placeholder='tag1,tag2,tag3'
					fullWidth 
					value={postData.tags}
					onBlur={handleValidation}
					onChange={(event) => setPostData({ ...postData, tags: event.target.value.split(',') }) }
				/>
				<TextField
					name='message'
				  rows={7}
					rowsMax={7}
					multiline
					fullWidth
					variant='outlined'
					label='Message'
					placeholder="Message" 
					error={errors?.message}
					helperText={errors?.message ||	 null} 
					value={postData.message}
					onBlur={handleValidation}
					onChange={(event) => setPostData({ ...postData, message: event.target.value })}
				/>
				<Tooltip title='Select avatar' aria-label='Select avatar' placement='left'>
					<div className={classes.fileInput}>
						<FileBase 
							type='file'
							multiple={false}
							onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
						/>
					</div>
				</Tooltip>
				<Tooltip title='Select background image' aria-label='Select background image' placement='left'>
					<div className={classes.fileInput}>
						<FileBase 
							type='file'
							multiple={false}
							onDone={({base64}) => setPostData({ ...postData, selectedBackgroundFile: base64})}
						/>
					</div>
				</Tooltip>
				<Button 
					className={classes.buttonSubmit} 
					type='submit' 
					variant='contained' 
					color='primary' 
					size='large'
					fullWidth
				>
					Submit
				</Button>
				<Button
					type='reset' 
					variant='contained' 
					color='secondary' 
					size='large' 
					fullWidth
				>
					Clear
				</Button>
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

	);
}

export default Form;