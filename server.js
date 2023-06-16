const express = require('express')
const path = require('path')
const PORT = 4001;
const Article = require('./Models/Article.js')
// use process.env (.env file)
require('dotenv').config();
require('../Config/database.js')


// server dist folder (build folder)

const app = express();
// use req.body
app.use(express.json())
// give absolute route
app.use(express.static(path.join(__dirname, "../client/dist")));


// get all articles
app.get("/articles", async (req, res) => {
    // make mongoose request to get all articles.
    res.json(await Article.find());
})

// create article
app.post("/articles", async (req, res) => {
    let articleData = req.body
    console.log(articleData);
    // make mongoose request to create an article.
    let resFromDatabase = await Article.create(articleData);
    res.json(resFromDatabase)
});

app.put("/add_comment/:commentText/:articleId", async (req, res) => {
    let comment = {body: req.params.commentText, commentDate: new Date()};
    let article = await Article.findById(req.params.articleId);
    article.comments.push(comment)
    article.save();
   res.send("you did it!")
})

// 


app.listen(PORT, () => {
    console.log("listening on port ", PORT);
})