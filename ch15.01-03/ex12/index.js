// 広告っぽいクラス名の要素を非表示にするブックマークレット
javascript: (function () {
  const adSelectors = [
    '[id*="ad"]',
    '[class*="tieup"]',
    '[id*="ad"]',
    '[class*="ad"]',
    '[id*="banner"]',
    '[class*="banner"]',
    '[id*="sponsor"]',
    '[class*="sponsor"]',
    'iframe[src*="ads"]',
  ];
  adSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.display = "none";
    });
  });
  alert("広告を非表示にしました。");
})();
