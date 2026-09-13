---
version: 1
slug: "src-app-admin"
primary_target: "src/app/admin"
related_targets: []
---

## Scope

Whole `/admin` surface: login screen, shell (sidebar/topbar/nav), and every page (Resumen, Productos, Nuevo/Editar producto, Stock, Pedidos, Pagos, Auditoría). Operate mode. Markup + CSS only, inside `src/app/admin/**`; no route, logic, or data-binding changes.

## Audience, job, action, proof, constraints

Single operator (Francisco) running Gatarsis's pet-product store day to day, from desktop and phone. Job: keep catalog/stock/orders/payments/audit trail correct with minimal friction, scanning states constantly. No proof/marketing content — pure task tool. Constraint: must preserve every existing Angular binding, table column, filter, and action; must degrade cleanly to phone width.

## Chosen direction and memorable moment

**Ficha de historia clínica veterinaria** (clinical patient-record chart), the impeccable's-pick candidate the user selected over the assigned "diagnostic lab panel" direction.

### Direction contract

**THESIS:** Every entity in the panel (a product, an order, a payment) is a record card with a status tab and a stamped confirmation — never an anonymous spreadsheet row. Refuses the default SaaS-dashboard arrangement of flat cards + purple accent + generic sidebar.

**OWN-WORLD:** Warm paper-cream ground (not stark white), near-black sepia ink for text, a restrained neutral system plus ONE brand accent (deep forest/teal-green, replacing the old purple) used sparingly for primary actions only. A fixed, small vocabulary of exactly 5 status-tab colors reused identically everywhere (ok/green, low/amber, critical/red, pending/blue-gray, resolved/muted-green) — never invented per-page. Folder-tab motif on section nav and on table row status. A rubber-stamp motif (angled, ink-textured) ONLY for confirmed completed actions (Pagado, Entregado, Reembolsado) — disciplined, never decorative filler. Zilla Slab for section headers/tab labels (record-card, typewritten-form character, not literary); system UI sans stack for body/data (Operate default: fast, native, unobtrusive); IBM Plex Mono for every live/critical figure — stock counts, SKUs, prices, totals, order/payment IDs — so numbers read as measured values, not decoration.

**STORY:** Opening the panel feels like pulling the right patient chart: the sidebar is a tabbed folder rack (Resumen, Productos, Stock, Pedidos, Pagos, Auditoría), each page opens like a chart with a header strip (title + stamp-style state), and every list row carries its own colored status tab at the left edge instead of a text badge floating mid-row.

**FIRST VIEWPORT (Resumen):** Header chart-strip with store name as a "patient" letterhead. Below it, a row of 4 vital-stat cards (Productos activos, Stock bajo, Sin stock, Reservadas) styled as small chart tabs with the number in Plex Mono and a colored corner tab matching the 5-state vocabulary. Below that, two "chart pages" side by side (Pedidos / Pagos) as stacked record rows with left-edge status tabs, not the current plain list.

**FORM:** Selected as the user's own top-ranked ("IMPECCABLE'S PICK") candidate over the assigned "diagnostic lab panel" direction (seed key 7d85b8f4, assigned index 6). User confirmed via structured question with full preview.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved decisions

- Login screen composition (single chart-card centered vs. split panel) — decide during hero build, staying in-world (a single "admission chart" card, centered, feels most correct for a one-operator tool; no split marketing panel needed).
- Whether rubber-stamp motif renders as inline SVG texture or CSS-only (angled text + subtle noise) — CSS-only chosen given no image-generation asset pipeline is configured for this build (code-led).
