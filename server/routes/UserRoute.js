import express from "express";

import { CreateUser } from "../controllers/User.js"
import { loginUser } from "../controllers/User.js"
import { updateUser } from "../controllers/User.js"

const router = express.Router()


router.post('/create', CreateUser)
router.put('/update/:id', updateUser)
router.post('/login', loginUser)

export default router