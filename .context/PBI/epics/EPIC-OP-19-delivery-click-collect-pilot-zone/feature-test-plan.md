# Feature Test Plan: EPIC-OP-19 - Delivery & Click & Collect (Pilot Zone)

**Fecha:** 2026-01-20
**QA Lead:** AI Agent
**Epic Jira Key:** OP-19
**Status:** Draft

---

## 📋 Business Context Analysis

### Business Value

Operational backbone of OnePets. Without efficient delivery, the commerce fails.

**Key Value Proposition:**
- Reliable local delivery within 90 minutes (Pilot).
- Flexible Pickup options.

**Success Metrics (KPIs):**
- On-Time Delivery Rate.
- Order Fulfillment Time.

**User Impact:**
- **Pet Owner:** Gets products fast.
- **Operator:** Can manage the queue efficiently.

**Critical User Journeys:**
- Place Order -> Receive Delivery.
- Operator Fulfillment Loop.

---

## 🏗️ Technical Architecture Analysis

### Architecture Components Involved

**Frontend:**
- `AddressSelector` (with validation).
- `DeliveryStatusTracker`.
- `OperatorDashboard` (Table view of active orders).

**Backend:**
- `GET /api/operator/orders`.
- `PATCH /api/operator/orders/{id}/status`.
- `PilotZoneService` (Validation logic).
- `ETAService` (Time calculation).

**Database:**
- `public.orders` (Status columns).
- `public.addresses` (Zone flags).

### Integration Points (Critical for Testing)

**Internal:**
- Frontend (Operator) ↔ Backend API (Real-time updates desirable).
- Backend ↔ Map/Zone Logic.

---

## 🚨 Risk Analysis

### Technical Risks

#### Risk 1: Zone Validation Failure
- **Impact:** High (Drivers sent too far).
- **Mitigation:** Strict backend validation based on Zip/Polygon. Unit tests for boundary coordinates.

#### Risk 2: Operator Concurrency
- **Impact:** Medium (Two operators picking same order).
- **Mitigation:** Optimistic Locking or Websockets (future). For MVP, last-write-wins or checks.

### Business Risks

#### Risk 1: Missed ETA
- **Impact:** High (Reputation).
- **Mitigation:** Conservative estimates (+15 mins buffer).

---

## ⚠️ Critical Analysis & Questions for PO/Dev

### Ambiguities Identified

**Ambiguity 1:** "Operator View" Access
- **Question for Dev:** How is "Operator" defined? Special Role in Auth?
- **Impact:** RBAC testing.
- **Suggestion:** `role: 'operator'` in `auth.users` metadata.

**Ambiguity 2:** Pickup Point Data
- **Question for PO:** Is it hardcoded?
- **Impact:** Data setup.

---

## 🎯 Test Strategy

### Test Scope

**In Scope:**
- Address validation (In/Out zone).
- ETA display logic.
- Pickup selection.
- Operator Dashboard (List, Status Update).

**Out of Scope:**
- Driver app.
- Route optimization.

### Test Levels

- **Unit:** Zone Logic, ETA Math.
- **Integration:** Operator APIs (RBAC).
- **E2E:** Full flow: User orders -> Operator sees it -> Operator updates status -> User sees update.

---

## 📊 Test Cases Summary by Story

### STORY-OP-20: Register/Select Delivery Address
- **Complexity:** Medium
- **Est. Tests:** 5 (New address in zone, out zone, edit existing, delete).

### STORY-OP-21: Display Estimated Delivery Window
- **Complexity:** Low
- **Est. Tests:** 3 (Standard time, Late night logic, Holiday logic).

### STORY-OP-22: Select Pickup Option
- **Complexity:** Low
- **Est. Tests:** 2 (Select, Verify $0 fee).

### STORY-OP-23: Operator Order List
- **Complexity:** Medium
- **Est. Tests:** 4 (List all, Filter by status, Sort by time, Empty state).

### STORY-OP-24: Operator Update Order Status
- **Complexity:** Medium
- **Est. Tests:** 5 (Advance status, Valid transitions, Invalid transitions, Email trigger).

**Total Estimated:** ~19 Test Cases.

---

## 🗂️ Test Data Requirements

- **Operator User:** Credentials for RBAC testing.
- **Zones:** Defined list of valid Zip codes.

---

## ✅ Entry/Exit Criteria

**Entry:**
- Operator role implemented.

**Exit:**
- Full cycle (Order -> Deliver) passing in E2E.

---

## 📅 Testing Timeline Estimate

- **Design:** 1 day.
- **Execution:** 2 days.

---

## 🎯 Next Steps (Team Action Required)

1. **Dev:** Implement Operator Role.
2. **PO:** Define valid status transitions (e.g., Pending -> Preparing -> Ready -> Delivered).
