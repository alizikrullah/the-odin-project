const db = require('../db/queries');

async function getAllItems(req, res) {
    const items = await db.getAllItems();
    res.render('items/index', { title: 'Semua Item', items});
}

async function getNewItemForm(req, res) {
    const categories = await db.getAllCategories();
    res.render('items/new', { categories });
}

async function createItem(req, res) {
    const { name, price, stock, category_id } = req.body;
    await db.createItem(name, price, stock, category_id);
    res.redirect('/categories');
}

async function getEditItemForm(req, res) {
    const { id } = req.params;
    const item = await db.getItemById(id);
    const categories = await db.getAllCategories();
    res.render('items/edit', { item, categories });
}

async function updateItem(req, res) {
    const { id } = req.params;
    const { name, price, stock, category_id } = req.body;
    await db.updateItem(id, name, price, stock, category_id);
    res.redirect('/categories');
}

async function deleteItem(req, res) {
    const { id } = req.params;
    await db.deleteItem(id);
    res.redirect('/categories');
}

module.exports = {
  getAllItems,
  getNewItemForm,
  createItem,
  getEditItemForm,
  updateItem,
  deleteItem,
};