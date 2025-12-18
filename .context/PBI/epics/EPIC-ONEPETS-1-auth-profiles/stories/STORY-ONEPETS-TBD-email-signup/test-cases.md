# Test Cases - Email signup (ONEPETS-TBD)

## References
- Epic: EPIC-ONEPETS-1-auth-profiles
- Story: ONEPETS-TBD (Email signup)
- FR: FR-001

## Test Cases

1) **Happy path signup**
- Steps: Submit valid email + password >=8.
- Expected: 201/200; auth user created; `profiles` row created; session returned.

2) **Duplicate email**
- Steps: Signup with existing email.
- Expected: 409/400; error code `EMAIL_ALREADY_EXISTS`; no new profile row.

3) **Invalid email format**
- Steps: Submit `foo` as email.
- Expected: Client-side validation blocks; if forced, backend returns 400.

4) **Weak password**
- Steps: Password “123”.
- Expected: 400 with message about minimum length; no account created.

5) **Profile creation failure**
- Steps: Simulate DB failure after auth user created.
- Expected: Signup fails; either rollback or flagged error; user receives clear error; no orphaned profile row.

6) **Network/auth service failure**
- Steps: Force network error.
- Expected: Error surfaced; user can retry; no partial account.

7) **Session established**
- Steps: After successful signup, check session token present.
- Expected: Auth state reflects logged-in user; protected route accessible.

8) **Performance**
- Steps: Measure signup response under nominal load.
- Expected: ≤2s P95; errors logged if slower.
