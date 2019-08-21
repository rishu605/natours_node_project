const express = require("express");

const router = express.Router();

const userController = require("./../controllers/userController");

router.param("id", (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    next();
});

router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route("/:id")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
