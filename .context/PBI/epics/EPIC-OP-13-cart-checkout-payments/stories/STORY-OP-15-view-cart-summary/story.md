# View Cart Summary

**Jira Key:** OP-15
**Epic:** EPIC-OP-13 (Cart, Checkout & Payments)
**Priority:** Critical
**Story Points:** 2
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** view a clear summary of the products in my cart, including quantities, prices, and total cost
**So that** I can review my selections and confirm all details before proceeding to payment.

---

## Description

This story enables users to view a comprehensive summary of their shopping cart contents. It should display a list of all products added, their individual prices, quantities, and the calculated subtotal. This overview is critical for users to verify their order before the final purchase and ensures transparency regarding the costs involved. Users should also be able to adjust quantities or remove items from this view.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: View cart with multiple items (Happy Path)
- **Given:** A user has multiple products in their cart.
- **When:** They navigate to the cart summary page.
- **Then:** They see a list of each product with its name, quantity, and individual price.
- **And:** They see the calculated subtotal of all items.

### Scenario 2: Adjust product quantity in cart
- **Given:** A user is viewing their cart summary with a specific product.
- **When:** They increase or decrease the quantity of that product.
- **Then:** The product's total price is updated.
- **And:** The cart's subtotal is updated to reflect the change.

### Scenario 3: Remove a product from cart
- **Given:** A user is viewing their cart summary with a specific product.
- **When:** They choose to remove that product from the cart.
- **Then:** The product is removed from the list.
- **And:** The cart's subtotal is updated.

### Scenario 4: Empty cart display
- **Given:** A user's cart is empty.
- **When:** They navigate to the cart summary page.
- **Then:** The system displays a message indicating the cart is empty.
- **And:** It suggests browsing products or going to the home page.

---

## Technical Notes

### Frontend
- Develop a cart summary component that displays a list of `cart_items`.
- Implement controls for adjusting item quantities and removing items.
- Display the overall cart subtotal.
- Use `GET /api/cart` to fetch the current cart data.
- Send `PUT /api/cart` requests to update cart contents (quantities, removals).

### Backend
- **`GET /api/cart`**: Endpoint to fetch the authenticated user's current cart details.
- **`PUT /api/cart`**: Endpoint to update the cart's contents (e.g., adjust quantities, remove items).
- The API should recalculate totals and ensure data integrity.

### Database
- **`public.carts`**: Fetched and updated to reflect changes.
- **`public.cart_items`**: Rows in this table are modified or deleted based on user actions.
- **`public.products`**: Used to retrieve product details for display.
- RLS policies on `carts` and `cart_items` tables must protect user data.

---

## Dependencies

### Blocked By
- STORY-OP-14: Add Products to Cart

### Blocks
- STORY-OP-16: Select Delivery Method
- STORY-OP-17: Process Payment

### Related Stories
- None.

---

## UI/UX Considerations

- The cart summary should be clearly laid out, easy to read, and responsive.
- Buttons for quantity adjustment and removal should be intuitive.
- Provide a clear call to action to proceed to checkout.

---

## Definition of Done

- [ ] Users can view a clear and accurate summary of their cart.
- [ ] Users can adjust quantities of items in the cart.
- [ ] Users can remove items from the cart.
- [ ] The cart's subtotal updates dynamically.
- [ ] API endpoints for viewing and updating the cart are implemented and tested.
- [ ] RLS policies are verified for cart data.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/stories/STORY-OP-15-view-cart-summary/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- View an empty cart.
- View a cart with one item.
- View a cart with multiple items.
- Increase/decrease quantity of an item.
- Remove an item from the cart.
- Verify subtotal calculations are correct.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/stories/STORY-OP-15-view-cart-summary/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create the cart summary page/component UI.
- Implement data fetching for cart contents.
- Develop logic for quantity adjustments and item removal.
- Integrate UI interactions with the `GET /api/cart` and `PUT /api/cart` endpoints.

---

## Notes
- This view is the gateway to the final checkout process.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-011)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (GET /api/cart, PUT /api/cart)
