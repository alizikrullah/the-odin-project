const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../db/queries');

async function getSignUp(req, res) {
    res.render('sign-up');
}

async function createUser(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(name, email, hashedPassword);
    res.redirect('/login');
}

function getLogin(req, res) {
    res.render('login');
}

function loginUser(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })(req, res, next);
}

function logoutUser(req, res) {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
}

function getJoinForm(req, res) {
    res.render('join');
}

async function joinClub(req, res) {
    const { passcode } = req.body;
    if (passcode === process.env.MEMBER_PASSCODE) {
        await db.updateUserRole(req.user.id, 'member');
    }
    res.redirect('/');
}

module.exports = {
    getSignUp,
    createUser,
    getLogin,
    loginUser,
    logoutUser,
    getJoinForm,
    joinClub,
};