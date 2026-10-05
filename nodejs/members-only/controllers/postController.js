const db = require('../db/queries');

async function getAllPosts(req, res) {
    const posts = await db.getAllPosts();
    res.render('index', { posts, user: req.user });
}

function getNewPostForm(req, res) {
    res.render('new-post');
}

async function createPost(req, res) {
    const { title, content } = req.body;
    await db.createPost(title, content, req.user.id);
    res.redirect('/');
}

async function deletePost(req, res) {
    await db.deletePost(req.params.id);
    res.redirect('/');
}

module.exports = {
    getAllPosts,
    getNewPostForm,
    createPost,
    deletePost,
};