// 秒針を DOM に追加
(function setupClockHands() {
  // DOM から秒針を追加する要素を取得
  let handsGroup = document.querySelector("#clock .hands");

  // 秒針の SVG 要素を作成
  const svgNS = "http://www.w3.org/2000/svg";
  let sechand = document.createElementNS(svgNS, "line");

  // 秒針要素の属性を追加
  sechand.setAttribute("class", "secondhand");
  sechand.setAttribute("x1", "50");
  sechand.setAttribute("y1", "50");
  sechand.setAttribute("x2", "50");
  sechand.setAttribute("y2", "13");

  // 秒針要素を DOM に追加
  handsGroup.parentElement.appendChild(sechand);
})();

(function updateClock() {
  let now = new Date();
  let sec = now.getSeconds();
  let min = now.getMinutes() + sec / 60;
  let hour = (now.getHours() % 12) + min / 60;
  let secangle = sec * 6; // 秒針の角度計算
  let minangle = min * 6;
  let hourangle = hour * 30;
  let sechand = document.querySelector("#clock .secondhand"); // 秒針要素を変数に代入
  let minhand = document.querySelector("#clock .minutehand");
  let hourhand = document.querySelector("#clock .hourhand");
  sechand.setAttribute("transform", `rotate(${secangle},50,50)`); // 秒針要素の属性を設定し回転させる
  minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
  hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);
  setTimeout(updateClock, 1000);
})();
