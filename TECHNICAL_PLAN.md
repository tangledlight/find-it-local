# Find It Local — Technical Plan

## What we are building

A responsive **web app** for a fictional Williamsburg store, Wburg Corner. A shopper can search the store's mocked catalog, see a calm availability signal and update time, open a product detail view, and decide whether to visit.

This is deliberately not a mobile app and does not use real stores, Square, customer data, or external services. Every product, location, image, inventory update, and store detail is local mock data.

## The simple shape of the app

`browser → page and search UI → catalog source adapter → normalized mocked catalog + inventory`

The UI must only ask the adapter for normalized data. It must never import the raw fixture directly. That preserves a realistic boundary for replacing the mock source later without redesigning the interface.

Suggested stack: React, TypeScript, Vite, and a maintained test runner plus browser-level test tooling. Use accessible native controls and CSS; avoid a component framework unless it solves a demonstrated problem.

## Shared rules for every part

- Treat availability as guidance, not a guarantee. Use only `In stock`, `Low stock`, and `Out of stock` for shopper-facing state.
- Keep out-of-stock items in search results and make the state visible without relying on color alone.
- Show a human-readable “last updated” value everywhere a shopper makes an availability decision.
- Keep the development-only inventory simulator clearly labeled and absent from a production build.
- Make the main desktop web experience feel warm, useful, and neighborhood-oriented using the provided cream, brick red, deep green, and mustard palette.
- Never add a real network call, account flow, map, checkout, multi-store choice, or exact customer-facing stock count.
- Prefer simple modules with clear inputs and outputs over clever abstractions.

## Work packages

### Part: App foundation and shared rules

**Purpose:** Create a dependable web-app shell that gives every later task the same conventions.

**Subagent-owned work**

- Create the TypeScript web project and a short README with local run, test, and build instructions.
- Add a lightweight route structure for the catalog page and product-detail page.
- Set up global styles, design tokens, accessible focus styles, and the Wburg Corner type/color treatment.
- Add linting, formatting, unit-test support, and browser-test support using maintained libraries.
- Add a production-build guard for development-only controls.

**Inputs:** This plan and the visual identity in the supplied PRD.

**Done when**

- The app starts, builds, and shows a branded but minimal catalog shell in a browser.
- A keyboard user can see where focus is.
- The development-only area has an explicit label explaining that it changes local mock inventory only.
- The README tells another contributor exactly how to run the app and its checks.

**Reviewer checks**

- Run the documented start, test, and build commands.
- Inspect a production build: no simulator control or development wording is reachable.
- Check that the primary experience is a browser page, not a native/mobile project.

**Dependencies:** None. This part should land before the other parts.

### Part: Mock Square-shaped catalog source

**Purpose:** Give the app one honest, replaceable source of fictional catalog and availability data.

**Subagent-owned work**

- Define raw mock records with Square-compatible concepts: catalog item, item variation, location, money, quantity, availability, and updated-at.
- Seed every product in the PRD with its category, price, availability, useful search terms, and an image reference or intentionally generated local placeholder.
- Create an adapter that normalizes raw records into the exact product and store shapes used by the UI.
- Include the fictional Wburg Corner location, address, phone, and store hours in the same source boundary.
- Expose safe development-only mutation functions that change a product's availability/quantity and updated-at timestamp.
- Add tests for normalization, status derivation, and mutation propagation.

**Inputs:** The PRD catalog and fictional store details.

**Done when**

- UI-facing code imports adapter functions/types only; it does not import raw fixtures.
- Each catalog entry can be found by its product name, category, or assigned relevant terms.
- The adapter returns sufficient information for results and details without leaking raw schema details.
- A local simulated update changes both state and its displayed updated time.

**Reviewer checks**

- Search the codebase for fixture imports outside the adapter boundary.
- Exercise an in-stock, low-stock, and out-of-stock item through the adapter tests.
- Confirm the store is fictional and no API key, real URL, or external fetch was added.

**Dependencies:** App foundation. It can otherwise proceed in parallel with visual work once the shared types are agreed.

### Part: Search and results behavior

