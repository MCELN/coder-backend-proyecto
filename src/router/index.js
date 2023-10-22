const productsController = require('../controllers/products.controller.js');
const cartsController = require('../controllers/carts.controller.js');
const chatController = require('../controllers/chat.controller.js');
const authController = require('../controllers/authController.js');

const router = app => {
    app.use('/api/products', productsController);
    app.use('/api/carts', cartsController);
    app.use('/chat', chatController);
    app.use('/auth', authController);
}

module.exports = router;