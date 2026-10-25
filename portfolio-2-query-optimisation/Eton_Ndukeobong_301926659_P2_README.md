# Airline Reservation System — SQL queries

## 1. Show related reservation, passenger, flight records (up to 20).

```sql
SELECT t0."reservation_id" AS "reservation_reservation_id",
       t0."booked_at" AS "reservation_booked_at",
       t1."passenger_id" AS "passenger_passenger_id",
       t1."full_name" AS "passenger_full_name",
       t2."flight_id" AS "flight_flight_id",
       t2."flight_number" AS "flight_flight_number"
FROM portfolio."reservation" t0
JOIN portfolio."passenger" t1 ON t0."passenger_id" = t1."passenger_id"
JOIN portfolio."flight" t2 ON t0."flight_id" = t2."flight_id"
ORDER BY t0."reservation_id", t1."passenger_id", t2."flight_id"
LIMIT 20;
```

| reservation_reservation_id | reservation_booked_at | passenger_passenger_id | passenger_full_name | flight_flight_id | flight_flight_number |
| --- | --- | --- | --- | --- | --- |
| 3001 | 2026-10-25T13:00:00+00:00 | 2001 | Avery Stone | 1001 | SW101 |
| 3002 | 2026-10-25T13:05:00+00:00 | 2002 | Jordan Reed | 1001 | SW101 |

## 2. Find reservation records where status matches "confirmed" (up to 20).

```sql
SELECT * FROM portfolio."reservation"
WHERE "status" IS NOT DISTINCT FROM 'confirmed'
ORDER BY "reservation_id"
LIMIT 20;
```

| reservation_id | passenger_id | flight_id | booked_at | status | seat_number |
| --- | --- | --- | --- | --- | --- |
| 3001 | 2001 | 1001 | 2026-10-25T13:00:00+00:00 | confirmed | 12A |

## 3. Count reservation records for each passenger_id (up to 20 groups).

```sql
SELECT "passenger_id", count(*) AS record_count
FROM portfolio."reservation"
GROUP BY "passenger_id"
ORDER BY record_count DESC, "passenger_id" NULLS LAST
LIMIT 20;
```

| passenger_id | record_count |
| --- | --- |
| 2001 | 1 |
| 2002 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.145 | 1.145, 1.135, 1.636 | Sort → Seq Scan | 131 |
| After index | 0.172 | 0.171, 0.289, 0.172 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 1.145 ms to 0.172 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=1.111..1.113 rows=20 loops=1)
  Seq Scan on reservation (actual time=0.015..1.073 rows=20 loops=1)
Planning Time: 0.406 ms
Execution Time: 1.145 ms
```

### Before index, run 2

```text
Sort (actual time=1.106..1.107 rows=20 loops=1)
  Seq Scan on reservation (actual time=0.015..1.068 rows=20 loops=1)
Planning Time: 0.368 ms
Execution Time: 1.135 ms
```

### Before index, run 3

```text
Sort (actual time=1.598..1.599 rows=20 loops=1)
  Seq Scan on reservation (actual time=0.023..1.55 rows=20 loops=1)
Planning Time: 2.122 ms
Execution Time: 1.636 ms
```

### After index, run 1

```text
Sort (actual time=0.127..0.129 rows=20 loops=1)
  Bitmap Heap Scan on reservation (actual time=0.026..0.093 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.014 rows=20 loops=1)
Planning Time: 0.587 ms
Execution Time: 0.171 ms
```

### After index, run 2

```text
Sort (actual time=0.141..0.143 rows=20 loops=1)
  Bitmap Heap Scan on reservation (actual time=0.028..0.097 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.015 rows=20 loops=1)
Planning Time: 0.555 ms
Execution Time: 0.289 ms
```

### After index, run 3

```text
Sort (actual time=0.125..0.127 rows=20 loops=1)
  Bitmap Heap Scan on reservation (actual time=0.026..0.09 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.014 rows=20 loops=1)
Planning Time: 0.579 ms
Execution Time: 0.172 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Eton_Ndukeobong_301926659_P2_Queries.sql, then Eton_Ndukeobong_301926659_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Eton_Ndukeobong_301926659_P2_QueryResults.png) · [Index comparison](screenshots/Eton_Ndukeobong_301926659_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

