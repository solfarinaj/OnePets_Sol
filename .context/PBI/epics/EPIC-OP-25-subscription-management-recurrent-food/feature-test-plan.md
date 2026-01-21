# Feature Test Plan: EPIC-OP-25 - Subscription Management (Recurrent Food)

**Fecha:** 2026-01-20
**QA Lead:** AI Agent
**Epic Jira Key:** OP-25
**Status:** Draft

---

## 📋 Business Context Analysis

### Business Value

This epic is critical for the "Recurring" business model. It shifts user behavior from one-off purchases to a predictable, steady revenue stream.

**Key Value Proposition:**
- Automation of routine food purchases for pet owners.
- Predictable logistics and inventory needs for OnePets.

**Success Metrics (KPIs):**
- Subscription Activation Rate (target 15%).
- Churn Rate reduction for subscribed users.

**User Impact:**
- **Pet Owner:** Peace of mind knowing food arrives automatically.
- **Operator:** Better visibility into future demand.

**Critical User Journeys:**
- Setup Subscription -> Automatic Order Generation -> Reminder Receipt.
- Subscription Management (Pause/Cancel).

---

## 🏗️ Technical Architecture Analysis

### Architecture Components Involved

**Frontend:**
- `SubscriptionOption` (on Product Page).
- `MySubscriptionsPage` (Management dashboard).
- `ReminderSettings`.

**Backend:**
- `GET/POST/PATCH /api/subscriptions`.
- `SubscriptionWorker` (Cron job for order generation).
- `NotificationService` (Reminder triggers).

**Database:**
- `public.subscriptions` (User, Product, Frequency, NextDate, Status).
- `public.orders` (Linked to subscription runs).

### Integration Points (Critical for Testing)

**Internal:**
- Frontend ↔ Backend API.
- Backend ↔ Payment Gateway (Recurring charges).
- Backend ↔ Notification Service (Cron-triggered emails).

---

## 🚨 Risk Analysis

### Technical Risks

#### Risk 1: Cron Job Failure
- **Impact:** High (Orders not generated, users run out of food).
- **Mitigation:** Monitoring/Alerting on job completion. Idempotent logic to prevent double orders on retry.
- **Test Coverage:** Integration tests for the generator service.

#### Risk 2: Payment Token Expiry
- **Impact:** Medium (Failed transactions).
- **Mitigation:** Grace period and notification to user to update payment method.

### Business Risks

#### Risk 1: Unwanted Shipments
- **Impact:** Medium (Customer dissatisfaction/Returns).
- **Mitigation:** Mandatory "Reminder Email" 3 days before shipment.

---

## ⚠️ Critical Analysis & Questions for PO/Dev

### Ambiguities Identified

**Ambiguity 1:** "Next Delivery Date" logic
- **Question for PO:** Does it trigger on the *creation day* anniversary? (e.g., Every 4 weeks from today?) Or fixed days?
- **Suggestion:** Anniversary of creation is standard.

**Ambiguity 2:** Pet Mapping
- **Question for Dev:** Is a subscription tied to a `pet_id` or just `user_id`?
- **Suggestion:** Tie to `pet_id` for better personalization in emails (e.g., "Food for Rex is coming").

---

## 🎯 Test Strategy

### Test Scope

**In Scope:**
- CRUD for subscriptions.
- Frequency logic (2, 4, 6 weeks).
- Status changes (Active -> Paused -> Active).
- Reminder triggering logic.

**Out of Scope:**
- Automatic payment retry logic (Manual for MVP).
- Discounts for subscribers.

### Test Levels

- **Unit:** Frequency date math.
- **Integration:** API Endpoints + Database state sync.
- **E2E:** Full flow: User subscribes -> Wait/Mock time -> Order appears in History -> Reminder Email sent.

---

## 📊 Test Cases Summary by Story

### STORY-OP-26: Create Subscription
- **Complexity:** Medium
- **Est. Tests:** 5 (Valid create, Duplicate check, Invalid frequency, Auth check).

### STORY-OP-27: Manage Subscriptions
- **Complexity:** Medium
- **Est. Tests:** 6 (Pause, Resume, Cancel, Change frequency, Verify next_date update).

### STORY-OP-28: Subscription Reminders
- **Complexity:** High (Time-dependent)
- **Est. Tests:** 4 (Trigger on T-3 days, No trigger if paused, Email content verification).

### STORY-OP-29: Operator Subscription View
- **Complexity:** Low
- **Est. Tests:** 3 (List all, Search by user, Export demand for next 7 days).

**Total Estimated:** ~18 Test Cases.

---

## 🗂️ Test Data Requirements

- **Products:** Must have `is_subscription_eligible = true`.
- **Dates:** Need ability to "Time Travel" in test environment to trigger crons.

---

## ✅ Entry/Exit Criteria

**Entry:**
- Payment gateway supports recurring tokens (Mocks ready).

**Exit:**
- Subscription creates a valid Order in `public.orders` without manual intervention.

---

## 📅 Testing Timeline Estimate

- **Design:** 1.5 days.
- **Execution:** 3 days (due to time-logic mocking).

---

## 🎯 Next Steps (Team Action Required)

1. **Dev:** Confirm Cron infrastructure (Vercel Cron, GitHub Actions, or Supabase Edge Functions).
2. **PO:** Confirm email template content for reminders.
3. **QA:** Setup "Time Travel" helper for testing.
