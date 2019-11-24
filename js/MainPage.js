window.onload = function () {
    loginBar();
};

function loginBar() {

    if (localStorage.getItem("auth") != null){
        let auth = atob(window.localStorage.getItem("auth"));
        document.getElementById("login").className = "hidden";
        document.getElementById("logout").className = "visible";
        //alert(atob(auth));
        document.getElementById("zalogowany").innerText = auth.split(':')[0];
    }
    else
    {
        document.getElementById("login").className = "visible";
        document.getElementById("logout").className = "hidden";
    }
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        let auth = btoa(username + ":" + password);
        window.localStorage.setItem('auth', auth);
    };
    xhttp.open("POST", "http://localhost:8080/api/goblins/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function logout() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        window.localStorage.removeItem('auth');
    };
    xhttp.open("POST", "http://localhost:8080/api/goblins/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}