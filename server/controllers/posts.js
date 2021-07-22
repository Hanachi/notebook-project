import  mongoose  from 'mongoose';
import PostMessage from '../models/postMessage.js';

import { validationResult } from 'express-validator';

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find().sort({ createdAt: 'desc'});

		res.status(200)
			.json({
				data: postMessages,
				success: true
			});

	} catch (error) {

		res.status(404).json({ message: error.message, success: false });
		
	}
}

export const createPost = async (req, res) => {
	const post = req.body;
	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array(), success: false });
		return;
	}
	const newPost = new PostMessage({ ...post, author: req.userId, createdAt: new Date().toISOString() });

	try {

		await newPost.save();
		res.status(201)
		.json({
			data: newPost,
			success: true
		});

	} catch (error) {

		res.status(409).json({ message: error.message, success: false });			

	}
}

export const updatePost = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;

	if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

	const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

	res.status(201).json({ data: updatedPost, success: true });
}

export const deletePost = async (req, res) => {
	const { id } = req.params;

	if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

	await PostMessage.findByIdAndRemove(id);

	res.json({ message: 'Post deleted successfully' });
}