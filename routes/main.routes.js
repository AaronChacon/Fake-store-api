const express = require('express');
const router = express.Router();

// example: users?limit=n&offset=n
router.get('/', (req, res) => {
    res.status(200).send('hello this is my server in Express');
});

router.get('/new-route', (req, res) => {
    res.status(200).send('new route');
});

module.exports = router;