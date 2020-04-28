const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const Note = require("./models/note");
const app = express();

//Set template engine
app.set("view engine", "ejs");
//Set static file location
app.use(express.static("public"));
//Set database
// mongoose.connect("mongodb://localhost/notes-app", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://will_constable:GC161113@cluster0-dsket.mongodb.net/notes-app?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
//Set body parser
app.use(bodyParser.urlencoded({extended: true}));
//Use method override
app.use(methodOverride("_method"));

//ROUTES
//INDEX
app.get("/", (req, res) => {
    Note.find({}, (err, allNotes) => {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {data: allNotes});
        }
    })
});

//CREATE
app.post("/", (req, res) => {
    let note = req.body.text;

    // //Create new note object
    let newNote = {
        note: note
    };

    //Create new note in database
    Note.create(newNote, (err, newlyCreatedNote) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

//SHOW
app.get("/:id", (req, res) => {
    Note.findById(req.params.id, (err, foundNote) => {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {note: foundNote});
        }
    });
});

//EDIT
app.get("/:id/edit", (req, res) => {
    Note.findById(req.params.id, (err, foundNote) => {
        if(err) {
            console.log(err);
        } else {
            res.render("edit", {note: foundNote});
        }
    });
});

//UPDATE
app.put("/:id", (req, res) => {
    //create updated object
    let update = req.body.text;
    let updateObj = {
        note: update
    }

    Note.findByIdAndUpdate(req.params.id, updateObj, (err, updatedNote) => {

        if(err) {
            console.log(err);
        } else {
            res.redirect(`/${req.params.id}`);
            console.log(req.params.id);
            console.log(req.body.note);
            console.log("note updated");
            console.log(updatedNote);
        }
    });
});


//DESTROY
app.delete("/:id", (req, res) => {
    Note.findByIdAndRemove(req.params.id, (err, note) => {
        if(err) {
            console.log(err);
        } else {
            note.remove();
            res.redirect("/");
        }
    });
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