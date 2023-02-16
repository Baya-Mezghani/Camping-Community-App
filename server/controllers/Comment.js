import Post from "../models/Post.js"
import Comment from "../models/Comment.js"

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const updatedPost = await Post.findOneAndUpdate(
        { _id: id },
        { $push: { comments: { value, username: Comment.User.username }}},
        { new: true, runValidators: true }
    );

    res.json(updatedPost);
};
