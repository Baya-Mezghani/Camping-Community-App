import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import userRoute from "./routes/UserRoute.js"
import postRoute from "./routes/PostRoute.js"
import commentRoute from "./routes/CommentRoute.js"
import utils from "./utils/auth.js";



const app = express();
dotenv.config()


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req,res,next) => {
    utils.authMiddleware({req});
    next();
});


app.use('/users',userRoute)
app.use('/posts',postRoute)
app.use('/comment',commentRoute)




const PORT = process.env.PORT || 3000;
const db = process.env.MONGODB_URI

mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT,() => console.log(`🌎 Successfully, Now listening on port ${PORT}`))).catch((err) => console.log(err.message));
