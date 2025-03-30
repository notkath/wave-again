const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
//only organizer
router.get("/admin",verifyToken, authorizeRoles("admin"),(req, res) => {
    res.json({message: "Hello admin"});
});
//
router.get("/user",verifyToken, authorizeRoles("admin","user"),(req, res) => {
    res.json({message: "Hello user"});
});

module.exports = router;