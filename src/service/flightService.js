const { getSabreFlightOffers } = require('../service/sabreService');

const flightResponse = async (req, res) => {
    const { source, type, DepartureDateTime, OriginLocationCode, DestinationLocationCode, ReturnDateTime } = req.body;

    if (source === 'sabre') {
        if (!type || !DepartureDateTime || !OriginLocationCode || !DestinationLocationCode) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const flightData = await getSabreFlightOffers(type, DepartureDateTime, OriginLocationCode, DestinationLocationCode, ReturnDateTime);
            res.json(flightData);
        } catch (error) {
            console.error("Error fetching flight offers:", error);
            res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(400).json({ error: "Invalid flight source. Define Source in Request Body!" });
    }
};

module.exports = { flightResponse };
