const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //check if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            })
        }

        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //generate otp and its expiry time
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 mins

        //create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            otp,
            otpExpiration
        });

        await newUser.save();

        //send otp via email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}. And it expires in 10 minutes`
        });

        res.status(200).json({
            success: true,
            message: "Your OTP has been sent successfully! Please check your email"
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Could not send OTP! Confirm your email."
        });
    }
};


const verifyOtp = async(req,res)=>{
    try {
        const {email,otp} = req.body;

        //find user with email in db
        const user = await User.findOne({email, otp});
        
    if(!user || user.otpExpiration < new Date()){
        return res.status(400).json({
            success: false,
            message: 'Invalid or expired otp! Try again'
        });
    }

        res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User does not exist'
            });
        }

        //check for password correctness
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid password!Check and try again'
            });
        }

        //create user token
        const token = jwt.sign({
            userId: user._id,
            email: user.email
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '30m'
        });

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            token
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

module.exports = {registerUser, verifyOtp, loginUser};