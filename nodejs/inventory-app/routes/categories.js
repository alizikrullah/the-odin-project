const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.getAllCategories);
router.get('/new', categoriesController.getNewCategoryForm);
router.post('/new', categoriesController.createCategory);
router.get('/:id', categoriesController.getCategoryDetail);
router.get('/:id/edit', categoriesController.getEditCategoryForm);
router.post('/:id/edit', categoriesController.updateCategory);
router.post('/:id/delete', categoriesController.deleteCategory);

module.exports = router;