const { getSabreFlightOffers } = require('../service/sabreService');
const FlightRequest = require('../dto/request/flightRequest');

const flightResponse = async (req, res) => {
    try {
        const requestData = new FlightRequest(req.body);

        if (requestData.source !== 'sabre') {
            return res.status(400).json({ error: "Invalid flight source. Define Source in Request Body!" });
        }

        const flightData = await getSabreFlightOffers(
            requestData.type,
            requestData.flightDetails,
            requestData.ReturnDateTime
        );

        res.json(flightData);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { flightResponse };