**Purpose:** Help a picnic planner quickly understand what Wburg Corner carries now.

**Subagent-owned work**

- Build the search input and results list using adapter data.
- Match normalized product names, categories, and relevant terms case-insensitively.
- Provide an understandable empty-query state and no-results state with a practical recovery path.
- Render product image, name, price, availability, category, and last-updated time for every result.
- Keep unavailable products in the result set and make them visibly distinct while preserving legibility.
- Add behavioral tests for seeded names, categories, and the PRD’s picnic-oriented search terms.

**Inputs:** Normalized catalog source and shared styles.

**Done when**

- A shopper can search for “rope,” “plates,” and “picnic blanket” and see the appropriate mocked products.
- Searching does not silently hide out-of-stock matches.
- Clearing a query restores the browseable catalog.
- The no-results state says what happened and suggests changing or clearing the search.

**Reviewer checks**

- Run the browser flow for the shopper examples in the PRD.
- Test an unavailable search match and verify its availability state remains clear.
- Test keyboard entry, clear action, and a no-results recovery path.

**Dependencies:** App foundation and mock catalog source.

### Part: Product detail and store confidence

**Purpose:** Let a shopper confirm an item and decide whether a trip is worthwhile.

**Subagent-owned work**

- Add a stable detail URL for each product and navigation from a result card.
- Present the selected product’s image, price, category, availability, update time, and useful description.
- Present Wburg Corner’s name, Williamsburg location, address, phone, and store hours on the detail view.
- Add clear availability language explaining that inventory may change before a visit.
- Handle an unknown product URL with a friendly route back to the catalog.
- Add browser tests for opening an available product, an out-of-stock product, and an unknown link.

**Inputs:** Adapter data, search results, and shared styles.

**Done when**

- A shopper can go from search result to detail without losing the important inventory context.
- The detail page accurately reflects the same mocked update after a simulator change.
- An invalid detail URL does not crash or strand the shopper.

**Reviewer checks**

- Compare a changed item’s result card and detail page side by side.
- Open a detail URL directly and refresh it.
- Verify all store details match the PRD’s fictional Wburg Corner details.

**Dependencies:** Mock catalog source; search navigation can be integrated once both parts exist.

### Part: Development inventory simulator

**Purpose:** Make it easy to demonstrate that a catalog update reaches every shopper-facing surface.

**Subagent-owned work**

- Build a development-only control that lets a developer choose a seeded product and set it to an availability state, including out of stock.
- Show the selected product’s before/after state and last-updated value after a change.
- Make updates flow through the source adapter rather than bypassing it.
- Ensure a page reload restores the original fixture state unless a deliberate local persistence choice is documented.
- Add tests covering a state change in results and detail.

**Inputs:** Source adapter, catalog page, and detail page.

**Done when**

- A reviewer can simulate an item becoming unavailable and observe the same state in search and detail.
- The simulator is not exposed in the production build.
- No exact stock quantity is displayed to shoppers.

**Reviewer checks**

- Make one item out of stock, find it, open it, and inspect both update timestamps.
- Build for production and confirm the control is absent.

**Dependencies:** Mock source, results, and detail views.

### Part: Visual polish and accessibility pass

**Purpose:** Make the prototype recognizably Wburg Corner without making availability harder to understand.

**Subagent-owned work**

- Apply the warm palette, rounded cards, restrained handwritten-style category accents, and friendly visual hierarchy.
- Source or create local mock product imagery with consistent presentation; do not depend on runtime third-party image hosts.
- Check responsive browser layouts, contrast, semantic headings, labels, focus order, and availability text/icons.
- Add a concise empty/no-results illustration or treatment only if it improves recovery clarity.
- Document any intentional visual exceptions.

**Inputs:** Working catalog, results, and detail views.

**Done when**

- Product and availability information remains scannable at common desktop browser widths.
- Status remains understandable in grayscale and for a screen-reader user.
- The app feels local and tactile without becoming decorative at the expense of the search task.

**Reviewer checks**

