const Router = require('express');
const router = new Router();
const orderItemController = require("./controllers/orderItemController");

router.post("/create", orderItemController.create);
router.get("/getall", orderItemController.getAll);
router.get("/getone", orderItemController.getOne);

module.exports = router;