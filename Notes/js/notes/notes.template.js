;
(function (window) {

    window.NotesTemplate = function () {
        this.noteTemplate1 = `
            <div class="note">
				<label class="star"><input type="checkbox" star-id="{{num}}" class="star-box" {{ifChecked}} ><span></span></label>
                <div class="note__text">{{text}} <button data-id="{{id}}" class="note__rm-button">X</button></div>
            </div>
        `;
		this.noteTemplate2 = "{{number_notes}}";
    }
//рисуем заметки
    NotesTemplate.prototype.show = function (data, selectedArray) {
        var i, l;
        var view1 = '';

        if (data.length > 0 && typeof data === 'object') {
		
            for (i = 0, l = data.length; i < l; i++) {
                var template1 = this.noteTemplate1;
                template1 = template1.replace('{{text}}', data[i].text);
				template1 = template1.replace('{{num}}', data[i].id);
                template1 = template1.replace('{{id}}', data[i].id);
				for(j = 0;j < selectedArray.length;j++){
					if(data[i].id === selectedArray[j]){
						template1 = template1.replace('{{ifChecked}}', 'checked');
					}
				}
                view1 = view1 + template1;
            }
        }
        return view1;
    }
	
//рисуем количество заметок
	NotesTemplate.prototype.showNumber = function (data, selectedArray, numberNotes) {
		var view2 = '';
		var template2 = this.noteTemplate2;
		
		if (data.length > 0 && typeof data === 'object') {
			switch(numberNotes){
			case 1: 
			template2 = template2.replace('{{number_notes}}', data.length);   
			break;
			case 2: 
			template2 = template2.replace('{{number_notes}}', selectedArray.length);   
			break;
			case 3: 
			template2 = template2.replace('{{number_notes}}', (data.length - selectedArray.length));   
			break;
			}
            
            view2 = view2 + template2;
        }
        return view2;	
	}

}(window));