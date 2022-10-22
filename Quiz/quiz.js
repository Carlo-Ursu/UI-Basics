//getting the table info from localStorage
var retrievedObject = JSON.parse(localStorage.getItem('orderedArray'));
let formBody = document.getElementById('dataFromBlog');

//put elements from localStorage in 1st section of the form
for (var i = 0; i < retrievedObject.length; i++) {
    let title = retrievedObject[i].title;
    var option = "";
    console.log()
    option += "<input type='radio' id='" + i + "' onclick='toggleCheck(" + i + ")' value='" +
        title + "'>" +
        title + "<br>";
    formBody.innerHTML += option;
}


let checkbox = document.getElementById("checkbox");
let selectId = document.getElementById("selectId");
let dataFromBlog = document.getElementById("dataFromBlog");
let pdfFile = document.getElementById("pdfFile");
let numberChoice = document.getElementById("numberChoice");
let inputText = document.getElementById("inputText");


/*function saveData() {
    alert(inputText.value);
    alert(selectId.value);
    alert(dataFromBlog.value);
    alert(pdfFile.value);
    alert(numberChoice.value);
    alert(inputText.value);
}*/

function toggleCheck(x) {
    let toggleButton = document.getElementById(x);
    toggleButton.checked = true;
    if (toggleButton.checked = true) toggleButton.checked = false;
    console.log(toggleButton.checked);
}

