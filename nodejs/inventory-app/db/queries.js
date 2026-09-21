const pool = require('./pool');

//GET
async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
}

async function getCategoryById(id) {
    const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return rows[0];
}

async function getAllItems() {
    const { rows } = await pool.query('SELECT * FROM items');
    return rows;
}

async function getItemsByCategory(categoryId) {
    const { rows } = await pool.query('SELECT * FROM items WHERE category_id = $1', [categoryId]);
    return rows;
}

async function getItemById(id) {
  const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return rows[0];
}

//CREATE
async function createCategory(name) {
    await pool.query('INSERT INTO categories (name) VALUES ($1)', [name]);
}

async function createItem(name, price, stock, category_id) {
    await pool.query(
        'INSERT INTO items (name, price, stock, category_id) VALUES ($1, $2, $3, $4)',
        [name, price, stock, category_id]
    );
}

//UPDATE
async function updateCategory(id, name) {
    await pool.query('UPDATE categories SET name = $1 WHERE id = $2', [name, id]);
}

async function updateItem(id, name, price, stock, category_id) {
    await pool.query(
        'UPDATE items SET name = $1, price = $2, stock = $3, category_id = $4 WHERE id = $5',
        [name, price, stock, category_id, id]
    );
}

//DELETE
async function deleteCategory(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
}

async function deleteItem(id) {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getAllItems,
  getItemsByCategory,
  getItemById,
  createCategory,
  createItem,
  updateCategory,
  updateItem,
  deleteCategory,
  deleteItem,
};