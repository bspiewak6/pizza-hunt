const { Pizza } = require('../models');
const { db } = require('../models/Pizza');

const pizzaController = {
    // get all pizzas, callback function for GET /api/pizzas 
    getAllPizza(req, res) {
        Pizza.find({})
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v') // remove _v field 
        .sort({ _id: -1 }) // sort in descending order
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one pizza by id, callback function for GET /api/pizzas/1
    // Instead of accessing the entire req, we've destructured params out of it, 
    // because that's the only data we need for this request to be fulfilled
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .populate({
        path: 'comments',
        select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
                // if no pizza is found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create/add a pizza to the database, POST /api/pizzas
    // we destructure the body out of the Express.js req object 
    // because we don't need to interface with any of the other data it provides
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // method for update pizza by id, PUT /api/pizzas/:id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({_id: params.id }, body, {new: true})
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete a pizza, DELETE /api/pizzas/:id
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }

}

module.exports = pizzaController;