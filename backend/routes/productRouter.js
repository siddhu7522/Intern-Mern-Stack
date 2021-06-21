const express=require("express")
const data = require("../data")
const productRouter=express.Router()
const Product=require("../models/productModel.js")
const expressAsyncHandler= require('express-async-handler');
const { ExpressPeerServer } = require("peer");

productRouter.get("/",expressAsyncHandler(async(req,res)=>{
    const products=await Product.find({})
    res.send(products)
}))



productRouter.get("/seed",expressAsyncHandler(async(req,res)=>{
    
    const createdProducts=await Product.insertMany(data.products)
    res.send({createdProducts})

   
}))
productRouter.get("/:id",expressAsyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if(product){
        res.send(product)
    }else{
        res.send("product not found")
    }
}))


module.exports=productRouter