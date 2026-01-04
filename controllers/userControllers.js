const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');



exports.registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({
            $or: [{email},{username}]
        });

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            message:"Registered successfully",
            token
        });


    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json(
            {
                success: false,
                message: 'User Registration failed!',
                error: error.message
            }
        )
    }
};

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({
                message: "Invalid email"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token= jwt.sign(
            {_id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            message:"Login successfully",
            token
        });

    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json(
            {
                success: false,
                message: 'Login attempt failed!',
                error: error.message
            }
        )
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({
                message: "User Not found!"
            });
        }

        res.status(200).json({
            message: "User Found",
            data: user
        })
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json(
            {
                success: false,
                message: 'Server Error',
                error: error.message
            }
        )
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const {username, bio, profileImage, password} = req.body;
        const user = await User.findById(req.user.id).select('+password');
        
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        if(username) user.username = username;
        if(bio) user.bio = bio;
        if(profileImage) user.profileImage = profileImage;

        if(password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            bio: updatedUser.bio,
            profileImage: updatedUser.profileImage,
            role: updatedUser.role
        });

    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json(
            {
                success: false,
                message: 'Server Error',
                error: error.message
            }
        )
    }
};