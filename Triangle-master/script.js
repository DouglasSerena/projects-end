const content = document.querySelector("#content");
const message = document.querySelector("#message");
const result = document.querySelector("#result");
const triangle = document.querySelector("#triangle");

content.addEventListener("input", event => {
    let left = Number(document.querySelector("#sideLeft").value);
    let right = Number(document.querySelector("#sideRight").value);
    let baseElement = document.querySelector("#base");
    let base = baseElement.value

    if ( left == 0 || right == 0 || base == 0 ) {
        result.style.color = "gray";
        triangle.style.borderColor = "rgba(0,0,0,0) rgba(0,0,0,0) lightgray rgba(0,0,0,0)";

        result.textContent = "Resultado";
        return;
    }
    if ( left <= 75 && right <= 75 && base <= 75 ) {
        message.textContent = "";
        build(left, base, right);
    } else {
        triangle.style.border = "none";
        message.textContent = "Valor não suportado";
    }
    result.textContent = valid(left, base, right);
});

function valid(valor1, valor2, valor3) {
    if( valor1 == valor2 || valor1 == valor3 || valor2 == valor3 ) {
        if ( valor1 == valor2 && valor1 == valor3 && valor2 == valor3 ) {
            triangle.style.borderColor = "rgba(0,0,0,0) rgba(0,0,0,0) red rgba(0,0,0,0)";

            result.style.color = "red";

            return "Equilátero";
        } else {
            triangle.style.borderColor = "rgba(0,0,0,0) rgba(0,0,0,0) blue rgba(0,0,0,0)";

            result.style.color = "blue";

            return "Isósceles";
        }
    } else {
        triangle.style.borderColor = "rgba(0,0,0,0) rgba(0,0,0,0) green rgba(0,0,0,0)";

        result.style.color = "green";

        return "Escaleno";
    }
}

function build(left, base , right) {
    if ( left != base/2 && right != base/2) {
        // c²+c²=H²
        let height1 = Math.sqrt(left*left-(base/2)*(base/2));
        let height2 = Math.sqrt(right*right-(base/2)*(base/2));

        let height = (height1+height2)/2;
        
        // altura
        triangle.style.borderBottom = `${height}mm solid`;
    } else {
        triangle.style.borderBottom = `${base/2}mm solid`;
    }
    let leftPercent = left*100/(left+right);
    let rightPercent = 100-leftPercent;

    // base esquerda
    triangle.style.borderLeft = `${leftPercent/100*base}mm solid`;

    // base direita
    triangle.style.borderRight = `${rightPercent/100*base}mm solid`;
}
