// index.html に対して以下の要素を CSS セレクタで指定して console.log に表示しなさい

// nav 要素内のリンク (<a>)
console.log("1. nav 要素内のリンク (<a>)");
const nav = document.querySelector("nav");
const a = nav.querySelectorAll("a");
console.log(a);
Array.from(a).forEach(elem => console.log(elem.href));

// 商品リスト (.product-list) 内の最初の商品 (.product-item)
console.log("2. 商品リスト (.product-list) 内の最初の商品 (.product-item)");
const productList = document.querySelector(".product-list");
const firstItem = productList.querySelector(".product-item");
console.log(firstItem);

// カートアイコンの画像 (<img>)
console.log("3. カートアイコンの画像 (<img>)");
const iconCart = document.querySelector(".cart");
const imgCart = iconCart.querySelector("img");
console.log(imgCart);

// 商品リスト (.product-list) 内の価格 (.price) を表示する要素
console.log("4. 商品リスト (.product-list) 内の価格 (.price) を表示する要素");
const price = productList.querySelector(".price");
console.log(price);

// 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
console.log("5. 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)");
const productItem = productList.querySelectorAll(".product-item");
Array.from(productItem).forEach(item => console.log(item.querySelector("img")));

// 検索バー (.search-bar) 内の検索ボタン (<button>)
console.log("6. 検索バー (.search-bar) 内の検索ボタン (<button>)");
const searchBar = document.querySelector(".search-bar");
const btn = searchBar.querySelector("button");
console.log(btn);

// フッター (footer) 内のパラグラフ (<p>) 要素
console.log("7. フッター (footer) 内のパラグラフ (<p>) 要素");
const footer = document.querySelector("footer");
const p = footer.querySelector("p");
console.log(p);

// 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
console.log("8. 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)");
Array.from(productItem).forEach((item, i) => i % 2 ? console.log(item) : null);

// ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
console.log("9. ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)");
const header = document.querySelector("header");
const account = document.querySelector(".account");
const img = account.querySelector("img");
console.log(img);

// ナビゲーションリンクのうち、"会社情報" のリンク
console.log("10. ナビゲーションリンクのうち、'会社情報' のリンク");
// const companyInfo = nav.querySelector("会社情報 ")
const a2 = nav.querySelectorAll("a");
Array.from(a2).forEach(a2 => a2.textContent === "会社情報" ? console.log(a2) : null);