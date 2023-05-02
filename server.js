const {ApolloServer} = require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4');
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const mongoUri = process.env.MONGO_URI;

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const DOMAIN = "http://localhost:5173/";

// The GraphQL schema and resolver map used by ApolloServer
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

(async () => {
    const app = express();
    const httpServer = http.createServer(app);

    // Set up Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(cors());
    
    app.use(express.json());
    app.use(express.static('public'))
    connectDB(mongoUri);

    app.post("/create-checkout-session", async (req, res) => {
        const { line_items } = req.body;
        const session = await stripe.checkout.sessions.create({
            line_items, // [{price: 'price_HFb9X9ZJw0jZ1A', quantity: 1}] 
            mode: 'payment',
            success_url: `${DOMAIN}?success=true`,
            cancel_url: `${DOMAIN}?canceled=true`,
            shipping_address_collection: {
                allowed_countries: ['BE'], 
              },
      });
     
      res.json({ url: session.url });
      
    });
    app.use(expressMiddleware(server));
    const port = process.env.PORT || 4000;
    await new Promise((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000`);
})();



