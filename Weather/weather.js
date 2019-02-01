getDataByCity('Kyiv');
//Получает данные о погоде по названию города
function getDataByCity(city_name) {
	$.get(
					
		"http://api.openweathermap.org/data/2.5/forecast?",
		{
		"q": city_name,
		"appid": "cde82d792d9b572f4f231f6d603c32e2"
		},
			function(data){
				WeatherAtTheMoment(data);	
				WeatherForecast(data);
			}
	);
} 
//Получает данные о погоде по текущему местоположению
function getDataByCoord(latitude, longitude) {
	$.get(
					
		"http://api.openweathermap.org/data/2.5/forecast?",
		{
		"lat":latitude,
		"lon":longitude,
		"appid": "cde82d792d9b572f4f231f6d603c32e2"
		},
			function(data){
				WeatherAtTheMoment(data);
				WeatherForecast(data);	
			}
	);
}
//Получение даты в нормальном формате
function myDate(my_date){
	var day = my_date.substr(8,2);
	var month = my_date.substr(5,2);
	var year = my_date.substr(0,4);
	function TextMonth(month){
		switch(month){
			case '01': return 'January';
			case '02': return 'February';
			case '03': return 'March';
			case '04': return 'April';
			case '05': return 'May';
			case '06': return 'June';
			case '07': return 'July';
			case '08': return 'August';
			case '09': return 'September';
			case '10': return 'October';
			case '11': return 'November';
			case '12': return 'December';
		}
	}
	var norm_date = day+' '+TextMonth(month)+' '+year;
    return norm_date;
} 

//Выводит погоду на текущее время
function WeatherAtTheMoment(data) { 
	let outPicture = '<img src="img/'+data.list[0].weather[0].icon+'.png" width="200" height="200" alt="">';
	let outMainInfo = '';
	let outOtherInfo = '';
 
	outMainInfo += '<b>'+myDate(data.list[0].dt_txt)+' </b><br>';
	outMainInfo += '<b>'+Math.round(data.list[0].main.temp-273)+' &#176;C</b><br>';
	outMainInfo += '<b>'+data.city.name+'. '+data.list[0].weather[0].main+'</b><br>';
	

	outOtherInfo += '<b>Humidity: '+data.list[0].main.humidity+'%</b><br>';
	outOtherInfo += '<b>Pressure: '+Math.round(data.list[0].main.pressure*0.00750063755419211*100)+' mm Hg</b><br>';
	outOtherInfo += '<b>Wind speed: '+(data.list[0].wind.speed)+' m/s</b><br>';
    

    $('.picture').html(outPicture);
    $('.main_info').html(outMainInfo);
    $('.other_info').html(outOtherInfo);
    console.log(data);
}

//Выводит прогноз погоды на 5 дней (в процессе)
function WeatherForecast(data){ 
	var ArrDay = [], ArrNight = [];
	for(var i=1;i<40;i++){
		if((data.list[i].dt_txt[12])==='9'){
			ArrDay.push(data.list[i]);
		};
		if((data.list[i].dt_txt[12])==='1'){
			ArrNight.push(data.list[i]);
		};
	}
}

//Получение города при нажатии на Enter
$('.city-name').keypress(function(e) {
    if(e.which == 13) {
    	let city = $('.city-name').val();
    	field.value='';
        getDataByCity(city);
    }
});

field = document.querySelector('.city-name');	
//Получение города при нажатии на кнопку
$("button.city_btn").on('click', function(){
	let city = $('.city-name').val();
	field.value='';
	getDataByCity(city);
			
});

//Получение значения для поточных координат 
function geoFindMe() {
try{	
	if (!navigator.geolocation){
    	throw "Geolocation is not supported by your browser";
    	return;
	}		
	function success(position) {
    	var latitude  = position.coords.latitude;
    	var longitude = position.coords.longitude;
    	getDataByCoord(latitude, longitude);
	};
	navigator.geolocation.getCurrentPosition(success);
}catch (e) {
	alert(e);
}	  
}



//Firebase для авторизации
(function(){
	// Инициализация Firebase
  var config = {
    apiKey: "AIzaSyDUfDSc9NR2GZovAs_cpq4IqOpskQUbqxY",
    authDomain: "weatherapp-faa9d.firebaseapp.com",
    databaseURL: "https://weatherapp-faa9d.firebaseio.com",
    projectId: "weatherapp-faa9d",
    storageBucket: "weatherapp-faa9d.appspot.com",
    messagingSenderId: "139157902825"
  };
  firebase.initializeApp(config);

//Получение доступа к елементам
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const log_in = document.getElementById('log_in');
const log_out = document.getElementById('log_out');
const show_email = document.getElementById('show_email');
const auth_conteiner = document.getElementById('auth_conteiner');

//Вход в свой аккаунт
log_in.addEventListener('click', e => {
	auth_conteiner.classList.remove('hide');
});
btnLogin.addEventListener('click', e => {
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();
	// Sign in
	const promise = auth.signInWithEmailAndPassword(email,pass);
	promise.catch(e => console.log(e.message));
	auth_conteiner.classList.add('hide');
});

// Регистрация через почту и пароль
btnSignUp.addEventListener('click', e => {
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();
	
	const promise = auth.createUserWithEmailAndPassword(email,pass);
	promise
		.catch(e => console.log(e.message));
});

// Выход со своего аккаунта
log_out.addEventListener('click', e => {
	firebase.auth().signOut();
});

// add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		console.log(firebaseUser);
		console.log(firebaseUser.email);
		log_in.classList.add('hide');
		log_out.classList.remove('hide');
		show_email.classList.remove('hide');
		show_email.innerHTML = firebaseUser.email;
	}else{
		console.log('not logged in');
		log_out.classList.add('hide');
		show_email.classList.add('hide');
		log_in.classList.remove('hide');
	}
});  

}());
	
				