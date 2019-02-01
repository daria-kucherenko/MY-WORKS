// 1) В инпутах вводить ширину и высоту элемента. 
// 1 * ) Содать radio кнопки, которыми можно выбирать фигуру создаваемого элемента (квадрат, прямоугольник, круг и овал/элипс)
// Если выбрал прямоугольник, то показывать 2 инпута для задания ширины и высоты, а если квадрат, то только ширину/высоту.


//РЕШЕНИЕ!!!
//по умолчанию заданы размеры фигуры и это круги, если ничего не выбрать
//для круга и эллипса задаем не ширину и высоту, а радиусы
//если выбрать новую фигуру, но не задать новые параметры, то сохранятся старые цифры, но преобразуются, соответственно фигуре, тоесть если это круг, то цифра станет радиусом
var Width = document.getElementById('figureWidth');
var Height = document.getElementById('figureHeight');
var W, H;
var border_radius;
//показывают нужные инпуты
function hide_input() {Width.style.display = 'block'; Height.style.display = 'none';}
function show_input() {Width.style.display = 'inline'; Height.style.display = 'inline';}
//задают нужные border-radius
function getBorderRadius(){border_radius = '50%';}
function deleteBorderRadius(){border_radius = '0%';}
//изменяют название placeholder в инпутах (для круга и эллипса вводим радиусы)
function Change_placeholder(textW, textH){
	Width.placeholder = textW;
	Height.placeholder = textH;
}
//функция обработки квадрата
function fSquare(){
	W=Width.value + 'px';
	H=W; //сохраняем ранее введенное значение для ширины/высоты, в зависимости от фигуры
	deleteBorderRadius();
	hide_input();
	Change_placeholder('Square width/height');
	Width.addEventListener("blur", function(){W=Width.value + 'px'; H=W;});
}
//функция обработки прямоугольника
function fRectangle(){
	W=Width.value + 'px'; //сохраняем ранее введенное значение для ширины/высоты, в зависимости от фигуры
	H=Height.value + 'px';
	deleteBorderRadius();
	show_input();
	Change_placeholder('Rectangle width', 'Rectangle height');
	//задаем новые значения ширины и высоты при введении в поле
	Width.addEventListener("blur", function(){W=Width.value + 'px';});
	Height.addEventListener("blur", function(){H=Height.value + 'px';});
}
//функция обработки круга
function fCircle(){
	W=2*(Width.value) + 'px';
	H=W; //сохраняем ранее введенное значение для ширины/высоты, в зависимости от фигуры
	getBorderRadius();
	hide_input();
	Change_placeholder('Circle radius');
	//задаем новые значения ширины и высоты при введении в поле
	Width.addEventListener("blur", function(){W=2*(Width.value) + 'px'; H=W;});
}
//функция обработки эллипса
function fEllipse(){
	W=2*(Width.value) + 'px'; //сохраняем ранее введенное значение для ширины/высоты, в зависимости от фигуры
	H=2*(Height.value) + 'px';
	getBorderRadius();
	show_input();
	Change_placeholder('Radius of ellipse width', 'Radius of ellipse height');
	//задаем новые значения ширины и высоты при введении в поле
	Width.addEventListener("blur", function(){W=2*(Width.value) + 'px';});
	Height.addEventListener("blur", function(){H=2*(Height.value) + 'px';});
}

//задаем обработчики события change при нажатии на радио-кнопку
var Square=document.getElementById("square");
Square.addEventListener("change", fSquare);

var Rectangle=document.getElementById("rectangle");
Rectangle.addEventListener("change", fRectangle);

var Circle=document.getElementById("circle");
Circle.addEventListener("change", fCircle);

var Ellipse=document.getElementById("ellipse");
Ellipse.addEventListener("change", fEllipse);


var area = document.querySelector('.area');

area.addEventListener('click', function (e) {
 
    var targetArea = e.target;
    var left = e.offsetX;
    var top = e.offsetY;
    var figure = document.createElement('div');
	figure.className = 'figure';
	
    figure.style.left = left + 'px';
    figure.style.top = top + 'px';
    figure.style.backgroundColor = figureColor.value;
	//задаем полученные выше параметры для стиля фигуры
	figure.style.borderRadius = border_radius;
	figure.style.width = W;
	figure.style.height = H;
	
	targetArea.appendChild(figure);
})











