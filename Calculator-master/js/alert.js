var alert = document.querySelector("#name");

// name();

function name() {
    var name = prompt("Digite seu nome a baixo. (max 15)");

    if(name == null || name.length == 0 || name.length > 15) {
        alert.innerText = " Sem Nome !!!"
    }else {
        alert.innerText = " "+name+"!!!";
    }
}

function editName() {
    console.log("Oi")
    var name = prompt("Digite seu nome a baixo. (max 15)");

    if(!name == null || !name.length == 0 || !name.length > 15) {
        alert.innerText = " "+name+"!!!";
    }
}