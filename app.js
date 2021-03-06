//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
var lodash = require("lodash")
const ejs = require("ejs")

const newPost = []

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."

const app = express()

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

//here we are going our home page
app.get("/", (req, res) => {
  //sending the data to the home page
  res.render("home", {
    homeContent: homeStartingContent,
    post: newPost,
  })
})

app.get("/post/:post", (req, res) => {
  const URLparam = lodash.lowerCase(req.params.post)

  newPost.forEach((el) => {
    if (el.head == URLparam) {
      res.render("post", {
        currentHeader: el.head,
        post: el.message,
      })
    }
  })
})

//here we are going to form contact page
app.get("/contact", (req, res) => {
  res.render("contact", {
    contacts: contactContent,
  })
})

//here we are going to form about page
app.get("/about", (req, res) => {
  res.render("about", {
    about: aboutContent,
  })
})

//here we are going to form compose page
app.get("/compose", (req, res) => {
  res.render("compose")
})

app.post("/compose", (req, res) => {
  const heading = req.body.title
  const passage = req.body.paragraph

  const post = {
    head: heading,
    message: passage,
  }

  console.log(post)
  newPost.push(post)
  res.redirect("/")
})

//nav links redirection
app.post("/", (req, res) => {
  res.redirect("/")
})

app.post("/about", (req, res) => {
  res.redirect("/about")
})

app.post("/contact", (req, res) => {
  res.redirect("/contact")
})

app.listen(3030, function () {
  console.log("Server started on port 3030")
})
