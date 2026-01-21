# Operator View of Pending Orders

**Jira Key:** OP-23
**Epic:** EPIC-OP-19 (Delivery & Click & Collect (Pilot Zone))
**Priority:** High
**Story Points:** 5
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** OnePets operator
**I want to** see a list of pending orders with their current status and estimated delivery window
**So that** I can efficiently organize product preparation and dispatch.

---

## Description

This story enables OnePets operators to have a dedicated internal view of all active orders. The view should display key information for each order, including customer details, products ordered, current order status (e.g., "pending," "in preparation," "out for delivery"), and the estimated delivery window. This centralized view is crucial for operational efficiency, allowing operators to prioritize and manage the order fulfillment process effectively.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: View pending home delivery orders (Happy Path)
- **Given:** An operator is logged into the internal OnePets system.
- **When:** They navigate to the "Pending Orders" section.
- **Then:** They see a list of all home delivery orders that are not yet "delivered" or "cancelled".
- **And:** Each order entry displays the customer's name, order ID, current status, ordered products, and estimated delivery window.

### Scenario 2: View pending pickup orders
- **Given:** An operator is logged into the internal OnePets system.
- **When:** They navigate to the "Pending Orders" section.
- **Then:** They see a list of all pickup orders that are not yet "ready for pickup" or "collected".
- **And:** Each order entry displays relevant pickup information, including customer name, order ID, and pickup location.

### Scenario 3: Filter orders by status
- **Given:** An operator is viewing the order list.
- **When:** They apply a filter for "In Preparation" status.
- **Then:** Only orders with "In Preparation" status are displayed.

---

## Technical Notes

### Frontend
- Develop an internal dashboard page for operators (e.g., `/admin/orders`).
- Implement UI components to display the list of orders with their details.
- Provide filtering options by order status.
- Use `GET /api/admin/orders` to fetch order data.

### Backend
- **`GET /api/admin/orders`**: This endpoint will provide a list of orders.
- It must support filtering by `status` and other relevant criteria.
- Requires operator-level authentication and authorization.
- It will join data from `orders`, `order_items`, and `profiles` tables.

### Database
- **`public.orders`**: Will be queried to retrieve order details and status.
- **`public.order_items`**: Used to get the list of products in each order.
- **`public.profiles`**: To display customer information.
- RLS policies must allow operators (based on their `role` in `profiles`) to view all orders.

---

## Dependencies

### Blocked By
- EPIC-OP-13: Cart, Checkout & Payments (for orders to exist).
- STORY-OP-21: Display Estimated Delivery Window (for displaying ETA).
- STORY-OP-22: Select Pickup Option (to differentiate order types).

### Blocks
- STORY-OP-24: Operator Update Order Status

### Related Stories
- None.

---

## UI/UX Considerations

- The operator dashboard should be clear, concise, and easy to navigate for quick decision-making.
- Important information (e.g., overdue orders) should be highlighted.
- Responsive design is less critical for an internal tool but still beneficial.

---

## Definition of Done

- [ ] Operators can access a list of all pending orders.
- [ ] The order list displays customer name, order ID, current status, ordered products, and estimated delivery window (if applicable).
- [ ] Filtering by order status is functional.
- [ ] The `GET /api/admin/orders` endpoint is implemented and tested.
- [ ] Proper authentication and authorization for operators are enforced.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/stories/STORY-OP-23-operator-order-list/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- View orders as an operator.
- Filter by "pending" status.
- Filter by "in preparation" status.
- Verify that a non-operator user cannot access the page.
- Verify all relevant information is displayed for each order.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/stories/STORY-OP-23-operator-order-list/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create the operator dashboard UI for displaying orders.
- Implement data fetching logic using the new `GET /api/admin/orders` endpoint.
- Develop filtering functionality on the client side.
- Implement backend endpoint with authorization checks.

---

## Notes
- The operator view will initially be read-only, with updates handled in the next story.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-018)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (GET /api/admin/orders)
