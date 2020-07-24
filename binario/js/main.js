const xor = (value, times) => {
    let values = [];
    for ( i = 0 ; i < times ; i++ ) {
        if ( value[i] == 1 ) {
            values.push(0);
        } else {
            values.push(1);
        }
    }
    return values;
}

const func = (oper, A, B, times) => {
    var values = [];
    switch ( oper ) {

        case '.':
            for ( i = 0 ; i < times ; i++ ) {
                if ( A[i] == 1 && B[i] == 1 ) {
                    values.push(1);
                } else {
                    values.push(0);
                }
            }
        return values;
        
        case '+':
            for ( i = 0 ; i < times ; i++ ) {
                if ( A[i] == 1 || B[i] == 1 ) {
                    values.push(1);
                } else {
                    values.push(0);
                }
            }
        return values;
    }
}

const calc = (form, countTwo = false, resultNegative = false) => {
    var A = [0,0,0,0,1,1,1,1];
    var B = [0,0,1,1,0,0,1,1];
    var C = [0,1,0,1,0,1,0,1];
    
    let xor1 = form.indexOf("!A");
    let xor2 = form.indexOf("!B");
    let xor3 = form.indexOf("!C");
    
    
    if (countTwo === true) {
        if (xor1 >= 0) B = xor(B, 8)
        if (xor2 >= 0) C = xor(C, 8)
    } else {
        if (xor1 >= 0) A = xor(A, 8)
        if (xor2 >= 0) B = xor(B, 8)
        if (xor3 >= 0) C = xor(C, 8)
    }
    
    var form2 = form.replace(/[!]/g, "");
    
    if ( countTwo === true) {
        A = B.slice(0,4);
        B = C.slice(0,4);
        
        let oper = form2.replace(/\w/g, "");

        var values = func(oper, A, B, 4);


        if (resultNegative === true) {
            return xor(values, 4);
        }

        return values;
    }

    let frist_oper = form2.indexOf(".");
    
    if (frist_oper > 0 && frist_oper < 2) {
        var frist = form2.substring(frist_oper - 1, frist_oper + 2);
        var last = form2.substring(frist_oper + 2, frist_oper + 3);
        
        frist = func(".", A, B, 8);
        var values = func(last, frist, C, 8);
    } else if (frist_oper > 2) {
        var frist = form2.substring(frist_oper - 1, frist_oper + 2);
        var last = form2.substring(frist_oper - 2, frist_oper - 1)
        
        frist = func(".", B, C, 8);
        var values = func(last, frist, A, 8);
    } else {
        let frist = func("+", A, B, 8);
        var values = func("+", frist, C, 8);
    }
    
    if (resultNegative === true) {
        return xor(values, 8);
    }
    return values;
}

/**
 * parameters one : form
 * parameters two : number form
 * parameters three : result negative
 */
function logic() {
    const $form = document.querySelector("#form");
    const $countTwo = document.querySelector("#countTwo");
    const $resultNegative = document.querySelector("#resultNegative");
    const $result = document.querySelector("#result");

    $result.value = calc($form.value, $countTwo.checked, $resultNegative.checked);
}
