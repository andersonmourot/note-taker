const store = require('../db/store');
const route = require('express').Router();
route.post('/notes', (req, res) => {
    store
        .add(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.json(500).json(err));
});

route.get('/notes', (req, res) => {
    store
        .get()
        .then((notes) => {return res.json(notes);
        })
        .catch((err) => res.status(500).json(err));
});
route.delete('/notes/:id', (req, res) => {
    store
        .remove(req.params.id)
        .then(() => res.json({ok: true}))
        .catch((err) => res.status(500).json(err));
});

module.exports = route