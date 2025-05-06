import express from 'express';
import itemsController from '../controllers/itemsController';


const router = express.Router();

router.get('/', itemsController.getAllItems);
router.get('/:id', itemsController.getItemById);
router.post('/:categoryId', itemsController.createItem);
router.put('/:id', itemsController.updateItem);
router.delete('/:id', itemsController.deleteItem);

export default router;