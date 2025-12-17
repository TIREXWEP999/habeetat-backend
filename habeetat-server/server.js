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
    const user=authorsProvider.getUser(username);
    if(!user)
        res.status(404).json({"message":"User not found"});
    res.json(user);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.patch("/authors/:username", (req, res) => {
    const { username } = req.params;
    const { name, surname, age } = req.body;
    const user=authorsProvider.updateUser(username, name, surname, age);
    res.json(user);
});

app.put("/authors/:username", (req, res) => {
    const { username } = req.params;
    const { name, surname, age } = req.body;
    const user=authorsProvider.updateUser(username, name, surname, age);
    res.json(user);
});

app.delete("/authors/:username", (req, res) => {
    const { username } = req.params;
    const user=authorsProvider.removeUser(username);
    res.json(user);
});

app.post("/authors", (req, res) => {
    const { username, name, surname, age } = req.body;
    const user=authorsProvider.addUser(username, name, surname, age);
    res.json(user);
});
