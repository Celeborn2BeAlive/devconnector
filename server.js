const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

async function connectToDatabase() {
    try {
        await mongoose.connect(
            db,
            { useNewUrlParser: true }
        );
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err);
    }
}

connectToDatabase();

app.get("/", (req, res) => res.send("Hello!"));

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 4242;

app.listen(port, () => console.log(`Server running on port ${port}`));
