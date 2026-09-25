(function () {
  'use strict';
  const placement = document.querySelector('[data-site-ad]');
  // Arithmetic lessons can be embedded in the main editor. Only the host shows an ad.
  if (!placement || window.self !== window.top) return;

  const local = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  if (local) {
    placement.hidden = false;
    const preview = document.createElement('div');
    preview.className = 'site-ad-preview';
    preview.textContent = 'Ad placement preview';
    placement.append(preview);
    return; // Never request or click real ads during local development.
  }

  const config = window.NdebeAdsConfig || {};
  if (!config.enabled || !/^ca-pub-\d{16}$/.test(config.publisher) || !/^\d+$/.test(config.slot)) return;

  placement.hidden = false;
  const unit = document.createElement('ins');
  unit.className = 'adsbygoogle site-ad-unit';
  unit.dataset.adClient = config.publisher;
  unit.dataset.adSlot = config.slot;
  placement.append(unit);

  const loader = document.createElement('script');
  loader.async = true;
  loader.crossOrigin = 'anonymous';
  loader.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + config.publisher;
  loader.onerror = () => { placement.hidden = true; };
  document.head.append(loader);
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch {
    placement.hidden = true;
  }
  // Keep the reserved height for unfilled units to avoid moving nearby content.
}());
