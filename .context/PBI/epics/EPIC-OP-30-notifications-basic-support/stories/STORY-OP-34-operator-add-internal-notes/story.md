# Operator Add Internal Notes

**Jira Key:** OP-34
**Epic:** EPIC-OP-30 (Notifications & Basic Support)
**Priority:** High
**Story Points:** 2
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** OnePets operator
**I want to** add internal notes to support tickets or order incidents
**So that** the team can track communication, actions taken, and resolve issues efficiently.

---

## Description

This story provides a crucial internal tool for operators to document their interactions and actions related to customer support requests or specific order incidents. Operators will be able to add free-form text notes to support tickets (created in STORY-OP-33) or directly to order records. These notes will be visible only to internal staff and will serve as an audit trail and communication log for the support team.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Add a note to a support ticket (Happy Path)
- **Given:** A OnePets operator is viewing a support ticket in the internal system.
- **When:** They enter a note in the designated field and click "Add Note".
- **Then:** The note is saved and associated with the support ticket, including a timestamp and the operator's ID.
- **And:** The note is visible in the ticket's history.

### Scenario 2: Add a note to an order incident
- **Given:** A OnePets operator is viewing an order record (e.g., from the pending orders list).
- **When:** They identify an incident and add an internal note to the order.
- **Then:** The note is saved and associated with the order, including a timestamp and operator's ID.

### Scenario 3: Attempt to add an empty note
- **Given:** A OnePets operator is attempting to add a note.
- **When:** They try to save an empty note.
- **Then:** The system displays a validation error, requiring content for the note.

---

## Technical Notes

### Frontend
- Integrate a notes input field and display area into the internal views for support tickets and order details.
- Ensure the operator's ID and a timestamp are automatically associated with each note.

### Backend
- **`POST /api/admin/notes`**: Endpoint to add an internal note.
- The request will include `targetType` (e.g., 'order', 'support_ticket'), `targetId`, and `noteContent`.
- Requires operator-level authentication and authorization.
- Stores the `user_id` of the operator who added the note.

### Database
- **`public.internal_notes`**: A new table to store internal notes, linking to `order_id` or `support_ticket_id`.
- RLS policies must ensure only operators can add/view internal notes.

---

## Dependencies

### Blocked By
- STORY-OP-23: Operator View of Pending Orders
- STORY-OP-33: Submit Support Request

### Blocks
- None directly.

### Related Stories
- None.

---

## UI/UX Considerations

- The internal notes section should be clearly distinguishable from customer-facing communications.
- Easy to view the history of notes associated with an item.

---

## Definition of Done

- [ ] Operators can add internal notes to support tickets and order records.
- [ ] Notes are saved with timestamp and operator ID.
- [ ] Notes are visible only to internal staff.
- [ ] API endpoint for adding internal notes is implemented and tested.
- [ ] RLS policies are verified for internal notes.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/stories/STORY-OP-34-operator-add-internal-notes/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Operator adds a note to an existing support ticket.
- Operator adds a note to an existing order.
- Verify that a non-operator user cannot add/view internal notes.
- Attempt to add an empty note.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/stories/STORY-OP-34-operator-add-internal-notes/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Design UI for adding and displaying internal notes in operator views.
- Implement client-side logic for submitting notes.
- Create the `POST /api/admin/notes` backend endpoint.
- Implement business logic for storing notes and access control.

---

## Notes
- This feature can be extended to include different types of internal communications (e.g., assigning tickets).

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-027)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (POST /api/admin/notes)
