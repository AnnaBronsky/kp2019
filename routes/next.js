const express = require('express');
const router = express.Router();

router.get('/next', (req, res) => {
    res.render('next', req.options);
});

module.exports = router;