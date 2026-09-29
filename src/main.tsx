// Prevent third-party polyfills (e.g. cross-fetch, formdata-polyfill) from throwing
// "Cannot set property fetch of #<Window> which has only a getter" in browser sandboxes.
if (typeof window !== 'undefined') {
  try {
    if (window.FormData && !(window.FormData.prototype as any).keys) {
      (window.FormData.prototype as any).keys = function* () {
        const entries = this.entries ? this.entries() : [];
        for (const e of entries) yield e[0];
      };
    }
    const nativeFetch = window.fetch ? window.fetch.bind(window) : undefined;
    if (nativeFetch) {
      try {
        Object.defineProperty(window, 'fetch', {
          value: nativeFetch,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      } catch (e1) {
        try {
          Object.defineProperty(window, 'fetch', {
            get: () => nativeFetch,
            set: () => {},
            configurable: true,
            enumerable: true,
          });
        } catch (e2) {}
      }
    }
  } catch (err) {}
}

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
