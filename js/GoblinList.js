window.onload = function () {
    loginBar();
    fetchGoblins();
};

function fetchGoblins() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        // alert(this.readyState +"" +this.status)
        if (this.readyState === 4 && this.status === 200) {
            let goblins = JSON.parse(this.responseText);
            populateGoblins(goblins);
        }
    };
    xhttp.open("GET", "http://localhost:8080/api/goblins", true);
    xhttp.setRequestHeader("accept", "application/json");
    xhttp.send();
}

function populateGoblins(goblins) {
    let tbody = document.getElementById("goblinsBody");

    for (let i in goblins) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);

        let tdName = document.createElement("td");
        let name = document.createTextNode(goblins[i].name);
        tdName.appendChild(name);
        tr.appendChild(tdName);


        let tdAge = document.createElement("td");
        let age = document.createTextNode(goblins[i].age);
        tdAge.appendChild(age);
        tr.appendChild(tdAge);


        let tdEdit = document.createElement("td");
        let ebutton = document.createElement("button");
        ebutton.appendChild(document.createTextNode("Edit"));
        tdEdit.appendChild(ebutton);
        tr.appendChild(tdEdit);
        (function (name, id) {
            ebutton.onclick = function () {
                editGoblin(name, id);
            }
        })(goblins[i].name, goblins[i].id);

        let tdDelete = document.createElement("td");
        let tbutton = document.createElement("button");
        tbutton.appendChild(document.createTextNode("Delete"));
        tdDelete.appendChild(tbutton);
        tr.appendChild(tdDelete);
        (function (name, id) {
            tbutton.onclick = function () {
                deleteGoblin(name, id);
            }
        })(goblins[i].name, goblins[i].id);
    }

}

function editGoblin(name, id) {
    window.location.href = "GoblinEdition.html?id=" + id;
}


function deleteGoblin(name, id) {
    alert(name);
    alert(id);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            clearGoblins();
            fetchGoblins();
            alert("cos");
        }
    };
    xhttp.open("DELETE", "http://localhost:8080/api/goblins/" + id, true);
    if (atob(window.localStorage.getItem('auth')) === ("admin:admin")) {
        xhttp.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
        xhttp.send();
    } else {
        alert("You have to be logged as admin");
    }
}
function clearGoblins() {
    let tbody = document.getElementById("goblinsBody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}