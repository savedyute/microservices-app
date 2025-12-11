require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';

let orders = [];
let orderId = 1;

app.get('/health', (req, res) => res.json({ status: 'Order Service healthy' }));
app.get('/status', (req, res) => res.json({ totalOrders: orders.length }));

app.post('/orders', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const user = await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
        const product = await axios.get(`${PRODUCT_SERVICE_URL}/products/${productId}`);

        const order = { id: orderId++, user: user.data, product: product.data, quantity };
        orders.push(order);

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order', details: error.message });
    }
});

app.get('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id == req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
});

app.listen(3000, () => console.log('Order Service running on port 3000'));
