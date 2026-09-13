/* Typing | Arithmetic segmented control.
   The arithmetic guide (math/) loads inside the white panel; its own
   header and footer are hidden there because the homepage has its own. */
(function () {
  var frame = document.getElementById('math-frame');
  var EMBED_CSS =
    '.topbar,.footer{display:none!important}' +
    '.hero{padding:14px 16px 16px}.hero h1{font-size:1.5rem}' +
    '.hero .nd-big{font-size:2.2rem;margin:8px 0 2px}' +
    'main{padding-top:14px}';

  function embed() {
    try {
      var d = frame.contentDocument;
      if (!d || !d.head) return;
      if (!d.getElementById('embed-style')) {
        var s = d.createElement('style');
        s.id = 'embed-style';
        s.textContent = EMBED_CSS;
        d.head.appendChild(s);
      }
    } catch (e) { /* cross-origin: leave the page as is */ }
  }
  frame.addEventListener('load', embed);

  function setView(view, updateHash) {
    document.querySelectorAll('.segment .seg').forEach(function (b) {
      var on = b.getAttribute('data-view') === view;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.getElementById('view-typing').hidden = view !== 'typing';
    document.getElementById('view-arithmetic').hidden = view !== 'arithmetic';
    if (view === 'arithmetic' && !frame.getAttribute('src')) {
      frame.setAttribute('src', frame.getAttribute('data-src'));
    }
    if (updateHash !== false) {
      history.replaceState(null, '', view === 'arithmetic' ? '#arithmetic' : location.pathname + location.search);
    }
  }

  document.querySelectorAll('.segment .seg').forEach(function (b) {
    b.addEventListener('click', function () { setView(b.getAttribute('data-view')); });
  });

  if (location.hash === '#arithmetic') setView('arithmetic', false);
})();
