# Test Cases - Filter essentials by category (ONEPETS-TBD)

## References
- Epic: EPIC-ONEPETS-2-essential-catalog-product-discovery
- Story: ONEPETS-TBD (Filter by category)
- FR: FR-006

## Test Cases

1) **Happy path food filter**
- Steps: Request essentials with `category=food`, `page=1`, `pageSize=10`.
- Expected: 200 OK; all items have `category=food`, `isEssential=true`, `active=true`; metadata present.

2) **Category + species combo**
- Steps: `category=food&species=dog`.
- Expected: 200 OK; all items have `category=food` and `species=dog`; pagination consistent.

3) **Invalid category**
- Steps: `category=toys`.
- Expected: 400 Bad Request; error lists allowed categories; no data array returned.

4) **Empty result for category**
- Steps: Ensure no `hygiene` essentials, call `category=hygiene`.
- Expected: 200 OK; empty list; empty-state flag/message.

5) **Pagination continuity**
- Steps: Seed >10 litter items; call `category=litter&page=2&pageSize=5`.
- Expected: Items belong to litter set; no duplicates vs page1; totals correct.

6) **Default ordering preserved**
- Steps: Call `category=food` twice; compare ordering.
- Expected: Deterministic order (e.g., name asc) maintained; stable across pages.

7) **Bad combination handling**
- Steps: Supply `category=food&species=bird`.
- Expected: 400 with clear message on invalid species; category not applied.

8) **Performance check**
- Steps: Measure response time for `category=food` under nominal load.
- Expected: P95 ≤2s; errors logged if breached.
