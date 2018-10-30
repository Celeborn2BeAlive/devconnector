// User management, authentication, etc

const express = require("express");
const router = express.Router();

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) =>
    res.json({
        msg: "Users Works"
    })
);

router.post("/register", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ email: "Email already exists" });
    } else {
        const avatar = gravatar.url(req.body.email, {
            s: "200", // size
            r: "pg", // Rating
            d: "mm" // Default
        });

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        try {
            const user = await newUser.save();
            res.json(user);
        } catch (err) {
            console.error(err);
        }
    }
});

module.exports = router;
