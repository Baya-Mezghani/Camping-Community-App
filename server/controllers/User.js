import User from "../models/User.js"
import utils from "../utils/auth.js";

export const CreateUser =  async (req,res) => {
    const userData = req.body
    const user = await User.create(userData);
    const token = utils.signToken(user);
    return { token, user };
}


export const loginUser =  async (req,res) => {
    const { email,password } = req.body

    try {
        const user = await User.findOne({ email });

     if (!user) {
         return res.status(200).json({ ok: false, msg: 'Email not found' })
        }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
        return res.status(200).json({
            ok: false,
            msg: 'Incorrect Password',
        })}

    const token = utils.signToken(user);
    return { token, user };
    }
    catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'An error occured, contact an administrator',
        })

}
}

export const updateUser = async (req,res) => {
    const { id } = req.params
    const newData = req.body
    try {
        const userUpdated = await User.findOneAndUpdate({ _id: id }, newData, {
            new: true,
        })

        if (userUpdated) {
            return res
                .status(200)
                .json({ ok: true, msg: 'Updated!', userUpdated })
        }

        return res.status(200).json({
            ok: false,
            msg: "You do not have permission to do that",
        })
            
        }
        catch (error) {
            console.log(error)
            return res.status(404).json({
                ok: false,
                msg: 'You need to be logged in',
            })
        }
    }

