import FactoryNote from '../js/factory/FactoryNote.js';

export default class NoteDao {
    constructor(connect) {
        this._connect = connect;
    }
    add(datas) {
        this._connect.add(datas)
            .then(id => {
                FactoryNote.buildNote(datas.title, id, true);
                this.inputDatas(id)
            })
            .catch(error => {
                console.log(error);
            });
    }

    listAll() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this._connect.listAll()
                    .then(datas => {
                        datas.forEach(data => {
                            FactoryNote.buildNote(data.title, data.id);
                        });
                        resolve(datas[0].id);
                    })
                    .catch(error => {
                        reject(error)
                    });
            }, 100);
        });
    }

    inputDatas(id) {
        this._connect.getDataById(id)
            .then(datas => {
                FactoryNote.contentCall(datas.id, datas.title, datas.content);
            })
            .catch(error => {
                console.log(error);
            });
    }
    update(id, datas) {
        this._connect.update(id, datas)
            .then(datas => {
                console.log("atualizado")
            })
            .catch(error => {
                console.log(error);
            });
    }
    remove(id) {
        this._connect.remove(id)
            .then(id => {
                console.log("removido")
            })
            .catch(error => {
                console.log(error);
            });
    }
}