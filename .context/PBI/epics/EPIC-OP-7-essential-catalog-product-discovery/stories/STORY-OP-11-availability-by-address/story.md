# Product Availability by Address

**Jira Key:** OP-11
**Epic:** EPIC-OP-7 (Essential Catalog & Product Discovery)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** see product availability for my saved address
**So that** I know if a product is eligible for fast delivery in my area before attempting to purchase.

---

## Description

This story enables users to view the availability of products specific to their primary delivery address. The system will leverage the `within_pilot_zone` flag associated with the user's address (from EPIC-OP-2) and the product's `in_stock` status to provide clear indicators on product cards or detail pages. This feature is crucial for setting realistic delivery expectations and improving the overall user experience, especially for the fast delivery promise.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Product available in pilot zone (Happy Path)
- **Given:** A user has a saved address within the pilot zone.
- **And:** They are viewing a product that is in stock.
- **When:** They see the product in the catalog or on its detail page.
- **Then:** The system clearly indicates "Available for fast delivery" or similar.

### Scenario 2: Product out of stock in pilot zone
- **Given:** A user has a saved address within the pilot zone.
- **And:** They are viewing a product that is currently out of stock.
- **When:** They see the product in the catalog or on its detail page.
- **Then:** The system clearly indicates "Out of stock in your area" or similar.

### Scenario 3: User's address is outside pilot zone
- **Given:** A user has a saved address that is outside the pilot zone.
- **When:** They view any product.
- **Then:** The system indicates "Not available for fast delivery in your area" or similar.

### Scenario 4: User has no address saved
- **Given:** A user is authenticated but has no address saved in their profile.
- **When:** They view any product.
- **Then:** The system indicates "Add your address to check availability" or similar.

---

## Technical Notes

### Frontend
- Integrate with the user's saved address information (specifically the `within_pilot_zone` status).
- Display availability status prominently on product cards and product detail pages.
- The UI must dynamically update based on whether the user is logged in, has an address, and if that address is in the pilot zone.

### Backend
- The `GET /api/products` and `GET /api/products/{productId}` endpoints will need to be able to determine the availability based on the user's context (which might involve passing the user's address ID or being integrated with the authentication context).
- This will involve querying the `addresses` table (linked to the user) and the `products` table (`in_stock` field).

### Database
- The `addresses` table contains the `within_pilot_zone` flag.
- The `products` table contains the `in_stock` flag.
- RLS policies on `addresses` must ensure only the user's own address is accessible.

---

## Dependencies

### Blocked By
- STORY-OP-6: Profile and Address Update (for reliable address data).
- STORY-OP-10: Product Detail Page (to display availability on individual product pages).

### Blocks
- EPIC-OP-3: Cart, Checkout & Payments (ensures users don't try to buy unavailable products).

### Related Stories
- None.

---

## UI/UX Considerations

- Availability messages should be concise and easy to understand.
- Use clear visual cues (e.g., green/red badges, different text styles).
- Provide a call to action if no address is saved or if outside the pilot zone (e.g., "Manage Address").

---

## Definition of Done

- [ ] Product availability is accurately displayed based on the user's address status.
- [ ] Different messages are shown for in-stock/out-of-stock, in-zone/out-of-zone, and no-address scenarios.
- [ ] Frontend dynamically updates availability status.
- [ ] Backend API efficiently provides availability information.
- [ ] Unit tests for availability logic.
- [ ] Integration tests for relevant API endpoints.
- [ ] E2E tests for displaying availability in various scenarios.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-7-essential-catalog-product-discovery/stories/STORY-OP-11-availability-by-address/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- View product as an authenticated user with an in-zone address, product in stock.
- View product as an authenticated user with an in-zone address, product out of stock.
- View product as an authenticated user with an out-of-zone address.
- View product as an unauthenticated user (no address context).
- View product as an authenticated user with no saved address.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-7-essential-catalog-product-discovery/stories/STORY-OP-11-availability-by-address/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Integrate address context into product display components.
- Implement conditional rendering for availability messages.
- Modify product API calls to include user address context for availability checks.
- Potentially create a dedicated availability service or utility function.

---

## Notes
- This feature directly impacts the "fast delivery" value proposition.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-7-essential-catalog-product-discovery/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-008)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (GET /api/products)
