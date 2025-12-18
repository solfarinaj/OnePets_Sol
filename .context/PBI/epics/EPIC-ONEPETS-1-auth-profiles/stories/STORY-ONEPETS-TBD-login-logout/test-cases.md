# Test Cases - Login & logout (ONEPETS-TBD)

## References
- Epic: EPIC-ONEPETS-1-auth-profiles
- Story: ONEPETS-TBD (Login & logout)
- FR: FR-002

## Test Cases

1) **Successful login**
- Steps: Use valid email/password; submit.
- Expected: 200 OK; session tokens present; UI reflects logged-in state; redirect to account/home.

2) **Invalid password**
- Steps: Wrong password.
- Expected: 401/400 with `INVALID_CREDENTIALS`; no session created.

3) **Unknown email**
- Steps: Email not registered.
- Expected: 401/404 with clear message; no session.

4) **Disabled user**
- Steps: Mark user disabled; attempt login.
- Expected: 403/400 with message; no session.

5) **Logout**
- Steps: Logged-in user clicks logout.
- Expected: Session cleared; protected routes redirect to login; UI shows logged-out state.

6) **Protected route redirect**
- Steps: Logged out; navigate to `/account`.
- Expected: Redirected to login with redirect param; message shown.

7) **Session persistence**
- Steps: Login; refresh page.
- Expected: Session still valid; user stays logged in; if expired, graceful logout.

8) **Performance**
- Steps: Measure login under nominal conditions.
- Expected: Response ≤2s P95; no sensitive error leakage.
