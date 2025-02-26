const getRoundTripPayload = (flightDetails, ReturnDateTime) => {
    return {
        "OTA_AirLowFareSearchRQ": {
            "Version": "5",
            "AvailableFlightsOnly": true,
            "POS": {
                "Source": [
                    {
                        "PseudoCityCode": "AO0L",
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
            "OriginDestinationInformation": [
                {
                    "RPH": "1",
                    "DepartureDateTime": flightDetails.DepartureDateTime,
                    "OriginLocation": {
                        "LocationType": "A",
                        "LocationCode": flightDetails.OriginLocationCode
                    },
                    "DestinationLocation": {
                        "LocationType": "A",
                        "LocationCode": flightDetails.DestinationLocationCode
                    },
                    "TPA_Extensions": {
                        "CabinPref": {
                            "Cabin": "Y",
                            "PreferLevel": "Preferred"
                        }
                    }
                },
                {
                    "RPH": "2",
                    "DepartureDateTime": ReturnDateTime,
                    "OriginLocation": {
                        "LocationType": "A",
                        "LocationCode": flightDetails.DestinationLocationCode
                    },
                    "DestinationLocation": {
                        "LocationType": "A",
                        "LocationCode": flightDetails.OriginLocationCode
                    },
                    "TPA_Extensions": {
                        "CabinPref": {
                            "Cabin": "Y",
                            "PreferLevel": "Preferred"
                        }
                    }
                }
            ],
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
                    },
                    "TripType": {
                        "Value": "Return"
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

module.exports = getRoundTripPayload;
