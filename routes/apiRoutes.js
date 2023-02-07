// const express = require('express');
// const database = require('../db/db.json');
// const app = express();
// //const uuid = require('../helper/uuid')
// const fs = require('fs');

// app.get('/notes', (req, res) =>
//     fs.readFile(database, "utf-8",((err,data) =>{
//         if(err){
//             throw err;
//         } else {
//             const db = JSON.parse(data);
//             res.json(db);
//             console.log(db);
//         }
//     }))
// );

// module.exports = app;
const express = require('express');
const store = require('../db/store');
const app = express();

// GET "/api/notes" responds with all notes from the database
app.get('/notes', (req, res) => {
    store
      .getNotes()
      .then((notes) => {
        return res.json(notes);
      })
      .catch((err) => res.status(500).json(err));
  });

  app.post('/notes', (req, res) => {
    store
      .addNote(req.body)
      .then((note) => res.json(note))
      .catch((err) => res.status(500).json(err));
  });
  
  // DELETE "/api/notes" deletes the note with an id equal to req.params.id
  app.delete('/notes/:id', (req, res) => {
    store
      .removeNote(req.params.id)
      .then(() => res.json({ ok: true }))
      .catch((err) => res.status(500).json(err));
  });

  module.exports = app;
