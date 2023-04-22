const Donut = require('../models/Donutk');
const uploadAndGenerateURL = require('./uploadAndGenerateURL');

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
    },
    Mutation: {
        async createDonut(_, { donut }) {
            try {
                // define the image properties for Cloudinary
                const imageURL = donut.img;
                const publicID = `donutk/${donut.name}`;
                const width = 600;
                const height = 600;
                const crop = "fill";

                // upload the image to Cloudinary and get the generated URL
                const generatedURL = await uploadAndGenerateURL(imageURL, publicID, width, height, crop);

                // replace the image URL with the generated URL
                donut.img = generatedURL;

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
                donutToEdit.name = donut.name;
                donutToEdit.img = donut.img;
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
    },
};


