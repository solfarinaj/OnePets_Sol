# Test Cases - Favorites (ONEPETS-TBD)

## References
- Epic: EPIC-ONEPETS-2-essential-catalog-product-discovery
- Story: ONEPETS-TBD (Favorites)
- FR: FR-009

## Test Cases

1) **Add favorite (auth)**
- Steps: Auth user calls add favorite with valid essential, active `productId`.
- Expected: 200 OK; favorite created; response includes productId; UI can mark favorited.

2) **Remove favorite**
- Steps: Product already favorited; call remove.
- Expected: 200 OK; entry removed; idempotent if called again (still 200, no error).

3) **Prevent duplicate**
- Steps: Add same product twice.
- Expected: Second add is no-op (200 or 409 handled gracefully); only one record exists.

4) **List favorites**
- Steps: Auth user with multiple favorites lists them.
- Expected: 200 OK; returns array with basic product fields (name, species, category, availability badge if available); sorted deterministically.

5) **Auth required**
- Steps: Unauthenticated request to add favorite.
- Expected: 401/403; no favorite created.

6) **Inactive/non-essential product**
- Steps: Try to favorite inactive or non-essential product.
- Expected: 400/404; not added; clear message.

7) **Empty favorites**
- Steps: User with no favorites lists them.
- Expected: 200 OK; empty array; empty-state flag/message.

8) **Performance**
- Steps: Add and list under nominal load.
- Expected: Responses ≤2s P95; no sensitive data leaked on errors.
