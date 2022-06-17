const express = require('express');
const cors = require("cors");
const app = express();

const config = require("./services/router.config.json");

app.use(cors({
    origin: '*'
}));
app.use(express());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get("/", (_, res) => {
    res.json({ message: "ok" });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on ${port} `);
});

[...config].forEach(({
    url, module
}) => app.use(url, require(module)));

module.exports = app;
