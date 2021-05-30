import express from 'express';

import { getPosts, createPost, updatePost, deletePost } from '../controllers/posts.js';

import { dataValidation } from '../validation/dataValidation.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', dataValidation, createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;