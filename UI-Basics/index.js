//all pages
//if there is no language selected, choose English by default

if (localStorage.getItem('language') == null) {
    localStorage.setItem('language', 'English');
}

if (localStorage.getItem('language') != null) {
    document.querySelector('.textBox').value = localStorage.getItem('language');
}
//when we click, dropdown is displayed and we can select from it
let menuDropdown = document.querySelector('.menuWrapper');
menuDropdown.onclick = function () {
    menuDropdown.classList.toggle('active');
}

function showLanguage(language) {
    document.querySelector('.textBox').value = language;
    localStorage.setItem('language', language);
}

let languageDropdown = document.querySelector('.languageWrapper');
languageDropdown.onclick = function () {
    languageDropdown.classList.toggle('active');
}

document.getElementById("year").innerHTML = new Date().getFullYear();

//blog
if (document.getElementById('blog')) {
    //get data from API
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
    //get data in table
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
    //style the data
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
}
// Test if they are in local storage after modifications //
/* 
var retrievedObject = localStorage.getItem('orderedArray');
console.log('retrievedObject: ', JSON.parse(retrievedObject));
*/

//quiz
else if (document.getElementById('quiz')) {
    //getting the table info from localStorage
    var retrievedObject = JSON.parse(localStorage.getItem('orderedArray'));
    let formBody = document.getElementById('dataFromBlog');
    //put elements from localStorage in 1st section of the form
    for (var i = 0; i < retrievedObject.length; i++) {
        let title = retrievedObject[i].title;
        var option = "";
        console.log()
        option += "<input type='radio' name='pick' id='" + i + "'value='" +
            title + "'/>" +
            title + "<br>";
        formBody.innerHTML += option;
    }
    //save all form data in an object
    let savedForm = {
        'radioboxChoice': '',
        'checkboxChoices': '',
        'selectChoice': '',
        'nameOfFile': '',
        'numberChoice': '',
        'inputText': '',
        'submitDate': '',
    };
    function saveData() {
        let radioboxChoice;
        let radiobox = document.getElementsByName('pick');
        for (let i = 0; i < radiobox.length; i++)
            if (radiobox[i].checked) radioboxChoice = radiobox[i].value;
        let checkboxChoices = [];
        let checkbox = document.getElementsByName('check');
        for (let i = 0; i < checkbox.length; i++)
            if (checkbox[i].checked) checkboxChoices.push(checkbox[i].value);
        let selectChoice;
        let select = document.getElementsByName('selects');
        for (let i = 0; i < select.length; i++)
            if (select[i].selected) selectChoice = select[i].value;
        let file = document.getElementById('pdfFile');
        if (file.files.length === 1) savedForm['nameOfFile'] = file.files.item(0).name;
        else savedForm['nameOfFile'] = 'No pdf file inserted';
        //put all data from form into an object
        savedForm['radioboxChoice'] = radioboxChoice;
        savedForm['checkboxChoices'] = checkboxChoices;
        savedForm['selectChoice'] = selectChoice;
        savedForm['numberChoice'] = document.getElementById('numberChoice').value;
        savedForm['inputText'] = document.getElementById('inputText').value.trim();
        savedForm['submitDate'] = new Date().getTime();
        localStorage.setItem('savedForm', JSON.stringify(savedForm));
        alert("Your form was submitted!!!");

    }
    //validation for form
    submitForm.addEventListener("click", function (e) {
        let numberChoice = document.getElementById('numberChoice').value;
        let inputText = document.getElementById('inputText').value.trim();
        if (inputText === "" || numberChoice === "") {
            e.preventDefault();
            alert("Text and number inputs MUST be inserted");
        }
        else saveData();
    })
}
//analytics
else if (document.getElementById('analytics')) {
    savedForm = JSON.parse(localStorage.getItem('savedForm'));
    //get an object with all data from Quiz
    let dateValue;
    //change date format to d/m/y time
    function changeDateFormat() {
        if (!savedForm) dateValue = null;
        else {
        dateValue = savedForm['submitDate'];
        dateValue = new Date(+dateValue);
        let minuteDate = dateValue.getMinutes();
        if (minuteDate < 10) minuteDate = "0" + minuteDate.toString();
        dateValue = dateValue.getDate().toString() + "/" + (dateValue.getMonth() + 1).toString() + "/" +
            dateValue.getFullYear().toString() + " " + dateValue.getHours().toString() + ":" + minuteDate;
        savedForm['submitDate'] = dateValue;
        }
    }
    //display data if there is data
    let displayData = '';
    let titleOfPage = document.getElementById("title");
    function showData() {
        titleOfPage.innerHTML = "<h1>Analytics</h1>";
        if (!savedForm) {
            dateValue = null;
            titleOfPage.innerHTML += "<h3>There is no data saved yet</h3>";
        }
        else {
            let dateIsFirst = { 'submitDate': null };
            savedForm = Object.assign(dateIsFirst, savedForm);
            changeDateFormat();
            for (let data in savedForm) {
                displayData += "<p>" + savedForm[data] + "</p>";
            }
            titleOfPage.innerHTML += "<button onclick='deleteData()'>Delete Data</button>"
            titleOfPage.innerHTML += "<div id='displayData'>" + displayData + "</div>"
        }

    }
    showData();
    //implement the delete button
    function deleteData() {
        let result = confirm("Data will be deleted! Do you want to continue?");
        if (result) {
            savedForm = null;
            showData();
            localStorage.removeItem('savedForm');
        }
    };

}
