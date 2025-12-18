# Test Cases - Browse essential products by species (ONEPETS-TBD)

## References
- Epic: EPIC-ONEPETS-2-essential-catalog-product-discovery
- Story: ONEPETS-TBD (Browse essentials by species)
- FR: FR-005 (Listado de catálogo por especie)
- NFR: Latency ≤ 2s P95 mobile

## Test Cases

1) **Happy path dog filter**
- Steps: Call essentials endpoint with `species=dog`, `page=1`, `pageSize=10`.
- Expected: 200 OK; all items have `species=dog`, `isEssential=true`, `active=true`; pagination metadata present; response ≤2s.

2) **Happy path cat filter**
- Steps: `species=cat`, `page=1`.
- Expected: 200 OK; all items are cat essentials; response ≤2s; pagination metadata correct.

3) **Default without species**
- Steps: Request without `species`.
- Expected: 200 OK; returns all active essential products (dog and cat); pagination defaults (page=1, pageSize default); metadata consistent.

4) **Invalid species value**
- Steps: Request with `species=bird`.
- Expected: 400 Bad Request; error code/message indicates allowed values (dog|cat); no data array returned.

5) **Pagination continuity with filter**
- Steps: Request `species=dog&page=2&pageSize=5` when more than 5 dog items exist.
- Expected: Items belong to dog; page metadata matches totalItems; order deterministic (no duplicates between page1 and page2).

6) **Empty result for species**
- Steps: Temporarily set all cat essentials inactive, then request `species=cat`.
- Expected: 200 OK; empty list; empty-state message/flag returned for UI; pagination totals zero.

7) **Latency budget regression**
- Steps: Load essentials list with `species=dog` under nominal data set; measure response time.
- Expected: P95 latency ≤2s; log metrics captured.

8) **Error handling on backend failure**
- Steps: Force internal error (e.g., DB unavailable) and call with `species=dog`.
- Expected: 500 error; safe message; no stack traces or sensitive data; UI can surface a retry message.
