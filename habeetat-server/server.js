const express = require("express");
const app = express();
const port = 3000;
const authorsProvider = require("./providers/authorsProvider.js");

app.use(express.json());

app.get('/authors', (req, res) => {
    res.json(authorsProvider.getAllUsers());
});

app.get("/authors/:username", (req, res) => {
    const { username } = req.params;
    console.log(username);
    res.json(authorsProvider.getUser(username));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.patch("/authors/:username", (req, res) => {
    const { username } = req.params;
    const { name, surname, age } = req.body;

    res.json(authorsProvider.updateUser(username, name, surname, age));
});

app.put("/authors/:username", (req, res) => {
    const { username } = req.params;
    const { name, surname, age } = req.body;

    res.json(authorsProvider.updateUser(username, name, surname, age));
});

app.delete("/authors/:username", (req, res) => {
    const { username } = req.params;
    res.json(authorsProvider.removeUser(username));
});

app.post("/authors", (req, res) => {
    const { username, name, surname, age } = req.body;
    res.json(authorsProvider.addUser(username, name, surname, age));
});
