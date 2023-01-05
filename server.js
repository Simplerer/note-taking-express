const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./Assets/helpers/uuid');

PORT = 3001;
app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {

});

app.get('/notes', (req, res) => {

});

app.get('/api/notes', (req, res) => {
    res.json(`${req.method} request recieved!`);
    console.info(`${req.method} request recieved!`)
});

app.post('/api/reviews', (req, res) => {

});


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})