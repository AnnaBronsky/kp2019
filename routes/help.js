const express = require('express');
const router = express.Router();

router.get('/help', (req, res) => {
    res.render('help', req.options);
});

module.exports = router;