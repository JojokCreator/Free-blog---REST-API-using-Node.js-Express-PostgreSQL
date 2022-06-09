import express from "express";
import { getPosts, getPostById, deletePostById, createPost, updatePostById } from "../models/posts.js";
const router = express.Router()
import { authToken } from "../db/middleware/auth.js";

//Get all posts
router.get('/', authToken, getPosts);


//get post by id
router.get('/:id', getPostById);

// delete post by id
router.delete('/:id', deletePostById);

//create post 
router.post('/', authToken, createPost);

// Update post by ID
router.patch('/:id', updatePostById);

export default router