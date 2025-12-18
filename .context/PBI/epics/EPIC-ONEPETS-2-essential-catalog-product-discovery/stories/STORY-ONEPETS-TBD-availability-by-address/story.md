# Show availability per selected address

**Jira Key:** ONEPETS-TBD  
**Epic:** EPIC-ONEPETS-2-essential-catalog-product-discovery  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** pet owner  
**I want to** see whether a product is available for my saved address (pilot zone)  
**So that** I know if fast delivery applies before adding to cart

---

## Description

For each essential product, calculate availability against the user’s selected address and the pilot zone inventory. Handle cases with no address or out-of-zone addresses by showing a clear message/CTA to set or update the address. Aligns with FR-008. Availability must be exposed both in list and detail contexts.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: In-zone address available
- **Given** the user is authenticated and has a saved address within the pilot zone
- **And** the product is in stock for that zone
- **When** the user views the product
- **Then** the system returns `isAvailableForAddress=true` and shows “Entrega rápida disponible” (or equivalent)

### Scenario 2: Out-of-zone address
- **Given** the user’s selected address is outside the pilot zone
- **When** the product is viewed
- **Then** `isAvailableForAddress=false` and the UI shows a clear message plus a CTA to change address

### Scenario 3: No address configured
- **Given** the user has no saved address
- **When** the product is viewed
- **Then** the system responds with availability unknown, instructs to add an address, and does not block navigation

### Scenario 4: Product not found or inactive
- **Given** the product is inactive or does not exist
- **When** availability is requested
- **Then** the system returns 404 and does not expose availability data

### Scenario 5: Address not owned by user
- **Given** an addressId not belonging to the authenticated user is provided
- **When** availability is requested
- **Then** the system returns 403/400 and does not leak address or product data

### Scenario 6: Inventory unavailable for zone
- **Given** the product has zero stock in the zone
- **When** availability is checked
- **Then** `isAvailableForAddress=false` with a message to choose alternatives

---

## Technical Notes

### Frontend
- Show availability pill/badge in list and detail; fallback messaging for unknown/out-of-zone.
- Preserve UX on mobile; avoid blocking flows if address missing—provide CTA.

### Backend / API
- Endpoint uses `productId` and user’s selected `deliveryAddressId`.
- Validate address ownership; compute `withinPilotZone`; check inventory for zone.
- Return boolean `isAvailableForAddress` and optional reason codes.

### Database
- Needs address store (from EPIC-ONEP-01) and inventory per zone.
- Product availability may read from `inventory`/`stock` table keyed by zone.

### External Services
- Zone service to determine `withinPilotZone`.

---

## Dependencies

### Blocked By
- User addresses and pilot zone definition.
- Inventory data per zone.

### Blocks
- Cart/checkout flows that rely on prevalidated availability.

### Related Stories
- Product details
- Favorites

---

## UI/UX Considerations

- Inline messaging: “No disponible para tu dirección” with CTA “Cambiar dirección”.
- Avoid modal blockers; keep flow simple on mobile.

---

## Definition of Done

- [ ] API validates address ownership and returns availability + reason.
- [ ] UI shows availability badges and clear messaging for missing/out-of-zone.
- [ ] Unit tests for availability logic and address validation.
- [ ] Integration tests for in-zone, out-of-zone, missing address, zero stock.
- [ ] E2E: user sets address, sees availability on list/detail.
- [ ] Docs updated (availability contract, reason codes).

---

## Testing Strategy

See `test-cases.md` for detailed cases (≥6) per FR-008.
