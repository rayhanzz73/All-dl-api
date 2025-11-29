const express = require('express');
const fetchNotice = require('./public/notice');
const { alldl } = require('SiFu-alldl');
const path = require('path');

const app = express(); // Initialize app here
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

fetchNotice();

app.get('/api', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const data = await alldl(url);
        res.json(data);
        console.log(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to download media' });
    }
});

app.listen(port, () => {
    console.log(`Server is running`);
});
