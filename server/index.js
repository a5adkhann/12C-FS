const express = require("express");
const connectDB = require("./config/db_connection");
const User = require("./models/users");
const File = require("./models/files");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })

app.post("/api/adduser", async(req, res) => {
    try{
        const { nameField } = req.body;
        await User.insertOne({name : nameField});
        res.status(200).send({message: "User added successfully"});
    }
    catch(err){
        console.log("Error Inserting User", err);
    }
})

app.get("/api/getusers", async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).send({users});
    }
    catch(err){
        console.log("Error Fetching Data", err);
    }
})


app.put("/api/edituser/:id", async(req, res) => {
    const { name } = req.body;
    try{
        await User.updateOne({_id: req.params.id}, {$set: {name: name}});
        res.status(200).send({message: "User updated successfully"});
    }
    catch(err){
        console.log("Error updating user", err);
    }
})


app.delete("/api/deleteuser/:id", async(req, res) => {
    try{
        await User.deleteOne({_id: req.params.id});
        res.status(200).send({message: "User deleted successfully"});
    }
    catch(err){
        console.log("Error deleting user", err);
    }
})


app.post("/api/file-upload", upload.single("myImage"), async(req, res) => {
    const filename = req.file.originalname;
    // console.log(filename);
    try{
        await File.insertOne({image: filename});
        res.status(200).send({message: "Image uploaded successfully"});
    }
    catch(err){
        console.log("Error uploading file");
    }
})






app.listen(2000, () => {
    console.log("Server Started");
})