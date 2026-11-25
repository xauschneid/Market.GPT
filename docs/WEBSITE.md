# Website integration / Webseitenintegration
1. Install Node.js 20 or newer and clone https://github.com/xauschneid/Market.GPT.
2. Run `npm test`, then `npm start` in the checkout. The server listens locally by default. Use the deterministic endpoint without any model.
3. Send POST /v1/evaluate with JSON:
```json
{"analysis":{"asset":{"id":"DEMO"},"price":105,"setups":{"long":{"entry":100,"sl":95,"tp1":110}}}}
```
4. In production, implement a same-origin backend route such as /api/market-analysis forwarding to the local MarketGPT server /v1/evaluate. Keep credentials server-side; authenticate users, validate requests, rate-limit and use HTTPS. Never expose the model server directly.
5. Browser example:
```js
const response = await fetch('/api/market-analysis', {
 method: 'POST', headers: {'Content-Type':'application/json'},
 body: JSON.stringify({analysis:{asset:{id:'DEMO'},price:105,setups:{long:{entry:100,sl:95,tp1:110}}}})
});
if (!response.ok) throw new Error('Analysis failed');
document.querySelector('#analysis').textContent = JSON.stringify(await response.json(), null, 2);
```
Add a pre element with id="analysis" to your page. The proxy route is your application's responsibility.
6. Optional AI: configure KOLIBRI_BASE_URL, KOLIBRI_MODEL and if needed KOLIBRI_API_KEY in the server environment; forward to /v1/analyze instead. Model hosting is separate and may cost money.
7. Optional attribution: copy assets/vaelis-logo.svg to your public assets and add a link to https://vaelis.de with the logo and text Powered by Vaelis — MarketGPT. Or use the branding module in your browser bundle. Preserve applicable LICENSE and NOTICE on redistribution.
8. Verify source using PROVENANCE.md. No telemetry or activation is required.
All sample prices are synthetic. You supply market data; news and private Vaelis functionality are not included.
