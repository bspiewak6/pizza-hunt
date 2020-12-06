const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now // JavaScript function = Date.now will provide a timestamp if user does not
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [] // indicates an array as the data type
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;