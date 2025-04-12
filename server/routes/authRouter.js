const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test } = require("../controllers/authController");
const {register, login} = require("../controllers/authController");

router.use(cors(
    {
        credentials: true,
        origin: "https://wave-again-frontend.onrender.com"   
    }
));

router.get("/", test)

router.post("/register", register);
router.post("/login", login);


module.exports = router