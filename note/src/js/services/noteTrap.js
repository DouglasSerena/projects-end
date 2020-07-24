export default function noteTrap(functio) {
    const note = document.querySelectorAll("#note");
    note.forEach(element => {
        functio(element);
    });
}