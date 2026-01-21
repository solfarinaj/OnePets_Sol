# Favorites Management

**Jira Key:** OP-12
**Epic:** EPIC-OP-7 (Essential Catalog & Product Discovery)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As an** authenticated pet owner
**I want to** mark products as favorites and view my list of favorited products
**So that** I can quickly find and reorder my most frequently purchased items.

---

## Description

This story enables authenticated users to mark any product as a "favorite" and to later access a dedicated list of these favorited products. This feature enhances convenience by reducing the steps required for repeat purchases and improves the personalized experience of the platform. The "favorites" status should be visually indicated on product cards and detail pages.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Mark a product as favorite (Happy Path)
- **Given:** An authenticated user is viewing a product.
- **When:** They click the "Favorite" icon/button for that product.
- **Then:** The product is added to their list of favorites.
- **And:** The "Favorite" icon visually changes to indicate the favorited status.

### Scenario 2: Unmark a product as favorite
- **Given:** An authenticated user is viewing a product marked as favorite.
- **When:** They click the "Favorite" icon/button again.
- **Then:** The product is removed from their list of favorites.
- **And:** The "Favorite" icon visually reverts to its non-favorited state.

### Scenario 3: View list of favorited products
- **Given:** An authenticated user has multiple products marked as favorite.
- **When:** They navigate to their "Favorites" section/page.
- **Then:** They see a list of all products they have marked as favorite.

### Scenario 4: Attempt to favorite product without authentication
- **Given:** An unauthenticated user is viewing a product.
- **When:** They click the "Favorite" icon/button.
- **Then:** The system prompts them to log in or register.
- **And:** The product is not added to favorites until authenticated.

---

## Technical Notes

### Frontend
- Implement a "Favorite" toggle button/icon on product cards and detail pages.
- Integrate with the user's authentication status.
- Call `POST /api/favorites` or `DELETE /api/favorites/{productId}` to update the favorite status.
- Implement a "My Favorites" page to display the list of favorited products by calling `GET /api/favorites`.

### Backend
- **`GET /api/favorites`**: Returns a list of all favorited products for the authenticated user.
- **`POST /api/favorites`**: Adds a product to the user's favorites.
- **`DELETE /api/favorites/{productId}`**: Removes a product from the user's favorites.
- All endpoints must be protected and enforce user ownership of favorite lists.

### Database
- **`public.favorite_products`**: This table will store the relationships between users and their favorited products. It will link `user_id` from `profiles` and `product_id` from `products`.
- RLS policies on `favorite_products` table are essential for data isolation.

---

## Dependencies

### Blocked By
- EPIC-OP-2: User Accounts & Pet Profiles (for user authentication).
- STORY-OP-10: Product Detail Page (for marking favorites from detail view).

### Blocks
- None directly for this MVP.

### Related Stories
- None.

---

## UI/UX Considerations

- The "Favorite" icon should be easily recognizable.
- Instant visual feedback on favorite/unfavorite action.
- A clear entry point to the "Favorites" list from the main navigation or user profile.

---

## Definition of Done

- [ ] Authenticated users can mark and unmark products as favorites.
- [ ] The favorited status is visually represented in the UI.
- [ ] A dedicated page/section displays all favorited products.
- [ ] All API endpoints for managing favorites are implemented and tested.
- [ ] RLS policies are correctly applied.
- [ ] Unit tests for favorite management logic.
- [ ] Integration tests for favorite API endpoints.
- [ ] E2E tests for the favorite/unfavorite flow and viewing the favorites list.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-7-essential-catalog-product-discovery/stories/STORY-OP-12-favorites-management/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Authenticated user marks a product as favorite.
- Authenticated user unmakes a product as favorite.
- Authenticated user views their list of favorites.
- Unauthenticated user attempts to mark a product as favorite (should be prompted to log in).
- Verify consistency of favorite status across product views.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-7-essential-catalog-product-discovery/stories/STORY-OP-12-favorites-management/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Implement the UI for the favorite toggle button/icon.
- Create API endpoints for favorite operations.
- Develop the "My Favorites" page component.
- Integrate frontend actions with backend API calls.

---

## Notes
- The initial implementation focuses on products as "favorite", not pet-specific favorites (e.g., "this food is a favorite for Rocky"). That could be a future enhancement.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-7-essential-catalog-product-discovery/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-009)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (GET/POST/DELETE /api/favorites)
