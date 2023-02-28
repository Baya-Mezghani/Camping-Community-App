import Post from "../models/Post.js"
import Comment from "../models/Comment.js"

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { commentBody, author, username } = req.body;

    const updatedPost = await Post.findOneAndUpdate(
        { _id: id },
        { $push: { comments: { commentBody,username,author }}},
        { new: true, runValidators: true }
    );

    res.json(updatedPost);
};
