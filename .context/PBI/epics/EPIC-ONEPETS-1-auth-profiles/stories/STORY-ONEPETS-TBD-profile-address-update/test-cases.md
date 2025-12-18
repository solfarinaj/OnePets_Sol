# Test Cases - Profile & address update (ONEPETS-TBD)

## References
- Epic: EPIC-ONEPETS-1-auth-profiles
- Story: ONEPETS-TBD (Profile/address update)
- FR: FR-004

## Test Cases

1) **Update profile happy path**
- Steps: Auth user updates name/phone with valid values.
- Expected: 200; profile updated; returned payload matches input.

2) **Missing required address fields**
- Steps: Submit address without line1 or city.
- Expected: 400; validation errors; no address saved.

3) **Invalid phone format**
- Steps: Enter invalid phone.
- Expected: 400; message with expected pattern.

4) **Address ownership**
- Steps: User A tries to update address belonging to User B.
- Expected: 403; no changes; no data leak.

5) **Pilot zone recalculation**
- Steps: Update address to an in-zone location.
- Expected: withinPilotZone=true; returned flag updated; downstream availability can rely on it.

6) **Out-of-zone address**
- Steps: Update address to outside pilot zone.
- Expected: withinPilotZone=false; stored accordingly.

7) **Remove address**
- Steps: Clear address fields/remove address.
- Expected: Address removed; system handles “no address” gracefully; availability requests see no address.

8) **Performance**
- Steps: Update address under nominal load.
- Expected: Response ≤2s P95; validations enforced.
