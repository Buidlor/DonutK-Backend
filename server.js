const {ApolloServer} = require('apollo-server');
require('dotenv').config();
const connectDB = require('./db');

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 3001;

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

connectDB(mongoUri);

server.listen({ port: process.env.PORT || 3001 })
    .then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
