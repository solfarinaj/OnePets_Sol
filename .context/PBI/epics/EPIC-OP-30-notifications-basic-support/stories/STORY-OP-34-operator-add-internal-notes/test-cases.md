# Test Cases: STORY-OP-34 - Operator Add Internal Notes

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-34
**Epic:** EPIC-OP-30 - Notifications & Basic Support
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Operator.

**Business Value:**
- **Value Proposition:** Memoria institucional. Evita "teléfono descompuesto" entre turnos.
- **Business Impact:** Eficiencia operativa.

**Related User Journey:**
- Journey: Issue Resolution
- Step: Logging

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `NotesThread`, `AddNoteInput`.
- Pages: `/admin/orders/[id]`, `/admin/support/[id]`.

**Backend:**
- API Endpoints: `POST /api/admin/notes`.
- Database: `public.internal_notes`.

**Integration Points:**
- Frontend ↔ Backend.

---

### Story Complexity Analysis

**Overall Complexity:** Low

**Complexity Factors:**
- Security: High (Must be strictly internal).
- Polymorphism: Medium (Notes linked to Order OR Ticket).

**Estimated Test Effort:** Low

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** Editing notes
- **Location in Story:** Description
- **Question for PO:** Can an operator edit/delete their own notes? Or immutable?
- **Impact on Testing:** CRUD vs CR only.
- **Suggested Clarification:** Immutable for audit trail (CR only).

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Add Note to Order
**Type:** Positive
**Priority:** Critical

- **Given:** Operator viewing Order #10.
- **When:** Adds note "Called customer, no answer".
- **Then:** Note saved. Timestamp recorded. User ID recorded.

### Scenario 2: Add Note to Ticket
**Type:** Positive
**Priority:** High

- **Given:** Operator viewing Ticket #5.
- **When:** Adds note "Escalated to Logistics".
- **Then:** Note saved linked to Ticket #5.

### Scenario 3: Unauthorized Access
**Type:** Security
**Priority:** Critical

- **Given:** Customer logged in.
- **When:** Tries to `POST /api/admin/notes`.
- **Then:** 403 Forbidden.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar creación de nota interna**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Test Steps:**
1. Login as Operator.
2. Open Order.
3. Add Note.
4. Verify Note appears in list immediately.

#### **Validar seguridad (Invisibilidad para cliente)**
**Type:** Security
**Priority:** Critical
**Test Level:** Integration

**Test Steps:**
1. Create Note on Order #10 as Admin.
2. Login as Owner of Order #10.
3. Fetch Order Details.
4. Verify "notes" field is empty/missing.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Target ID does not exist | Validation Test | Low |

---

## 🎯 Next Steps

1. **Dev:** Use Polymorphic relation or two nullable columns (`order_id`, `ticket_id`).
2. **QA:** Verify timestamps are UTC but displayed Local.
