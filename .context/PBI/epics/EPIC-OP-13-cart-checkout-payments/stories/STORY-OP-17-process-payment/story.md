# Process Payment

**Jira Key:** OP-17
**Epic:** EPIC-OP-13 (Cart, Checkout & Payments)
**Priority:** Critical
**Story Points:** 5
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** securely pay for my order using supported digital payment methods
**So that** I can complete my purchase and have my order processed.

---

## Description

This story covers the integration with a payment gateway to process user payments securely. Users will be presented with available payment options (e.g., credit card, local digital wallets). The system will capture payment details (handled securely by the payment gateway, not directly by OnePets), initiate the transaction, and process the response. Upon successful payment, an order will be created, and inventory will be updated.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successful payment with a credit card (Happy Path)
- **Given:** A user has selected items in their cart and chosen a delivery method.
- **When:** They enter valid credit card details on the secure payment form.
- **And:** The payment gateway successfully processes the transaction.
- **Then:** The system creates a new order with a "pending" or "processing" status.
- **And:** The user is shown an order confirmation page.

### Scenario 2: Payment declined
- **Given:** A user attempts to pay for an order.
- **When:** The payment gateway declines the transaction (e.g., insufficient funds, invalid card).
- **Then:** The system displays an error message: "Payment failed. Please try a different payment method or contact your bank."
- **And:** The user remains on the payment page to reattempt payment.

### Scenario 3: Payment gateway error
- **Given:** A user attempts to pay for an order.
- **When:** An unexpected error occurs with the payment gateway.
- **Then:** The system displays a generic error message: "An error occurred during payment. Please try again later."
- **And:** The order is not created.

---

## Technical Notes

### Frontend
- Integrate a secure payment form (e.g., an iframe or SDK provided by the payment gateway).
- Handle user input for payment details.
- Send payment token/details to the backend API endpoint.
- Display appropriate success or error messages to the user.

### Backend
- **`POST /api/orders`**: This endpoint will receive the cart details, delivery method, and a payment token/method ID.
- It will interact with the external payment gateway's API to process the payment.
- Upon successful payment, it will create a new record in the `orders` table and corresponding `order_items`.
- It should handle failed payment attempts gracefully.

### Database
- **`public.orders`**: A new record will be created for each successful order.
- **`public.order_items`**: Records for products in the order will be created.
- **`public.carts` / `public.cart_items`**: The cart should be cleared or marked as "converted" after a successful order.

---

## Dependencies

### Blocked By
- STORY-OP-16: Select Delivery Method

### Blocks
- STORY-OP-18: Order Confirmation

### Related Stories
- None.

---

## UI/UX Considerations

- The payment form must feel secure (e.g., clear indicators for secure connection).
- Multiple payment options should be clearly presented.
- Clear feedback on payment success or failure.

---

## Definition of Done

- [ ] Users can successfully process payments for their orders.
- [ ] Integration with at least one digital payment method is functional.
- [ ] Payment success and failure scenarios are handled gracefully.
- [ ] API endpoint for order creation with payment processing is implemented and tested.
- [ ] RLS policies are verified for order data.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/stories/STORY-OP-17-process-payment/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Simulate a successful credit card payment.
- Simulate a declined credit card payment.
- Test edge cases like network errors during payment processing.
- Verify that an order is created only upon successful payment.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/stories/STORY-OP-17-process-payment/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Integrate payment gateway SDK into the frontend.
- Develop the payment submission UI.
- Implement the `POST /api/orders` backend endpoint to handle payment processing.
- Update database records based on payment outcome.

---

## Notes
- The payment gateway choice for MVP will be a single, common provider.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-013)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (POST /api/orders)
