import express from 'express';
import dotenv from 'dotenv';
import categoriesRoutes from './routes/categoryRoutes.js';
import itemsRoutes from './routes/itemRoutes.js';
import methodOverride from 'method-override';
import { checkAdminPassword } from './middleware.js';

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index');
});
app.use('/categories', categoriesRoutes);
app.use('/items', itemsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
