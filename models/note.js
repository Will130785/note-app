const mongoose = require("mongoose");

//SCHEMA SETUP
let noteSchema = new mongoose.Schema({
    note: String
});

module.exports = mongoose.model("Note", noteSchema);