const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to handle JSON requests
app.use(express.json());
app.use(cors());

// In-memory products array with at least 3 products
const products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Smartphone", price: 699.99 },
  { id: 3, name: "Headphones", price: 149.99 }
];

/**
 * GET /products - Return all products
 */
app.get('/products', (req, res) => {
  res.json(products);
});

/**
 * GET /products/:id - Return a single product by ID
 * If product is not found, returns 404 error
 */
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(product => product.id === id);
  
  if (!product) {
    return res.status(404).json({ error: `Product with id ${req.params.id} not found.` });
  }
  
  res.json(product);
});

/**
 * POST /products - Add a new product
 * Data should be sent in the request body as JSON
 * Returns 400 error if trying to create a product with an existing ID
 */
app.post('/products', (req, res) => {
  const newProduct = req.body;
  
  // Validate that all required fields are present with proper types
  if (
    !newProduct ||
    typeof newProduct.id !== 'number' ||
    typeof newProduct.name !== 'string' ||
    typeof newProduct.price !== 'number'
  ) {
    return res.status(400).json({ 
      error: 'Product must have the following attributes: id (numeric), name (string), and price (numeric).' 
    });
  }
  
  // Check if product with that ID already exists
  if (products.some(product => product.id === newProduct.id)) {
    return res.status(400).json({ error: `Product with id ${newProduct.id} already exists.` });
  }
  
  // Add the new product
  products.push(newProduct);
  
  res.status(201).json({ 
    message: 'Product created successfully.', 
    product: newProduct 
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});