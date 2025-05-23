import express from 'express';
import itemsController from '../controllers/itemsController.js';
import { checkAdminPassword } from '../middleware.js';

const router = express.Router();

router.get('/', itemsController.getAllItems);
router.get('/new/:categoryId?', itemsController.newItemForm);
router.get('/:id', itemsController.getItemById);
router.get('/:id/edit', itemsController.editItemForm);
router.post('/:categoryId?', itemsController.createItem); 
router.put('/:id', checkAdminPassword, itemsController.updateItem);
router.delete('/:id', checkAdminPassword, itemsController.deleteItem);

export default router;