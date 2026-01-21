# Order Confirmation

**Jira Key:** OP-18
**Epic:** EPIC-OP-13 (Cart, Checkout & Payments)
**Priority:** Critical
**Story Points:** 2
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** receive a clear order confirmation with an estimated delivery time (ETA)
**So that** I know my purchase was successfully recorded and when to expect my delivery.

---

## Description

This story ensures that users receive immediate and comprehensive confirmation after a successful purchase. The confirmation will be displayed on a dedicated page and will include a unique order number, a summary of purchased items, the selected delivery method, the delivery address (or pickup point details), and a clear estimated delivery window. This provides reassurance to the user and crucial information for planning.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: View order confirmation page after successful payment (Happy Path)
- **Given:** A user has successfully completed a payment for an order.
- **When:** They are redirected to the order confirmation page.
- **Then:** The page displays a unique order number.
- **And:** It shows a summary of the purchased products.
- **And:** It shows the selected delivery method and address (or pickup point).
- **And:** It displays a clear estimated delivery time.

### Scenario 2: Access confirmation page directly with invalid order ID
- **Given:** A user attempts to access the order confirmation page with an invalid or non-existent order ID.
- **When:** The page attempts to load order details.
- **Then:** The system displays a "Order Not Found" message or redirects to an error page.

---

## Technical Notes

### Frontend
- Create a dedicated order confirmation page component (e.g., `app/order-confirmation/[orderId]/page.tsx`).
- Fetch order details using a `GET /api/orders/{orderId}` endpoint.
- Display all relevant order information, including products, delivery details, and estimated time.

### Backend
- The `POST /api/orders` endpoint (from STORY-OP-17) will return the `orderId` upon successful creation.
- Implement a `GET /api/orders/{orderId}` endpoint to retrieve full details for a specific order. This endpoint must verify that the order belongs to the authenticated user.
- The backend should calculate and provide the `estimatedDeliveryWindow`.

### Database
- **`public.orders`**: The `orders` table will store the final order details, including `estimated_delivery_window`.
- **`public.order_items`**: Linked to the `orders` table to retrieve purchased products.
- RLS policies on `orders` and `order_items` are essential.

---

## Dependencies

### Blocked By
- STORY-OP-17: Process Payment

### Blocks
- None directly for this epic.

### Related Stories
- None.

---

## UI/UX Considerations

- The confirmation page should be clean, clear, and easy to read.
- Include a clear call to action (e.g., "Continue Shopping," "View My Orders").
- The estimated delivery time should be presented in an easily understandable format.

---

## Definition of Done

- [ ] Users are redirected to an order confirmation page after successful payment.
- [ ] The confirmation page accurately displays order details and estimated delivery time.
- [ ] The API endpoint for fetching order details is implemented and tested.
- [ ] RLS policies for order data are verified.
- [ ] Unit and integration tests cover order confirmation data retrieval.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/stories/STORY-OP-18-order-confirmation/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Successfully complete an order and verify details on the confirmation page.
- Attempt to view a confirmation page for another user's order (should be blocked).
- Attempt to view a confirmation page for a non-existent order ID.
- Verify the estimated delivery time is present and formatted correctly.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/stories/STORY-OP-18-order-confirmation/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create the order confirmation page component.
- Implement data fetching logic for order details using `orderId` from URL.
- Display all required order information.
- Provide links to continue shopping or view past orders.

---

## Notes
- This marks the end of the purchasing journey within the MVP scope.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-014)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (GET /api/orders/{orderId})
