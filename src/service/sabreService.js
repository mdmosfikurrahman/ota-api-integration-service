const axios = require('axios');
const { getSabreToken } = require('../auth/tokenProvider');
const getOneWayPayload = require('../payloads/oneWayPayload');
const getRoundTripPayload = require('../payloads/roundTripPayload');
const getMultiCityPayload = require('../payloads/multiCityPayload');
const { sabreApiBaseUrl, sabreApiHeaders } = require('../config/config');

const getSabreFlightOffers = async (type, flightDetails, ReturnDateTime) => {
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
        payload = getOneWayPayload(flightDetails);
    } else if (type === 'round-trip') {
        if (!ReturnDateTime) {
            throw new Error("ReturnDateTime is required for round-trip");
        }
        payload = getRoundTripPayload(flightDetails, ReturnDateTime);
    } else if (type === 'multi-city') {
        payload = getMultiCityPayload(flightDetails);
    } else {
        throw new Error("Invalid flight type. Must be 'one-way', 'round-trip', or 'multi-city'");
    }

    try {
        const response = await axios.post(sabreApiBaseUrl, payload, { headers });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch flight offers: " + error.message);
    }
};

module.exports = { getSabreFlightOffers };
