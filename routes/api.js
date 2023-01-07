const router = require('express').Router();
const uuid = require('../helpers/uuid');
const db = require('../db/db.json');
const fs = require('fs');


router.get('/api/notes', (req, res) => {
    const notes = fs.readFileSync('./db/db.json', 'utf-8');
    res.json(JSON.parse(notes));    
});

router.post('/api/notes', (req, res) => {

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

        fs.writeFile('./db/db.json', noteList, (err) => err ? console.error(err) : console.log('Note Saved!'));
        
        const response = {
            status: 'success',
            body: newNote,
        };
        
        res.json(response);
    } else {
        res.status(500).json(`Note didn't take!`)
    };
    
});

router.delete(`/api/notes/:id`, (req, res) => {
    const { id } = req.params;
    
    const savedNotes = fs.readFileSync('./db/db.json', 'utf-8');
    const parsedNotes = JSON.parse(savedNotes);

    const oneLessNote = parsedNotes.filter((notes) => {
       if (notes.id !== id) {
        return notes.id;
       };
    });
    
    const noteList = JSON.stringify(oneLessNote, null, 2);
    fs.writeFile('./db/db.json', noteList, (err) => err ? console.error(err) : console.log('deleted that pesky note!'));
    
    res.send();
    res.status(202);
});

module.exports = router;