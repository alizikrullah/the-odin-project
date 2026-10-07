require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

require('./controllers/passport');

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('Server jalan di http://localhost:3000');
});