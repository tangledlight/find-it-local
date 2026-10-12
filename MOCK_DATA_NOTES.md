# Mock data notes

Everything in this prototype is fictional and local to the browser. There are no real stores, live inventory calls, customer records, or third-party images.

| Value | Receipt |
|---|---|
| Catalog contents, prices, categories, and availability | Copied from the supplied Find It Local PRD on 2026-10-12. The source fixture contains thirty-five products. The count was verified by the adapter behavior test. |
| Search terms | Required terms came from the PRD; supporting terms were added as local fixture metadata so shoppers can search practical synonyms. |
| Store address and phone | Copied from the PRD; both are fictional prototype details. |
| Store hours: every day, 10 AM–7 PM | The PRD requires hours but does not define them. Baseline: no supplied hours. Method: explicitly select a simple, clearly labeled fictional value for the prototype. Revisit if real store data is introduced. Recorded 2026-10-12. |
| Initial update time | The PRD requires an update time but provides none. Baseline: no supplied timestamp. Method: use a fixed prototype timestamp to keep the fixture deterministic; a simulator action replaces it with the browser’s current time. Recorded 2026-10-12. |
| Internal quantities | They exist only to make the Square-like mock shape credible and are never shown to shoppers, per the PRD. |
