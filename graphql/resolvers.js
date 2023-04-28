const Donut = require('../models/Donutk');
const User = require('../models/Users');
const Order = require('../models/Orders');
const jwt = require('jsonwebtoken');
const googleAuth = require('../config/googleAuth');
const uploadAndGenerateURL = require('../Utils/uploadAndGenerateURL');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');



const ObjectID = new GraphQLScalarType({
    name: 'ObjectID',
    description: 'MongoDB ObjectID scalar type',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return ast.value;
      }
      return null;
    },
  });

const resolvers = {
    ObjectID  ,
    Query: {
        async donuts() {
            try {
                const donuts = await Donut.find();
                return donuts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async donut(_, { id }) {
            try {
                const donut = await Donut.findById(id);
                return donut;
            } catch (err) {
                throw new Error(err);
            }
        },
        async users() {
            try {
                const users = await User.find();
                return users;
            } catch (err) {
                throw new Error(err);
            }
        },
        async user(_, { id }) {
            try {
                const user = await User.findById(id);
                return user;
            } catch (err) {
                throw new Error(err);
            }   
        },
        async orders() {
            try {
                const orders = await Order.find();
                return orders;
            } catch (err) {
                throw new Error(err);
            }
        },
        async order(_, { id }) {
            try {
                const order = await Order.findById(id);
                return order;
            }catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async createOrder(_, { order }) {
            try {
                const user = await User.findById(order.user);

                if (!user) {
                    throw new Error('User not found');
                }
                // Validate donuts existance
                const newOrder = new Order({
                    user: user._id,
                    donuts: order.donuts,
                });
                const savedOrder = await newOrder.save();

                // Populate the 'user' field with the full user object before returning
                
                const populatedOrder = await Order.findById(savedOrder._id)
                    .populate('user')
                    .populate("donuts.product");
        
                return populatedOrder;
            } catch (err) {
                throw new Error(err);
            }
        },
        async createDonut(_, { donut }) {
            try {
                // define the image properties for Cloudinary

                if (donut.img.startsWith("http://") || donut.img.startsWith("https://")) {
                    const imageURL = donut.img;
                    const publicID = `donutk/${donut.name}`;
                    const width = 600;
                    const height = 600;
                    const crop = "fill";

                    // upload the image to Cloudinary and get the generated URL
                    const generatedURL = await uploadAndGenerateURL(imageURL, publicID, width, height, crop);

                    // replace the image URL with the generated URL
                    donut.img = generatedURL;
                }else{
                    donut.img = "https://res.cloudinary.com/dinhx1a6c/image/upload/v1682177552/sleeveCat.jpg";
                }

                // create the new donut
                const newDonut = new Donut(donut);
                const res = await newDonut.save();
                return res;
            } catch (err) {
                throw new Error(err);
            }
        },
        async deleteDonut(_, { id }) {
            try {
                const donut = await Donut.findById(id);
                await donut.delete();
                return donut;
            } catch (err) {
                throw new Error(err);
            }   
        },
        async editDonut(_, { id, donut }) {
            try {
                const donutToEdit = await Donut.findById(id);

                //if a new image is uploaded, upload it to Cloudinary and get the generated URL
                if (donut.img.startsWith("http://") || donut.img.startsWith("https://")) {
                    // define the image properties for Cloudinary
                    const imageURL = donut.img;
                    const publicID = `donutk/${donut.name}`;
                    const width = 600;
                    const height = 600;
                    const crop = "fill";

                    // upload the image to Cloudinary and get the generated URL
                    const generatedURL = await uploadAndGenerateURL(imageURL, publicID, width, height, crop);
                    donutToEdit.img = generatedURL;
                }

                donutToEdit.name = donut.name;
                donutToEdit.description = donut.description;
                donutToEdit.price = donut.price;
                donutToEdit.ingredients = donut.ingredients;
                donutToEdit.qty = donut.qty;

                await donutToEdit.save();
                return donutToEdit;
            } catch (err) {
                throw new Error(err);
            }
        },
        async thumbsUp(_, { id }) {
            try {
                const donut = await Donut.findById(id);
                donut.thumbsUp++;
                await donut.save();
                return donut;
            } catch (err) {
                throw new Error(err);
            }
        },
        async thumbsDown(_, { id }) {
            try {
                const donut = await Donut.findById(id);
                donut.thumbsDown++;
                await donut.save();
                return donut;
            } catch (err) {
                throw new Error(err);
            }
        },
        async createUser(_, { user }) {
            try {
                const newUser = new User(user);
                const res = await newUser.save();
                return res;
            } catch (err) {
                throw new Error(err);
            }
        },
        async deleteUser(_, { id }) {
            try {
                const user = await User.findById(id);
                await user.delete();
                return user;
            } catch (err) {
                throw new Error(err);
            }
        },
        async createGuestUser() {
            try {
                const guestMail = `guest_${Date.now()}@donutk.com`;
                const guestUser = new User({
                    email: guestMail,
                    guest: true,
                    firstName: `guest_${Date.now()}`,
                    lastName: "User"
                });

                await guestUser.save();
                return guestUser;
            } catch (err) {
                throw new Error(err);
            }
        },
        async editUser(_, { id, user }) {
            try {
                const userToEdit = await User.findById(id);
                userToEdit.email = user.email;
                userToEdit.firstName = user.firstName;
                userToEdit.lastName = user.lastName;
                userToEdit.address = user.address;

                await userToEdit.save();
                return userToEdit;
            } catch (err) {
                throw new Error(err);
            }
        },
        async loginWithGoogle(_, { googleIdToken }) {
            try {
                const payload = await googleAuth(googleIdToken);
                const email = payload.email;
                const user = await User.findOne({ email});  

                if (!user) {
                    console.log("User not found, creating new user");
                    const newUser = new User({
                        email,
                        firstName: payload.given_name,
                        lastName: payload.family_name,

                    });
                    await newUser.save();
                    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    return {
                        ...newUser._doc,
                        id: newUser._id,
                        token
                    };
                } else {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    return { user, token };
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};
module.exports = resolvers;


