# Add Products to Cart

**Jira Key:** OP-14
**Epic:** EPIC-OP-13 (Cart, Checkout & Payments)
**Priority:** Critical
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** add products from the catalog or product detail page to my shopping cart
**So that** I can select multiple items and prepare my purchase before checkout.

---

## Description

This story covers the core functionality of adding products to a user's shopping cart. Users should be able to specify the quantity of a product and add it to their cart. The system needs to manage the cart state, including updating quantities if a product is added multiple times, and reflecting the current contents and subtotal of the cart. This feature is fundamental for enabling the purchase flow.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Add a new product to an empty cart (Happy Path)
- **Given:** A user has an empty cart.
- **When:** They are on a product page and click "Add to Cart" for a specific product.
- **Then:** The product is added to the cart with a quantity of 1.
- **And:** The cart's subtotal reflects the price of the added product.

### Scenario 2: Add an existing product to the cart (increment quantity)
- **Given:** A user's cart already contains a specific product.
- **When:** They add the same product to the cart again.
- **Then:** The quantity of that product in the cart is incremented.
- **And:** The cart's subtotal is updated to reflect the new total.

### Scenario 3: Attempt to add an out-of-stock product
- **Given:** A user is viewing a product that is currently out of stock.
- **When:** They attempt to add the product to their cart.
- **Then:** The system displays an error message: "This product is currently out of stock."
- **And:** The product is not added to the cart.

### Scenario 4: Add multiple units of a product
- **Given:** A user is on a product page.
- **When:** They specify a quantity (e.g., 2) and click "Add to Cart".
- **Then:** The product is added to the cart with the specified quantity.
- **And:** The cart's subtotal reflects the price of the product multiplied by the quantity.

---

## Technical Notes

### Frontend
- Implement "Add to Cart" buttons on product cards and product detail pages.
- Handle quantity selection for products.
- Send `POST` requests to the `/api/cart` endpoint to add products.
- Update the displayed cart icon/summary to reflect changes.

### Backend
- **`POST /api/cart`**: Endpoint to add a product to the authenticated user's cart.
- This endpoint will validate product existence and stock availability.
- It will create or update `cart_items` in the `carts` table and recalculate cart totals.

### Database
- **`public.carts`**: Stores a user's current active cart (one per user).
- **`public.cart_items`**: Stores individual products, quantities, and their total price within a cart.
- **`public.products`**: Needed for product details and stock information.
- RLS policies on `carts` and `cart_items` to ensure users only modify their own carts.

---

## Dependencies

### Blocked By
- EPIC-OP-2: User Accounts & Pet Profiles (for user authentication).
- EPIC-OP-7: Essential Catalog & Product Discovery (for available products).

### Blocks
- STORY-OP-15: View Cart Summary
- All other checkout-related stories.

### Related Stories
- None.

---

## UI/UX Considerations

- Clear "Add to Cart" button.
- Visual feedback confirming that a product has been added to the cart (e.g., a mini-cart update, toast notification).
- Easy way to adjust quantity on the product page or within the cart.

---

## Definition of Done

- [ ] Users can add products to their cart.
- [ ] Cart quantities and subtotals are correctly managed.
- [ ] Out-of-stock products cannot be added to the cart.
- [ ] API endpoint for adding products to cart is implemented and tested.
- [ ] RLS policies for cart management are verified.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/stories/STORY-OP-14-add-products-to-cart/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Add a product to an empty cart.
- Add the same product multiple times.
- Add different products to the cart.
- Attempt to add an out-of-stock product.
- Attempt to add a product with a negative or zero quantity.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/stories/STORY-OP-14-add-products-to-cart/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Implement the UI for "Add to Cart" functionality.
- Develop client-side logic for managing local cart state (before syncing with backend).
- Create the `POST /api/cart` endpoint.
- Implement business logic in the API to manage cart items and totals in the database.

---

## Notes
- Initial implementation might use a session-based cart for unauthenticated users, but the API will require authentication.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-010)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (POST /api/cart)
