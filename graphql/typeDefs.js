const { gql } = require('apollo-server');

module.exports = gql`
    type Donut {
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
        type Query {
            donuts: [Donut],
            donut(id: ID!): Donut,
        }
        type Mutation {
            createDonut(donut: DonutInput): Donut,
            deleteDonut(id: ID!): Donut,
            editDonut(id: ID!, donut: DonutInput): Donut,
            thumbsUp(id: ID!): Donut,
            thumbsDown(id: ID!): Donut,
        }
    `;
