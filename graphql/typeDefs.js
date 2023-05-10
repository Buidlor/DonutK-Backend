const { gql } = require('@apollo/server');


const typeDefs = `#graphql
        """Scalar type for ObjectID was needed to support MongoDB's ObjectID type."""
        scalar ObjectID

        """Donut type for DonutK app. Donuts are the main product of the app."""
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
            stripeProductId: String,
        }

        """Donut input type for DonutK app. Donuts are the main product of the app."""
        input DonutInput {
            name: String,
            img: String,
            description: String,
            price: Float,
            ingredients: String,
            qty: Int,
            stripeProductId: String,
        }

        """Address type for DonutK app. Addresses are used to store user addresses."""
        type Address {
            street: String,
            houseNumber: String,
            city: String,
            postalCode: String,
        }

        """Address input type for DonutK app. Addresses are used to store user addresses."""
        input AddressInput {
            street: String,
            houseNumber: String,
            city: String,
            postalCode: String,
        }

        """User type for DonutK app. Users are the main users of the app."""
        type User {
            id: ObjectID!,
            email: String!,
            firstName: String,
            lastName: String,
            createdAt: String!,
            guest: Boolean!,
            address: Address,
        }

        """User input type for DonutK app. Users are the main users of the app."""
        input UserInput {
            email: String!,
            firstName: String,
            lastName: String,
        }

        """Order type for DonutK app. Orders are used to store user orders."""
        type Order {
            id: ObjectID!,
            user: User!,
            donuts: [OrderedDonut],
            date: String!,
            status: String!,
        }

        """Order input type for DonutK app. Orders are used to store user orders."""
        type OrderedDonut {
            product: Donut!,
            qty: Int!,
        }

        """Order input type for DonutK app. Orders are used to store user orders."""
        input OrderedDonutInput {
            product: ObjectID!,
            qty: Int!,
        }

        """Order input type for DonutK app. Orders are used to store user orders."""
        input OrderInput {
            user: ObjectID!,
            donuts: [OrderedDonutInput],
        }

        """Query types for DonutK app. Queries are used to read data, or fetch data from the database.""" 
        type Query {
            """Query all donuts"""
            donuts: [Donut],
            """Query a single donut by id"""
            donut(id: ObjectID!): Donut,
            """Query all users"""
            users: [User],
            """Query a single user by id"""
            user(id: ObjectID!): User,
            """Query all orders"""
            orders: [Order],
            """Query a single order by id"""
            order(id: ObjectID!): Order,
        }

        """AuthPayload type for DonutK app. AuthPayload is used to return a user and token after login."""
        type AuthPayload {
            user: User!,
            token: String!,
        }

        """Mutation types for DonutK app. Mutations are used to write data, or modify data in the database."""
        type Mutation {
            """Create a new donut, with the fields provided in the donut input object"""
            createDonut(donut: DonutInput): Donut,

            """Delete a donut by id"""
            deleteDonut(id: ObjectID!): Donut,

            """Edit a donut by id, with the fields provided in the donut input object"""
            editDonut(id: ObjectID!, donut: DonutInput): Donut,

            """Increment thumbsUp by 1"""
            thumbsUp(id: ObjectID!): Donut,

            """Increment thumbsDown by 1"""
            thumbsDown(id: ObjectID!): Donut,

            """Create a new user, with the fields provided in the user input object"""
            createUser(user: UserInput): User,

            """Update a user by id, with the fields provided in the user input object"""
            updateUser(id: ObjectID!, user: UserInput): User,

            """Delete a user by id"""
            deleteUser(id: ObjectID!): User,

            """Create a guest user"""
            createGuestUser: User,

            """Add an address to a user by id, with the fields provided in the address input object"""
            addAddress(id: ObjectID!, address: AddressInput): User,

            """Edit user by id, with the fields provided in the user input object"""
            editUser(id: ObjectID!, user: UserInput): User,

            """Create a new order, with the fields provided in the order input object"""
            loginWithGoogle(googleIdToken: String!): AuthPayload!,

            """Create a new order, with the fields provided in the order input object"""
            createOrder(order: OrderInput): Order,

            """Delete an order by id"""
            deleteOrder(id: ObjectID!): Order,

            """Edit an order by id, with the fields provided in the order input object"""
            editOrder(id: ObjectID!, order: OrderInput): Order,
        }
    `;

module.exports = typeDefs; 
