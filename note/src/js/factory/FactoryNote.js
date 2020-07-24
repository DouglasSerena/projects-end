const notes = document.querySelector("#notes");

export default class FactoryNote {
    static contentCall(id, Datatitle, content) {
        let contentArea = document.querySelector("#contentArea");
        let keyCurrent = document.querySelector("#keyCurrent");
        let title = document.querySelector("#title");

        keyCurrent.value = id;
        title.value = Datatitle;
        contentArea.value = content;
    }
    static buildNote(title, id, checked = false) {
        let label = document.createElement("label");
        label.id = "note";
        label.for = "checked";

        let radio = document.createElement("input");
        radio.type = "radio";
        radio.id = "checked";
        radio.name = "note";
        if (checked) {
            radio.checked = true;
            label.classList.add("active")
        }

        let hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.id = "key";
        hidden.value = id

        let text = document.createElement("p");
        text.innerText = title;

        label.append(radio);
        label.append(hidden);
        label.append(text);
        notes.append(label);
    }
}