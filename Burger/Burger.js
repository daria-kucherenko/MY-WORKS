// HAMBURGER. Дать возможность менять размер, начинку и топинги бургера в форме
// При нажатии на кнопку "Заказать" СОЗДАТЬ БУРГЕР (получить и вывести цену/каллории)

//РЕШЕНИЕ!!!

//конструктор 
function Hamburger(size, stuffing) {
    this._size = size;
    this._stuffing = stuffing;
    this._toppings = [];
}

// Размеры, виды начинок и добавок
Hamburger.SIZE_SMALL = {
    price: 50,
    kk: 20
};
Hamburger.SIZE_LARGE = {
    price: 100,
    kk: 40
};
Hamburger.STUFFING_CHEESE = {
    price: 10,
    kk: 20
};
Hamburger.STUFFING_SALAD = {
    price: 20,
    kk: 5
};
Hamburger.STUFFING_POTATO = {
    price: 15,
    kk: 10
};
Hamburger.TOPPING_MAYO = {
    price: 20,
    kk: 5
};
Hamburger.TOPPING_SPICE = {
    price: 15,
    kk: 0
};

//добавление топпинга
Hamburger.prototype.addTopping = function (topping) {
    for (var i = 0; i < this._toppings.length; i++) {
        if (this._toppings[i] === topping) {
            console.log('Такой топпинг уже есть');
            return;
        }
    }
    this._toppings.push(topping);
    console.log('Добавлен топинг');
    return topping;
}

// узнать цену гамбургера
Hamburger.prototype.calculatePrice = function () {
    var price = this._size.price + this._stuffing.price;
    for (var i = 0; i < this._toppings.length; i++) {
        price += this._toppings[i].price;
    }
    return price;
}

// узнать калорийность гамбургера 
Hamburger.prototype.calculateCalories = function () {
    var kk = this._size.kk + this._stuffing.kk;
    for (var i = 0; i < this._toppings.length; i++) {
        kk += this._toppings[i].kk;
    }
    return kk;
}

//создать картинку гамбургера 
var burger_maker = function(sc){
	var burgerImage = document.createElement('img');
	burgerImage.className = 'image';
	burgerImage.style.transform = 'scale('+sc+')';
	return burgerImage;
}

var Size, Stuffing;
var Toppings=[];
var burgerImageSize, burgerImageStuffing, mayoImage, spiceImage;
var Scale;

//выбор нужного размера гамбургера
// Если никакой картинки еще нет, то создать картинку с размером и вывести на экран. Если уже есть картинка с размером, но выбрали новый размер, удалить старый елемент и поставить новый с той же картинкой, но нужным размером.
// Если уже выбрали начинку для гамбургера, но хотим поменять размер, то удалить елемент со старой картинкой и добавить новый с такой же картинкой, но с нужным размером.

Sizes.addEventListener('change', function () {
//проверяем есть ли нужный елемент и удаляем его, чтоб потом заменить на новый. Иначе будут добавляться постоянно новые картинки при каждом нажатии.
	if(Images.childNodes.length){
		for(var i=0; i<Images.childNodes.length;i++){
			if(Images.childNodes[i]===burgerImageSize){
			Images.removeChild(burgerImageSize);	
			}else if(Images.childNodes[i]===burgerImageStuffing){
			Images.removeChild(burgerImageStuffing);	
			}
		}
	}
	burgerImageSize = burger_maker();
	burgerImageSize.src='img/1.png';
	
	switch (Sizes.value) {
  case '1':
    Size=Hamburger.SIZE_LARGE;
	Scale=1;
	if(burgerImageStuffing){
		burgerImageStuffing.style.transform = 'scale('+Scale+')';
		Images.appendChild(burgerImageStuffing);
	}
	burgerImageSize.style.transform = 'scale('+Scale+')';
    break;
  case '2':
    Size=Hamburger.SIZE_SMALL;
	Scale=0.8;
	if(burgerImageStuffing){
		burgerImageStuffing.style.transform = 'scale('+Scale+')';
		Images.appendChild(burgerImageStuffing);
	}
	burgerImageSize.style.transform = 'scale('+Scale+')';
	break;
	}
	//если вообще ничего еще нет, то создаем картинку с размером бургера, но без начинки
	if(!Images.childNodes.length){
		Images.appendChild(burgerImageSize);	
	}else{//проверяем нет ли еще созданных картинок, с учётом майонеза и специй
		for(var i=0; i<Images.childNodes.length;i++){
			if((Images.childNodes[i]!==burgerImageSize)&&(Images.childNodes[i]!==burgerImageStuffing)){
				var temp=true;	
			}else{
				var temp=false;	
			}
		}
		if(temp){
		Images.appendChild(burgerImageSize);
		}
	}
})

