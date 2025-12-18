# Test Cases - Pet profiles (ONEPETS-TBD)

## References
- Epic: EPIC-ONEPETS-1-auth-profiles
- Story: ONEPETS-TBD (Pet profiles)
- FR: FR-003

## Test Cases

1) **Create pet happy path**
- Steps: Auth user submits name, species=dog, size=medium.
- Expected: 201/200; pet saved with userId; returned in list.

2) **Missing required fields**
- Steps: Submit without name.
- Expected: 400; validation error; no pet created.

3) **Invalid enums**
- Steps: species=bird or size=giant.
- Expected: 400; error indicating allowed enums.

4) **Edit pet**
- Steps: Update weight/size of existing pet owned by user.
- Expected: 200; fields updated; reflected in subsequent GET.

5) **Unauthorized edit**
- Steps: User A tries to edit pet of User B.
- Expected: 403; no change; no data leakage.

6) **List pets**
- Steps: Auth user lists pets.
- Expected: Only owned pets returned; empty array if none.

7) **Data validation ranges**
- Steps: ageYears negative or weightKg negative.
- Expected: 400; validation error.

8) **Performance**
- Steps: Create/list under nominal load.
- Expected: Response ≤2s P95; RLS enforced.