- Keyboard-navigate the main flow.
- Verify state meaning with colors disabled or ignored.
- Capture review screenshots of catalog, search results, detail, no-results, and simulated unavailable state.

**Dependencies:** All shopper-facing work should be functionally complete first.

### Part: End-to-end verification and delivery

**Purpose:** Prove the prototype meets the shopper flow before it is handed off.

**Subagent-owned work**

- Write browser-level tests for the complete PRD flow and meaningful regression risks.
- Verify mocked inventory changes stay consistent across results and details.
- Run the complete local quality suite and document results in the README or a short verification note.
- Review scope against the non-goals and remove accidental integrations or unused complexity.
- Prepare a compact change summary for final review.

**Inputs:** Completed app and all prior reviewer checks.

**Done when**

- The defined shopper flow works end to end with mock data.
- Search contracts are tested through visible behavior, not implementation details.
- The project has no real-store dependency and no unreviewed placeholder that blocks the flow.

**Reviewer checks**

- Run the quality suite from a clean checkout.
- Follow the PRD shopper flow manually.
- Review the network panel or codebase for unexpected external inventory calls.

**Dependencies:** Every other part.

## Integration order and monitoring

Use one branch and pull request per work package. The reviewer merges only when the package’s “Done when” and “Reviewer checks” are satisfied.

| Order | Work package | Reviewer watches for |
|---|---|---|
| First | App foundation | A runnable, testable web project and a production guard |
| Next | Mock Square-shaped catalog source | A single adapter boundary and complete fictional data |
| Then | Search and results behavior | Correct visible search behavior and status clarity |
| Then | Product detail and store confidence | Consistent data and a recoverable invalid route |
| Then | Development inventory simulator | Adapter-mediated changes reflected everywhere |
| Then | Visual polish and accessibility pass | Brand fit without reduced clarity |
| Last | End-to-end verification and delivery | Evidence that the shopper journey works |

At every review, the monitoring agent should:

- Read the diff for scope creep or direct fixture imports.
- Run the package’s focused behavior checks, then the full suite before merge.
- Confirm any new number has a receipt in the decision log below.
- Report: what changed, what was verified, any risk, and whether the package is ready to merge.

## Number receipts and visible limits

There are intentionally no search-result caps, polling intervals, refresh timers, retry counts, or debounce delays in this prototype. The local catalog is filtered in memory; adding a delay or cap would be premature without measurement.

| Decision / figure | Baseline and method | Recorded |
|---|---|---|
| Seeded catalog size | Counted the product rows in the supplied PRD: thirty-five mocked products. This was corrected after the adapter behavior test counted the seeded records. | 2026-10-12 |
| Seeded category coverage | Counted distinct category labels in the supplied PRD: eight categories | 2026-10-12 |
| Search examples to protect | The PRD explicitly names “rope”, “plates”, and “picnic blanket”; tests must cover them | 2026-10-12 |
| Availability states | The PRD defines exactly three shopper-facing states: In stock, Low stock, Out of stock | 2026-10-12 |
| Search delays and result caps | Baseline: a local fixture catalog of thirty-five records; method: no runtime measurement yet because no implementation exists. Decision: no imposed limit or delay. Revisit after a measured browser trace shows a user-visible issue. | 2026-10-12 |

If a later task adds a limit a developer can hit—for example an image size budget, search result cap, or test timeout—it must show the constraint and a practical recovery path at the earliest surface that can know it. It must also add a row here with the baseline, measurement method, date, and why the limit is appropriate.

## Handoff prompt template

Give a subagent one work package at a time, plus this instruction:

> Implement only the assigned work package in the Find It Local web app. Preserve mocked data and the source-adapter boundary. Do not add real integrations or out-of-scope features. Add behavior-focused tests for the package, run its checks, and report changed files, verification evidence, risks, and any new numeric limit with its receipt.

## Open implementation choices

- Choose maintained libraries only after the foundation owner verifies current compatibility with the selected build tool. Record the selection and reason in the README.
- Generate product imagery during visual work. 
- Define store hours as fictional source data before detail work begins; the supplied PRD requires hours but does not specify them. Keep the value clearly fictional.
