const express = require('express');
const apiRoutes = require('./routes/api');
const PORT = process.env.PORT || 3001;
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(apiRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})