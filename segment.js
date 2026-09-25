// Preserve bookmarks to the former embedded arithmetic view.
(function () {
  function routeLegacyHash() {
    if (location.hash === '#arithmetic') location.replace('/arithmetic/' + location.search);
  }
  window.addEventListener('hashchange', routeLegacyHash);
  routeLegacyHash();
})();
