const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'User Service healthy' }));

app.get('/users/:id', (req, res) => {
    res.json({ id: req.params.id, name: 'User ' + req.params.id });
});

app.listen(3001, () => console.log('User Service running on port 3001'));
