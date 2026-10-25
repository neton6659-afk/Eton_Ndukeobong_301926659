# Airline Reservation System — database design

My case study records flight, passenger, reservation.

## Users

- Passengers viewing and reserving seats
- Reservation staff managing bookings
- Analysts reviewing flight bookings

## Main operations

- Create a reservation for a passenger on a flight
- Confirm or cancel a reservation
- Review confirmed reservations by flight and date

## Entities

| Entity | Information stored |
| --- | --- |
| flight | A scheduled flight with a finite seat capacity. |
| passenger | A synthetic passenger identity and contact record. |
| reservation | A passenger's booking and seat status for one flight. |

## flight

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| flight_id | BIGINT | PK | Yes |
| flight_number | TEXT |  | Yes |
| departure_date | DATE |  | Yes |
| origin | TEXT |  | Yes |
| destination | TEXT |  | Yes |
| capacity | INTEGER |  | Yes |
- Unique key: (flight_number, departure_date).

## passenger

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| passenger_id | BIGINT | PK | Yes |
| full_name | TEXT |  | Yes |
| email | TEXT | Unique | Yes |
- Unique key: (email).

## reservation

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| reservation_id | BIGINT | PK | Yes |
| passenger_id | BIGINT | FK | Yes |
| flight_id | BIGINT | FK | Yes |
| booked_at | TIMESTAMPTZ |  | Yes |
| status | TEXT |  | Yes |
| seat_number | TEXT |  | No |
- passenger_id → passenger.passenger_id
- flight_id → flight.flight_id

## Relationships and business rules

- Every flight must have a capacity greater than zero.
- A flight number and departure date identify at most one scheduled flight.
- Each synthetic passenger email is unique.
- Every reservation references an existing passenger through passenger_id.
- Every reservation references an existing flight through flight_id.
- Reservation status must be pending, confirmed, or cancelled.
- Among reservations with status confirmed and a non-null seat_number, each flight_id and seat_number pair is unique.

## Assumptions

- A flight is identified by its flight number and departure date; airport codes and names are synthetic.
- Each reservation refers to exactly one passenger and one flight.
- Reservation status is pending, confirmed, or cancelled; only confirmed reservations occupy a seat.
- Seat numbers are meaningful only when a reservation is confirmed.
- The database enforces confirmed-seat exclusivity; seat availability is not inferred from synthetic data outside the declared constraints.

