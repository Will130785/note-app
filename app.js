const express = require("express");
const app = express();

//Set template engine
app.set("view engine", "ejs");
//Set static file location
app.use(express.static("public"));

//ROUTES
//INDEX
app.get("/", (req, res) => {
    res.render("index");
});

//REGISTER
app.get("/register", (req, res) => {
    res.render("register");
});

//LOGIN
app.get("/login", (req, res) => {
    res.render("login");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started")
});