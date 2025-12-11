const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'Product Service healthy' }));

app.get('/products/:id', (req, res) => {
    res.json({ id: req.params.id, name: 'Product ' + req.params.id, price: 100 });
});

app.listen(3002, () => console.log('Product Service running on port 3002'));
