var numero = document.querySelector('#numero');
var resultante = document.querySelector('#resultante');
var valorConv = document.querySelector('#valor1');
var Resultado1 = document.querySelector('#Resultado1')

function Converter() {
    if (valorConv.value.length != 0) {
        var resultado = parseInt( valorConv.value, numero.value ).toString( resultante.value );
        Resultado1.value = resultado.toUpperCase();
    }
}

var formato = document.querySelector('#formato');
var operacao = document.querySelector('#operacao');
var Resultado2 = document.querySelector('#Resultado2');
var valorA = document.querySelector('#valor2');
var valorB = document.querySelector('#valor3');
var sinal = document.querySelector('#sinal')
var num;
var read;

function Operacao() {
    if (valorA.value.length != 0 && valorB.value.length != 0) {
        var valor1 = Number(parseInt( valorA.value, formato.value ).toString( 10 ));
        var valor2 = Number(parseInt( valorB.value, formato.value ).toString( 10 ));
        if (operacao.value == '1') {
            var resultado = valor1+valor2;
        }else if (operacao.value == '2') {
            var resultado = valor1/valor2;
        }else if (operacao.value == '3') {
            var resultado = valor1-valor2;
        }else if (operacao.value == '4') {
            var resultado = valor1*valor2;
        }
        var resultado = parseInt(resultado, 10 ).toString( formato.value );
        valorConv.value = resultado.toUpperCase();
        Resultado2.value = resultado.toUpperCase();
        Converter();
    }
}