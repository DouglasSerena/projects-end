function valid(event) {
    let error = document.querySelector("#error")
    if (event.charCode == 13) {
        color()
        return;
    }
    if(event.charCode < 42 || event.charCode > 58 || event.charCode == 44) {
        error.classList.toggle("error");
        setTimeout(() => {
            error.classList.toggle("error");
        }, 500)
        return false;
    }
};