(function (window) {

    window.NotesModel = function (data, selectedArray) {
        this.data = data;
		this.selectedArray = selectedArray;
    }
//Получение всех заметок
    NotesModel.prototype.getAll = function (cb) {
        cb(this.data, this.selectedArray);
        return this.data;
    }
	
//Добавление новой заметки
    NotesModel.prototype.add = function (text, cb) {
        var newNote = {
            text: text
        }
        newNote.id = new Date().getTime();
        this.data.push(newNote);
        cb(this.data, this.selectedArray );
    }
//Удаление заметки
    NotesModel.prototype.remove = function (id, cb) {
        var self = this;
        for (var i = 0; i < self.data.length; i++) {
            if (self.data[i].id === id) {
                self.data.splice(i, 1);    
            }
        }
		self.selectedArray.sort(); // сортируем массив
		//удаляем одинаковые id, если они есть
		for (var i = self.selectedArray.length - 1; i > 0; i--) {
			if (self.selectedArray[i] == self.selectedArray[i - 1]) self.selectedArray.splice( i, 1);
		}
		//удаляем елемент с нужным id
		for (var j = 0; j <= self.selectedArray.length; j++) {
            if (self.selectedArray[j] === id) {
                self.selectedArray.splice(j, 1);	
            }
		}

		cb(self.data, self.selectedArray);
		return;
        cb(-1);
    }
//добавление в массив id выбранной заметки
	NotesModel.prototype.addSelectedElement = function (id, if_checked, cb) {
		var self = this;
		if(if_checked){
			self.selectedArray.push(id);
		}else{
			for (var i = 0; i < self.selectedArray.length; i++) {
				if (self.selectedArray[i] === id){
					self.selectedArray.splice(i, 1);
				}
			}
		}
		cb(self.selectedArray);
	}
	

}(window));