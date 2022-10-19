async function getData() {
    return await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => json.filter(post => post.id >= 27 && post.id <= 32))
        .then(json => json.sort((a, b) => a.title < b.title ? -1 : 1))
        .then(json => {
            localStorage.setItem('orderedArray', JSON.stringify(json));
            return json
        })
}

var retrievedObject = localStorage.getItem('orderedArray');

var arrTd = document.getElementsByTagName("td");
var arrTr = document.getElementsByTagName("tr");

async function displayData() {
    let tbody = document.getElementById('tbody');
    let tableContent = await getData();
    tbody.innerHTML += "<th> Id </th> <th> Title </th> <th> Body </th>"
    for (var i = 0; i < tableContent.length; i++) {
        var tr = "<tr onmouseover='ChangeBgOnMouseover(this)' onmouseout='styleTableOdd(arrTr)'>";
        tr += "<td>" + tableContent[i].id + "</td>" + "<td>" + tableContent[i].title + "</td>" + "<td>" + tableContent[i].body + "</td>" + "</tr>";
        tbody.innerHTML += tr;

    }

    styleTableOdd(arrTr);
    styleTableBorder(arrTd);
}

let lastColor = [];
document.getElementById("tbody").style.border = "1px solid white";

function styleTableOdd(arrTr) {
    for (i = 1; i < arrTr.length; i++) {
        if (i % 2) {
            arrTr[i].style.backgroundColor = 'green';
            lastColor[i] = 'green';
        }
        else {
            arrTr[i].style.backgroundColor = 'grey';
            lastColor[i] = 'grey';
        }
    }
}

function styleTableBorder(arrTd) {
    for (i = 1; i < arrTd.length; i++)
        arrTd[i].style.border = "1px solid white";

}

function ChangeBgOnMouseover(x) {
    x.style.backgroundColor = 'red';
}

function ChangeBgOnMouseout(x) {
    x.style.backgroundColor = 'inherit';

}

displayData();


// Test if they are in local storage after modifications //
/* 
var retrievedObject = localStorage.getItem('orderedArray');
console.log('retrievedObject: ', JSON.parse(retrievedObject));
*/