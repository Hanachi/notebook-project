import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {
	Container,
	AppBar,
	Typography,
	Grow,
	Grid,
} from '@material-ui/core';

import { getPosts } from './actions/posts';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

import useStyles from './styles';

const App = () => {
	const [currentId, setCurrentId] = useState(null);
	const classes = useStyles();
	const formRef = useRef(null)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);
	
	return (
		<Container maxwidth='lg'>
			<AppBar className={classes.appBar} position='static' color='inherit'>
				<Typography className={classes.heading} variant='h2' align='center'>Note book</Typography>
			</AppBar>
			<Grow in>
				<Container>
					<Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3}>
						<Grid className={classes.loader} justify='center' alignItems='center' item xs={12} sm={7}>
							<Posts formRef={formRef} setCurrentId={setCurrentId} />
						</Grid>
						<Grid  item xs={12} sm={4}>
							<Form ref={formRef} currentId={currentId} setCurrentId={setCurrentId} formRef={formRef} />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
}

export default App;