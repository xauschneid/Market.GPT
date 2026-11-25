<p align="center"><img src="assets/vaelis-logo.svg" width="64" alt="Vaelis logo"></p>

# MarketGPT Community Edition

A lightweight, independently usable adaptation of the original Vaelis market-chat interface (not TestMarket). It evaluates user-supplied signals and optionally explains them using Aleph Alpha Kolibri 1.1. It does not generate proprietary signals or execute orders.

## Quick start
Node.js 20+; no npm dependencies.
```sh
git clone https://github.com/xauschneid/Market.GPT.git
cd Market.GPT
npm test
npm start
```
POST JSON to localhost:8080/v1/evaluate for deterministic metrics; /v1/analyze for optional AI explanation. Example:
```sh
curl -H 'Content-Type: application/json' -d '{"analysis":{"asset":{"id":"DEMO"},"price":105,"setups":{"long":{"entry":100,"sl":95,"tp1":110}}}}' http://127.0.0.1:8080/v1/evaluate
```
Import evaluate or analyze from src/index.js or install directly with npm install git+https://github.com/xauschneid/Market.GPT.git. The package is not published to npm.

## Kolibri
Run a compatible model server separately. See https://huggingface.co/Aleph-Alpha/Kolibri-1.1 for hardware and the official vLLM plugin. Configure KOLIBRI_BASE_URL (default http://127.0.0.1:8000/v1), KOLIBRI_API_KEY if required, and optionally KOLIBRI_MODEL. The model weights are not bundled. Live inference requires suitable hardware and has not been verified here. API server binds locally by default; configure MARKETGPT_API_KEY and a TLS reverse proxy with rate limiting before remote exposure.

No live market feed, private Vaelis data, strategies, accounts, or advanced research is included. Results are educational and require human review; not financial advice. Historical performance and win probabilities are not inferred from price geometry.

## Contributing
See CONTRIBUTING.md. Code licensed Apache-2.0; Kolibri weights have their own license and notices.

## Community and attribution
[Roadmap](ROADMAP.md) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Branding](BRANDING.md) · [Trademark terms](TRADEMARK.md)

Run a synthetic example with `node examples/evaluate.mjs`. Optional browser branding is exported from `market-gpt-community/branding`. No license key or mandatory visual branding is required. The project is early-stage; adoption and live model compatibility are not yet established.

## Website integration and provenance
- [Step-by-step website integration](docs/WEBSITE.md)
- [SHA-256 fingerprint verification](PROVENANCE.md)
- [Privacy and no telemetry](PRIVACY.md)
