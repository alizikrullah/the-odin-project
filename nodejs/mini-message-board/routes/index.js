const express = require('express');
const router = express.Router();

const messages = [
    {
        text: 'Hi there!',
        user: 'Amando',
        added: new Date()
    },
    {
        text: 'Hello World!',
        user: 'Charles',
        added: new Date()
    }
];

router.get('/', (req, res) => {
    res.render('index', { title: 'Mini Messageboard', messages: messages });
});

router.get('/new', (req, res) => {
    res.render('form');
});

router.post('/new', (req, res) => {
    const { text, user } = req.body;
    messages.push({ text: text, user:user, added: new Date() });
    res.redirect('/');
});

router.get('/messages/:id', (req, res) => {
    const message = messages[req.params.id];
    res.render('message', { message: message });
});

module.exports = router;