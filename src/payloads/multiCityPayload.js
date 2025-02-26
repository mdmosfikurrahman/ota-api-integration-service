const getMultiCityPayload = (flightDetails) => {
    const originDestinationInfo = flightDetails.map((flight, index) => ({
        RPH: (index + 1).toString(),
        DepartureDateTime: flight.DepartureDateTime,
        OriginLocation: {
            LocationType: "A",
            LocationCode: flight.OriginLocationCode
        },
        DestinationLocation: {
            LocationType: "A",
            LocationCode: flight.DestinationLocationCode
        },
        TPA_Extensions: {
            CabinPref: {
                Cabin: "Y",
                PreferLevel: "Preferred"
            }
        }
    }));

    return {
        "OTA_AirLowFareSearchRQ": {
            "Version": "5",
            "AvailableFlightsOnly": true,
            "POS": {
                "Source": [
                    {
                        "PseudoCityCode": "HE9L",
                        "RequestorID": {
                            "Type": "1",
                            "ID": "1",
                            "CompanyName": {
                                "Code": "TN"
                            }
                        }
                    }
                ]
            },
            "OriginDestinationInformation": originDestinationInfo,
            "TravelPreferences": {
                "MaxStopsQuantity": 2,
                "ETicketDesired": true,
                "Baggage": {
                    "CarryOnInfo": true
                },
                "TPA_Extensions": {
                    "NumTrips": {
                        "Number": 50
                    },
                    "DataSources": {
                        "NDC": "Disable",
                        "ATPCO": "Enable",
                        "LCC": "Enable"
                    }
                }
            },
            "TravelerInfoSummary": {
                "SeatsRequested": [
                    1
                ],
                "AirTravelerAvail": [
                    {
                        "PassengerTypeQuantity": [
                            {
                                "Code": "ADT",
                                "Quantity": 1
                            }
                        ]
                    }
                ],
                "PriceRequestInformation": {
                    "TPA_Extensions": {
                        "PublicFare": {
                            "Ind": false
                        },
                        "Priority": {
                            "Price": {
                                "Priority": 1
                            },
                            "DirectFlights": {
                                "Priority": 2
                            },
                            "Time": {
                                "Priority": 3
                            },
                            "Vendor": {
                                "Priority": 4
                            }
                        }
                    },
                    "CurrencyCode": "BDT"
                }
            },
            "TPA_Extensions": {
                "IntelliSellTransaction": {
                    "RequestType": {
                        "Name": "50ITINS"
                    }
                }
            }
        }
    };
};

module.exports = getMultiCityPayload;
