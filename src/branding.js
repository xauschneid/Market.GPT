// SPDX-License-Identifier: Apache-2.0
// Optional attribution widget; no network requests or tracking.
export function mountBranding(element) {
 if (!element?.ownerDocument) throw new TypeError('DOM element required');
 const doc=element.ownerDocument;
 const link=doc.createElement('a');
 link.href='https://vaelis.de';
 link.textContent='Powered by Vaelis · MarketGPT';
 link.setAttribute('aria-label','MarketGPT by Vaelis');
 link.style.cssText='display:inline-flex;align-items:center;gap:8px;color:inherit;font:inherit;text-decoration:none';
 const image=doc.createElement('img');
 image.src=new URL('../assets/vaelis-logo.svg',import.meta.url).href;
 image.alt='';image.width=24;image.height=24;
 link.prepend(image);element.append(link);return link;
}
