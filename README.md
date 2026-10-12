# Find It Local

A browser-based prototype for finding fictional Wburg Corner picnic and gathering supplies nearby.

## What is included

- A fully local, mocked Square-shaped catalog source
- Search by product name, category, and picnic-related terms
- Product detail pages with availability and update time
- Clear in-stock, low-stock, and out-of-stock states
- A development-only inventory simulator at `?dev=1`
- No real stores, customer data, external inventory, or third-party images

## Run locally

Serve this folder with a static local web server, then open the address it prints in a browser. For example:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

The port is only a local convenience value. Receipt: it successfully served the prototype to a loopback browser preview on 2026-10-12. If it is unavailable, use any open local port and open the URL printed by the server.

Open the normal catalog at `/`. To see the development-only simulator, use `/?dev=1`.

## Checks

The behavior tests live in `test/catalogAdapter.test.js` and use Node’s built-in test runner:

```sh
node --test
```

The current execution environment does not include Node, so these tests need to run on a machine with Node installed. Browser behavior was checked locally through the loopback preview.

## Project guide

- [Technical implementation plan](./TECHNICAL_PLAN.md)
- [Mock data notes and receipts](./MOCK_DATA_NOTES.md)
