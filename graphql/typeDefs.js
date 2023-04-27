const { gql } = require('apollo-server');
const { ObjectIdScalar } = require('graphql-scalars');

const typeDefs = gql`
        type Donut {
            id: ID!,
            name: String,
            img: String,
            description: String,
            price: Float,
            ingredients: String,
            qty: Int,
            date: String,
            thumbsUp: Int,
            thumbsDown: Int,
        }
        input DonutInput {
            name: String,
            img: String,
            description: String,
            price: Float,
            ingredients: String,
            qty: Int,
        }
        type Address {
            street: String,
            houseNumber: String,
            city: String,
            postalCode: String,
        }
        input AddressInput {
            street: String,
            houseNumber: String,
            city: String,
            postalCode: String,
        }

        type User {
            id: ID!,
            email: String!,
            firstName: String,
            lastName: String,
            createdAt: String!,
            guest: Boolean!,
            address: Address,
        }
        input UserInput {
            email: String!,
            firstName: String,
            lastName: String,
        }
        type Order {
            id: ID!,
            user: User!,
            donuts: [OrderedDonut],
            date: String!,
            status: String!,
        }
        type OrderedDonut {
            product: Donut!,
            qty: Int!,
        }
        input OrderedDonutInput {
            product: ID!,
            qty: Int!,
        }
        input OrderInput {
            user: ID!,
            donuts: [OrderedDonutInput],
        }

        type Query {
            donuts: [Donut],
            donut(id: ID!): Donut,
            users: [User],
            user(id: ID!): User,
            orders: [Order],
            order(id: ID!): Order,
        }
        type AuthPayload {
            user: User!,
            token: String!,
        }
        type Mutation {
            createDonut(donut: DonutInput): Donut,
            deleteDonut(id: ID!): Donut,
            editDonut(id: ID!, donut: DonutInput): Donut,
            thumbsUp(id: ID!): Donut,
            thumbsDown(id: ID!): Donut,
            createUser(user: UserInput): User,
            updateUser(id: ID!, user: UserInput): User,
            deleteUser(id: ID!): User,
            createGuestUser: User,
            addAddress(id: ID!, address: AddressInput): User,
            editUser(id: ID!, user: UserInput): User,
            loginWithGoogle(googleIdToken: String!): AuthPayload!,
            createOrder(order: OrderInput): Order,
            deleteOrder(id: ID!): Order,
            editOrder(id: ID!, order: OrderInput): Order,
        }
    `;

module.exports = typeDefs;
