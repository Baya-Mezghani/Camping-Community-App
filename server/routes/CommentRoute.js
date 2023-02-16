import express from "express";

import { commentPost } from "../controllers/Comment.js"

const router = express.Router()

router.post('/newComment', commentPost)

export default router
