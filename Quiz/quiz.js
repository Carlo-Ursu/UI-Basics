//getting the table info from localStorage
var retrievedObject = JSON.parse(localStorage.getItem('orderedArray'));
let formBody = document.getElementById('dataFromBlog');

//put elements from localStorage in 1st section of the form
for (var i = 0; i < retrievedObject.length; i++) {
    let title = retrievedObject[i].title;
    var option = "";
    console.log()
    option += "<input type='radio' name='pick' id='" + i + "' onclick='onlyOneRadio(this)' value='" +
        title + "'/>" +
        title + "<br>";
    formBody.innerHTML += option;
}

function onlyOneRadio(radiobox) {
    var radios = document.getElementsByName('pick')
    radios.forEach((item) => {
        if (item !== radiobox) item.checked = false;
    })
}

function saveData() {
    let radioboxChoice;
    let radiobox = document.getElementsByName('pick');
    for (let i = 0; i < radiobox.length; i++)
        if (radiobox[i].checked) radioboxChoice = radiobox[i].value;
    localStorage.setItem('radioboxChoice', radioboxChoice);

    let checkboxChoices = [];
    let checkbox = document.getElementsByName('check');
    for (let i = 0; i < checkbox.length; i++)
        if (checkbox[i].checked) checkboxChoices.push(checkbox[i].value);
    localStorage.setItem('checkboxChoices', checkboxChoices);

    let selectChoice;
    let select = document.getElementsByName('selects');
    for (let i = 0; i < select.length; i++)
        if (select[i].selected) selectChoice = select[i].value;
    localStorage.setItem('selectChoice', selectChoice);


    let file = document.getElementById('pdfFile');
    if (file.files.length === 1) localStorage.setItem('nameOfFile', file.files.item(0).name);
    else localStorage.setItem('nameOfFile', undefined);

    let numberChoice = document.getElementById('numberChoice').value;
    localStorage.setItem('numberChoice', numberChoice);

    let inputText = document.getElementById('inputText').value.trim();
    localStorage.setItem('inputText', inputText);

    let date = new Date().getTime();
    localStorage.setItem('submitDate', date);

}








