//get an object with all data from Quiz
let dateValue = localStorage.getItem('submitDate');
let radioValue = localStorage.getItem('radioboxChoice');
let checkboxValue = localStorage.getItem('checkboxChoices');
let selectValue = localStorage.getItem('selectChoice');
let fileValue = localStorage.getItem('nameOfFile');
let numberValue = localStorage.getItem('numberChoice');
let textValue = localStorage.getItem('inputText');

let analyticsData = {
    date: dateValue,
    radioboxChoice: radioValue,
    checkboxChoices: checkboxValue,
    selectChoice: selectValue,
    fileName: fileValue,
    numberChoice: numberValue,
    inputText: textValue,
};


function changeDateFormat() {
    if (isNull) dateValue = null;
    dateValue = +dateValue;
    dateValue = new Date(dateValue);
    let minuteDate = dateValue.getMinutes();
    if(minuteDate < 10) minuteDate = "0" + minuteDate.toString();
    dateValue = dateValue.getDate().toString() + "/" + (dateValue.getMonth() + 1).toString() + "/" +
        dateValue.getFullYear().toString() + " " + dateValue.getHours().toString() + ":" + minuteDate;
    analyticsData.date = dateValue;

}

let isNull = Object.values(analyticsData).every(value => {
    if (value == null) {
        return true;
    }
    return false; 
});

changeDateFormat();

let titleOfPage = document.getElementById("title");

function noData() {
    titleOfPage.innerHTML = "<h1>Analytics</h1>";
    

    if (isNull) {
        titleOfPage.innerHTML += "<h3>There is no data saved yet</h3>";
        
    }
    else {
        titleOfPage.innerHTML += "<button onclick='deleteData()'>Delete Data</button>"
        titleOfPage.innerHTML += "<div id='displayData'>" + displayData + "</div>"
    }
}


let displayData = "";
for (let data in analyticsData) {
    displayData += "<p>" + analyticsData[data] + "</p>";
}


noData();

function deleteData() {
    let result = confirm("Data will be deleted! Do you want to continue?");
    if (result) {
        displayData = "";
        noData();
        localStorage.removeItem('submitDate');
        localStorage.removeItem('radioboxChoice');
        localStorage.removeItem('checkboxChoices');
        localStorage.removeItem('selectChoice');
        localStorage.removeItem('nameOfFile');
        localStorage.removeItem('numberChoice');
        localStorage.removeItem('inputText');
        
        console.log(analyticsData);
    }
}

