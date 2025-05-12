import express from 'express';
import itemsController from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', itemsController.getAllItems);
router.get('/new/:categoryId?', itemsController.newItemForm);
router.get('/:id', itemsController.getItemById);
router.get('/:id/edit', itemsController.editItemForm);
router.post('/:categoryId?', itemsController.createItem); 
router.put('/:id', itemsController.updateItem);
router.delete('/:id', itemsController.deleteItem);

export default router;