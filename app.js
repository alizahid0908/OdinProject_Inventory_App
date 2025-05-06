import express from 'express';
import dotenv from 'dotenv';
import categoriesRoutes from './routes/categories.js';
import itemsRoutes from './routes/items.js';

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/items', itemsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
