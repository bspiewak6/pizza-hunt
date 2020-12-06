const router = require('express').Router();

// Instead of importing the entire object and having to do pizzaController.getAllPizza(), 
// destructure the method names out of the imported object and use those names directly
const {
    getAllPizzas,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
  } = require('../../controllers/pizza-controller');

// Set up GET all and POST at /api/pizzas
router
  .route('/')
  .get(getAllPizzas)
  .post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id -- combined together unlike sequelize
router
  .route('/:id')
  .get(getPizzaById)
  .put(updatePizza)
  .delete(deletePizza);

module.exports = router;