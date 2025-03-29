const express = require("express");
const router = express.Router();

//only organizer
router.get("/admin", (req, res) => {
    res.json({message: "Hello admin"});
});
//
router.get("/user", (req, res) => {
    res.json({message: "Hello user"});
});

module.exports = router;