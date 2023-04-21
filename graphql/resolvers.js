const Donut = require('../models/Donutk');

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

