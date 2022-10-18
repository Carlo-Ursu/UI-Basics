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

async function displayData() {
    let tbody = document.getElementById('tbody');
    let tableContent = await getData();
    console.log(tableContent);
    tbody.innerHTML = "<th> Id </th> <th> Title </th> <th> Body </th>"
    for (var i = 0; i < tableContent.length; i++) {
        var tr = "<tr>";

        tr += "<td>" + tableContent[i].id + "</td>" + "<td>" + tableContent[i].title + "</td>" + "<td>" + tableContent[i].body + "</td>" + "</tr>";

        tbody.innerHTML += tr;
    }
}
displayData();

// Test if they are in local storage after modifications //
/* 
var retrievedObject = localStorage.getItem('orderedArray');
console.log('retrievedObject: ', JSON.parse(retrievedObject));
*/