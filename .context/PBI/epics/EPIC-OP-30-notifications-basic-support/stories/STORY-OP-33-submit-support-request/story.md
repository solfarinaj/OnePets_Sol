# Submit Support Request

**Jira Key:** OP-33
**Epic:** EPIC-OP-30 (Notifications & Basic Support)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** easily submit a support request regarding my order or delivery
**So that** I can get help quickly for any issues I encounter.

---

## Description

This story provides a basic, accessible channel for users to report problems or submit inquiries. This could be a simple contact form where users can specify the nature of their issue (e.g., "delivery delayed," "damaged product") and provide a message. Each submission will create a support ticket in the internal system, ensuring that customer issues are tracked and addressed by operators.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successfully submit a support request (Happy Path)
- **Given:** An authenticated user is on the "Contact Support" page or a relevant section of their order details.
- **When:** They fill out the support form, optionally linking it to an order ID, and provide a message.
- **And:** They click "Submit".
- **Then:** A new support ticket is created in the system.
- **And:** The user receives a confirmation that their request has been received.

### Scenario 2: Submit a support request for a specific order
- **Given:** An authenticated user is viewing details of one of their orders.
- **When:** They click a "Report Issue" button associated with that order.
- **And:** They fill in the details of the issue.
- **Then:** A support ticket is created, automatically linked to that specific order ID.

### Scenario 3: Attempt to submit an empty support request
- **Given:** A user is on the "Contact Support" page.
- **When:** They try to submit the form without providing a message.
- **Then:** The system displays a validation error, requiring a message to be entered.

---

## Technical Notes

### Frontend
- Create a "Contact Support" page or a modal form.
- Include fields for issue category (dropdown), message (textarea), and optionally an order ID.
- Integrate with `POST /api/support-tickets` to submit the request.
- Display success or error messages to the user.

### Backend
- **`POST /api/support-tickets`**: This endpoint will receive support request details.
- It will validate input, ensure the `orderId` (if provided) belongs to the authenticated user.
- Creates a new record in the `support_tickets` table.
- Optionally, it can trigger an internal notification (e.g., email to support team) about the new ticket.

### Database
- **`public.support_tickets`**: Stores `user_id`, `order_id` (optional), `category`, `message`, `status`.
- RLS policies on `support_tickets` to ensure users can only create/view their own tickets.

---

## Dependencies

### Blocked By
- EPIC-OP-13: Cart, Checkout & Payments (for order-related issues).
- STORY-OP-32: View Order History and Status (for easy order referencing).

### Blocks
- STORY-OP-34: Operator Add Internal Notes

### Related Stories
- None.

---

## UI/UX Considerations

- The support form should be simple, clear, and easy to find.
- Provide predefined categories for common issues to guide the user.
- Clear confirmation message after submission.

---

## Definition of Done

- [ ] Users can submit support requests related to orders or deliveries.
- [ ] Support requests are successfully recorded in the system.
- [ ] API endpoint for submitting support requests is implemented and tested.
- [ ] RLS policies for support tickets are verified.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/stories/STORY-OP-33-submit-support-request/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Submit a general support request.
- Submit a support request linked to a valid order ID.
- Attempt to submit a request with an empty message.
- Verify that support tickets are stored correctly in the database.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/stories/STORY-OP-33-submit-support-request/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create the "Contact Support" UI form.
- Implement client-side logic for form submission.
- Create the `POST /api/support-tickets` backend endpoint.
- Implement business logic for creating the support ticket.

---

## Notes
- Initial status of a new ticket will be "open" or "new".

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-026)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (POST /api/support-tickets)
