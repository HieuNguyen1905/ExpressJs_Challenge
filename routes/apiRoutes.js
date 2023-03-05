const router = require('express').Router()
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const fs = require('fs')


// GET "/api/notes" responds with all notes from the database
router.get('/notes', async (req, res) => {
  const notes = await readFromFile('./db/db.json')
  res.json(JSON.parse(notes))
});

router.post('/notes', async (req, res) => {
  const newNotes = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  }
  readAndAppend(newNotes, './db/db.json');
  const notes = await readFromFile('./db/db.json')
  res.json(JSON.parse(notes))

})

router.delete('/notes/:id', (req, res) => {
  readFromFile('./db/db.json')
    .then((notes) =>
      JSON.parse(notes))
    .then((data) => {
      const result = data.filter((element) => element.id !== req.params.id)
      writeToFile('./db/db.json', result)
      res.redirect('/notes')
    })
  
})

module.exports = router;
