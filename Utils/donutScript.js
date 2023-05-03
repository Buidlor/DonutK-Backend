const Donut = require('../models/Donutk');
const connectDB = require('../config/db');
require('dotenv').config();

const LocalMongoUri = process.env.LOCAL_MONGO_URI; 

const donuts = [
  {
    "name": "Glazed Donut",
    "img": "https://example.com/glazed-donut.jpg",
    "description": "A classic, light and fluffy donut with a sweet glaze.",
    "price": 1.25,
    "ingredients": "flour, sugar, yeast, water, salt, glaze",
    "qty": 10,
    "date": "2023-04-20T12:00:00.000Z",
    "thumbsUp": 0,
    "thumbsDown": 0,
    "stripeProductId":"price_1N2xfnIundI4kMC0NqR46mP4"
  },
  {
    
    "name": "Chocolate Frosted Donut",
    "img": "https://example.com/chocolate-frosted-donut.jpg",
    "description": "A delicious donut topped with a rich chocolate frosting.",
    "price": 1.50,
    "ingredients": "flour, sugar, yeast, water, salt, cocoa, frosting",
    "qty": 10,
    "date": "2023-04-20T12:00:00.000Z",
    "thumbsUp": 0,
    "thumbsDown": 0,
    "stripeProductId":"price_1N2xhWIundI4kMC0aZjWY6J4"
  },
  {
    
    "name": "Strawberry Frosted Donut",
    "img": "https://example.com/strawberry-frosted-donut.jpg",
    "description": "A fruity and delightful donut with a smooth strawberry frosting.",
    "price": 1.50,
    "ingredients": "flour, sugar, yeast, water, salt, strawberry, frosting",
    "qty": 10,
    "date": "2023-04-20T12:00:00.000Z",
    "thumbsUp": 0,
    "thumbsDown": 0,
    "stripeProductId":"price_1N2xirIundI4kMC0q8HaITvo"
  },
  {
  
    "name": "Blueberry Donut",
    "img": "https://example.com/blueberry-donut.jpg",
    "description": "A cake-like donut infused with real blueberries.",
    "price": 1.75,
    "ingredients": "flour, sugar, blueberries, water, salt, oil",
    "qty": 10,
    "date": "2023-04-20T12:00:00.000Z",
    "thumbsUp": 0,
    "thumbsDown": 0,
    "stripeProductId":"price_1N2xk3IundI4kMC0o62wlsVc"
  },
  {
  
    "name": "Boston Cream Donut",
    "img": "https://example.com/boston-cream-donut.jpg",
    "description": "A fluffy donut filled with vanilla custard and topped with chocolate glaze.",
    "price": 2.00,
    "ingredients": "flour, sugar, yeast, water, salt, custard, chocolate glaze",
    "qty": 10,
    "date": "2023-04-20T12:00:00.000Z",
    "thumbsUp": 0,
    "thumbsDown": 0,
    "stripeProductId":"price_1N2xkdIundI4kMC0lb4P4tC5"
  },
  {
    "name": "Powdered Donut",
    "img": "https://example.com/powdered-donut.jpg",
    "description": "A light and fluffy donut coated with powdered sugar.",
    "price": 1.25,
    "ingredients": "flour, sugar, yeast, water, salt, powdered sugar",
    "qty": 10,
    "date": "2023-04-20T12:00:00.000Z",
    "thumbsUp": 0,
    "thumbsDown": 0,
    "stripeProductId":"price_1N2xlKIundI4kMC0JvMBG8jt"
  },
  {

    "name": "Maple Glazed Donut",
    "img": "https://example.com/maple-glazed-donut.jpg",
    "description": "A delicious donut with a sweet maple glaze.",
    "price": 1.50,
    "ingredients": "flour, sugar, yeast, water, salt, maple glaze",
    "qty": 10,
    "date": "2023-04-20T12:00:00.000Z",
    "thumbsUp": 0,
    "thumbsDown": 0,
    "stripeProductId":"price_1N2xm0IundI4kMC01nvAjd4p"
  },
  {
  
    "name": "Jelly-Filled Donut",
    "img": "https://example.com/jelly-filled-donut.jpg",
    "description": "A scrumptious donut filled with sweet raspberry jelly.",
    "price": 1.75,
    "ingredients": "flour, sugar, yeast, water, salt, raspberry jelly",
    "qty": 10,
    "date": "2023-04-20T12:00:00.000Z",
    "thumbsUp": 0,
    "thumbsDown": 0,
    "stripeProductId":"price_1N2xmLIundI4kMC0aTuFfX9e"
  },
  {

    "name": "Cinnamon Sugar Donut",
    "img": "https://example.com/cinnamon-sugar-donut.jpg",
    "description": "A delightful donut coated with a blend of cinnamon and sugar.",
    "price": 1.25,
    "ingredients": "flour, sugar, yeast, water, salt, cinnamon, sugar",
    "qty": 10,
    "date": "2023-04-20T12:00:00.000Z",
    "thumbsUp": 0,
    "thumbsDown": 0,
    "stripeProductId":"price_1N2xnTIundI4kMC0lyKuuvcN"
  },
  {
   
    "name": "Apple Fritter Donut",
    "img": "https://example.com/apple-fritter-donut.jpg",
    "description": "A deliciously crispy and sweet donut filled with cinnamon-spiced apples.",
    "price": 2.25,
    "ingredients": "flour, sugar, yeast, water, salt, apples, cinnamon",
    "qty": 10,
    "date": "2023-04-20T12:00:00.000Z",
    "thumbsUp": 0,
    "thumbsDown": 0,
    "stripeProductId":"price_1N2xpLIundI4kMC0oOM2FbXl"
  }
  ]

  const createDonuts = async() => {
    try{
        console.log(LocalMongoUri)
        await connectDB( LocalMongoUri );
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