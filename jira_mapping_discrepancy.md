# Critical Discrepancy Found in Jira Mapping

During the verification of the 1:1 mapping between local `epic.md` files and Jira, a critical discrepancy has been identified:

## Issue: Jira Key `OP-13` is a Story, Not an Epic

*   **Local `epic.md` file (`.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/epic.md`):** This file defines `OP-13` as an **Epic** titled "Cart, Checkout & Payments".
*   **Jira Issue `OP-13` (`https://onepets.atlassian.net/browse/OP-13`):** When attempting to retrieve this issue from Jira, it is identified as a **Story** issue type.
    *   Its **Summary** in Jira is `STORY-OP-18-order-confirmation`, which is clearly a User Story, not an Epic.
    *   It is also linked as a child of `OP-2`, which is an Epic in Jira.

This indicates a fundamental misalignment with the project's "Jira-First" workflow, where Jira is intended to be the source of truth for Epics and Stories. The local `.context/PBI/epics` directory is structured around Epics, but Jira does not reflect this structure for `OP-13`. It appears that what is intended to be a top-level Epic (`Cart, Checkout & Payments`) is currently represented as a User Story (`STORY-OP-18-order-confirmation`) in Jira, and is even a child of another Epic (`OP-2`).

## Impact:

This discrepancy is a **critical blocking issue** for verifying the 1:1 mapping of epics and stories. It means the current structure in Jira does not match the planned hierarchy in the local documentation. Proceeding with verification under this condition will lead to inaccurate results and further confusion.

## Recommended Course of Action:

To resolve this, we need to decide on the authoritative source and rectify the discrepancy. Given the "Jira-First" principle outlined in `.prompts/fase-4-specification/pbi-product-backlog.md`, Jira should ideally be the source of truth.

You have two primary options:

1.  **Correct Jira to Match Local Structure:**
    *   This involves modifying the issue `OP-13` in Jira to be an Epic (if possible, Jira might have limitations on changing issue types), and updating its summary/description to reflect "Cart, Checkout & Payments".
    *   You would also need to ensure that the actual stories (`OP-14`, `OP-15`, etc.) are created as child stories under this corrected `OP-13` Epic in Jira.
    *   This option maintains the local `.context/PBI/epics` structure as the intended plan.

2.  **Adjust Local Structure to Match Jira:**
    *   This involves acknowledging that `OP-13` is a Story in Jira and potentially restructuring your local `.context/PBI/epics` to reflect the actual Jira hierarchy. This would mean that `Cart, Checkout & Payments` is not an Epic as defined locally, or that its Jira Key needs to be different.
    *   This option would require significant re-evaluation of your local documentation and potentially renaming of local folders/files.

**Given the project's adherence to the "Jira-First" principle, it is recommended to *correct Jira to match the intended Epic structure* for "Cart, Checkout & Payments" (and potentially other Epics if they exhibit similar issues).**

Please clarify how you would like to proceed. Until this structural discrepancy is resolved, I cannot accurately verify the 1:1 mapping of epics and stories between your local files and Jira.