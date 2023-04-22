const Donut = require('../models/Donutk');
const User = require('../models/Users');
const uploadAndGenerateURL = require('../Utils/uploadAndGenerateURL');

module.exports = {
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
        }
    },
    Mutation: {
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
                const guestUserName = `guest_${Date.now()}`;
                const guestMail = `${guestUserName}@donutk.com`;

                const guestUser = new User({
                    username: guestUserName,
                    email: guestMail,
                    guest: true,
                    firstName: "Guest",
                    lastName: "User"
                });

                await guestUser.save();
                return guestUser;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};


