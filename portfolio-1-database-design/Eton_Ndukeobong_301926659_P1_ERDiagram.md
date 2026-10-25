# Airline Reservation System — ER diagram

```mermaid
erDiagram
    direction LR
    flight {
        bigint flight_id PK
        text flight_number
        date departure_date
        text origin
        text destination
        integer capacity
    }
    passenger {
        bigint passenger_id PK
        text full_name
        text email UK
    }
    reservation {
        bigint reservation_id PK
        bigint passenger_id FK
        bigint flight_id FK
        timestamptz booked_at
        text status
        text seat_number "Optional"
    }
    passenger ||--o{ reservation : "passenger_id"
    flight ||--o{ reservation : "flight_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Eton_Ndukeobong_301926659_ERDiagram.png)
