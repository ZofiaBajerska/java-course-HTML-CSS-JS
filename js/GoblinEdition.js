window.onload = function () {
    loginBar();
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    fetchGoblin(id);
    fetchWeapons(id);
};

function fetchGoblin(id) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (qualifiedName, value) {

        let goblin = JSON.parse(this.responseText);
        document.getElementById("name").setAttribute("value", goblin.name);
        document.getElementById("age3").value = goblin.age;

    };
    xhttp.open("GET", "http://localhost:8080/api/goblins/" + id, true);
    xhttp.setRequestHeader("accept", "application/json");
    xhttp.send();
}

function fetchWeapons(id) {

    // alert(id)
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let weapons = JSON.parse(this.responseText);
            populateWeapons(weapons);
        }
    };
    xhttp.open("GET", "http://localhost:8080/api/goblins/" + id + "/weapons", true);
    xhttp.setRequestHeader("accept", "application/json");
    xhttp.send();
}

function populateWeapons(weapons) {
    let tbody = document.getElementById("weaponBody");

    for (let i in weapons) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);

        let tdName = document.createElement("td");
        let name = document.createTextNode(weapons[i].name);
        tdName.appendChild(name);
        tr.appendChild(tdName);


        let tdPower = document.createElement("td");
        let power = document.createTextNode(weapons[i].power);
        tdPower.appendChild(power);
        tr.appendChild(tdPower);


        let tdRemove = document.createElement("td");
        let rbutton = document.createElement("button");
        rbutton.appendChild(document.createTextNode("Remove"));
        tdRemove.appendChild(rbutton);
        tr.appendChild(tdRemove);
        (function (name, id) {
            rbutton.onclick = function () {
                removeWeapon(name, id);
            }
        })(weapons[i].name, weapons[i].id);
    }

}

