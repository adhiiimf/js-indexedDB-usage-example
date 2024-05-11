window.addEventListener("DOMContentLoaded", function(){
    InitIndexedDB();
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
    }

    dbRequest.onupgradeneeded = (evt) => {
        const dbCache = evt.target.result;

        /**
         * Represents the object store for dataObj. I'm using ssn for keyPath for unique obj
         * @type {IDBObjectStore}
         */
        const objData = dbCache.createObjectStore("dataObj", { autoIncrement: true });

        objData.createIndex("id", "id", {unique: true});
        objData.createIndex("name", "name", {unique: false});
        objData.createIndex("desc", "desc", {unique: false});

        objData.transaction.oncomplete = (evt) => {
            const objDataStore = dbCache.transaction("dataObj", "readwrite").objectStore("dataObj");

            DataList.forEach((val) => {
                objDataStore.add(val);
            });
        }
        
    }
}