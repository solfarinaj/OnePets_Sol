# Test Cases: STORY-OP-28 - Subscription Reminders

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-28
**Epic:** EPIC-OP-25 - Subscription Management (Recurrent Food)
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Prevents "Surprise orders" and allows user control.
- **Business Impact:** Reduces returns and refund requests. Increases trust.

**Related User Journey:**
- Journey: Retention Loop
- Step: Subscription Maintenance

---

### Technical Context of This Story

**Architecture Components:**

**Backend:**
- Logic: `ReminderJob` (Supabase Edge Function / Cron).
- Logic: `NotificationService` (Email/Push).

**Database:**
- `public.subscriptions` (next_delivery_date, status).

**Integration Points:**
- Backend ↔ Email Service (Postmark/SendGrid/Resend).

---

### Story Complexity Analysis

**Overall Complexity:** High (due to time-dependency).

**Complexity Factors:**
- Time Sensitivity: High (must trigger precisely in the window).
- Idempotency: High (DO NOT send twice).
- Reliability: High (Failing to notify leads to unwanted charges).

**Estimated Test Effort:** High

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Predefined reminder window"
- **Location in Story:** Scenario 1
- **Question for PO:** Is it exactly 72 hours? Or "3 days before, at 9:00 AM"?
- **Impact on Testing:** Precise cron scheduling validation.
- **Suggested Clarification:** Send at 9:00 AM local time, 3 days before `next_delivery_date`.

**Ambiguity 2:** Multiple channels
- **Location in Story:** Description
- **Question for PO:** Email AND SMS? Or just Email for MVP?
- **Impact on Testing:** Mocking multiple providers.
- **Suggested Clarification:** Email only for MVP.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Trigger Reminder (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** Active sub with `next_delivery_date = Feb 4`. Today is Feb 1.
- **When:** Cron runs at 9:00 AM.
- **Then:**
  - Email is sent to user.
  - Record in `notification_logs` (or similar) created to prevent duplicate.

### Scenario 2: No Reminder for Paused
**Type:** Negative
**Priority:** High

- **Given:** Sub is "paused" with `next_delivery_date` in 3 days.
- **When:** Cron runs.
- **Then:** No email is sent.

### Scenario 3: Boundary Condition (T-4 days)
**Type:** Boundary
**Priority:** Medium

- **Given:** Sub with `next_delivery_date` in 4 days.
- **When:** Cron runs.
- **Then:** No email is sent (Too early).

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar envío de recordatorio (T-3 días)**
**Type:** Positive
**Priority:** Critical
**Test Level:** Integration/Backend

**Preconditions:**
- Mock `now()` to 2026-02-01.
- Sub exists with date 2026-02-04.

**Test Steps:**
1. Execute `ReminderJob`.
2. Verify mock Email Service received request.

#### **Validar prevención de duplicados**
**Type:** Positive
**Priority:** High
**Test Level:** Integration

**Test Steps:**
1. Run `ReminderJob` (Email sent).
2. Run `ReminderJob` again immediately.

**Expected Result:**
- Email Service only received 1 request.

#### **Validar contenido del email**
**Type:** Positive
**Priority:** Medium
**Test Level:** UI/Email

**Test Steps:**
1. Inspect sent email body.

**Expected Result:**
- Contains: Product Name, Price, Date, Link to "Manage Subscription".

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| User changes status while Cron is running | Concurrency Test | Medium |
| Email service is down | Retry/Log Test | High |
| Leap year date calculation | Boundary Test | Low |

---

## 🎯 Next Steps

1. **Dev:** Implement `notification_logs` table to ensure idempotency.
2. **QA:** Setup MailHog or similar for local email capture.
