-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. flight pk reject. Expected: pk_flight, SQLSTATE 23505.
INSERT INTO portfolio."flight" ("flight_id", "flight_number", "departure_date", "origin", "destination", "capacity")
VALUES (1001, 'SW999', '2026-12-01', 'DDD', 'EEE', 50);

-- 2. flight unique reject. Expected: uq_flight_0, SQLSTATE 23505.
INSERT INTO portfolio."flight" ("flight_id", "flight_number", "departure_date", "origin", "destination", "capacity")
VALUES (4001, 'SW101', '2026-11-05', 'DDD', 'EEE', 50);

-- 3. passenger pk reject. Expected: pk_passenger, SQLSTATE 23505.
INSERT INTO portfolio."passenger" ("passenger_id", "full_name", "email")
VALUES (2001, 'Taylor Quinn', 'taylor.quinn@example.test');

-- 4. passenger unique reject. Expected: uq_passenger_0, SQLSTATE 23505.
INSERT INTO portfolio."passenger" ("passenger_id", "full_name", "email")
VALUES (4002, 'Taylor Quinn', 'avery.stone@example.test');

-- 5. reservation pk reject. Expected: pk_reservation, SQLSTATE 23505.
INSERT INTO portfolio."reservation" ("reservation_id", "passenger_id", "flight_id", "booked_at", "status", "seat_number")
VALUES (3001, 2002, 1002, '2026-10-25T13:10:00Z', 'pending', NULL);

-- 6. reservation passenger fk reject. Expected: fk_reservation_0, SQLSTATE 23503.
INSERT INTO portfolio."reservation" ("reservation_id", "passenger_id", "flight_id", "booked_at", "status", "seat_number")
VALUES (4003, 4999, 1002, '2026-10-25T13:15:00Z', 'pending', NULL);

-- 7. reservation flight fk reject. Expected: fk_reservation_1, SQLSTATE 23503.
INSERT INTO portfolio."reservation" ("reservation_id", "passenger_id", "flight_id", "booked_at", "status", "seat_number")
VALUES (4004, 2002, 4998, '2026-10-25T13:20:00Z', 'pending', NULL);

-- 8. flight capacity check reject. Expected: flight_capacity_positive, SQLSTATE 23514.
INSERT INTO portfolio."flight" ("flight_id", "flight_number", "departure_date", "origin", "destination", "capacity")
VALUES (4005, 'SW303', '2026-12-03', 'CCC', 'DDD', 0);

-- 9. reservation status check reject. Expected: reservation_status_valid, SQLSTATE 23514.
INSERT INTO portfolio."reservation" ("reservation_id", "passenger_id", "flight_id", "booked_at", "status", "seat_number")
VALUES (4006, 2002, 1002, '2026-10-25T13:25:00Z', 'on_hold', NULL);

-- 10. confirmed seat unique reject. Expected: confirmed_seat_unique, SQLSTATE 23505.
INSERT INTO portfolio."reservation" ("reservation_id", "passenger_id", "flight_id", "booked_at", "status", "seat_number")
VALUES (4007, 2002, 1001, '2026-10-25T13:30:00Z', 'confirmed', '12A');

-- 11. flight number not null reject. Expected: flight_number, SQLSTATE 23502.
INSERT INTO portfolio."flight" ("flight_id", "flight_number", "departure_date", "origin", "destination", "capacity")
VALUES (4008, NULL, '2026-12-04', 'DDD', 'EEE', 60);
