const $ = document.querySelector.bind(document);

function test() {
    let selectOne = $("#selectOne").value;
    let selectTwo = $("#selectTwo").value;

    let operations = {
        string(value) {
            if (value.indexOf("'") >= 0 || value.indexOf("\"") >= 0)
                return value;
            return `"${value}"`
        },
        number(value) {
            return Number(value.replace(/\D/g, ""));
        },
        bool(value) {
            if (value == "true")
                return true;
            else
                return false;
        },
        object(value) {
            let object = JSON.parse(value)
            let off = JSON.stringify(object);
            return off;
        },
        array(value) {
            let array = value.replace(/[\[\]\"\' ]/g, "").split(",");
            let off = JSON.stringify(array);
            return off;
        }
    }

    let valueOne = operations[selectOne]($("#valueOne").value);
    let valueTwo = operations[selectTwo]($("#valueTwo").value);

    t(valueOne)
    t(valueTwo)

    let operation = $("#operation").value;

    let verific = createFunctio(valueOne, operation, valueTwo)

    if (eval(`(${verific})()`)) {
        $("#result").classList.remove("false");
        $("#result").classList.add("true");
        $("#result").value = "true";
    } else {
        $("#result").classList.add("false");
        $("#result").classList.remove("true");
        $("#result").value = "false";
    }
    $("#function").innerHTML = verific;
};

function createFunctio(valueOne, operation, valueTwo) {
    let string =
        `function() {
        if (${valueOne} ${operation} ${valueTwo})
            return true;
        return false;
    }
    `
    return string;
}

function t(value) {
    console.log(typeof value);
    console.log(value);
}