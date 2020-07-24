function color() {
    const body = document.querySelector("body");
    var random = () => Math.floor(Math.random()*(255 - 100) + 100);
    body.style.backgroundColor = `rgb(${random()}, ${random()}, ${random()})`
}
color()

target.addEventListener("click", () => {
    let calc = document.querySelector("#calc");
    let target = document.querySelector("#target");

    calc.classList.toggle("calcClose");
    target.classList.toggle("targetClose");
});

function RGB() {
    let onOff = document.querySelector("#RGB p span");
    document.querySelector("#RGB").classList.toggle("rgb");
    if(onOff.textContent == "Ligar") {
        onOff.textContent = "Delsigar"
        return;
    }
    onOff.textContent = "Ligar"
}