var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser")

mongoose.set('useUnifiedTopology', true)
mongoose.connect("mongodb://localhost/kblog", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")
    //Index Route(Homepage)
app.get("/", (req, res) => {
        res.render("home")
    })
    //New Route(form for adding a new blog)
app.get("/blog", (req, res) => {
    res.render("new")
})

app.listen(3000, function() {
    console.log("Server connected")
})