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
    const notes = fs.readFileSync('./db/db.json', 'utf-8');
    res.json(JSON.parse(notes));    
});


app.post('/api/notes', (req, res) => {

    console.log(req.body)
    
    const { text, title } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_ID: uuid(),
        }

        const savedNotes = fs.readFileSync('./db/db.json', 'utf-8');
        const parsedNotes = JSON.parse(savedNotes);

        parsedNotes.push(newNote);
        const noteList = JSON.stringify(parsedNotes, null, 2);

        fs.writeFile(`./db/db.json`, noteList, (err) =>
        err
          ? console.error(err)
          : console.log(
              `New note ${newNote.title} has been written to JSON file`
            )
      );

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.status(500).json(`Note didn't take!`)
    };

});


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})