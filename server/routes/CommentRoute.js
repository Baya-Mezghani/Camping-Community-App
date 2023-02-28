import express from "express";

import { commentPost } from "../controllers/Comment.js"

const router = express.Router()

router.post('/:id', commentPost)

export default router
