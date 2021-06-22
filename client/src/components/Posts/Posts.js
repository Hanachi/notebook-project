import React from 'react';
import { useSelector } from 'react-redux';

import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId, formRef }) => {
	const posts = useSelector((state) => state.posts.list);
	const loading = useSelector((state) => state.posts.loading);

	const classes = useStyles();

	return (
		
			<Grid className={classes.loader} container alignItems={loading ? 'center' : 'stretch'} justify={loading ? 'center' : 'stretch'} spacing={3}>
				{loading ? <CircularProgress /> : 
					posts.map((post) => (
						<Grid key={post._id} item xs={12} sm={6}>
							<Post formRef={formRef} post={post} setCurrentId={setCurrentId} />
						</Grid>
					))}
			</Grid>
	);
}

export default Posts;