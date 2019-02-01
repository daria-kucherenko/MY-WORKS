;
(function (window) {

    window.NotesController = function (view, model) {
        var self = this;
        self.view = view;
        self.model = model;
		//какое событие ожидает и что нужно сделать с данными, полученными от call-back функции
        self.view.handle('addNote', function (text) {
            self.addItem(text);
        })

        self.view.handle('removeNote', function (id) {
            self.removeNote(id); 
        })
		
		self.view.handle('selectNote', function (id, if_checked) {
			self.changeSelectedArray(id, if_checked);
        })
		
		self.view.handle('showTotalNotes', function (numberNotes) {
            self.getNumber(numberNotes); 
        })
		
		self.view.handle('showSelNotes', function (numberNotes) {
            self.getNumber(numberNotes); 
        })
		
		self.view.handle('showUnselNotes', function (numberNotes) {
            self.getNumber(numberNotes); 
        })
		
    }
//добавление новой заметки
    NotesController.prototype.addItem = function (text) {
        var self = this;
        if (!text) {
            return;
        }
        self.model.add(text, function (data, selectedArray) {
            self.view.clearNewNote(); //очистить поле ввода
            self.view.render('showNotes', data, selectedArray); //нарисовать заметки (с учетом уже выбранных)
        })
    }
//удаление заметки
    NotesController.prototype.removeNote = function (id) {
        var self = this;
        self.model.remove(id, function (newData, newSelectedArray) {
                self.view.render('showNotes', newData, newSelectedArray);
            }
        )
    }
//добавление в массив id выбранной заметки
	NotesController.prototype.changeSelectedArray = function (id, if_checked) {
        var self = this;
        self.model.addSelectedElement(id, if_checked, function (selectedArray) {
        })
    }
	
//получение количества заметок
	NotesController.prototype.getNumber = function (numberNotes) {
        var self = this;
		//получили данные в model и отрисовали количество в view
		self.model.getAll(function (data, selectedArray) {
            self.view.render('showNumberNotes', data, selectedArray, numberNotes);
        }); 
    }

    NotesController.prototype.initView = function () {
        var self = this;
		//нарисовали данные, что есть изначально
        self.model.getAll(function (data, selectedArray) {
            self.view.render('showNotes', data, selectedArray);
        });
    }

}(window));