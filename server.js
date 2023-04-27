const {ApolloServer} = require('apollo-server');
require('dotenv').config();
const connectDB = require('./config/db');
const mongoUri = process.env.MONGO_URI;


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

connectDB(mongoUri);
const port = process.env.PORT || 3001;

server.listen(port).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });

