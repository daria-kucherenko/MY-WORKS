;
var section = document.querySelector('section');

//Получение информации с сервера
//Получение списка стран
getCountries();
function getCountries() {
  var requestCountriesURL = 'http://localhost:3000/countries';
  var requestCountries = new XMLHttpRequest();
  requestCountries.open('GET', requestCountriesURL);
  requestCountries.responseType = 'json';
  requestCountries.send();
  requestCountries.onload = function() {
	 var countries = requestCountries.response;
	 getStates(countries);
   showCountries(countries);
  }
}

//Получение списка областей
function getStates(countries) {
  var requestStatesURL = 'http://localhost:3000/states';
  var requestStates = new XMLHttpRequest();
  requestStates.open('GET', requestStatesURL);
  requestStates.responseType = 'json';
  requestStates.send();
	requestStates.onload = function() {
	 var states = requestStates.response;
	 getCities(states,countries);
   showStates(states);
	}
}  

//Получение списка городов
function getCities(states,countries){
  var requestCitiesURL = 'http://localhost:3000/cities';
  var requestCities = new XMLHttpRequest();
  requestCities.open('GET', requestCitiesURL);
  requestCities.responseType = 'json';
  requestCities.send();
	requestCities.onload = function() {
	 var cities = requestCities.response;
	 getUsers(cities,states,countries);
   showCities(cities);
	}
}

//Получение списка пользователей
function getUsers(cities,states,countries){
  var requestUsersURL = 'http://localhost:3000/users';
  var requestUsers = new XMLHttpRequest();
  requestUsers.open('GET', requestUsersURL);
  requestUsers.responseType = 'json';
  requestUsers.send();
	requestUsers.onload = function() {
	 var users = requestUsers.response;
	 showUsers(users,cities,states,countries);
	}
}

function showUsers(users,cities,states,countries) {  
  //Ничего не показывать, если пусто
	if(!users[0].name){
  		document.getElementById("list").style.display= "none";
	}
  //Вибор только зарегистрированных пользователей с именем
  var registeredUsers = [];
  for (var i = 0; i < users.length; i++) {
  	if(users[i].name){
  		registeredUsers.push(users[i]);
  	}
  }

  for (var l = 0; l < registeredUsers.length; l++) {

    var myArticle = document.createElement('article');
    var userName = document.createElement('h2');
    var userEmail = document.createElement('p');
    var phoneNumber = document.createElement('p');
    var countryStateCity = document.createElement('p');
    var creationDate = document.createElement('p');

    var date=new Date(registeredUsers[l].createdAt);
	  var dd = date.getDate();
	  var mm = date.getMonth() + 1;
	  var yy = date.getFullYear();

    for(var j=0; j < countries.length; j++){
      if((countries[j].id)==(registeredUsers[l].country_id)){
        var country = countries[j].name;
      }
    }

    for(var k=0; k < states.length; k++){
      if(((states[k].id)==(registeredUsers[l].state_id))&&((states[k].country_id)==(registeredUsers[l].country_id))){
        var state = states[k].name;
      }
    }

    for(var m=0; m < states.length; m++){
      if(((cities[m].id)==(registeredUsers[l].city_id))&&((cities[m].state_id)==(registeredUsers[l].state_id))){
       var city = cities[m].name;
      }
    }

    userName.textContent = registeredUsers[l].name;
    userEmail.textContent = 'Email: ' + registeredUsers[l].email;
    phoneNumber.textContent = 'Phone number: ' + registeredUsers[l].phone_number;
    countryStateCity.textContent = 'Country:'+ country +', state: ' + state + ', city: ' + city; 
    creationDate.textContent = 'Creation date: ' + dd +'.' + mm + '.' + yy;

    myArticle.appendChild(userName);
    myArticle.appendChild(userEmail);
    myArticle.appendChild(phoneNumber);
    myArticle.appendChild(countryStateCity);
    myArticle.appendChild(creationDate);

    section.appendChild(myArticle);
  }
}

//Показываем области
countries_conteiner.addEventListener('change', function () {
  states_conteiner.style.display = 'block';
})

//Показываем города
states_conteiner.addEventListener('change', function () {
  cities_conteiner.style.display = 'block';
})

//Формируем список стран в select
function showCountries(countries){
  var selectCountry = document.getElementById("country");
  for (var i in countries) {
    var option = document.createElement("option");
    option.setAttribute("value", countries[i].id);
    option.text = countries[i].name;
    selectCountry.appendChild(option);
  }
}

//Формируем список областей в select
function showStates(states){
  var selectState = document.getElementById("state");
  for (var i in states) {
    var option = document.createElement("option");
    option.setAttribute("value", states[i].id);
    option.text = states[i].name;
    selectState.appendChild(option);
  }
}

//Формируем список городов в select
function showCities(cities){
  var selectCity = document.getElementById("city");
  for (var i in cities) {
    var option = document.createElement("option");
    option.setAttribute("value", cities[i].id);
    option.text = cities[i].name;
    selectCity.appendChild(option);
  }
}


// Отправка формы на сервер

var form = document.getElementById('form');
form.onsubmit = function (e) {
  e.preventDefault();

  var data = {};
  for (var i = 0, ii = form.length; i < ii; ++i) {
    var input = form[i];
    if (input.name) {
      data[input.name] = input.value;
    }
    if (((input.name==="address")||(input.name==="about_me"))&&data[input.name]==='') {
      data[input.name] = null;
    }
  }

  var xhr = new XMLHttpRequest();
  requestUsersURL = 'http://localhost:3000/users';
  xhr.open('POST', requestUsersURL, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      console.log(xhr.response);
      }
  }

  xhr.send(JSON.stringify(data));
  form.reset();
  clearSection(section);
  getCountries();
}

function clearSection(element)
{   
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}