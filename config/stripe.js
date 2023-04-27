require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const express = require("express");
const app = express();
app.use(express.static("public"));

const DOMAIN = "http://localhost:5173/";

app.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1N1QKaIundI4kMC09L0aXZc8',
            quantity: 1,
        },
    ],
    mode: 'payment',
    success_url: `${DOMAIN}?success=true`,
    cancel_url: `${DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port')); 
