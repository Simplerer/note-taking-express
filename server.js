const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const db = require('./db/db.json')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    const notes = fs.readFileSync('./db/db.json', 'utf-8');
    res.json(JSON.parse(notes));    
});

app.post('/api/notes', (req, res) => {
    
    const { text, title } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        }

        const savedNotes = fs.readFileSync('./db/db.json', 'utf-8');
        const parsedNotes = JSON.parse(savedNotes);

        parsedNotes.push(newNote);
        const noteList = JSON.stringify(parsedNotes, null, 2);

        fs.writeFile(`./db/db.json`, noteList, (err) => console.error(err));

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.status(500).json(`Note didn't take!`)
    };

});

app.delete(`/api/notes/:id`, (req, res) => {
    const { id } = req.params;


    console.info('deleted that pesky note!');               // we can pop off db.json and re-write file!
    res.status(202);
});


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})