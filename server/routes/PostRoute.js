import express from "express";

import { createPost } from "../controllers/Post.js"
import { deletePost } from "../controllers/Post.js"
import { getPosts } from "../controllers/Post.js"
import { getPost } from "../controllers/Post.js"

const router = express.Router()

router.post('/newPost', createPost)
router.get('/:id', getPost)
router.get('/getAll', getPosts)
router.delete('/delete/:id', deletePost)

export default router