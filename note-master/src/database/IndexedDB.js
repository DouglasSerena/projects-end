function deleteDatabase(dbname) {
    const request = indexedDB.deleteDatabase(dbname);
    request.onsuccess = event => console.log(`Deleted database successfully`);
    request.onerror = event => console.log(`Couldn't delete database`);
}

export default class IndexedDB {
    constructor(dbname, version, nameTable, commit = true) {
        this._connection;
        this._nameTable = nameTable;
        this._dbname = dbname;
        this._version = version;
        this._commit = commit

        const request = window.indexedDB.open(this._dbname, this._version);

        request.onupgradeneeded = event => {
            this._message(`Create dataBase.`);
            let myConnection = event.target.result;
            if (myConnection.objectStoreNames.contains(this._nameTable))
                myConnection.deleteObjectStore(this._nameTable);
            myConnection.createObjectStore(this._nameTable, { autoIncrement: true });
        };

        request.onsuccess = event => {
            this._message(`Success connection.`);
            this._connection = event.target.result;
        };

        request.onerror = event => {
            this._message(`Failed to connect`);
        };
    }

    add(datas) {
        return new Promise((resolve, reject) => {
            const store = this._createStore();
            const request = store.add(datas);
            request.onsuccess = event => {
                this._message(`Success in saving data in the base.`);
                resolve(event.target.result);
            }

            request.onerror = event =>
                reject(`Falied to save datas error > [ ${event.target.error} ]`);
        });
    }

    getDataById(id) {
        return new Promise((resolve, reject) => {
            const request = this._createStore().get(id)

            request.onsuccess = event => {
                let datas = event.target.result;
                datas.id = id;
                resolve(datas);
            }
            request.onerror = event => reject(`Falied to fetch data error > [ ${event.target.error} ]`);
        });
    }

    listAll() {
        return new Promise((resolve, reject) => {
            const cursor = this._createStore().openCursor();
            let datas = [];
            cursor.onsuccess = event => {
                let data = event.target.result;

                if (data) {
                    let dataCurrent = data.value
                    dataCurrent.id = data.key;
                    datas.push(dataCurrent)

                    data.continue();
                } else {
                    resolve(datas);
                }
            }
            cursor.onerror = event => {
                reject(`Falied to fetch datas error > [ ${event.target.error} ]`);
            };
        })

    }

    update(id, newDatas) {
        return new Promise((resolve, reject) => {
            const store = this._createStore();
            const request = store.get(id)

            request.onsuccess = event => {
                let datas = event.target.result;
                Object.keys(newDatas).forEach(key => {
                    if (datas[key])
                        datas[key] = newDatas[key];
                    else {
                        reject(`Falid to update datas.`);
                    }
                })
                let requestUpdate = store.put(datas, id);
                requestUpdate.onsuccess = event => {
                    datas.id = id;
                    resolve(datas);
                    requestUpdate.onerror = event => reject(`Falied to fetch data error > [ ${event.target.error} ]`);
                }
            }

            request.onerror = event => reject(`Falied to fetch data error > [ ${event.target.error} ]`);
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            const request = this._createStore().delete(id);
            request.onsuccess = event => resolve(id);
            request.onerror = event => reject(`Falied to save datas error > [ ${event.target.error} ]`);
        });
    }

    _message(message) {
        this._commit ? console.log(message) : false;
    }

    _createStore() {
        return this._connection
            .transaction([this._nameTable], 'readwrite')
            .objectStore(this._nameTable);
    }
}