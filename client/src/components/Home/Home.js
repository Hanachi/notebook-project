import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';

import {
	Container,
	Grow,
	Grid,
} from '@material-ui/core';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import useStyles from '../../styles';

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
	const classes = useStyles();
	const formRef = useRef(null)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);
  
  return (
    <Grow in>
    <Container>
      <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Posts formRef={formRef} setCurrentId={setCurrentId} />
        </Grid>
        <Grid  item xs={12} sm={12} md={12} lg={4}>
          <Form ref={formRef} currentId={currentId} setCurrentId={setCurrentId} formRef={formRef} />
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home
