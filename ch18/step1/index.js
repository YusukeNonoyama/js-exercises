// ローカルサーバーから表示情報データを全て読む
async function loadJson() {
  const res = await fetch("./data.json");
  const data = await res.json();
  return data;
}

// 時計のアップデート
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  document.getElementById(
    "clock",
  ).innerHTML = `${h}:${m}<span id="sub">:${s}</span>`;
}

// 情報のアップデート
function updateData(data) {
  const data_num = data.length;
  let data_id;
  do {
    data_id = Math.floor(Math.random() * data_num);
  } while (data_id === data_num);

  document.getElementById("saitama").textContent = data[data_id].value;
  document.getElementById("image").src = data[data_id].image;
}

async function main() {
  const data = await loadJson();

  console.log("Hello, Digital Clock!");

  setInterval(updateClock, 1000);
  setInterval(() => updateData(data), 5000);

  updateClock();
  updateData(data);
}

main();
