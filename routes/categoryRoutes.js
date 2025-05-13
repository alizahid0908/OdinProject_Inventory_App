import express from 'express';
import categoriesController from '../controllers/categoriesController.js';
import { checkAdminPassword } from '../middleware.js';

const router = express.Router();

router.get('/', categoriesController.getAllCategories);
router.get('/new', categoriesController.newCategoryForm);
router.get('/:id', categoriesController.getCategoryById);
router.get('/:id/edit', categoriesController.editCategoryForm);
router.post('/', categoriesController.createCategory);
router.put('/:id', checkAdminPassword, categoriesController.updateCategory);
router.delete('/:id', checkAdminPassword, categoriesController.deleteCategory);

export default router;