import pool from '../db/pool.js';

const getItemsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM items WHERE category_id = $1', [categoryId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllItems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.render('items/index', { items: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.render('items/show', { item: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const newItemForm = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.render('items/new', { 
      categories: result.rows, 
      categoryId: categoryId || null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editItemForm = async (req, res) => {
  const { id } = req.params;
  try {
    const itemResult = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    const categoriesResult = await pool.query('SELECT * FROM categories');
    res.render('items/edit', { 
      item: itemResult.rows[0], 
      categories: categoriesResult.rows 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createItem = async (req, res) => {
  const categoryId = req.params.categoryId || req.body.categoryId;
  if (!categoryId) {
    return res.status(400).json({ error: 'Category is required' });
  }
  
  const { name, description, price, quantity } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO items (name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, quantity, categoryId]
    );
    res.status(201).redirect(`/items/${result.rows[0].id}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  let { name, description, price, quantity, categoryId } = req.body;

  console.log('Raw categoryId from form:', req.body.categoryId);

  categoryId = parseInt(categoryId, 10);

  console.log('Parsed categoryId:', categoryId);

  if (isNaN(categoryId)) {
    return res.status(400).json({ error: 'Invalid Category ID' });
  }

  console.log('Updating item:', { id, name, description, price, quantity, categoryId }); // Add this line
  if (!categoryId) {
    return res.status(400).json({ error: 'Category is required' });
  }
  try {
    const result = await pool.query(
      'UPDATE items SET name = $1, description = $2, price = $3, quantity = $4, category_id = $5 WHERE id = $6 RETURNING *',
      [name, description, price, quantity, categoryId, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.redirect(`/items/${result.rows[0].id}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const itemsController = {
    getItemsByCategory,
    getAllItems,
    getItemById,
    newItemForm,
    editItemForm,
    createItem,
    updateItem,
    deleteItem,
};

export default itemsController;