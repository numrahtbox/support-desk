const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//@desk Register a new user
//@route /api/user
//@access Public

const userRegister = asyncHandler( async(req, res) =>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please fill all the required fields')
    }
    // find if user already exist
    const userExists  = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('User Already Exist')
    }
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name, 
            email : user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})
//@desk Login a new user
//@route /api/user/login
//@access Public
const userLogin = asyncHandler( async(req, res) =>{
    const {email, password} = req.body
    console.log('get request ',email,password)
    if(!email || !password){
        res.status(400)
        throw new Error('Please fill all the required fields')
    }
    // find if user already exist
    const user  = await User.findOne({email});
   // Check user and password match
   const matched = await bcrypt.compare(password, user.password)
   console.log(matched,password,user.password)
    if(user && matched){
        res.status(200).json({
            _id: user._id,
            name: user.name, 
            email : user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid Credentials')

    }
})

//@desc Get current user
//@route /api/users/me
//@access Private

const getMe = asyncHandler( async(req, res) =>{
    res.status(200).json(req.user)
})
const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
} 

module.exports = {
    userRegister,
    userLogin,getMe
}