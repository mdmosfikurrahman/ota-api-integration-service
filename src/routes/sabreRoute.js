const express = require('express');
const router = express.Router();
const { flightResponse } = require('../service/flightService');

router.post('/flight', flightResponse);

module.exports = router;
