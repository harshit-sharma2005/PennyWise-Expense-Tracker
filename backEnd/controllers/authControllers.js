const jwt =require("jsonwebtoken")
const User = require('../models/User')
const express=require("express")


//generate JWT token
const generateToken=(id)=>{
    return jwt.sign(
        {id},               //payload
        process.env.JWT_SECRET, //secret key
        {expiresIn :'1h'}
    )
}

exports.registerUser = async (req,res)=>{
    console.log("Start register")
    const {fullName , email , password , profileImageUrl }=req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({message:"All field are required"})
    }

    try {
        //checking if email already exists
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email Already used"})
        }

        //create a new user if not exists
        console.log("creating user")
        const user=await User.create({
            fullName,
            email,
            password ,
            profileImageUrl
        })

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        })
        console.log("ending register")
    }catch(err){
        res.status(500).json({message:"Error registring user",error :err.message});
        }
    }

exports.loginUser = async (req,res)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        return res.status(400).json({message:"All fields are required"})
    }
    try{
        const user=await User.findOne({email})
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message:"Invalid credentials"})
        }
        res.status(200).json({
            id:user._id,
            user,
            token: generateToken(user._id),
        })
    }
    catch(err){
        res.status(500).json({message:"Error logging in user", error: err.message});
    }
};

exports.getUserInfo = async (req,res)=>{
    try{
        const user= await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({message:"Error fetching user info", error: err.message});
    }
};
