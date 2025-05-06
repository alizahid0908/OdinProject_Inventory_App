import pool from './pool.js';

const seedDatabase = async () => {
  try {
    // Clear existing data
    await pool.query('DELETE FROM items');
    await pool.query('DELETE FROM categories');
    console.log('Cleared existing data.');

    // Insert categories
    const categories = [
      { name: 'Electronics', description: 'Devices and gadgets' },
      { name: 'Books', description: 'Fiction and non-fiction books' },
      { name: 'Clothing', description: 'Apparel and accessories' },
    ];

    const categoryIds = [];
    for (const category of categories) {
      const result = await pool.query(
        'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id',
        [category.name, category.description]
      );
      categoryIds.push(result.rows[0].id);
    }
    console.log('Inserted categories:', categoryIds);

    // Insert items
    const items = [
      { name: 'Smartphone', description: 'Latest model smartphone', price: 699.99, quantity: 10, categoryId: categoryIds[0] },
      { name: 'Laptop', description: 'High-performance laptop', price: 1299.99, quantity: 5, categoryId: categoryIds[0] },
      { name: 'Novel', description: 'Bestselling novel', price: 19.99, quantity: 20, categoryId: categoryIds[1] },
      { name: 'T-shirt', description: 'Cotton t-shirt', price: 9.99, quantity: 50, categoryId: categoryIds[2] },
    ];

    for (const item of items) {
      await pool.query(
        'INSERT INTO items (name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5)',
        [item.name, item.description, item.price, item.quantity, item.categoryId]
      );
    }
    console.log('Inserted items.');

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err.message);
  } finally {
    pool.end();
  }
};

seedDatabase();