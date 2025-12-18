# Test Cases - Availability per address (ONEPETS-TBD)

## References
- Epic: EPIC-ONEPETS-2-essential-catalog-product-discovery
- Story: ONEPETS-TBD (Availability by address)
- FR: FR-008

## Test Cases

1) **In-zone address with stock**
- Steps: User authenticated with address in pilot zone; inventory has stock. Request availability for product.
- Expected: 200 OK; `isAvailableForAddress=true`; reason code “in_zone_with_stock”.

2) **Out-of-zone address**
- Steps: User address outside pilot zone; request availability.
- Expected: 200 OK; `isAvailableForAddress=false`; reason “out_of_zone”; UI can show CTA to change address.

3) **No address configured**
- Steps: Authenticated user with no saved address requests availability.
- Expected: 200 OK; availability returns unknown/false plus reason “no_address”; instruction to add address.

4) **Address not owned by user**
- Steps: Use addressId belonging to another user.
- Expected: 403/400; no availability data leaked; error message safe.

5) **Zero stock in zone**
- Steps: Address in zone but inventory=0.
- Expected: 200 OK; `isAvailableForAddress=false`; reason “no_stock_zone”.

6) **Product inactive**
- Steps: Product marked inactive; request availability.
- Expected: 404; product not returned; no availability field.

7) **Invalid productId**
- Steps: productId malformed UUID.
- Expected: 400 validation error; no availability data.

8) **Performance**
- Steps: Measure availability request with valid data.
- Expected: Response ≤2s P95; errors logged if slower.
