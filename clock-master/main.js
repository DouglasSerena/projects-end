let dates = document.querySelector("#date");
let YIS = new Date();
dates.textContent = YIS.getDate() + "/" + YIS.getMonth() + "/" + YIS.getFullYear();

function rotate() {
    let date = new Date();
    // hours
    let hours = ""+date.getHours();
    clock(1, 2, hours);
    // minutes
    let minutes = ""+date.getMinutes();
    clock(4, 5, minutes);
    // seconds
    let seconds = ""+date.getSeconds();
    clock(7, 8, seconds);
}

rotate();

setInterval(rotate, 1000);


function clock(one, two, time) {
    let timesOne = document.querySelector(`#panel div:nth-child(${one})`);
    let timesTwo = document.querySelector(`#panel div:nth-child(${two})`);

    if (time.length < 2) {
        timeOne = 0;
        timeTwo = time;

        timesOne.textContent = timeOne;
        timesTwo.textContent = timeTwo;
        
        return;
    }

    timeOne = time.substring(0, 1);
    timeTwo = time.substring(1, 2);

    timesOne.textContent = timeOne;
    timesTwo.textContent = timeTwo;
}
