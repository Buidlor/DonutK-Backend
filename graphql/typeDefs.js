const { gql } = require('apollo-server');


const typeDefs = gql`
        scalar ObjectID

        type Donut {
            id: ObjectID!,
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
            id: ObjectID!,
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
            id: ObjectID!,
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
            product: ObjectID!,
            qty: Int!,
        }
        input OrderInput {
            user: ObjectID!,
            donuts: [OrderedDonutInput],
        }

        type Query {
            donuts: [Donut],
            donut(id: ObjectID!): Donut,
            users: [User],
            user(id: ObjectID!): User,
            orders: [Order],
            order(id: ObjectID!): Order,
        }
        type AuthPayload {
            user: User!,
            token: String!,
        }
        type Mutation {
            createDonut(donut: DonutInput): Donut,
            deleteDonut(id: ObjectID!): Donut,
            editDonut(id: ObjectID!, donut: DonutInput): Donut,
            thumbsUp(id: ObjectID!): Donut,
            thumbsDown(id: ObjectID!): Donut,
            createUser(user: UserInput): User,
            updateUser(id: ObjectID!, user: UserInput): User,
            deleteUser(id: ObjectID!): User,
            createGuestUser: User,
            addAddress(id: ObjectID!, address: AddressInput): User,
            editUser(id: ObjectID!, user: UserInput): User,
            loginWithGoogle(googleIdToken: String!): AuthPayload!,
            createOrder(order: OrderInput): Order,
            deleteOrder(id: ObjectID!): Order,
            editOrder(id: ObjectID!, order: OrderInput): Order,
        }
    `;

module.exports = typeDefs; 
