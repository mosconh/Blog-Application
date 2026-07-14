import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

// Store articles in an array
let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// GET Routes
app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/new-article", (req, res) => {
    res.render("new-article.ejs");
});

app.get("/articles", (req, res) => {
    // Pass the posts array to articles.ejs
    res.render("articles.ejs", { posts: posts });
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

// POST Routes
app.post("/submit", (req, res) => {
    const titleArticle = req.body.title || req.body.name; // Use 'title' from form
    const contentArticle = req.body.content;

    // Add new post to the array
    if (titleArticle && contentArticle) {
        posts.push({
            id: posts.length + 1,
            title: titleArticle,
            content: contentArticle,
            date: new Date().toLocaleDateString(),
        });
    }

    // Redirect to articles page to see all posts
    res.redirect("/articles");
});

// Delete article route
app.post("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter((post) => post.id !== id);
    res.redirect("/articles");
});

// Server on my computer
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
