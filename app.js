const express = require(`express`);
const bodyParser = require(`body-parser`);
const ejs = require(`ejs`);
const lodash = require(`lodash`);

// Home page content, random text
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// this array contain all the posts
const posts = [];

const server = express();
server.set('view engine', 'ejs');
server.use(express.static(`public`));
server.use('/posts/:post', express.static('public'));
server.use(bodyParser.urlencoded({ extended: true }));

server.get(`/`, (req, res) => {
    const postsTrimVersion = posts.map((value) => {
        let postTitle = value.postTitle;
        let postContentTrimVersion = `${value.postContent.substring(0, 100)}...`;
        return { postTitle, postContentTrimVersion };
    });
    res.render(`home`, { homeText: homeStartingContent, postsArray: postsTrimVersion });

});

// about route
server.get(`/about`, (req, res) => {
    res.render(`about`, { aboutText: aboutContent });
});

// contact route
server.get(`/contact`, (req, res) => {
    res.render(`contact`, { contactText: contactContent });
})

// compose route
server.get(`/compose`, (req, res) => {
    res.render(`compose`);
});

server.post(`/compose`, (req, res) => {
    let postTitle = req.body.postTitle;
    let postContent = req.body.postContent;
    let post = { postTitle, postContent };
    posts.push(post);
    res.redirect(`/`);
});

// the posts route with dynamic route name (express route parameters)
server.get(`/posts/:post`, (req, res) => {
    let reqUrlLowerCase = lodash.lowerCase(req.params.post);
    posts.forEach((value) => {
        let postTitleLowerCase = lodash.lowerCase(value.postTitle);
        if (reqUrlLowerCase === postTitleLowerCase) {
            res.render(`post`, { title: value.postTitle, content: value.postContent });
        }
    });
});

server.listen(3000, () => {
    console.log(`Server is running on port 3000 boss`);
});