import express from 'express';
import categoriesController from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', categoriesController.getAllCategories);
router.get('/new', categoriesController.newCategoryForm);
router.get('/:id', categoriesController.getCategoryById);
router.get('/:id/edit', categoriesController.editCategoryForm);
router.post('/', categoriesController.createCategory);
router.put('/:id', categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

export default router;