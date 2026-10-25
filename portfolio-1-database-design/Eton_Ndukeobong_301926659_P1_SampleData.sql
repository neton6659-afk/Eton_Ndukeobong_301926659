-- Fictional sample records for Airline Reservation System.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."flight" ("flight_id", "flight_number", "departure_date", "origin", "destination", "capacity") VALUES (1001, 'SW101', '2026-11-05', 'AAA', 'BBB', 120);
INSERT INTO portfolio."flight" ("flight_id", "flight_number", "departure_date", "origin", "destination", "capacity") VALUES (1002, 'SW202', '2026-11-06', 'BBB', 'CCC', 80);
INSERT INTO portfolio."passenger" ("passenger_id", "full_name", "email") VALUES (2001, 'Avery Stone', 'avery.stone@example.test');
INSERT INTO portfolio."passenger" ("passenger_id", "full_name", "email") VALUES (2002, 'Jordan Reed', 'jordan.reed@example.test');
INSERT INTO portfolio."reservation" ("reservation_id", "passenger_id", "flight_id", "booked_at", "status", "seat_number") VALUES (3001, 2001, 1001, '2026-10-25T13:00:00Z', 'confirmed', '12A');
INSERT INTO portfolio."reservation" ("reservation_id", "passenger_id", "flight_id", "booked_at", "status", "seat_number") VALUES (3002, 2002, 1001, '2026-10-25T13:05:00+00:00', 'pending', NULL);
COMMIT;
