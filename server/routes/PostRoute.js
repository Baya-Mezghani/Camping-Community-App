import express from "express";

import { createPost } from "../controllers/Post.js"
import { deletePost } from "../controllers/Post.js"
import { getPosts } from "../controllers/Post.js"
import { getPost } from "../controllers/Post.js"
import { likePost } from "../controllers/Post.js";

const router = express.Router()

router.post('/newPost', createPost)
router.get('/:id', getPost)
router.get('/', getPosts)
router.delete('/delete/:id', deletePost)
router.post('/like/:id' , likePost)

export default router