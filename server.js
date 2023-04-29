const {ApolloServer} = require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4');
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const mongoUri = process.env.MONGO_URI;

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



    app.use(    
        cors(),
        bodyParser.json(),
        expressMiddleware(server),
        );

    connectDB(mongoUri);


    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000`);
})();

// const port = process.env.PORT || 3001;
// server.listen(port).then(({ url }) => {
//         console.log(`🚀 Server ready at ${url}`);
//     });

