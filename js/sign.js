
let elForm = document.querySelector(".sign__form");
let elLoginInput = document.querySelector(".sign__name");
let elPasswordInput = document.querySelector(".sign__password");
let elLogOut = document.querySelector(".logout");

let login = "raz raz"
let password = "gg"

elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    
    let formLogin = elLoginInput.value.trim();
    let formPassword = elPasswordInput.value.trim();

    if (checkIn(formLogin, formPassword)) {
        localStorage.setItem("token", "ok")
        window.location.href = "/index.html"
    } else {
        alert("ERROR")
    }
    elLoginInput.value = null;
    elPasswordInput.value = null;
})

function checkIn(loginV, passwordV) {
    if (loginV == login && passwordV == password) {
        return true
    } else {
       return false
    }
}

