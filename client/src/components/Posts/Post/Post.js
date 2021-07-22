import React from 'react';
import { useDispatch } from 'react-redux';

import { Card, CardActions, CardContent, CardMedia, Button, Typography, Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip';

import moment from 'moment';

import useStyles from './styles';

import { deletePost, getPosts } from '../../../actions/posts';

const Post = ({ post, setCurrentId, formRef }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const postTags = post?.tags?.map((tag) => `#${tag} `);
	const avatarWithoutImage = post?.name?.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');
	const user = JSON.parse(localStorage.getItem('profile'));

	const executeScrollAndUpdate = (postID) => {
		setCurrentId(postID);
		formRef.current.scrollIntoView();
	}

	return (
		<Card className={classes.card}>
			<CardMedia className={classes.media} image={post.selectedBackgroundFile} title={post.title} />
			<div className={classes.overlay}>
				<Avatar className={classes.large} alt={post.name} src={post.selectedFile}>
					{avatarWithoutImage}
				</Avatar>
				<div className={classes.overlayInfo}>
					<Typography variant='h6'>{post.name}</Typography>
					<Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
				</div>
			</div>
			{(user?.result?.googleId === post?.author || user?.result?._id === post?.author) && (
				<div className={classes.overlayUpdate}>
					<Tooltip title="Update" aria-label="Update">
						<Button 
							onClick={() => executeScrollAndUpdate(post._id)} 
							style={{color: 'white'}} 
							size='small'
						>
							<MoreHorizIcon fontSize='default' />
						</Button>
					</Tooltip>
				</div>
			)}
			<div className={classes.details}>
				<Typography variant='body2' color='textSecondary'>{postTags}</Typography>
			</div>
			<Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
			<CardContent className={classes.cardMessage}>
				<Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				{(user?.result?.googleId === post?.author || user?.result?._id === post?.author) && (
					<Button 
						onClick={async () => {
							await dispatch(deletePost(post._id))
							await dispatch(getPosts())
							}} 
						size='small' 
						color='primary' 
					>
						<DeleteIcon fontSize='small' />
						&nbsp;Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
}

export default Post;