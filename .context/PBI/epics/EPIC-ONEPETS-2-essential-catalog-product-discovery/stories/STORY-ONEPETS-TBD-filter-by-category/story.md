# Filter essentials by category

**Jira Key:** ONEPETS-TBD  
**Epic:** EPIC-ONEPETS-2-essential-catalog-product-discovery  
**Priority:** High  
**Story Points:** 3  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** pet owner  
**I want to** filter the essential catalog by category (food, litter, hygiene)  
**So that** I can narrow the list to the product type I need

---

## Description

Extend the essentials catalog to accept a category filter that is validated against supported enums. The filter must combine with species when both are present, maintain deterministic pagination, and return clear errors for unsupported categories. Only active, `isEssential=true` products should appear. Aligns with FR-006.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Happy path filter by category
- **Given** the essentials catalog has active products in category `food`
- **When** the user selects category = food
- **Then** the list shows only essential food products and excludes other categories

### Scenario 2: Category + species combination
- **Given** there are dog food and cat food products
- **When** the user filters by category = food and species = dog
- **Then** the list shows only dog food essentials and pagination remains consistent

### Scenario 3: Invalid category
- **Given** the user enters category = “toys”
- **When** the request is made
- **Then** the system returns a 400 error with a message listing allowed categories

### Scenario 4: Empty results
- **Given** no essentials exist in category = hygiene
- **When** the user filters by category = hygiene
- **Then** the response is 200 with an empty list and an empty-state message

### Scenario 5: Pagination consistency
- **Given** more than one page of results for category = litter
- **When** the user loads page 2
- **Then** items are from the litter set and page metadata matches totalItems without duplication

### Scenario 6: Default ordering preserved
- **Given** ordering is deterministic (e.g., name asc)
- **When** category filter is applied
- **Then** order remains deterministic across pages and filters

---

## Technical Notes

### Frontend
- Category filter via chips/select; combine with species control.
- Show empty state and recoverable errors (bad category) gracefully.

### Backend / API
- Validate `category` against allowed values; reject unsupported.
- Combine with species and pagination; still enforce `isEssential=true` and `active=true`.

### Database
- Uses `products.category`; consider indexed fields for `species`, `category`, `isEssential`, `active`.

### External Services
- None beyond catalog data source.

---

## Dependencies

### Blocked By
- Categories defined and aligned with data source.

### Blocks
- UX optimizations and combined filters analytics.

### Related Stories
- Browse by species (Story TBD)
- Product details (Story TBD)

---

## UI/UX Considerations

- Keep filter controls accessible on mobile.
- Communicate when zero results after filtering; provide CTA to reset filters.

---

## Definition of Done

- [ ] Category filter UI implemented and combinable with species.
- [ ] API validates category and rejects unsupported values.
- [ ] Pagination stable with filters.
- [ ] Unit tests for filter validation logic.
- [ ] Integration tests covering category+species combinations.
- [ ] E2E for filtering flow on mobile viewport.
- [ ] Docs updated (accepted categories, filter behavior).

---

## Testing Strategy

See `test-cases.md` for detailed cases (≥6). Cover FR-006 and NFRs on UX/performance.
