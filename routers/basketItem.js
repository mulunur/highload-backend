const Router = require('express');
const router = new Router();
const bascketItemController = require("./controllers/bascketItemController");

router.post("/newitem", bascketItemController.create);
router.patch("/incrementcnt", bascketItemController.incrementcount);
router.patch("/decrementcnt", bascketItemController.decrementcount);
router.patch("/changecnt", bascketItemController.changecount);
router.post("/deleteone", bascketItemController.deleteOne);
router.get("/getone", bascketItemController.getOne);
router.post("/deleteAll", bascketItemController.deleteAll);
router.get("/getall", bascketItemController.getAll);

module.exports = router;