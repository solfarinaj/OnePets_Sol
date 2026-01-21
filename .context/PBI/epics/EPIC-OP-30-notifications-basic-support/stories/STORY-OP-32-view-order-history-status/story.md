# View Order History and Status

**Jira Key:** OP-32
**Epic:** EPIC-OP-30 (Notifications & Basic Support)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** view a list of my past and current orders, including their current status
**So that** I have full visibility into my purchase history and order progress without contacting support.

---

## Description

This story provides users with a dedicated section within their account to view their complete order history. For each order, it will display key details such as the order number, date, total amount, and most importantly, the current status (e.g., "pending," "in preparation," "out for delivery," "delivered"). This self-service feature empowers users and reduces the need for direct support inquiries regarding order updates.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: View list of current and past orders (Happy Path)
- **Given:** An authenticated user is logged into their account.
- **When:** They navigate to the "My Orders" or "Order History" section.
- **Then:** They see a list of all their orders, both completed and in progress.
- **And:** Each order entry displays the order number, date, total, and current status.

### Scenario 2: View details of a specific order
- **Given:** A user is viewing their list of orders.
- **When:** They click on a specific order from the list.
- **Then:** They are navigated to a detailed view of that order.
- **And:** The detailed view shows all purchased items, delivery/pickup information, and the full order status history (if available, otherwise just current status).

### Scenario 3: No orders placed yet
- **Given:** An authenticated user has not placed any orders yet.
- **When:** They navigate to the "My Orders" section.
- **Then:** The system displays a message indicating they have no past orders.
- **And:** It suggests browsing products or starting a new order.

---

## Technical Notes

### Frontend
- Create a "My Orders" page in the user's account section.
- Implement UI components to display a list of orders.
- Create a detailed view for a single order.
- Use `GET /api/orders` to fetch the list of orders and `GET /api/orders/{orderId}` for detailed views.

### Backend
- **`GET /api/orders`**: This endpoint will return a list of all orders for the authenticated user, including their current status.
- **`GET /api/orders/{orderId}`**: This endpoint will return detailed information for a specific order, including `order_items`.
- Both endpoints require user authentication and authorization, ensuring a user can only view their own orders.

### Database
- **`public.orders`**: Will be queried to retrieve order lists and individual order details.
- **`public.order_items`**: Used to populate the details of purchased products within an order.
- RLS policies on `orders` and `order_items` tables are crucial to prevent unauthorized access to other users' order data.

---

## Dependencies

### Blocked By
- EPIC-OP-13: Cart, Checkout & Payments (for orders to exist).
- STORY-OP-31: Order Status Notifications (for order status changes to be meaningful).

### Blocks
- None directly.

### Related Stories
- None.

---

## UI/UX Considerations

- The order history page should be easy to navigate.
- Clear visual indicators for different order statuses.
- Option to quickly reorder past purchases (future enhancement).

---

## Definition of Done

- [ ] Users can view a list of their past and current orders.
- [ ] Users can view detailed information for a specific order.
- [ ] The current status of each order is accurately displayed.
- [ ] API endpoints for fetching orders are implemented and tested.
- [ ] RLS policies for order data access are verified.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/stories/STORY-OP-32-view-order-history-status/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- View order history for a user with multiple orders in different statuses.
- View details of a specific order.
- Verify that a user cannot view another user's order details.
- Verify the display for a user with no orders.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/stories/STORY-OP-32-view-order-history-status/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create the "My Orders" page UI.
- Implement data fetching logic for order lists and individual order details.
- Develop UI to display order details, including status.

---

## Notes
- The self-service nature of this feature is key to reducing support load.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-025)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (GET /api/orders, GET /api/orders/{orderId})
