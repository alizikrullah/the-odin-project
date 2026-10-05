const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

function isLoggedIn(req, res, next) {
    if (req.user) return next();
    res.redirect('/login');
}

function isMember(req, res, next) {
    if (req.user && req.user.role !== 'guest') return next();
    res.redirect('/');
}

router.get('/', postController.getAllPosts);
router.get('/sign-up', authController.getSignUp);
router.post('/sign-up', authController.createUser);
router.get('/login', authController.getLogin);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);
router.get('/join', isLoggedIn, authController.getJoinForm);
router.post('/join', isLoggedIn, authController.joinClub);
router.get('/new-post', isLoggedIn, isMember, postController.getNewPostForm);
router.post('/new-post', isLoggedIn, isMember, postController.createPost);
router.post('/delete/:id', postController.deletePost);

module.exports = router;