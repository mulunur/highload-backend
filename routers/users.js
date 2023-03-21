const Router = require('express');
const router = new Router();
const controller = require("./controllers/userController");


router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.post("/delete", controller.delete);
router.get("/check", controller.check);

module.exports = router;