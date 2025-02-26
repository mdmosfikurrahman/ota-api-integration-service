class FlightDetails {
    constructor({ DepartureDateTime, OriginLocationCode, DestinationLocationCode }) {
        if (!DepartureDateTime) throw new Error("DepartureDateTime is required");
        if (!OriginLocationCode) throw new Error("OriginLocationCode is required");
        if (!DestinationLocationCode) throw new Error("DestinationLocationCode is required");

        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
        if (!dateRegex.test(DepartureDateTime)) {
            throw new Error("DepartureDateTime must be in the format YYYY-MM-DDTHH:MM:SS");
        }

        this.DepartureDateTime = DepartureDateTime;
        this.OriginLocationCode = OriginLocationCode;
        this.DestinationLocationCode = DestinationLocationCode;
    }
}

module.exports = FlightDetails;
