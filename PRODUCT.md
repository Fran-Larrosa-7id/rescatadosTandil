# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Rescatados Tandil / Gatarsis runs a small pet-products e-commerce store. The `/admin` backoffice has a single user role (`ADMIN`) and today is operated by one person, Francisco, who uses it both from a desktop (primary, day-to-day management) and from a phone (quick checks on stock/orders/payments while away from the computer). No multi-seat or role-based access exists yet.

## Product Purpose

The public site sells pet-related products (bolsas, camas, delantales, llaveros, etc.) tied to an animal-rescue cause. The `/admin` panel is the operational backoffice that keeps the store running: managing the product catalog and variants, tracking inventory, processing orders through their fulfillment lifecycle, reconciling Mercado Pago payments (including refunds and manual payment reviews), and auditing all administrative actions.

## Positioning

Not a general-purpose e-commerce SaaS backoffice — a lean, single-operator tool scoped exactly to this store's real workflow (catalog with variants/media, stock with reservations, pickup-only fulfillment, Mercado Pago reconciliation, full audit trail). It should feel like a precise instrument for one person doing several different jobs across a day, not a boilerplate admin template.

## Operating Context

Core workflows observed in the codebase (`src/app/admin/**`):

- **Resumen (dashboard):** at-a-glance operational counts — active/inactive products, low stock/out of stock/reserved units, orders by status (awaiting payment, payment pending, paid today, expired today), open payment reviews.
- **Productos (catalog):** list/search/filter products by state; create/edit product info, variants, and media (Cloudinary-hosted images with alt text, cover flag, sort order).
- **Stock (inventario):** per-variant on-hand/reserved/available stock; restock and manual adjustment actions; low-stock threshold flags.
- **Pedidos (orders):** filter by status/date/order id/payment id; order lifecycle includes AWAITING_PAYMENT, PAYMENT_PENDING, PAID, EXPIRED, CANCELLED, REFUNDED; fulfillment is pickup-only with PENDING/READY_FOR_PICKUP/COMPLETED states and admin notes.
- **Pagos (payments):** reconciliation between Gatarsis, Mercado Pago, and order state; processing status (RECEIVED/RECORDED/APPLIED/REQUIRES_REVIEW); refund flow with a typed confirmation ("REEMBOLSAR"); manual review resolution.
- **Auditoría:** append-only log of admin actions (login, stock adjustments, variant/order/fulfillment changes) with actor email, entity, timestamp, and optional metadata — filterable by action/admin/entity/date.

No single task dominates: catalog, stock, orders, and payments are all touched regularly across a session, so none should be visually privileged over the others — the shell/navigation needs to make switching between them fast.

## Capabilities and Constraints

- Angular app; admin section is isolated under `src/app/admin/**` (shell, pages, core services/guards, shared directives) and must not require changes outside that folder — the public site's structure and styling are out of scope for this work.
- Auth: token-based (access/refresh) admin login guarding all routes via `admin.guard.ts` / `admin-auth.interceptor.ts`.
- Some list endpoints return flat pagination (`AdminFlatPage`) rather than the standard `AdminPaginatedResponse` shape — a backend quirk, not something to redesign around visually, but tables must handle both.
- Currency values arrive as integer cents (`*InCents`) and need formatting.
- This redesign is markup + component CSS only: existing routes, component logic, and data bindings must be preserved as-is.

## Brand Commitments

Store name: Gatarsis (part of the Rescatados Tandil project). No existing visual identity is binding for this backoffice — the current purple admin theme is explicitly not a constraint and can be fully replaced.

## Evidence on Hand

Screenshots of the current `/admin` UI (Resumen, Productos, Nuevo producto, Stock, Pedidos, Pagos, Auditoría) were provided showing the incumbent look: generic purple accent, flat undifferentiated cards, plain sidebar, low visual hierarchy. These are anti-reference only, not a look to preserve.

## Product Principles

1. One operator, many hats — catalog, stock, orders, and payments are all "primary" workflows; the shell must make moving between them fast, not funnel attention to one.
2. Numbers and states are the product — stock counts, order/payment statuses, and audit entries are read constantly and must be scannable at a glance, not buried in flat rows.
3. Works on desktop and phone — this person checks the panel from both; layouts must degrade gracefully to a phone width, not just be "responsive" as an afterthought.
4. Preserve behavior, replace look — no functional, routing, or data-binding change; this is a visual/UX redesign of an existing, working system.

## Accessibility & Inclusion

No specific standard mandated by the user; keep to solid baseline practices (contrast, focus states, readable type scale) appropriate for a single operator, including on a phone screen in variable lighting.
