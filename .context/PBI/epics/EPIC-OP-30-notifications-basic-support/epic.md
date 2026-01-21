# Notifications & Basic Support

**Jira Key:** OP-30
**Status:** To Do
**Priority:** HIGH
**Phase:** Core Operations

---

## Epic Description

This epic focuses on establishing essential communication channels for users regarding their orders and providing a basic mechanism for them to seek support. It includes sending notifications about order status changes and offering a simple way for users to contact OnePets with issues. Additionally, it provides internal tools for operators to track support requests and add notes.

**Business Value:**
- Enhances customer satisfaction and trust through proactive communication.
- Reduces inbound support queries by providing order status visibility.
- Offers a foundational support channel for critical issues.
- Improves operational efficiency by centralizing support request tracking.

---

## User Stories

1. **OP-31** - As a pet owner, I want to receive notifications when my order status changes so that I stay informed.
2. **OP-32** - As a pet owner, I want to view the status of my orders from my account so that I have visibility without contacting support.
3. **OP-33** - As a pet owner, I want a basic support channel to report delivery or order issues so that I can get help quickly.
4. **OP-34** - As a OnePets operator, I want to add internal notes on order incidents so that the team can track and resolve them.

**NOTA:** Los IDs serán actualizados cuando se creen las stories en Jira.

---

## Scope

### In Scope
- Sending notifications (e.g., email) to users upon order status changes.
- A "My Orders" section in the user's account to view current and past orders with their statuses.
- A basic contact form or messaging system for users to report issues related to orders or deliveries.
- An internal system for operators to add notes to support tickets or orders.

### Out of Scope (Future)
- Real-time chat support.
- AI-powered chatbots for support.
- Push notifications on mobile devices.
- Comprehensive customer relationship management (CRM) features.
- Public FAQ or knowledge base.

---

## Acceptance Criteria (Epic Level)

1. ✅ Users receive notifications when their order status changes.
2. ✅ Users can view the status of all their orders within their account.
3. ✅ Users can submit basic support requests through a dedicated channel.
4. ✅ Operators can add internal notes to track and resolve support issues.

---

## Related Functional Requirements

- **FR-024:** Notifications for order status changes.
- **FR-025:** View order status from account.
- **FR-026:** Basic support channel for incidents.
- **FR-027:** Record internal notes on incidents.

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Backend
- Integration with an email/notification service.
- API endpoints for submitting support requests.
- API endpoints for operators to add internal notes.
- Logic to manage and query support tickets/notes.

### Database Schema
**Tables:**
- `support_tickets`: Stores user-submitted support requests.
- `internal_notes` (potentially): Stores operator notes linked to orders or support tickets.

**RLS Policies:**
- RLS policies on `support_tickets` and `internal_notes` (if created) for data protection and access control.

---

## Dependencies

### External Dependencies
- Email/Notification service.

### Internal Dependencies
- EPIC-OP-2: User Accounts & Pet Profiles (for user data).
- EPIC-OP-13: Cart, Checkout & Payments (for order status changes and support requests).
- EPIC-OP-19: Delivery & Click & Collect (for delivery related notifications and support).

### Blocks
- None directly.

---

## Success Metrics

### Functional Metrics
- Notification delivery rate > 95%.
- Support ticket creation success rate > 99%.

### Business Metrics
- Reduced customer inquiries about order status.
- Improved resolution time for support tickets.
- Increased customer satisfaction due to proactive communication.

---

## Risks & Mitigations

| Risk     | Impact          | Probability     | Mitigation           |
| -------- | --------------- | --------------- | -------------------- |
| Notification Fatigue | Low | Medium | Ensure notifications are relevant and not excessive; allow users to manage preferences (future enhancement). |
| Overwhelmed Support | Medium | Medium | Implement clear support guidelines and escalation paths; ensure basic issues are self-service where possible. |

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/feature-test-plan.md` (se crea en Fase 5)

### Test Coverage Requirements
- **Unit Tests:** For notification triggering logic.
- **Integration Tests:** For notification APIs and support ticket submission.
- **E2E Tests:** A scenario covering order placement, status changes, notification receipt, and support request submission.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/feature-implementation-plan.md` (se crea en Fase 6)

### Recommended Story Order
1. OP-31 - Order Status Notifications
2. OP-32 - View Order History and Status
3. OP-33 - Submit Support Request
4. OP-34 - Operator Add Internal Notes

### Estimated Effort
- **Development:** 1.5 sprints
- **Testing:** 0.5 sprints
- **Total:** 2 sprints

---

## Notes
- Initial notification mechanisms will be focused on email.

---

## Related Documentation

- **PRD:** `.context/PRD/mvp-scope.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-024 to FR-027)
- **Architecture:** `.context/SRS/srs-architecture-specs.md`
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml`
