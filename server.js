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
     
      res.json({ url: session.url });
      //res.status(200).json({ url: session.url });
    });
    app.use(expressMiddleware(server));

    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000`);
})();

// const port = process.env.PORT || 3001;
// server.listen(port).then(({ url }) => {
//         console.log(`🚀 Server ready at ${url}`);
//     });

