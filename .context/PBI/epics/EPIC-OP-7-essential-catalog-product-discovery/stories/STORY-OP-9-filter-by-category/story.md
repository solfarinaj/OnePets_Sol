# Filter Products by Category

**Jira Key:** OP-9
**Epic:** EPIC-OP-7 (Essential Catalog & Product Discovery)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** filter the product catalog by category (e.g., food, litter, hygiene)
**So that** I can easily narrow down the results to find specific types of products I need.

---

## Description

This story builds upon the species filtering functionality by adding the ability to filter products by their category. Users will be able to select one or more categories (e.g., "Food", "Litter", "Hygiene") to see only the products belonging to those categories. This filtering should work in conjunction with the species filter, allowing for a more refined product search.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Filter by a single category (Happy Path)
- **Given:** A user is on the main catalog page, optionally with a species filter applied.
- **When:** They select a category filter (e.g., "Food").
- **Then:** The product grid updates to show only products matching the selected category (and species, if applied).

### Scenario 2: Filter by multiple categories
- **Given:** A user is on the main catalog page, with a species filter applied.
- **When:** They select multiple category filters (e.g., "Food" and "Hygiene").
- **Then:** The product grid updates to show products matching any of the selected categories (and species).

### Scenario 3: Clear category filters
- **Given:** A user has one or more category filters applied.
- **When:** They select an "All" or equivalent option to clear the category filters.
- **Then:** The product grid updates to show all products for the current species (or all species if no species filter is applied).

### Scenario 4: No products found for selected filters
- **Given:** A user has applied species and category filters.
- **When:** No products match the applied filters.
- **Then:** The system displays a "No results found" message.

---

## Technical Notes

### Frontend
- Implement UI controls (e.g., checkboxes, dropdowns, or buttons) for category filtering.
- Manage the selected category filters in the component's state.
- Pass the selected categories as query parameters to the product fetching API call.
- Ensure the filtering UI works intuitively when combined with the species filter.

### Backend
- The `GET /api/products` endpoint must support a `category` query parameter.
- The API should filter the products from the `products` table based on the `category` parameter.
- The endpoint should be able to handle multiple category selections (e.g., a comma-separated list or multiple parameters).

### Database
- The `products` table must have a `category` column (enum: `food`, `litter`, `hygiene`).
- An index on the `category` column is recommended for performance.

---

## Dependencies

### Blocked By
- STORY-OP-8: Browse Essential Products by Species

### Blocks
- STORY-OP-10: Product Detail Page (filtering helps discover products to view details of)

### Related Stories
- None.

---

## UI/UX Considerations

- The category filter should be easy to discover and use, especially on mobile.
- Clear indication of currently active filters.
- Allow users to easily clear individual or all filters.

---

## Definition of Done

- [ ] Users can filter the product catalog by category.
- [ ] Filtering by category works in conjunction with species filtering.
- [ ] The product grid updates correctly based on the applied filters.
- [ ] The API endpoint supports category filtering.
- [ ] Unit tests for category filtering logic.
- [ ] E2E tests for applying category filters.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-7-essential-catalog-product-discovery/stories/STORY-OP-9-filter-by-category/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Filter by "Food" category.
- Filter by "Hygiene" category for "Dog" species.
- Filter by "Litter" and "Food" for "Cat" species.
- Test scenarios where no products match the applied filters.
- Test clearing category filters.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-7-essential-catalog-product-discovery/stories/STORY-OP-9-filter-by-category/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Design the UI for category filter controls.
- Implement the client-side state management for the filters.
- Modify the product fetching API call to include category parameters.
- Update the `/api/products` endpoint to handle category filtering.

---

## Notes
- The categories should be aligned with the available essential product types.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-7-essential-catalog-product-discovery/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-006)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (GET /api/products)
