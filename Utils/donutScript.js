const Donut = require('../models/Donutk');
const connectDB = require('../config/db');
require('dotenv').config();


const donuts = [
    {
      
      "name": "Glazed Donut",
      "img": "https://res.cloudinary.com/dinhx1a6c/image/upload/v1682429681/DonutK/pngwing.com_3_embbqi.png",
      "description": "A classic, light and fluffy donut with a sweet glaze.",
      "price": 1.25,
      "ingredients": "flour, sugar, yeast, water, salt, glaze",
      "qty": 10,
      "date": "2023-04-20T12:00:00.000Z",
      "thumbsUp": 0,
      "thumbsDown": 0
    },
    {
      "name": "Chocolate Frosted Donut",
      "img": "https://res.cloudinary.com/dinhx1a6c/image/upload/v1682429687/DonutK/pngwing.com_4_lrmdvd.png",
      "description": "A delicious donut topped with a rich chocolate frosting.",
      "price": 1.5,
      "ingredients": "flour, sugar, yeast, water, salt, cocoa, frosting",
      "qty": 10,
      "date": "2023-04-20T12:00:00.000Z",
      "thumbsUp": 0,
      "thumbsDown": 0
    },
    {
      "name": "Strawberry Frosted Donut",
      "img": "https://res.cloudinary.com/dinhx1a6c/image/upload/v1682429676/DonutK/pngwing.com_hi9stf.png",
      "description": "A fruity and delightful donut with a smooth strawberry frosting.",
      "price": 1.5,
      "ingredients": "flour, sugar, yeast, water, salt, strawberry, frosting",
      "qty": 10,
      "date": "2023-04-20T12:00:00.000Z",
      "thumbsUp": 0,
      "thumbsDown": 0
    },
    {
      "name": "Blueberry Donut",
      "img": "https://res.cloudinary.com/dinhx1a6c/image/upload/v1682429664/DonutK/pngwing.com_12_mwuypc.png",
      "description": "A cake-like donut infused with real blueberries.",
      "price": 1.75,
      "ingredients": "flour, sugar, blueberries, water, salt, oil",
      "qty": 10,
      "date": "2023-04-20T12:00:00.000Z",
      "thumbsUp": 0,
      "thumbsDown": 0
    },
    {
      "name": "Boston Cream Donut",
      "img": "https://res.cloudinary.com/dinhx1a6c/image/upload/v1682429666/DonutK/pngwing.com_11_rnpct2.png",
      "description": "A fluffy donut filled with vanilla custard and topped with chocolate glaze.",
      "price": 2.0,
      "ingredients": "flour, sugar, yeast, water, salt, custard, chocolate glaze",
      "qty": 10,
      "date": "2023-04-20T12:00:00.000Z",
      "thumbsUp": 0,
      "thumbsDown": 0
    },
    {
      "name": "Powdered Donut",
      "img": "https://res.cloudinary.com/dinhx1a6c/image/upload/v1682429669/DonutK/pngwing.com_6_pawwjj.png",
      "description": "A light and fluffy donut coated with powdered sugar.",
      "price": 1.25,
      "ingredients": "flour, sugar, yeast, water, salt, powdered sugar",
      "qty": 10,
      "date": "2023-04-20T12:00:00.000Z",
      "thumbsUp": 0,
      "thumbsDown": 0
    },
    {
      "name": "Maple Glazed Donut",
      "img": "https://res.cloudinary.com/dinhx1a6c/image/upload/v1682429683/DonutK/pngwing.com_2_bcmo3x.png",
      "description": "A delicious donut with a sweet maple glaze.",
      "price": 1.5,
      "ingredients": "flour, sugar, yeast, water, salt, maple glaze",
      "qty": 10,
      "date": "2023-04-20T12:00:00.000Z",
      "thumbsUp": 0,
      "thumbsDown": 0
    },
    {
      "name": "Jelly-Filled Donut",
      "img": "https://res.cloudinary.com/dinhx1a6c/image/upload/v1682429705/DonutK/pngwing.com_8_slgrex.png",
      "description": "A scrumptious donut filled with sweet raspberry jelly.",
      "price": 1.75,
      "ingredients": "flour, sugar, yeast, water, salt, raspberry jelly",
      "qty": 10,
      "date": "2023-04-20T12:00:00.000Z",
      "thumbsUp": 0,
      "thumbsDown": 0
    },
    {
      "name": "Cinnamon Sugar Donut",
      "img": "https://res.cloudinary.com/dinhx1a6c/image/upload/v1682429679/DonutK/pngwing.com_10_fq402o.png",
      "description": "A delightful donut coated with a blend of cinnamon and sugar.",
      "price": 1.25,
      "ingredients": "flour, sugar, yeast, water, salt, cinnamon, sugar",
      "qty": 10,
      "date": "2023-04-20T12:00:00.000Z",
      "thumbsUp": 0,
      "thumbsDown": 0
    },
    {
      "name": "Apple Fritter Donut",
      "img": "https://res.cloudinary.com/dinhx1a6c/image/upload/v1682429658/DonutK/pngwing.com_7_qfwad5.png",
      "description": "A deliciously crispy and sweet donut filled with cinnamon-spiced apples.",
      "price": 2.25,
      "ingredients": "flour, sugar, yeast, water, salt, apples, cinnamon",
      "qty": 10,
      "date": "2023-04-20T12:00:00.000Z",
      "thumbsUp": 0,
      "thumbsDown": 0
    }
  ]

  const createDonuts = async() => {
    try{
        console.log(process.env.MONGO_URI)
        await connectDB( process.env.MONGO_URI );
        const newDonuts = donuts.map(donut => {
            return new Donut(donut)
        })
        console.log(newDonuts)
        await Donut.insertMany(newDonuts)
        console.log('Donuts created')

    } catch (err) {
        console.log(err)
    }   
  };
   createDonuts();