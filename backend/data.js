const bcrypt=require("bcryptjs")
const data={
    users:[
        {
            name:"siddhu",
            email:"siddhureddy7522@gmail.com",
            password:bcrypt.hashSync("1234",8),
            isAdmin:true
        },
        {
            name:"pavan",
            email:"pavanreddy7522@gmail.com",
            password:bcrypt.hashSync("1234",8),
            isAdmin:false
        },

    ],
    products:[
        {
            
            name:"Bigmuscles Nutrition Premium Gold Whey 1Kg",
            category:"Nutrition",
            image:"/images/p1.jpg",
            price:400,
            review:"Best product",
            rating:4.5,
            numReviews:10,
            description:"Qaulity  product",
            countInStock:10

        },
        {
           
            name:"Vivo Y20i (Dawn White, 3GB RAM, 64GB Storage)",
            category:"Mobiles",
            image:"/images/p2.jpg",
            price:11490,
            review:"Best product",
            rating:4.5,
            numReviews:10,
            description:"Qaulity  product",
            countInStock:14

        },
        {
           
            name:"NIVEA Men Face Wash, Dark Spot Reduction, for Clean & Clear Skin with 10x Vitamin C Effect, 100 g ",
            category:"Men",
            image:"/images/p3.jpg",
            price:138,
            review:"Best product",
            rating:4.5,
            numReviews:10,
            description:"Qaulity  product",
            countInStock:0

        },
        {
            
            name:"Bigmuscles Nutrition Premium Gold Whey 1Kg",
            category:"Nutrition",
            image:"/images/p4.webp",
            price:400,
            review:"Best product",
            rating:4.5,
            numReviews:10,
            description:"Qaulity  product",
            countInStock:15

        },
        {
           
            name:"Steelbird SB-50 Adonis Classic Black with Plain Visor,600mm ",
            category:"Men",
            image:"/images/p5.webp",
            price:690,
            review:"Best product",
            rating:4.5,
            numReviews:10,
            description:"Qaulity  product",
            countInStock:12

        },
        {
            
            name:"Logitech B170 Wireless Mouse 2.4 GHz with USB Nano Receiver, Optical Tracking, 12-Months Battery Life, Ambidextrous, PC/Mac/Laptop - Black ",
            category:"Electronics",
            image:"/images/p6.jpg",
            price:695,
            review:"Best product",
            rating:4.5,
            numReviews:10,
            description:"Qaulity  product",
            countInStock:31

        },
        {
           
            name:"Drools Chicken and Egg Adult Dog Food, 18kg",
            category:"Nutrition",
            image:"/images/p7.jpg",
            price:2340,
            description:"Qaulity  product",
            rating:4,
            numReviews:10,
            countInStock:20

        },
        {
           
            name:"Bigmuscles  Premium Gold Whey 1Kg",
            category:"Nutrition",
            image:"/images/p8.jpg",
            price:800,
            description:"Best product",
            rating:4.5,
            numReviews:10,
            description:"Qaulity  product",
            countInStock:0

        },

    ]
}
module.exports=data