(function (window) {

    window.NotesView = function (moduleName, template) {
        this.moduleSelector = '[data-module=' + moduleName + '] ';
        this.$field = document.querySelector(this.moduleSelector + '.notes__add-inp');  //поле для ввода новой заметки
        this.$addBtn = document.querySelector(this.moduleSelector + '.notes__add-btn');  //кнопка добавления новых заметок
        this.$list = document.querySelector(this.moduleSelector + '.notes__list'); //место добавления новых заметок
		
		this.$totalBtn = document.querySelector('.total_notes-btn');  //кнопка вывода всех заметок
		this.$selBtn = document.querySelector('.selected_notes-btn');  //кнопка вывода количества выбранных заметок
		this.$unselBtn = document.querySelector('.unselected_notes-btn');  //кнопка вывода количества не выбранных заметок
		this.$numberField = document.querySelector('.number_of_notes');  //окошко вывода количества заметок
		
        this.tpl = template;
    }
//при возникновении нужного события, передает в controller  нужные данные через call-back функцию handler
    NotesView.prototype.handle = function (eventName, handler) {
        let self = this;
		var numberNotes;
		//добавить новую заметку
        if (eventName === 'addNote') {
            self.$addBtn.addEventListener('click', function () {
                let text = self.$field.value;
                handler(text);  //call-back функция
            })
        }
		//удалить заметку
        if (eventName === 'removeNote') {
            self.$list.addEventListener('click', function (e) {
                var btn = e.target;
                if (btn.className === 'note__rm-button') {
                    var id = $attr(btn, 'data-id');
                    handler(+id);
                }
            })
        }
		//выбрать заметку
		if (eventName === 'selectNote') {
            self.$list.addEventListener('change', function (e) {
				var star_btn = e.target;
				
				if (star_btn.className === 'star-box'){
					var id = $attr(star_btn, 'star-id');
					if(star_btn.checked){
						handler((+id), true);
					}else {
						handler((+id), false);
					}
				}	
			})		
        }
		//показать все заметки
		if (eventName === 'showTotalNotes') {
            self.$totalBtn.addEventListener('click', function () {
				numberNotes = 1;
                handler(numberNotes);
            })
        }
		//показать выбранные заметки
		if (eventName === 'showSelNotes') {
            self.$selBtn.addEventListener('click', function () {
                numberNotes = 2;
                handler(numberNotes);
            })
        }
		//показать не выбранные заметки
		if (eventName === 'showUnselNotes') {
            self.$unselBtn.addEventListener('click', function () {
				numberNotes = 3;
                handler(numberNotes);
            })
        }
    }
//функция рисования заметок или их количества
    NotesView.prototype.render = function (viewCmd, data, selectedArray, numberNotes) {
        let self = this;
        let viewCommands = {
            showNotes: function () {
                self.$list.innerHTML = self.tpl.show(data, selectedArray); 
            },
			showNumberNotes: function (){
				self.$numberField.innerHTML = self.tpl.showNumber(data, selectedArray, numberNotes);
			}
        }
        viewCommands[viewCmd]();
    }
//функция очищения поля ввода после добавления заметки	
    NotesView.prototype.clearNewNote = function () {
        this.$field.value = '';
    }



}(window));