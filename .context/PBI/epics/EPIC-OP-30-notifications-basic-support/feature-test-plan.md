# Feature Test Plan: EPIC-OP-30 - Notifications & Basic Support

**Fecha:** 2026-01-20
**QA Lead:** AI Agent
**Epic Jira Key:** OP-30
**Status:** Draft

---

## 📋 Business Context Analysis

### Business Value

This epic closes the loop of the customer experience. After purchase, communication is key to retention.

**Key Value Proposition:**
- Transparency (Order Tracking).
- Trust (Support Channel).

**Success Metrics (KPIs):**
- Ticket Resolution Time.
- Support Contact Rate (Lower is better, if tracking is clear).

**User Impact:**
- **Pet Owner:** Feels supported and informed.
- **Operator:** Can manage incidents structurally.

**Critical User Journeys:**
- Order Status Update -> Notification Received.
- Issue Reporting -> Operator Resolution.

---

## 🏗️ Technical Architecture Analysis

### Architecture Components Involved

**Frontend:**
- `OrderHistoryPage`.
- `SupportForm`.
- `InternalNotes` (Operator Dashboard).

**Backend:**
- `GET /api/orders` (User history).
- `POST /api/support` (Ticket creation).
- `POST /api/admin/notes` (Internal logs).
- `NotificationService` (Triggered by Order Status changes).

**Database:**
- `public.support_tickets`.
- `public.order_notes` (or similar).

### Integration Points (Critical for Testing)

**Internal:**
- Order Status Change -> Notification Trigger.
- Support Form -> DB + Admin Alert.

---

## 🚨 Risk Analysis

### Technical Risks

#### Risk 1: Email Delivery Failure
- **Impact:** High (User anxiety).
- **Mitigation:** Robust email service (SendGrid/Resend) with retry logic.
- **Test Coverage:** Integration tests with mock email server.

#### Risk 2: Ticket Loss
- **Impact:** High (Angry customers).
- **Mitigation:** DB persistence before confirming success to UI.

### Business Risks

#### Risk 1: Spamming
- **Impact:** Medium (Unsubscribe).
- **Mitigation:** Logic to prevent double notifications for same status.

---

## ⚠️ Critical Analysis & Questions for PO/Dev

### Ambiguities Identified

**Ambiguity 1:** "Basic Support Channel"
- **Question for PO:** Is this just an email form? Or a structured ticket system?
- **Impact:** DB Schema complexity.
- **Suggestion:** Simple form that saves to DB and emails admin.

**Ambiguity 2:** "Internal Notes" visibility
- **Question for Dev:** Are notes strictly internal? Or can users see them?
- **Impact:** Security testing.
- **Suggestion:** Strictly internal. RLS must block user access.

---

## 🎯 Test Strategy

### Test Scope

**In Scope:**
- Email triggers on status change.
- Order History UI.
- Support Form submission.
- Admin Notes CRUD.

**Out of Scope:**
- Chatbots.
- SMS.

### Test Levels

- **Unit:** Notification trigger logic.
- **Integration:** API endpoints.
- **E2E:** User checks history -> User sends ticket -> Admin sees ticket.

---

## 📊 Test Cases Summary by Story

### STORY-OP-31: Order Status Notifications
- **Complexity:** Medium
- **Est. Tests:** 4 (Each status change triggers correct email template).

### STORY-OP-32: View Order History & Status
- **Complexity:** Low
- **Est. Tests:** 3 (List view, Detail view, Empty state).

### STORY-OP-33: Submit Support Request
- **Complexity:** Low
- **Est. Tests:** 3 (Valid submission, Validation errors, Anon submission if allowed).

### STORY-OP-34: Operator Add Internal Notes
- **Complexity:** Medium
- **Est. Tests:** 4 (Add note, View history, RBAC check, Edit note).

**Total Estimated:** ~14 Test Cases.

---

## 🗂️ Test Data Requirements

- **Orders:** Varied statuses (Pending, Delivered).
- **Email:** Catch-all address for testing.

---

## ✅ Entry/Exit Criteria

**Entry:**
- Notification Service configured.

**Exit:**
- All status transitions generate correct email log.

---

## 📅 Testing Timeline Estimate

- **Design:** 1 day.
- **Execution:** 2 days.

---

## 🎯 Next Steps (Team Action Required)

1. **Dev:** Setup Email Provider API Key.
2. **QA:** Setup Mailtrap/Mailhog for local dev.