//выбор нужной начинки
Stuffings.addEventListener('change', function () {
	if(Images.childNodes.length){//удаляем наявные елементы для замены
		for(var i=0; i<Images.childNodes.length;i++){
			if(Images.childNodes[i]===burgerImageSize){
			Images.removeChild(burgerImageSize);	
			}else if(Images.childNodes[i]===burgerImageStuffing){
			Images.removeChild(burgerImageStuffing);	
			}
		}
	}
	if(Scale){
	burgerImageStuffing = burger_maker(Scale); 
	}else{
	burgerImageStuffing = burger_maker(1); //если сначала выбираем начинку, а не размер
	}
	switch (Stuffings.value) {
  case '1':
    Stuffing=Hamburger.STUFFING_CHEESE;
	burgerImageStuffing.src='img/2.png';//выбираем нужную картинку
    break;
  case '2':
    Stuffing=Hamburger.STUFFING_SALAD;
	burgerImageStuffing.src='img/3.png';
    break;
  case '3':
    Stuffing=Hamburger.STUFFING_POTATO;
	burgerImageStuffing.src='img/4.png';
    break;
	}
	
	Images.appendChild(burgerImageStuffing);
})
//добавление или удаление майонеза
mayoImage = burger_maker(0.5);
mayoImage.src='img/majonez.png';
Mayonez.addEventListener('change', function (){
	
	for(var i=0; i<Images.childNodes.length;i++){
		if(Images.childNodes[i]===mayoImage){
		Images.removeChild(mayoImage);
		}
	}
	if(Mayonez.checked){
		Toppings.push(Hamburger.TOPPING_MAYO);
		Images.appendChild(mayoImage);
	}else{
		for (var i = 0; i < Toppings.length; i++) {
			if (Toppings[i] === Hamburger.TOPPING_MAYO) {
				Toppings.splice(i, 1);
			}
		}
		Images.removeChild(mayoImage);
	}
})
//добавление или удаление приправы
spiceImage = burger_maker(0.5);
spiceImage.src='img/pepper.png';
Spice.addEventListener('change', function (){

	for(var i=0; i<Images.childNodes.length;i++){
		if(Images.childNodes[i]===spiceImage){
		Images.removeChild(spiceImage);
		}
	}
	if(Spice.checked){
		Toppings.push(Hamburger.TOPPING_SPICE);
		Images.appendChild(spiceImage);
	}else{
		for (var i = 0; i < Toppings.length; i++) {
			if (Toppings[i] === Hamburger.TOPPING_SPICE) {
				Toppings.splice(i, 1);
			}
		}
		Images.removeChild(spiceImage);
	}
})

//создание нужного бургера
Submit.addEventListener('click', function (){
try{	
		if ((!Size)||(!Stuffing)) {
			throw "Невозможно выполнить заказ. Укажите размер и начинку гамбургера";
		}
	var hamburger = new Hamburger(Size, Stuffing);
	for(var i=0;i < Toppings.length; i++){
		hamburger.addTopping(Toppings[i]);
	}
	var Price = 'Цена : ' + hamburger.calculatePrice() + ' грн; ';
	var Cal = 'Каллорийность : ' + hamburger.calculateCalories() + ' ккал';
	Order.style.display = 'block';
	Order.innerHTML = Price + Cal;
	
}catch (e) {
	alert(e);
}
})





