const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const notes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let db_data = []; 

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(db_data);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


function createNote(text, allNotes) {
    // const newNote = text;
    // text.id = allNotes[0];
    // allNotes[0]++;

    const newNote = {
        id: db_data.length,
        title: text.title,
        body: text.text
    }

    db_data.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(db_data)
    )

    return newNote;

}



app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, notes);
    res.json(newNote);
});




app.listen(3001, () => {
    console.log(`API server now on port ${3001}!`);
});