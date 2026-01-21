# Cart, Checkout & Payments

**Jira Key:** OP-13
**Status:** To Do
**Priority:** CRITICAL
**Phase:** Foundation

---

## Epic Description

This epic encompasses the entire purchasing flow, from adding products to the shopping cart, reviewing the order summary, selecting delivery or pickup options, to securely processing payments and receiving order confirmation. It focuses on a simple, intuitive, and fast checkout experience to minimize friction and maximize conversion.

**Business Value:**
- Enables core e-commerce functionality, allowing users to complete transactions.
- Provides a seamless and trustworthy payment experience, crucial for user retention.
- Captures essential order data for logistics, analytics, and customer support.
- Directly contributes to revenue generation.

---

## User Stories

1. **OP-14** - As a pet owner, I want to add products to my cart so that I can prepare my purchase.
2. **OP-15** - As a pet owner, I want to see a clear cart summary so that I review items and costs before paying.
3. **OP-16** - As a pet owner, I want to choose home delivery or pickup so that I use the method that suits me.
4. **OP-17** - As a pet owner, I want to pay with supported digital methods so that I complete my order securely.
5. **OP-18** - As a pet owner, I want to receive an order confirmation with ETA so that I know my purchase was recorded.

**NOTA:** Los IDs serán actualizados cuando se creen las stories en Jira.

---

## Scope

### In Scope
- Adding products to a shopping cart from the catalog or product detail page.
- Viewing a clear summary of items in the cart, including quantities, prices, and estimated shipping costs.
- Selecting between home delivery (within the pilot zone) and pickup at a designated physical point.
- Secure payment processing via integrated digital payment methods.
- Displaying a detailed order confirmation page with estimated delivery time.

### Out of Scope (Future)
- Guest checkout (requires user registration/login).
- Multiple delivery addresses per user.
- Advanced shipping options (e.g., scheduled delivery slots).
- Gift cards or promotional codes.
- Refunds and returns management.

---

## Acceptance Criteria (Epic Level)

1. ✅ Users can successfully add products to their cart and view its contents.
2. ✅ The checkout flow allows users to select a delivery method and complete payment.
3. ✅ Payments are processed securely and reliably.
4. ✅ Users receive a clear and accurate confirmation of their order.
5. ✅ The system correctly calculates order totals, including shipping costs.

---

## Related Functional Requirements

- **FR-010:** Add products to cart.
- **FR-011:** View cart summary.
- **FR-012:** Select delivery method (home/pickup).
- **FR-013:** Process payments.
- **FR-014:** Order confirmation.

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Backend
- API endpoints for cart management (add, update, remove items, get cart).
- API endpoints for initiating and confirming orders.
- Integration with a payment gateway (e.g., Stripe, local provider).
- Order creation logic, including inventory checks and delivery cost calculation.

### Database Schema
**Tables:**
- `carts`: Stores user's active shopping cart.
- `cart_items`: Stores individual items in a cart, linked to `products`.
- `orders`: Stores completed orders.
- `order_items`: Stores individual items in an order, linked to `products`.

**RLS Policies:**
- RLS policies on `carts`, `cart_items`, `orders`, and `order_items` tables to ensure users only access their own data.

### Security Requirements
- All payment-related data must be handled securely and be PCI compliant (leveraging external payment gateway).
- API endpoints for cart and order management must be protected with authentication and authorization checks.
- CSRF protection for checkout forms.

---

## Dependencies

### External Dependencies
- Payment Gateway (e.g., Stripe, local provider for digital payments).

### Internal Dependencies
- EPIC-OP-2: User Accounts & Pet Profiles (for authenticated users and addresses).
- EPIC-OP-7: Essential Catalog & Product Discovery (for product data).

### Blocks
- EPIC-OP-4: Delivery & Click & Collect (builds on successful order creation)
- EPIC-OP-5: Subscription Management (requires a functional checkout flow)

---

## Success Metrics

### Functional Metrics
- Cart addition success rate > 99%.
- Payment processing success rate > 95%.
- API response time for checkout-related actions < 800ms (p95).

### Business Metrics
- Conversion rate from cart to purchase ≥ 3%.
- Average order value (AOV) meets target.
- Low cart abandonment rate.

---

## Risks & Mitigations

| Risk     | Impact          | Probability     | Mitigation           |
| -------- | --------------- | --------------- | -------------------- |
| Payment Gateway Failure | High | Medium | Implement retry mechanisms; provide clear error messages to users; have alternative payment methods. |
| Inventory Mismatch | High | Medium | Implement real-time or near real-time inventory updates; perform stock checks at multiple points (add to cart, checkout). |
| High Cart Abandonment | Medium | Medium | Optimize checkout UX/UI; provide clear shipping costs upfront; offer guest checkout (future). |

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/feature-test-plan.md` (se crea en Fase 5)

### Test Coverage Requirements
- **Unit Tests:** For pricing calculations, cart logic.
- **Integration Tests:** For all cart, order, and payment API endpoints.
- **E2E Tests:** A full end-to-end purchase flow, from adding to cart to order confirmation.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/feature-implementation-plan.md` (se crea en Fase 6)

### Recommended Story Order
1. OP-14 - Add Products to Cart
2. OP-15 - View Cart Summary
3. OP-16 - Select Delivery Method
4. OP-17 - Process Payment
5. OP-18 - Order Confirmation

### Estimated Effort
- **Development:** 2 sprints
- **Testing:** 1 sprint
- **Total:** 3 sprints

---

## Notes
- This epic is critical for the MVP's revenue generation.

---

## Related Documentation

- **PRD:** `.context/PRD/mvp-scope.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-010 to FR-014)
- **Architecture:** `.context/SRS/srs-architecture-specs.md`
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml`
