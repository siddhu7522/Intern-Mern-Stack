const express=require("express")
// const data=require("./data.js")
const mongoose=require("mongoose");
const userRouter = require("./routes/userRouter");
const dotenv=require("dotenv")
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");

dotenv.config()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.MONGO_URI,{
  
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
    }).then(console.log("connected successfully"))
    .catch((err)=>console.log(err));

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });
// app.get("/api/products",(req,res)=>{
//     res.send(data.products)
// })
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

// app.get("/api/products/:id",(req,res)=>{
//     const product=data.products.find((x)=>x._id===req.params.id)
//     if(product){
//         res.send(product)
//     }else{
//         res.status(400).send({message:"product not found"})
//     }
// })

app.listen(5000,()=>{
    console.log("server is running")
})