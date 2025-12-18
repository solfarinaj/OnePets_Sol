# Manage favorite essential products

**Jira Key:** ONEPETS-TBD  
**Epic:** EPIC-ONEPETS-2-essential-catalog-product-discovery  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** authenticated pet owner  
**I want to** add or remove essential products from my favorites and view the list  
**So that** I can reorder quickly without searching again

---

## Description

Allow authenticated users to mark essential products as favorites, remove them, and view a favorites list. Avoid duplicates, persist across sessions, and enforce auth. Errors and empty states must be clear on mobile. Based on FR-009.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Add favorite
- **Given** the user is authenticated
- **When** they tap “Add to favorites” on an active essential product
- **Then** the product is saved to favorites and a success toast/indicator is shown

### Scenario 2: Remove favorite
- **Given** the user has the product favorited
- **When** they tap “Remove from favorites”
- **Then** the product is removed and the UI reflects the change

### Scenario 3: Prevent duplicates
- **Given** a product is already in favorites
- **When** the user tries to add it again
- **Then** no duplicate entry is created and the UI stays in “favorited” state

### Scenario 4: View favorites list
- **Given** the user has favorites saved
- **When** they open the favorites list
- **Then** they see only their favorited essential products with basic details (name, species, category, availability badge)

### Scenario 5: Auth required
- **Given** the user is not authenticated
- **When** they attempt to add/remove favorites
- **Then** the system rejects the action and prompts to log in

### Scenario 6: Empty favorites
- **Given** the user has no favorites
- **When** they open the favorites list
- **Then** an empty state is shown with a CTA to browse essentials

---

## Technical Notes

### Frontend
- Favorite toggle in list and detail; sync state on success.
- Empty state and error toasts; optimistic update with rollback on error.

### Backend / API
- Endpoints: add/remove favorite with `productId` (UUID), list favorites.
- Require auth; enforce `isEssential=true` and `active=true` on add.
- Idempotent add; remove non-existing entry should be safe (no error).

### Database
- Table `favorite_products` (userId, productId, timestamps); unique constraint (userId, productId).

### External Services
- None.

---

## Dependencies

### Blocked By
- Auth/session in place.
- Product catalog to validate product exists and is essential/active.

### Blocks
- Reorder shortcuts and personalized recommendations.

### Related Stories
- Product details
- Availability per address

---

## UI/UX Considerations

- Clear favorite icon states (filled/outline); feedback on tap.
- Keep actions reachable on mobile; empty state with CTA to browse.

---

## Definition of Done

- [ ] Auth enforced for add/remove/list.
- [ ] No duplicate favorites per user.
- [ ] Favorite state synced between list and detail.
- [ ] Unit tests for toggling logic and reducers/hooks.
- [ ] Integration tests for API add/remove/list.
- [ ] E2E: add favorite from detail, view in favorites list, remove.
- [ ] Docs updated (API contract, UI states).

---

## Testing Strategy

See `test-cases.md` for detailed cases (≥6) aligned to FR-009.
