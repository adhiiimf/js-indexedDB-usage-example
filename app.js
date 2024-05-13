window.addEventListener("DOMContentLoaded", function(){
    InitIndexedDB();
    InitInputHandler();
})

function InitIndexedDB() {

    const DataList = [
        { id: "111-111", name: "Adhi", role: 1, desc: "Administrator" },
        { id: "222-222", name: "Fahmi", role: 0, desc: "Guest" },
    ];

    const DBNAME = "ADHIDB_V1";
    const dbRequest = indexedDB.open(DBNAME, 1);

    dbRequest.onerror = (evt) => {
        // ERROR HANDLERS
        throw evt;
    }

    dbRequest.onupgradeneeded = (evt) => {
        const dbCache = evt.target.result;

        /**
         * Represents the object store for dataObj. I'm using ssn for keyPath for unique obj
         * @type {IDBObjectStore}
         */
        const objData = dbCache.createObjectStore("dataObj");

        objData.createIndex("id", "id", {unique: true});
        objData.createIndex("name", "name", {unique: false});
        objData.createIndex("desc", "desc", {unique: false});        
    }

    dbRequest.onsuccess = () => {

    }
}

function AddItem(key, val) {
    const DBNAME = "ADHIDB_V1";
    const dbRequest = indexedDB.open(DBNAME, 1);

    let db;

    dbRequest.onsuccess = (evt) => {
        db = evt.target.result;
        
        const transaction = db.transaction('dataObj', 'readwrite');
        const objectStore = transaction.objectStore('dataObj');
        const request = objectStore.put(val, key);

        request.onsuccess = ()=> {
            console.log(`New data added, data: ${request.result}`);
            console.log(objectStore.get(key));
            // alert(request.result);
        }
    
        request.onerror = (err)=> {
            console.error(`Error to add new data: ${err}`)
        }
    }

}

function GetItem(key) {
    const DBNAME = "ADHIDB_V1";
    const dbRequest = indexedDB.open(DBNAME, 1);
    let db;

    dbRequest.onsuccess = (evt) => {
        db = evt.target.result;
        
        const transaction = db.transaction('dataObj', 'readwrite');
        const objectStore = transaction.objectStore('dataObj');
        const request = objectStore.get(key);

        request.onsuccess = ()=> {
            console.log('request.result', request.result);
            return request.result;
        }
    
        request.onerror = (err)=> {
            console.error(`Error to get data: ${err}`)
        }
    }
}

function InitInputHandler() {
    let submitBtn = document.getElementById("submit");
    let keyInput = document.getElementById("key");
    let valueInput = document.getElementById("value");

    submitBtn.addEventListener("click", function(){
        AddItem(keyInput.value, valueInput.value);
    })
}