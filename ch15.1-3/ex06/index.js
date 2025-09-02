console.log(globalThis.navigator);
console.log(Object.getOwnPropertyDescriptors(globalThis.navigator));

const table = document.createElement('table');
table.border = '1';
document.getElementById('testId').appendChild(table);

// // Loop through the data array

const c = [
    ["決済日", new Date()],
    ["あなたのOS", globalThis.navigator.platform],
    // ["あなたの場所", globalThis.navigator.geolocation.getCurrentPosition(() => { })],
    ["あなたの言語", globalThis.navigator.language],
    ["あなたのブラウザ", globalThis.navigator.appCodeName],
    ["あなたのアプリバージョン", globalThis.navigator.appVersion],
    // ["あなたのシリアル", globalThis.navigator.serial.getPorts()],
];

for (const arr of c) {
    const row = document.createElement('tr');
    table.appendChild(row);
    for (const item of arr) {
        const col = document.createElement('td');
        col.textContent = item;
        row.appendChild(col);
    }
}



// a.forEach((rowData, rowIndex) => {
//     const row = document.createElement('tr');

//     rowData.forEach(cellData => {
//         const cell = document.createElement(rowIndex === 0 ? 'th' : 'td');
//         cell.textContent = cellData;
//         row.appendChild(cell);
//     });

//     table.appendChild(row);
// });

// // Append the table to the container div
// document.getElementById('table-container').appendChild(table);

// let elem = document.getElementById("testId")
// elem.textContent = "platform: " + globalThis.navigator.platform;