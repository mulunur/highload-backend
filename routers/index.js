const Router = require('express');
const router = new Router();
const usersRouter = require('./users');
const BasketItemRouter = require('./basketItem')
const BasketRouter = require('./basket')
const ItemRouter = require('./item');
const Order = require('./order');
const OrderItem = require('./orderItem');

router.use("/user", usersRouter);
router.use("/basketitem", BasketItemRouter);
router.use("/basket", BasketRouter);
router.use("/item", ItemRouter);
router.use("/order", Order);
router.use("/orderitem", OrderItem);

module.exports = router;