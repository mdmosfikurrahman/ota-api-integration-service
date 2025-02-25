const axios = require('axios');
const { getSabreToken } = require('../auth/tokenProvider');
const getOneWayPayload = require('../payloads/oneWayPayload');
const getRoundTripPayload = require('../payloads/roundTripPayload');
const { sabreApiBaseUrl, sabreApiHeaders } = require('../config/config');

const flightResponse = async (req, res) => {
    const tokenResponse = await getSabreToken();
    const access_token = tokenResponse.access_token;

    if (!access_token) {
        return res.status(500).json({ error: "Failed to obtain access token" });
    }

    const { type, DepartureDateTime, OriginLocationCode, DestinationLocationCode, ReturnDateTime } = req.body;

    if (!type || !DepartureDateTime || !OriginLocationCode || !DestinationLocationCode) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const headers = {
        ...sabreApiHeaders,
        "Authorization": `Bearer ${access_token}`
    };

    let payload;
    if (type === 'one-way') {
        payload = getOneWayPayload(DepartureDateTime, OriginLocationCode, DestinationLocationCode);
    } else if (type === 'round-trip') {
        if (!ReturnDateTime) {
            return res.status(400).json({ error: "ReturnDateTime is required for round-trip" });
        }
        payload = getRoundTripPayload(DepartureDateTime, OriginLocationCode, DestinationLocationCode, ReturnDateTime);
    } else {
        return res.status(400).json({ error: "Invalid flight type. Must be 'one-way' or 'round-trip'" });
    }

    try {
        const response = await axios.post(sabreApiBaseUrl, payload, { headers });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching flight offers:", error);
        res.status(500).json({ error: "Failed to fetch flight offers" });
    }
};

module.exports = { flightResponse };
