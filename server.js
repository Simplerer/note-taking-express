const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const db = require('./db/db.json')

// const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//index - static
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//notes - static in public folder
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});


app.get('/api/notes', (req, res) => {
    res.json(db);    
});


app.post('/api/notes', (req, res) => {
    
    console.log(`${req.method} request to add note recieved`)
    console.info(`${req.method} request to add note recieved`)

    const { text, title } = req.body;

    if (text && title) {
        const newNote = {
            text,
            title,
            note_ID: uuid(),
        }

        const noteObj = JSON.stringify(newNote);


        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.status(500).json(`Note didn't take!`)
    }

});


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})