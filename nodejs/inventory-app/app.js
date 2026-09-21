require('dotenv').config();
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const categoriesRouter = require('./routes/categories');
const itemsRouter = require('./routes/items');

app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

app.get('/', (req, res) => {
    res.redirect('/categories');
});

app.listen(3000, () => {
    console.log('Server jalan di http://localhost:3000');
});