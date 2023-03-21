const Router = require('express');
const router = new Router();
const bascketController = require("./controllers/basketController");

router.get("/getone", bascketController.getOne);

module.exports = router;