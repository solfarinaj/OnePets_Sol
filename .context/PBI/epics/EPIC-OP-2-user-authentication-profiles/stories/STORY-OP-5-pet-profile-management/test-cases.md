# Test Cases: STORY-OP-5 - Pet Profile Management

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-5
**Epic:** EPIC-OP-2 - User Accounts & Pet Profiles
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Personalization engine foundation.
- **Business Impact:** Enables "Tailored Products" and "Subscriptions", key revenue drivers.

**Related User Journey:**
- Journey: Onboarding / Profile Setup
- Step: Add Pet

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `PetList`, `PetForm`, `PetCard`
- Pages: `/profile/pets`

**Backend:**
- API: `GET/POST/PUT/DELETE /api/pets`
- Database: `public.pets`

**Integration Points:**
- Frontend ↔ Backend API
- Database RLS (Critical)

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Business logic: Low
- Data validation: Medium (Enums for species/size)
- Security: High (Row Level Security - RLS)

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Size" definition
- **Location in Story:** Acceptance Criteria
- **Question for PO:** What are the size buckets? (Small/Medium/Large)? Based on weight?
- **Impact on Testing:** Need exact enum values for test data.
- **Suggested Clarification:** Use "Small (<10kg)", "Medium (10-25kg)", "Large (>25kg)".

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** Deleting a pet with dependencies
- **Scenario:** User deletes a pet that has an active food subscription.
- **Expected Behavior:** Block deletion or Cascade delete (Cancel subscription). Blocking is safer.
- **Criticality:** High
- **Action Required:** Add negative test case for deletion with dependencies.

**Edge Case 2:** Max number of pets
- **Scenario:** User adds 50 pets.
- **Expected Behavior:** Reasonable limit (e.g., 10) to prevent UI breakage/abuse.
- **Criticality:** Low
- **Action Required:** Verify if limit exists.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Add Pet (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** User is on "Add Pet".
- **When:** User enters Name "Rex", Species "Dog", Size "Large", Age "5".
- **Then:** Pet appears in list. DB has record linked to user.

### Scenario 2: Edit Pet
**Type:** Positive
**Priority:** High

- **Given:** User has pet "Rex".
- **When:** User changes Name to "T-Rex".
- **Then:** List shows "T-Rex".

### Scenario 3: Delete Pet
**Type:** Positive
**Priority:** Medium

- **Given:** User has pet "T-Rex".
- **When:** User clicks Delete -> Confirm.
- **Then:** Pet disappears from list.

### Scenario 4: Access Control (RLS)
**Type:** Security
**Priority:** Critical

- **Given:** User A has pet ID 100. User B is logged in.
- **When:** User B tries `GET /api/pets/100` or `PUT`.
- **Then:** 403 Forbidden or 404 Not Found.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar creación de mascota (Perro/Gato)**
**Type:** Positive
**Priority:** Critical
**Parametrized:** Yes

**Test Data Sets:**
- Species: Dog, Size: Large
- Species: Cat, Size: Small

**Expected Result:**
- **Status:** 201 Created.
- **DB:** Record exists with correct Enums.

#### **Validar seguridad RLS (Acceso cruzado)**
**Type:** Security
**Priority:** Critical
**Test Level:** API/Integration

**Preconditions:**
- User A creates Pet A.
- User B logs in.

**Test Steps:**
1. User B calls `GET /api/pets/{PetA_ID}`.

**Expected Result:**
- **Status:** 404 (Supabase typically returns 404 for RLS hidden rows) or 403.
- **Body:** Empty or Error.

#### **Validar eliminación de mascota**
**Type:** Positive
**Priority:** Medium

**Test Steps:**
1. Create temporary pet.
2. Delete it.
3. Verify it's gone from UI and API list.

#### **Validar validación de campos obligatorios**
**Type:** Negative
**Priority:** Medium

**Test Steps:**
1. Submit form with empty Name.

**Expected Result:**
- **UI:** "Name is required".

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| RLS Bypass | Security Test | Critical |
| Delete with Subs | TBD (Dependent on Subs epic) | High |

---

## 🎯 Next Steps

1. **Dev:** Define Enums for Size/Species in DB.
2. **QA:** Verify RLS policies explicitly.
