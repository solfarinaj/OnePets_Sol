# Delivery & Click & Collect (Pilot Zone)

**Jira Key:** OP-19
**Status:** To Do
**Priority:** HIGH
**Phase:** Foundation

---

## Epic Description

This epic focuses on the operational aspects of order fulfillment within the defined pilot zone. It ensures that products are delivered efficiently or made available for pickup, aligning with the fast delivery promise. This includes managing customer addresses, providing estimated delivery times, and enabling internal operators to track and update order statuses.

**Business Value:**
- Delivers on the core value proposition of fast and convenient product delivery.
- Optimizes logistics and operations within the pilot zone.
- Enhances customer satisfaction through transparent delivery tracking.
- Provides internal tools for efficient order management.

---

## User Stories

1. **OP-20** - As a pet owner, I want to register and select a delivery address in the pilot zone so that I can receive orders at home.
2. **OP-21** - As a pet owner, I want to see the estimated delivery window so that I know when my order arrives.
3. **OP-22** - As a pet owner, I want to choose pickup at the available point so that I can collect the order when it suits me.
4. **OP-23** - As a OnePets operator, I want to see a list of pending orders with status and delivery window so that I organize preparation and dispatch.
5. **OP-24** - As a OnePets operator, I want to update order status to preparing, out for delivery or delivered so that customers stay informed.

**NOTA:** Los IDs serán actualizados cuando se creen las stories en Jira.

---

## Scope

### In Scope
- Registering and managing delivery addresses, with validation for pilot zone coverage.
- Displaying an estimated delivery window to the user for home delivery orders.
- Functionality for users to select pickup at a pre-defined physical point.
- An internal view for operators to see pending orders with their statuses and delivery windows.
- Tools for operators to update the status of an order (e.g., "in preparation", "out for delivery", "delivered").

### Out of Scope (Future)
- Advanced route optimization for deliveries.
- Real-time driver tracking for customers.
- Multiple pickup locations.
- Customer self-service for changing delivery times post-order.
- Complex inventory management system beyond simple "in stock" flag.

---

## Acceptance Criteria (Epic Level)

1. ✅ Users can successfully save and select a delivery address within the pilot zone.
2. ✅ Estimated delivery times are accurately displayed for eligible orders.
3. ✅ Users can choose and complete orders for pickup.
4. ✅ Operators have visibility into pending orders and their statuses.
5. ✅ Operators can update order statuses effectively.

---

## Related Functional Requirements

- **FR-015:** Register and select address within pilot zone.
- **FR-016:** Calculate and display estimated delivery window.
- **FR-017:** Select pickup at physical point.
- **FR-018:** List orders for internal operation.
- **FR-019:** Update order status by operators.

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Backend
- API endpoints for address management (partially covered in EPIC-OP-2, expanded here for delivery relevance).
- Logic to calculate estimated delivery times based on current operational capacity and location.
- API endpoints for operators to fetch and update order statuses.

### Database Schema
**Tables:**
- `addresses`: Used for delivery address details.
- `orders`: Stores order status and delivery details.
- `order_history` (potentially): To track status changes.

**RLS Policies:**
- RLS policies on `addresses` and `orders` tables for data protection.

---

## Dependencies

### External Dependencies
- None directly, but may interface with an external logistics provider (for MVP, assumed internal fleet/basic integration).

### Internal Dependencies
- EPIC-OP-2: User Accounts & Pet Profiles (for user addresses).
- EPIC-OP-13: Cart, Checkout & Payments (for completed orders to fulfill).

### Blocks
- None directly.

---

## Success Metrics

### Functional Metrics
- Address validation accuracy > 99%.
- Order status update time < 1s (for operators).
- Delivery window accuracy (percentage of orders delivered within ETA).

### Business Metrics
- Achieve target average delivery time (e.g., ≤ 90 minutes).
- Low rate of delivery complaints.
- High percentage of orders successfully fulfilled.

---

## Risks & Mitigations

| Risk     | Impact          | Probability     | Mitigation           |
| -------- | --------------- | --------------- | -------------------- |
| Logistics Bottlenecks | High | Medium | Implement clear order capacity limits; proactive communication to customers about delays; focus on a small, manageable pilot zone. |
| Inaccurate ETA | Medium | Medium | Use conservative ETA estimates; gather operational data to refine algorithms; communicate proactively if delays are expected. |

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/feature-test-plan.md` (se crea en Fase 5)

### Test Coverage Requirements
- **Unit Tests:** For address validation logic and ETA calculations.
- **Integration Tests:** For order status update APIs and delivery method selection.
- **E2E Tests:** A scenario covering order placement with home delivery and pickup, verifying status updates.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/feature-implementation-plan.md` (se crea en Fase 6)

### Recommended Story Order
1. OP-20 - Register & Select Delivery Address
2. OP-21 - Display Estimated Delivery Window
3. OP-22 - Select Pickup Option
4. OP-23 - Operator View of Orders
5. OP-24 - Operator Update Order Status

### Estimated Effort
- **Development:** 2 sprints
- **Testing:** 1 sprint
- **Total:** 3 sprints

---

## Notes
- The "pilot zone" definition will be a geographical boundary (e.g., a polygon or a list of postal codes).

---

## Related Documentation

- **PRD:** `.context/PRD/mvp-scope.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-015 to FR-019)
- **Architecture:** `.context/SRS/srs-architecture-specs.md`
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml`
