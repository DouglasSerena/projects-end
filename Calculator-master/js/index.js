const button = document.querySelector("#button");
const input = document.querySelector("#input");
const result = document.querySelector("#result");

// touch

button.addEventListener("click", event => {
    if (event.target.value == '=') {
        color()
        calculate();
        input.value = "";
        input.value = result.value;
        result.value = 0;
        return;
    }
    input.value += event.target.value;
    calculate();
});

// reset / back

function back() {
    input.value = input.value.substring(0,(input.value.length - 1));
}

function reset() {
    input.value = "";
    result.value = 0;
}

// calcula

function calculate() {
    result.value = eval(input.value);
    if(result.value == "undefined") {
        result.value = 0;
    }
}

input.addEventListener("keypress", event => {
    if(event.charCode == 13) {
        calculate()
        setTimeout(() => {
            input.value = "";
            input.value = result.value;
            result.value = 0;
        }, 100);
    }
});
