const express=require("express")
const userRouter=express.Router()
const data =require("../data.js")
const User=require("../models/userModel.js")
const bcrypt=require("bcryptjs")
const generateToken = require("../utils.js")
const expressAsyncHandler = require("express-async-handler")

userRouter.get("/seed",async(req,res)=>{
    const createdUsers=await User.insertMany(data.users)
    res.send({createdUsers})
})

userRouter.post(
    '/signin',
    async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send("inavlid email or password");
    })
  userRouter.post("/register",expressAsyncHandler(async(req,res)=>{
    const user= await new User({
      name:req.body.name,
      email:req.body.email,
      password:bcrypt.hashSync(req.body.password,8)
    })
    const createdUser=await  user.save()
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
     

    

  }))



module.exports=userRouter