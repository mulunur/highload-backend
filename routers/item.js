const Router = require('express');
const router = new Router();
const itemController = require("./controllers/itemController");

router.post("/newitem", itemController.create);
router.delete("/delete", itemController.delete);
router.patch("/changeitemdata", itemController.changeItemData);
router.get("/getcount", itemController.getCount);
router.get("/getone", itemController.getOne);
router.get("/getall", itemController.getAll);

module.exports = router;