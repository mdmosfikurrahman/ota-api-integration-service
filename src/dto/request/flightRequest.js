const FlightDetails = require('./flightDetails');

class FlightRequest {
    constructor({ source, type, flightDetails, ReturnDateTime }) {
        if (!source) throw new Error("Source is required");
        if (!type) throw new Error("Type is required");
        if (!flightDetails) throw new Error("Flight details are required");

        this.source = source;
        this.type = type;
        this.flightDetails = new FlightDetails(flightDetails);

        if (type === 'round-trip' && !ReturnDateTime) {
            throw new Error("ReturnDateTime is required for round-trip");
        }
        this.ReturnDateTime = ReturnDateTime;
    }
}

module.exports = FlightRequest;
