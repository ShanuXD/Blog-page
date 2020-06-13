const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _ = require("lodash");
let posts = [];

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }));

const homeStringContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique risus nec feugiat in fermentum. Ultrices mi tempus imperdiet nulla malesuada pellentesque. Convallis aenean et tortor at. Felis eget nunc lobortis mattis. Risus sed vulputate odio ut. Sed adipiscing diam donec adipiscing. Elementum tempus egestas sed sed risus pretium. Pulvinar proin gravida hendrerit lectus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Congue eu consequat ac felis donec et. Id faucibus nisl tincidunt eget nullam non. Interdum varius sit amet mattis vulputate. Eget arcu dictum varius duis at consectetur lorem donec. Gravida dictum fusce ut placerat orci nulla. Massa tincidunt dui ut ornare lectus sit amet est placerat."
const aboutStringContent = "At erat pellentesque adipiscing commodo elit at imperdiet dui. Praesent elementum facilisis leo vel. Blandit cursus risus at ultrices mi tempus imperdiet. Ultrices eros in cursus turpis. Magna etiam tempor orci eu lobortis elementum nibh tellus. Id interdum velit laoreet id. Tristique senectus et netus et malesuada fames ac turpis. Massa enim nec dui nunc mattis enim ut tellus. Vulputate ut pharetra sit amet aliquam id. Hac habitasse platea dictumst quisque sagittis purus. Diam ut venenatis tellus in metus vulputate. Lacinia at quis risus sed vulputate odio."
const contactStringContent = "Erat nam at lectus urna duis. Gravida quis blandit turpis cursus in hac habitasse platea. Integer quis auctor elit sed vulputate mi sit amet. Aliquam sem et tortor consequat id porta nibh venenatis. Scelerisque varius morbi enim nunc faucibus a. Fermentum iaculis eu non diam phasellus vestibulum lorem. Id leo in vitae turpis massa. Quam elementum pulvinar etiam non quam. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Ac odio tempor orci dapibus ultrices in. Faucibus et molestie ac feugiat. Ut aliquam purus sit amet luctus venenatis lectus magna. Morbi leo urna molestie at elementum. At risus viverra adipiscing at. Vitae tortor condimentum lacinia quis. Lorem mollis aliquam ut porttitor leo a diam. Neque egestas congue quisque egestas."


app.get("/", function(req, res) {
    res.render("home", { homeContent: homeStringContent, posts: posts })

});
app.get("/about", function(req, res) {
    res.render("about", { aboutContent: aboutStringContent })
});
app.get("/contact", function(req, res) {
    res.render("contact", { contactContent: contactStringContent })
});

app.get("/compose", function(req, res) {
    res.render("compose");
})

app.post("/compose", function(req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post)
    res.redirect("/")
});

app.get("/posts/:postName", function(req, res) {
    const requestTitle = _.lowerCase(req.params.postName);
    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);
        if (storedTitle === requestTitle) {
            console.log("matched")
            res.render("post", {
                title: post.title,
                content: post.content
            });
        }
    });
});

app.listen(3000, function() {
    console.log("Server is running");
});