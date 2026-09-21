const db = require('../db/queries');

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories();
    res.render('categories/index', { title: 'Semua Kategori', categories });
}

async function getCategoryDetail(req, res) {
    const { id } = req.params;
    const category = await db.getCategoryById(id);
    const items = await db.getItemsByCategory(id);
    res.render('categories/detail', { title: category.name, category, items });
}

async function getNewCategoryForm(req, res) {
    res.render('categories/new');
}

async function createCategory(req, res) {
    const { name } = req.body;
    await db.createCategory(name);
    res.redirect('/categories');
}

async function getEditCategoryForm(req, res) {
    const { id } = req.params;
    const category = await db.getCategoryById(id);
    res.render('categories/edit', { category });
}

async function updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    await db.updateCategory(id, name);
    res.redirect('/categories');
}

async function deleteCategory(req, res) {
    const { id } = req.params;
    await db.deleteCategory(id);
    res.redirect('/categories');
}

module.exports = {
  getAllCategories,
  getCategoryDetail,
  getNewCategoryForm,
  createCategory,
  getEditCategoryForm,
  updateCategory,
  deleteCategory,
};