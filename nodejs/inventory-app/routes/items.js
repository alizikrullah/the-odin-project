const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.get('/', itemsController.getAllItems);
router.get('/new', itemsController.getNewItemForm);
router.post('/new', itemsController.createItem);
router.get('/:id/edit', itemsController.getEditItemForm);
router.post('/:id/edit', itemsController.updateItem);
router.post('/:id/delete', itemsController.deleteItem);

module.exports = router;