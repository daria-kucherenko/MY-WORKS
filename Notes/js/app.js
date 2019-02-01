;
(function () {

    var NotesModule = function (moduleName) {
        this.notes = NOTES;
		this.selArray = [];
        this.template = new NotesTemplate();
        this.view = new NotesView(moduleName, this.template);
        this.model = new NotesModel(this.notes, this.selArray);
        this.controller = new NotesController(this.view, this.model);
    }

    var notesModule = new NotesModule('notesModule');

    notesModule.controller.initView();

}());