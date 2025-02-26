const FlightDetails = require('./flightDetails');

class FlightRequest {
    constructor({source, type, flightDetails, ReturnDateTime}) {
        if (!source) throw new Error("Source is required");
        if (!type) throw new Error("Type is required");
        if (!flightDetails) throw new Error("Flight details are required");

        this.source = source;
        this.type = type;

        if (type === 'multi-city') {
            if (!Array.isArray(flightDetails) || flightDetails.length < 2) {
                throw new Error("For multi-city, flightDetails must be an array with at least two flight segments.");
            }
            this.flightDetails = flightDetails.map(flight => new FlightDetails(flight));
        } else {
            this.flightDetails = new FlightDetails(flightDetails);
        }

        if (type === 'round-trip' && !ReturnDateTime) {
            throw new Error("ReturnDateTime is required for round-trip");
        }
        this.ReturnDateTime = ReturnDateTime;
    }
}

module.exports = FlightRequest;
