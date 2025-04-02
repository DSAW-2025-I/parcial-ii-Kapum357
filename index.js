const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Smartphone", price: 699.99 },
  { id: 3, name: "Headphones", price: 149.99 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(product => product.id === id);
  
  if (!product) {
    return res.status(404).json({ error: `Product with id ${req.params.id} not found.` });
  }
  
  res.json(product);
});

app.post('/products', (req, res) => {
  const newProduct = req.body;
  
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
  
  if (products.some(product => product.id === newProduct.id)) {
    return res.status(400).json({ error: `Product with id ${newProduct.id} already exists.` });
  }
  
  products.push(newProduct);
  
  res.status(201).json({ 
    message: 'Product created successfully.', 
    product: newProduct 
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});