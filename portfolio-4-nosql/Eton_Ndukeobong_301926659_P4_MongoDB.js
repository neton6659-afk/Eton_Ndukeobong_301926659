// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("reservation_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("reservation_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "reservation_created",
                    "seat_confirmed"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "reservation"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "reservation_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("reservation_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "reservation_created",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "reservation",
            "key": {
                "reservation_id": 3001
            },
            "snapshot": {
                "reservation_id": 3001,
                "passenger_id": 2001,
                "flight_id": 1001,
                "booked_at": "2026-10-25T13:00:00Z",
                "status": "confirmed",
                "seat_number": "12A"
            }
        },
        "embedded": {
            "passenger": [
                {
                    "key": {
                        "passenger_id": 2001
                    },
                    "snapshot": {
                        "passenger_id": 2001,
                        "full_name": "Avery Stone",
                        "email": "avery.stone@example.test"
                    },
                    "via": [
                        "reservation.passenger_id → passenger"
                    ]
                }
            ],
            "flight": [
                {
                    "key": {
                        "flight_id": 1001
                    },
                    "snapshot": {
                        "flight_id": 1001,
                        "flight_number": "SW101",
                        "departure_date": "2026-11-05",
                        "origin": "AAA",
                        "destination": "BBB",
                        "capacity": 120
                    },
                    "via": [
                        "reservation.flight_id → flight"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "seat_confirmed",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "reservation",
            "key": {
                "reservation_id": 3001
            },
            "snapshot": {
                "reservation_id": 3001,
                "passenger_id": 2001,
                "flight_id": 1001,
                "booked_at": "2026-10-25T13:00:00Z",
                "status": "confirmed",
                "seat_number": "12A"
            }
        },
        "embedded": {
            "passenger": [
                {
                    "key": {
                        "passenger_id": 2001
                    },
                    "snapshot": {
                        "passenger_id": 2001,
                        "full_name": "Avery Stone",
                        "email": "avery.stone@example.test"
                    },
                    "via": [
                        "reservation.passenger_id → passenger"
                    ]
                }
            ],
            "flight": [
                {
                    "key": {
                        "flight_id": 1001
                    },
                    "snapshot": {
                        "flight_id": 1001,
                        "flight_number": "SW101",
                        "departure_date": "2026-11-05",
                        "origin": "AAA",
                        "destination": "BBB",
                        "capacity": 120
                    },
                    "via": [
                        "reservation.flight_id → flight"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "reservation",
                    "key": {
                        "reservation_id": 3001
                    },
                    "field": "seat_number",
                    "value": "12A"
                }
            ],
            "examples": {
                "reason": "illustrative reason",
                "change_source": "illustrative change_source"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "reservation_created",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "reservation",
            "key": {
                "reservation_id": 3002
            },
            "snapshot": {
                "reservation_id": 3002,
                "passenger_id": 2002,
                "flight_id": 1001,
                "booked_at": "2026-10-25T13:05:00+00:00",
                "status": "pending",
                "seat_number": null
            }
        },
        "embedded": {
            "passenger": [
                {
                    "key": {
                        "passenger_id": 2002
                    },
                    "snapshot": {
                        "passenger_id": 2002,
                        "full_name": "Jordan Reed",
                        "email": "jordan.reed@example.test"
                    },
                    "via": [
                        "reservation.passenger_id → passenger"
                    ]
                }
            ],
            "flight": [
                {
                    "key": {
                        "flight_id": 1001
                    },
                    "snapshot": {
                        "flight_id": 1001,
                        "flight_number": "SW101",
                        "departure_date": "2026-11-05",
                        "origin": "AAA",
                        "destination": "BBB",
                        "capacity": 120
                    },
                    "via": [
                        "reservation.flight_id → flight"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "seat_confirmed",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "reservation",
            "key": {
                "reservation_id": 3002
            },
            "snapshot": {
                "reservation_id": 3002,
                "passenger_id": 2002,
                "flight_id": 1001,
                "booked_at": "2026-10-25T13:05:00+00:00",
                "status": "pending",
                "seat_number": null
            }
        },
        "embedded": {
            "passenger": [
                {
                    "key": {
                        "passenger_id": 2002
                    },
                    "snapshot": {
                        "passenger_id": 2002,
                        "full_name": "Jordan Reed",
                        "email": "jordan.reed@example.test"
                    },
                    "via": [
                        "reservation.passenger_id → passenger"
                    ]
                }
            ],
            "flight": [
                {
                    "key": {
                        "flight_id": 1001
                    },
                    "snapshot": {
                        "flight_id": 1001,
                        "flight_number": "SW101",
                        "departure_date": "2026-11-05",
                        "origin": "AAA",
                        "destination": "BBB",
                        "capacity": 120
                    },
                    "via": [
                        "reservation.flight_id → flight"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "reservation",
                    "key": {
                        "reservation_id": 3002
                    },
                    "field": "seat_number",
                    "value": null
                }
            ],
            "examples": {
                "reason": "illustrative reason",
                "change_source": "illustrative change_source"
            }
        }
    }
]));
  await db.getCollection("reservation_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("reservation_events").find({"eventType":"reservation_created"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("reservation_events").find({"source.key.reservation_id":3001}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("reservation_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("reservation_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("reservation_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "reservation_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "reservation",
        "key": {
            "reservation_id": 3001
        },
        "snapshot": {
            "reservation_id": 3001,
            "passenger_id": 2001,
            "flight_id": 1001,
            "booked_at": "2026-10-25T13:00:00Z",
            "status": "confirmed",
            "seat_number": "12A"
        }
    },
    "embedded": {
        "passenger": [
            {
                "key": {
                    "passenger_id": 2001
                },
                "snapshot": {
                    "passenger_id": 2001,
                    "full_name": "Avery Stone",
                    "email": "avery.stone@example.test"
                },
                "via": [
                    "reservation.passenger_id → passenger"
                ]
            }
        ],
        "flight": [
            {
                "key": {
                    "flight_id": 1001
                },
                "snapshot": {
                    "flight_id": 1001,
                    "flight_number": "SW101",
                    "departure_date": "2026-11-05",
                    "origin": "AAA",
                    "destination": "BBB",
                    "capacity": 120
                },
                "via": [
                    "reservation.flight_id → flight"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("reservation_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "reservation_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "reservation",
        "key": {
            "reservation_id": 3001
        },
        "snapshot": {
            "reservation_id": 3001,
            "passenger_id": 2001,
            "flight_id": 1001,
            "booked_at": "2026-10-25T13:00:00Z",
            "status": "confirmed",
            "seat_number": "12A"
        }
    },
    "embedded": {
        "passenger": [
            {
                "key": {
                    "passenger_id": 2001
                },
                "snapshot": {
                    "passenger_id": 2001,
                    "full_name": "Avery Stone",
                    "email": "avery.stone@example.test"
                },
                "via": [
                    "reservation.passenger_id → passenger"
                ]
            }
        ],
        "flight": [
            {
                "key": {
                    "flight_id": 1001
                },
                "snapshot": {
                    "flight_id": 1001,
                    "flight_number": "SW101",
                    "departure_date": "2026-11-05",
                    "origin": "AAA",
                    "destination": "BBB",
                    "capacity": 120
                },
                "via": [
                    "reservation.flight_id → flight"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("reservation_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
