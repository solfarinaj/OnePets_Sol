# Browse essential products by species

**Jira Key:** ONEPETS-TBD  
**Epic:** EPIC-ONEPETS-2-essential-catalog-product-discovery (Essential Catalog & Product Discovery)  
**Priority:** High  
**Story Points:** 3  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** pet owner  
**I want to** browse the essential catalog filtered by species (dog/cat)  
**So that** I can quickly find products suitable for my pet

---

## Description

Provide a mobile-first essential catalog that defaults to showing all essential SKUs and allows the user to filter by species (dog or cat). Only active products flagged as `isEssential` must appear. Pagination must remain consistent when switching species, and invalid species values must be rejected with a clear error. Latency target per FR-005 is ≤2s P95.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Happy path – browse dog essentials
- **Given** the catalog contains active essential products for dogs
- **When** the user selects species = dog on the essentials list
- **Then** the list shows only dog products and excludes cat-only SKUs
- **And** the response time is within 2s under nominal conditions

### Scenario 2: Species not provided (default)
- **Given** the user opens the essentials list without selecting a species
- **When** the request is made without the `species` param
- **Then** the list returns all active essential products for all species
- **And** pagination values remain consistent (page, pageSize)

### Scenario 3: Invalid species value
- **Given** the user provides species = “bird”
- **When** the request is submitted
- **Then** the system rejects the filter with a 400 error and a clear message indicating allowed values (dog|cat)

### Scenario 4: Pagination with species filter
- **Given** there are more than one page of dog essentials
- **When** the user is on page 2 with species = dog
- **Then** the items shown belong to the dog set and page metadata (page, pageSize, totalPages) remains consistent

### Scenario 5: No active essentials for a species
- **Given** all cat essentials are inactive or out of scope
- **When** the user selects species = cat
- **Then** the list is empty and shows a mobile-friendly empty state with a CTA to change filters

---

## Technical Notes

### Frontend
- Mobile-first grid/list; species filter as segmented control or tabs.
- Loading and empty states must be present; errors surfaced via toast or inline message.

### Backend / API
- Endpoint per FR-005 with query params `species`, `page`, `pageSize`.
- Enforce `isEssential=true` and `active=true`.
- Validate `species` against enum (`dog|cat`).

### Database
- Uses `products` table fields: `id`, `name`, `species`, `category`, `isEssential`, `active`.
- Pagination via deterministic ordering (e.g., name asc or createdAt desc).

### External Services
- None beyond existing catalog data source; CDN for images if present.

---

## Dependencies

### Blocked By
- Product data flagged with `isEssential` and `active`.

### Blocks
- Further filtering stories (category) and UX polish that depend on species filter being stable.

### Related Stories
- Filtering by category (Story TBD)
- Product details (Story TBD)

---

## UI/UX Considerations

- Clear species toggle (dog/cat) always visible.
- Empty state guidance when no results after filtering.
- Preserve scroll position and pagination when switching species if feasible.

---

## Definition of Done

- [ ] API validates `species` and filters correctly.
- [ ] UI shows species filter, loading, empty, and error states.
- [ ] Pagination stable when applying species filter.
- [ ] Unit tests for species filter validation.
- [ ] Integration tests for API with species query.
- [ ] E2E for browsing essentials by species on mobile viewport.
- [ ] Documentation updated (API usage, UI states).

---

## Testing Strategy

See `test-cases.md` in this story folder for detailed cases (≥6, covering happy path, errors, and edge cases). Also align with FR-005 and NFR latency/UX constraints.
