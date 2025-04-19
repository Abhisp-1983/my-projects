let countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
let container = document.querySelector(".container");
let selectBtn = container.querySelector(".select-option");
let dropdownlist = container.querySelector(".list-search-container");
let searchInput = container.querySelector("#search");
let list = dropdownlist.querySelector(".list");

selectBtn.addEventListener("click", () => {
  container.classList.toggle("active")
});

function addCountry(selectedCountry) {
  list.innerHTML = "";
  countries.forEach((country) => {
    let isSelected = selectedCountry == country ? "selected" : "";
    let listItem = '<li class="'+ isSelected +'">' + country + '</li>';
    list.insertAdjacentHTML("beforeend", listItem);
  })
  addClickEventToLi();
}

addCountry();

function addClickEventToLi() {
    list.querySelectorAll("li").forEach((listitem) => {
    listitem.addEventListener("click", () => {
        updateSelectCountry(listitem);
    })
    })
}

function updateSelectCountry(listItem) {
    searchInput.value = "";
    selectBtn.firstElementChild.innerHTML = listItem.innerHTML;
    container.classList.remove("active");
    addCountry(listItem.innerHTML);
}

searchInput.addEventListener("keyup", () => {
    let searchInputValue = searchInput.value.toLowerCase();
    let filteredCountries = countries.filter((country) => {
        return country.toLowerCase().startsWith(searchInputValue);
    }).map((country) => {
        let listItem = '<li>' + country + '</li>';
        return listItem;
    }).join("");
    list.innerHTML = filteredCountries;
    addClickEventToLi();
})