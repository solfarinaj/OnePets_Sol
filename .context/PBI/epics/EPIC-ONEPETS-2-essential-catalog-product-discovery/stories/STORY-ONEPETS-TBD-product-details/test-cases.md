# Test Cases - Product details (ONEPETS-TBD)

## References
- Epic: EPIC-ONEPETS-2-essential-catalog-product-discovery
- Story: ONEPETS-TBD (Product details)
- FR: FR-007

## Test Cases

1) **Happy path active essential product**
- Steps: Request detail for active essential product with valid UUID.
- Expected: 200 OK; payload includes name, description, species, category, weight/presentation, isSubscriptionEligible, media URLs, stock flags.

2) **Inactive product returns 404**
- Steps: Mark product inactive, request detail.
- Expected: 404; safe error message; no product payload.

3) **Non-essential product hidden**
- Steps: Product has `isEssential=false`; request detail.
- Expected: 404 (or equivalent hide behavior); message indicates unavailable.

4) **Invalid UUID**
- Steps: Request with `productId=123`.
- Expected: 400; validation error; no product data returned.

5) **Missing product**
- Steps: Request a valid UUID not in DB.
- Expected: 404; message to return to catalog; no internal details leaked.

6) **Subscription eligibility surfaced**
- Steps: Product with `isSubscriptionEligible=true`.
- Expected: Payload includes flag; UI renders badge/text accordingly.

7) **Media present with alt text**
- Steps: Product with media entry.
- Expected: Primary image URL and alt text returned; formats suitable for CDN/public delivery.

8) **Performance check**
- Steps: Request detail under nominal load.
- Expected: Response ≤2s P95; errors logged if breached.
