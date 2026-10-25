# Airline Reservation System — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| passenger_id | reservation records (list) |
| --- | --- |
| 2001 | [3001] |
| 2002 | [3002] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| reservation.reservation_id | reservation.passenger_id | reservation.flight_id | reservation.status | passenger.passenger_id | passenger.full_name | flight.flight_id | flight.flight_number |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 3001 | 2001 | 1001 | confirmed | 2001 | Avery Stone | 1001 | SW101 |
| 3002 | 2002 | 1001 | pending | 2002 | Jordan Reed | 1001 | SW101 |

Key: reservation_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## reservation_example

| reservation.reservation_id | reservation.passenger_id | reservation.flight_id | reservation.status | passenger.passenger_id | passenger.full_name | flight.flight_id | flight.flight_number |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 3001 | 2001 | 1001 | confirmed | 2001 | Avery Stone | 1001 | SW101 |
| 3002 | 2002 | 1001 | pending | 2002 | Jordan Reed | 1001 | SW101 |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## flight

| flight_id | flight_number | departure_date | origin | destination | capacity |
| --- | --- | --- | --- | --- | --- |
| 1001 | SW101 | 2026-11-05 | AAA | BBB | 120 |
| 1002 | SW202 | 2026-11-06 | BBB | CCC | 80 |

## passenger

| passenger_id | full_name | email |
| --- | --- | --- |
| 2001 | Avery Stone | avery.stone@example.test |
| 2002 | Jordan Reed | jordan.reed@example.test |

## reservation

| reservation_id | passenger_id | flight_id | booked_at | status | seat_number |
| --- | --- | --- | --- | --- | --- |
| 3001 | 2001 | 1001 | 2026-10-25T13:00:00+00:00 | confirmed | 12A |
| 3002 | 2002 | 1001 | 2026-10-25T13:05:00+00:00 | pending | NULL |

## Dependencies

- flight: (flight_id) → flight_number, departure_date, origin, destination, capacity
- passenger: (passenger_id) → full_name, email
- reservation: (reservation_id) → passenger_id, flight_id, booked_at, status, seat_number

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
