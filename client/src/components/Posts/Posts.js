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
		loading ? <CircularProgress className={classes.loader} /> : (
			<Grid className={classes.container} container alignItems='stretch' spacing={3}>
				{posts.map((post) => (
					<Grid key={post._id} item xs={12} sm={6}>
						<Post formRef={formRef} post={post} setCurrentId={setCurrentId} />
					</Grid>
				))}
			</Grid>
		)
	);
}

export default Posts;