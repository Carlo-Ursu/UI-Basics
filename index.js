
if(localStorage.getItem('language') == null) {
    localStorage.setItem('language','English');
}

if (localStorage.getItem('language') != null) {
    document.querySelector('.textBox').value = localStorage.getItem('language');
}
 
let menuDropdown = document.querySelector('.menuWrapper');
menuDropdown.onclick = function() {
    menuDropdown.classList.toggle('active');
}

function showLanguage(language) {
    document.querySelector('.textBox').value = language;
    localStorage.setItem('language',language);
}

let languageDropdown = document.querySelector('.languageWrapper');
languageDropdown.onclick = function() {
    languageDropdown.classList.toggle('active');
}

document.getElementById("year").innerHTML = new Date().getFullYear();
