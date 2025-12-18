# View essential product details

**Jira Key:** ONEPETS-TBD  
**Epic:** EPIC-ONEPETS-2-essential-catalog-product-discovery  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** pet owner  
**I want to** view key details of an essential product  
**So that** I can decide if it’s suitable for my pet and proceed to purchase

---

## Description

Expose a product detail view for essential SKUs. It must pull core fields (name, description, species, category, presentations, weight, `isSubscriptionEligible`, `inStock`/availability flags, media) and handle inactive/missing IDs with a 404. Response must respect FR-007 and be mobile-friendly.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Happy path product detail
- **Given** a product is active and marked `isEssential=true`
- **When** the user opens the product detail with its `productId`
- **Then** the system returns status 200 with full product data (name, description, species, category, weight/presentations, isSubscriptionEligible, media, stock flags)

### Scenario 2: Inactive or non-essential product
- **Given** a product is inactive or not essential
- **When** the user requests its detail
- **Then** the system returns 404 (or hides it) with a clear message

### Scenario 3: Invalid productId
- **Given** the user provides a malformed UUID
- **When** the request is made
- **Then** the system responds 400 with validation error and no product payload

### Scenario 4: Missing product
- **Given** the productId does not exist
- **When** the detail is requested
- **Then** the system responds 404 with a safe error and a CTA to return to catalog

### Scenario 5: Subscription eligibility surfaced
- **Given** a product has `isSubscriptionEligible=true`
- **When** the detail is loaded
- **Then** the eligibility flag is returned and surfaced in the UI

### Scenario 6: Media and accessibility
- **Given** the product has media entries
- **When** the detail is rendered
- **Then** primary image URL and alt text are provided for accessibility

---

## Technical Notes

### Frontend
- Mobile-first layout with sticky CTA (add to cart/favorites).
- Show skeleton/loading, error, and “not found” states.

### Backend / API
- Endpoint with `productId` path param (UUID).
- Validate UUID; enforce `active=true` and `isEssential=true`.
- Return structured fields for UI (strings/numbers/enums only, no HTML).

### Database
- Use `products` and `product_media` tables; ensure indexed lookups by `id`.

### External Services
- CDN for media if available; otherwise Supabase storage public URLs.

---

## Dependencies

### Blocked By
- Products dataset with media and eligibility flags.

### Blocks
- Availability-by-address story and favorites (needs product base data).

### Related Stories
- Browse/filter essentials
- Availability per address
- Favorites

---

## UI/UX Considerations

- Prominent product name/price, eligibility badge, stock/availability.
- Clear 404/empty states with navigation back to catalog.

---

## Definition of Done

- [ ] API returns required fields and handles invalid/inactive IDs with correct codes.
- [ ] UI renders details, loading, error, and 404 states.
- [ ] Unit tests for validation/formatting.
- [ ] Integration tests for product detail endpoint.
- [ ] E2E: navigate from list to detail and back on mobile.
- [ ] Docs updated (field contract).

---

## Testing Strategy

See `test-cases.md` for detailed cases (≥6) aligned to FR-007 and error handling.
