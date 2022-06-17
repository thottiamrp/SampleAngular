const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const { params } = req;
    res.json({ message: "HELLO WORLD" });
    console.log(params);
});

router.get('/:id', (req, res) => {
    const { params } = req;
    res.json({ ...params });
});

router.post('/:id', (req, res, next) => {
    next(new Error('Not Implemented'));
});

router.put('/:id', (req, res, next) => {
    next(new Error('Not Implemented'));
});

router.delete('/:id', (req, res, next) => {
    next(new Error('Not Implemented'));
});

module.exports = router;
