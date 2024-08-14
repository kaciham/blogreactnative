require('dotenv').config();
const express = require('express');
const app = express();
const initDatabase = require('./configs/init-db.js');
const syncDatabase = require('./configs/sync-db.js');
const router = require("./routes/routeIndex.js");

app.use(express.json());
//project
app.use("/api", router);

async function startServer() {
    await initDatabase();
    await syncDatabase();

    const port = process.env.PORT || 8081;

    app.get("/", (req, res) => {
        res.send("Hello World");
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

startServer();