import IndexedDB from '../database/IndexedDB.js';
import NoteDao from '../database/NoteDao.js';
import noteTrap from './services/noteTrap.js';

const connect = new IndexedDB("Notes", 1, "notes");

window.addEventListener("load", () => {
    const noteDao = new NoteDao(connect);

    const primary = document.querySelector("#primary")
    const secondary = document.querySelector("#secondary")
    const back = document.querySelector("#back");

    const firstTitle = document.querySelector("#firstTitle");
    const add = document.querySelector("#add");
    const notes = document.querySelector("#notes");
    const remove = document.querySelector("#remove");
    const contentArea = document.querySelector("#contentArea");
    const title = document.querySelector("#title");

    noteDao.listAll()
        .then(id => {
            notes.querySelector("#note #checked").checked = true
            noteDao.inputDatas(id)
        })

    add.addEventListener("click", () => {
        if (firstTitle.value.length < 4)
            return console.log("muito curto")

        const datas = {
            title: firstTitle.value,
            content: " ",
            data_create: new Date()
        }
        noteDao.add(datas);

        animation(false);
        noteTrap((element) => {
            element.classList.remove("active");
        })

        firstTitle.value = "";
    });

    remove.addEventListener("click", removeNote);
    back.addEventListener("click", backWindows);

    function removeNote(event) {
        if (confirm("Você tem serteza?")) {
            const parent = event.target.parentNode;
            const id = Number(parent.querySelector("#keyCurrent").value)

            noteDao.remove(id);
            noteTrap((element) => {
                const key = element.querySelector("#key").value;
                if (key == id)
                    element.remove();
            })

            title.value = "",
                contentArea.value = "";

            const note = document.querySelector("#note");
            if (note) {
                note.querySelector("#checked").checked = true
                noteDao.inputDatas(Number(note.querySelector("#key").value));
            }

            backWindows();
        }
    }

    // mobile
    function backWindows() {
        primary.classList.remove("left")
        secondary.classList.remove("left")
    }

    notes.addEventListener("click", animation);

    function animation(event) {
        primary.classList.add("left")
        secondary.classList.add("left")
        if (event) {
            noteTrap((element) => {
                element.classList.remove("active");
                let checked = element.querySelector("#checked");
                if (checked.checked == true)
                    checked.parentNode.classList.add("active");
            })
            const id = Number(event.target.parentNode.querySelector("#key").value)
            noteDao.inputDatas(id);
        }
    }



    contentArea.addEventListener("input", () => {
        let value = contentArea.value
        if (value.length > 0) {
            let key = Number(document.querySelector("#keyCurrent").value);
            let data = {
                content: value
            }
            noteDao.update(key, data)
        }
    });

    title.addEventListener("input", () => {
        let value = title.value
        if (value.length > 4) {
            let id = Number(document.querySelector("#keyCurrent").value);
            let data = {
                title: value
            }
            noteDao.update(id, data)
            noteTrap((element) => {
                const key = element.querySelector("#key").value;
                if (key == id) {
                    const frist = element.querySelector("p");
                    frist.innerText = value;
                }
            })
        }
    });
})
