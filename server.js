const express = require("express");
const mongoose = require("mongoose");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

async function connectToDatabase() {
    try {
        await mongoose.connect(db);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err);
    }
}

connectToDatabase();

app.get("/", (req, res) => res.send("Hello!"));

const port = process.env.PORT || 4242;

app.listen(port, () => console.log(`Server running on port ${port}`));
