const bcrypt = require('bcrypt');
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function getSignUp(req, res) {
    res.render('sign-up');
}

async function createUser(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: { name, email, password: hashedPassword }
    });
    res.redirect('/login');
}

function getLogin(req, res) {
    res.render('login');
}

function loginUser(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })(req, res, next)
}

function logoutUser(req, res, next) {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
}

module.exports = {
    getSignUp,
    createUser,
    getLogin,
    loginUser,
    logoutUser,
}