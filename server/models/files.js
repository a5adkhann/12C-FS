const mongoose = require("mongoose");

const filesSchema = new mongoose.Schema({
    image : String
});

module.exports = mongoose.model("File", filesSchema);