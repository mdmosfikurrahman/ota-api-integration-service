const express = require('express');
const router = express.Router();
const { flightResponse } = require('../service/flightService');
const { fetchToken } = require('../service/tokenService');

router.post('/flight', flightResponse);
router.get('/token', fetchToken);

module.exports = router;
