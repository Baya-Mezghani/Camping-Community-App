import Post from "../models/Post.js"
import User from "../models/User.js"


export const createPost = async (req, res) => {
    const postData = req.body;

    const newPost = await Post.create(postData)

    const updateUser = await User.findByIdAndUpdate(
        postData.author,
        {$push:{posts: newPost._id}},
        {new:true}
    )
    if (newPost && updateUser){
        await newPost.save()
        await updateUser.save()
    try {
        if (newPost && updateUser){
            await newPost.save()
            await updateUser.save()
        }
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Post.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const getPosts = async (req, res) => { 
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Post.findById(id);

    if (post) {
        if (post.likes.find(like => like.username === username)) {
            // if post is already liked, then unlike it
            post.likes = post.likes.filter(like => like.username !== username);
        } else {
            // if post is unliked, then like post
            post.likes.push({
                username,
                createdAt: new Date().toISOString()
            })
        }
        await post.save();    
    res.json(post);
}
}