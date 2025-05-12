import pool from '../db/pool.js';

const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.render('categories/index', { categories: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoryResult = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    if (categoryResult.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const itemsResult = await pool.query('SELECT * FROM items WHERE category_id = $1', [id]);
    res.render('categories/show', {
      category: categoryResult.rows[0],
      items: itemsResult.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const newCategoryForm = (req, res) => {
  res.render('categories/new');
};

export const editCategoryForm = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.render('categories/edit', { category: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).redirect(`/categories/${result.rows[0].id}`);
  } catch (err) {
    res.status(500).redirect('/categories/new');
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).redirect(`/categories/${result.rows[0].id}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('BEGIN');
    await pool.query('DELETE FROM items WHERE category_id = $1', [id]);
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    await pool.query('COMMIT');
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category and its items deleted successfully' });
  } catch (err) {
    await pool.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  }
};

const categoriesController = {
  getAllCategories,
  getCategoryById,
  newCategoryForm,
  editCategoryForm,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoriesController;
