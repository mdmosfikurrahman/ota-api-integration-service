const axios = require('axios');
const { getSabreToken } = require('../auth/tokenProvider');
const getOneWayPayload = require('../payloads/oneWayPayload');
const getRoundTripPayload = require('../payloads/roundTripPayload');
const { sabreApiBaseUrl, sabreApiHeaders } = require('../config/config');

const getSabreFlightOffers = async (type, DepartureDateTime, OriginLocationCode, DestinationLocationCode, ReturnDateTime) => {
    const tokenResponse = await getSabreToken();
    const access_token = tokenResponse.access_token;

    if (!access_token) {
        throw new Error('Failed to obtain access token');
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
            throw new Error("ReturnDateTime is required for round-trip");
        }
        payload = getRoundTripPayload(DepartureDateTime, OriginLocationCode, DestinationLocationCode, ReturnDateTime);
    } else {
        throw new Error("Invalid flight type. Must be 'one-way' or 'round-trip'");
    }

    try {
        const response = await axios.post(sabreApiBaseUrl, payload, { headers });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch flight offers: " + error.message);
    }
};

module.exports = { getSabreFlightOffers };
