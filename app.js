//importing the reqd packages
var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    multer = require('multer'),
    path = require('path')

//Configuring
mongoose.set('useUnifiedTopology', true)
mongoose.connect("mongodb://localhost/kblog", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")
    //Setting up the upload image functionality
    //===================================
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
}).single('image');
//===================================

//===================================
//Setting up the mongoose schema and model
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
})
var Blog = mongoose.model("Blog", blogSchema)

//Routes
//Index Route(Homepage)
app.get("/", (req, res) => {
        res.render("home")
    })
    //New Route(form for adding a new blog)
app.get("/blog", (req, res) => {
        res.render("new")
    })
    //Create Route
app.post("/blog", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
            res.render("new")
        } else {
            console.log(req.file)
            var newName = req.body.title
            var desc = req.body.desc
            var img = 'uploads/' + req.file.filename
            var newBlog = {
                title: newName,
                image: img,
                body: desc
            }
            Blog.create(newBlog, (err, newBlog) => {
                if (err) {
                    res.redirect("/blog")
                } else {
                    console.log(newBlog)
                    res.redirect("/")
                }
            })

        }
    })

})

app.listen(3000, function() {
    console.log("Server connected")
})