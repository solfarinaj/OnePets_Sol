# Browse Essential Products by Species

**Jira Key:** OP-8
**Epic:** EPIC-OP-7 (Essential Catalog & Product Discovery)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** browse essential products by my pet's species (dog or cat)
**So that** I can quickly find relevant products without seeing items for other animals.

---

## Description

This story involves creating a primary navigation or filtering mechanism on the main product listing page that allows users to toggle between "Dog" and "Cat" product views. The catalog should dynamically update to show only the products relevant to the selected species. This is the first and most crucial step in narrowing down the product selection for the user.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Filter by "Dog" (Happy Path)
- **Given:** A user is on the main catalog page.
- **When:** They select the "Dog" species filter.
- **Then:** The product grid updates to show only products where `species` is 'dog'.
- **And:** All products for 'cat' are hidden.

### Scenario 2: Filter by "Cat"
- **Given:** A user is on the main catalog page.
- **When:** They select the "Cat" species filter.
- **Then:** The product grid updates to show only products where `species` is 'cat'.
- **And:** All products for 'dog' are hidden.

### Scenario 3: View all products
- **Given:** A user has selected a species filter.
- **When:** They select the "All" or an equivalent option to clear the species filter.
- **Then:** The product grid updates to show all essential products for both dogs and cats.

---

## Technical Notes

### Frontend
- Implement UI controls (e.g., tabs, buttons, or a dropdown) to select the species.
- Manage the selected species filter in the component's state.
- Pass the selected species as a query parameter to the product fetching API call.
- The product grid should re-render when the filter changes.

### Backend
- The `GET /api/products` endpoint must support a `species` query parameter.
- The API should filter the products from the `products` table based on the `species` parameter.

### Database
- The `products` table must have a `species` column (enum: `dog`, `cat`).
- An index on the `species` column is recommended for performance.

---

## Dependencies

### Blocked By
- None. This is a foundational story for the catalog.

### Blocks
- STORY-OP-9: Filter by Category
- STORY-OP-10: Product Detail Page

### Related Stories
- None.

---

## UI/UX Considerations

- The species filter should be prominently displayed and easy to use.
- The page should provide clear visual feedback when a filter is applied.
- The filtering action should feel fast and responsive.

---

## Definition of Done

- [ ] Users can filter the product catalog by "Dog" and "Cat".
- [ ] The product grid updates correctly based on the selected filter.
- [ ] The API endpoint for fetching products supports filtering by species.
- [ ] Unit tests for the filtering logic are implemented.
- [ ] E2E test for applying a species filter and verifying the results.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-7-essential-catalog-product-discovery/stories/STORY-OP-8-browse-by-species/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Select "Dog" filter and verify only dog products are shown.
- Select "Cat" filter and verify only cat products are shown.
- Clear the filter and verify all products are shown.
- Test that the filter state is maintained during page navigation (if applicable).

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-7-essential-catalog-product-discovery/stories/STORY-OP-8-browse-by-species/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create the UI for the species filter controls.
- Implement the client-side state management for the filter.
- Modify the product fetching logic to include the `species` parameter in the API call.
- Update the `/api/products` endpoint to handle the `species` filter.

---

## Notes
- This story lays the groundwork for all other filtering and search functionalities.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-7-essential-catalog-product-discovery/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-005)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (GET /api/products)
