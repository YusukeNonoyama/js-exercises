let dbName = "";

const btnListDB = document.querySelector("#btn-list-db")
const btnCreateDB = document.querySelector("#btn-create-db")
const inputCreateDB = document.querySelector("#input-create-db")
const btnDeleteDB = document.querySelector("#btn-delete-db")
const inputDeleteDB = document.querySelector("#input-delete-db")

const btnAddItem = document.querySelector("#btn-item-add")
const btnReadItems = document.querySelector("#btn-read-items")
const btnDeleteItem = document.querySelector("#btn-delete-item")
const inputAddItem = document.querySelector("#input-add-item")
const inputDeleteItem = document.querySelector("#input-delete-item")

btnListDB.addEventListener("click", () => {
    indexedDB.databases().then(dbs => {
        console.log("DB list:", dbs);
    });
});

btnCreateDB.addEventListener("click", () => {
    dbName = inputCreateDB.value.trim();
    console.log("DB name:", dbName);
    const request = indexedDB.open(dbName, 1);
    request.onerror = console.error;
    request.onsuccess = () => { }
    request.onupgradeneeded = () => {
        const db = request.result;
        const store = db.createObjectStore(dbName, { keyPath: "id", autoIncrement: true });
        store.createIndex("id", "text");
        console.log(`${dbName} created`);
    }
    inputCreateDB.value = "";
});


btnDeleteDB.addEventListener("click", () => {
    const deleteDB = inputDeleteDB.value.trim();
    const request = indexedDB.deleteDatabase(deleteDB);
    request.onsuccess = () => {
        console.log(`deleteDB: ${deleteDB}`);
        console.log("database is successfully deleted")
    }
    inputDeleteDB.value = "";
});

btnAddItem.addEventListener("click", () => {
    const newItem = inputAddItem.value.trim();
    const request = indexedDB.open(dbName, 1);
    request.onerror = console.error;
    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([dbName], "readwrite");
        const store = transaction.objectStore(dbName);
        store.add({ text: newItem });
        console.log("item added:", newItem);
    }
    inputAddItem.value = "";
});

btnReadItems.addEventListener("click", () => {
    const request = indexedDB.open(dbName, 1);
    request.onerror = console.error;
    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([dbName], "readwrite");
        const store = transaction.objectStore(dbName);
        const getRequest = store.getAll();
        getRequest.onsuccess = () => {
            console.log(`all items for: ${dbName}`, getRequest.result);
        }

        // console.log("objectStore: ", transaction.objectStore("myTestDB")).index("id");
    }
});

btnDeleteItem.addEventListener("click", () => {
    const deleteItem = inputDeleteItem.value.trim();
    const request = indexedDB.open(dbName, 1);
    request.onerror = console.error;
    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([dbName], "readwrite");
        const store = transaction.objectStore(dbName);
        store.delete(Number(deleteItem));
        console.log("item deleted: ", deleteItem);
    }
    inputDeleteItem.value = "";
});


