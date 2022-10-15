
if(localStorage.getItem('language') == null) {
    localStorage.setItem('language','English');
}

if (localStorage.getItem('language') != null) {
    document.querySelector('.textBox').value = localStorage.getItem('language');
}
 

function showLanguage(language) {
    document.querySelector('.textBox').value = language;
    localStorage.setItem('language',language);
}

let languageDropdown = document.querySelector('.languageWrapper');
languageDropdown.onclick = function() {
    languageDropdown.classList.toggle('active');
}