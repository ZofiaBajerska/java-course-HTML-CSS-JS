window.onload = function () {
    loginBar();
};

function addGoblin() {
    let name = document.getElementById("name2").value;
    let age = document.getElementById("age2").value;
    age = parseInt(age);
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/api/goblins/", true);
    if (atob(window.localStorage.getItem('auth')) === ("admin:admin")) {
        xhttp.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
        xhttp.setRequestHeader("Content-type", "application/json");
        let goblin = {name: name, age: age};
        xhttp.send(JSON.stringify(goblin));
    } else {
        alert("You have to be logged as admin");
    }
    // location.replace("GoblinList.html");
    //window.location.href = "GoblinList.html";

}
