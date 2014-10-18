$(function(){

  /* 
    Datee Model
  */

  window.Datee = Backbone.Model.extend({
    defaults: function() {
      return {
        todos: []
        //dones: []
      };
    },

    addTodo: function(todoId) {  
      var arr = this.get("todos");
      arr.push(todoId);
      this.set({"todos": arr}, {silent: true});
      this.save();
      this.trigger("add:todo", Todos.get(todoId));
    },

    removeTodo: function(todoId) {
      var arr = this.get("todos");
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == todoId) { 
          arr.splice(i, 1); 
          this.set({"todos": arr}, {silent: true});
          this.save();
          this.trigger("remove:todo", Todos.get(todoId));
        }
      }
    },

    getTodos: function() {
      return _.map(this.get("todos"), function(todoId) {
        return Todos.get(todoId);
      });
    },

    getName: function() {
      return this.get('name');
    },

    // rearrange models - more readable code
    /*
    moveUp: function() {
      this.collection.moveUp(this);
    },

    moveDown: function() {
      this.collection.moveDown(this);
    }
    */

  });

  /*
    Datee Collection
  */

  window.DateeList = Backbone.Collection.extend({
    model: Datee,

    localStorage: new Store("datees")
  });

  window.Datees = new DateeList();

  /*
    Datee item view
  */

  window.DateeView = Backbone.View.extend({
    tagName:  "li",

    template: _.template($('#datee-template').html()),

    events: {
      "click span.datee-name"    : "edit",
      "click span.datee-destroy"   : "clear",
      "keypress .datee-input"      : "updateOnEnter"
    },

    initialize: function() {
      this._todoViews = {};
      $(this.el).addClass("datee-item");
      this.render();
      this.model.bind('change', this.setText, this);
      this.model.bind('destroy', this.remove, this);
      this.model.bind('add:todo', this.addTodo, this);
      this.model.bind('remove:todo', this.removeTodo, this);
    },

    render: function() {
    
      $(this.el).html(this.template(this.model.toJSON()));
      this.setText();

      var that = this;
      this.$("ul.datee-todos").sortable({

        dropOnEmpty: true,
        connectWith: "ul.datee-todos",
        receive: function(event, ui) {

          var datee = that.model;
          var id = $(ui.item[0]).attr("id");
          var todo = Todos.get(id);
          var oldDatee = todo.getDatee();

          todo.setDatee(datee.id);
          oldDatee.removeTodo(todo.id);
          datee.addTodo(todo.id);
        }
      });

      return this;
    },

    setText: function() {
      var name = this.model.get('name');
      this.$('.datee-name').text(name);
      this.input = this.$('.datee-input');
      this.input.bind('blur', _.bind(this.close, this)).val(name);
    },

    edit: function() {
      $(this.el).addClass("editing-datee");
      this.input.focus();
    },

    close: function() {
      //this.model.save({currdate: this.input.val()});
      this.model.save({name: this.input.val()});
      $(this.el).removeClass("editing-datee");
    },

    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    addTodo: function(todo) {
      var view = new TodoView({model: todo});
      if (todo) { 
        this._todoViews[todo.cid] = view;
        this.$('ul.datee-todos').append(view.render().el);
      }
    },

    removeTodo: function(todo) {
      var todo = this._todoViews[todo.cid];
      todo.remove();
    },

    addTodos: function(todo) {
      var that = this;
      var col = this.model.getTodos(); 
      if (col.length == 0) return;
      _.each(col, function(todo) {
        that.addTodo(todo);
      });
    },

    remove: function() {
      $(this.el).remove();
    },

    clear: function() {
      this.model.destroy();
    }

  });

  /*
    Todo Model
  */

  window.Todo = Backbone.Model.extend({
    defaults: function() {
      return {
        favorite:  false,
        mood: 0,
        status: 0,
        done: false, 
        datee: 0,
        order: Todos.nextOrder(),
        priority: 0 // highest priority
        //priority: Todos.nextPriority()
      };
    },

    toggleDone: function() { // toggle the done status
      this.save({done: !this.get("done")});
    },

    getDatee: function() {
      return Datees.get(this.get("datee"));
    },

    setDatee: function(dateeId) {
      this.save({datee: dateeId}, {silent: true});
    },

    getPriority: function() {
      return this.get('priority');
    }

    

  });

  /*
    Todo Collection
  */

  window.TodoList = Backbone.Collection.extend({
    model: Todo,

    localStorage: new Store("todos"),
/*
    initialize: function() {
      this.on('add remove', this.updateModelOrdinals);
    },

    updateModelOrdinals: function() {
      this.each(function(model, index) {
        this.model.set('ordinal', index);
      }
    },
*/
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },
    /*
    comparator: function(Todo) {
      return Todo.get('order');
    },*/
    
    /* sort based on priority
    comparator: function(Todo) {
      return Todo.get('priority');
    },
    */

    comparator: function(Todo) {
      //return Todo.collection.indexOf(Todo);
      
      return Todo.get('index');
    },

    getDone: function() {
      return this.where({done: true});
    },

    // Filter down the list to only todo items that are still not finished
    getRemaining: function() {
      return this.where({done: false});
    },

    // rearrange todos in the collection while maintaining 0 index
    removeAt: function(position) {
      if (position) {
        this.remove(this.at(position));
      }
    }    

  });

  window.Todos = new TodoList();



  /*
    Todo item view
  */

  window.TodoView = Backbone.View.extend({
    tagName:  "li",

    template: _.template($('#todo-template').html()),

    events: {
      //"click span.doneCheckBox"   : "changeStatus",
      "click span.status"         : "changeStatus",
      "click span.todo-text"      : "edit",
      "click span.todo-destroy"   : "clear",
      "click span.mood"           : "changeMood",
      "click span.move-up"        : "moveOneUp",
      "click span.move-down"      : "moveOneDown",
      "keypress .todo-input"      : "updateOnEnter"
    },

    initialize: function() {
      $(this.el).addClass("todo-item");
      if (this.model) {
        $(this.el).attr("id", this.model.id);
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);
      }
      //this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setText();
      this.setMood();
      this.setStatus();
      //this.setPosition();
      return this;
    },


    // re-render the un-done items
    renderUndone: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      this.input = this.$('.edit');
      return this;
    },

    setText: function() {
      var text = this.model.get('text');
      this.$('.todo-text').text(text);
      this.input = this.$('.todo-input');
      this.input.bind('blur', _.bind(this.close, this)).val(text);
    },

    edit: function() {
      $(this.el).addClass("editing-todo");
      this.input.focus();
    },

    close: function() {
      this.model.save({text: this.input.val()});
      $(this.el).removeClass("editing-todo");
    },

    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    addToDatee: function(datee_el) {
      $(datee_el).append(this.el);
    },

    changeMood: function() {
      this.model.save({mood: (this.model.get("mood") + 1) % 3});
      this.setMood();
    },

    changeStatus: function() { // done?
      //this.model.toggleDone();
      this.model.save({status: (this.model.get("status") + 1) % 3});
      this.setStatus();
      this.setPriority();
    },

    setPriority: function() {
      var newStatus = this.model.get("status");
      switch(newStatus) {
        case 0: // untouched - priority high
          this.model.set({"priority": 0}, {silent: true});
          break;
        case 1: // in progress - priority middle
          this.model.set({"priority": 10}, {silent: true});
          break;
        case 2: // finished - priority low
          this.model.set({"priority": 20}, {silent: true});
          break;
      }
    },

    setMood: function() {
      var newMood = this.model.get("mood");
      var moodElement = this.$('.mood');
      switch(newMood) {
        case 0: // Neutral
          moodElement.removeClass("sad");
          break;
        case 1: // Happy
          moodElement.addClass("happy");
          break;
        case 2: // Sad
          moodElement.removeClass("happy");
          moodElement.addClass("sad");
          break;
      }
    },

    setStatus: function() {
      var newStatus = this.model.get("status");
      var statusElement = this.$('.status');
      switch(newStatus) {
        case 0: // untouched
          statusElement.removeClass("finished");
          break;
        case 1: // in progress
          statusElement.addClass("inprogress");
          break;
        case 2: // finished
          statusElement.removeClass("inprogress");
          statusElement.addClass("finished");
          break;
      }
    },

    moveOneUp: function() {
      //console.log("TodoList Length=", this.model.collection.length);
      //this.model.collection.moveUp(this.model);
      
      //console.log(this.model.collection.indexOf(this.model));
  
    },

    moveOneDown: function() {
      
      //this.model.collection.moveDown(this.model);
      //console.log(this.model.collection.indexOf(this.model));
      //console.log(this.model.collection);
      //setPosition();
    },

    remove: function() {
      $(this.el).remove();
    },

    clear: function() {
      var datee = this.model.getDatee();
      datee.removeTodo(this.model.id);
      this.model.destroy();
    }

  });

  // The Application
  // ---------------

  window.AppView = Backbone.View.extend({
    el: $("#taskkapp"),

    events: {
      "keypress #new-todo":  "createTodoOnEnter",
      "keypress #new-datee":  "createDateeOnEnter",
      "click #data-backup":  "backup"
    },

    initialize: function() {
      this.todoInput = this.$("#new-todo");
      this.dateeInput = this.$("#new-datee");

      Datees.bind('add',   this.addDatee, this);
      Datees.bind('reset', this.addDatees, this);
      Datees.bind('all',   this.render, this);

      Todos.fetch();
      Datees.fetch();

      if (Datees.length == 0) {
        /*
        Datees.create({currdate: "Yesterday"});
        Datees.create({currdate: "Today"});
        Datees.create({currdate: "Tomorrow"});
        */
        Datees.create({name: "Yesterday"});
        Datees.create({name: "Today"});
        Datees.create({name: "Tomorrow"});
      }
    },

    render: function() {
      var dones = Todos.getDone.length;
      var remainings = Todos.getRemaining.length;

      //console.log(dones);
      //console.log(remainings);

/*
      if (remainings) {
        this.main.show();
      } else {
        this.main.hide();
      }
*/

    },

    addDatee: function(datee) {
      var view = new DateeView({model: datee});
      this.$("#datee-list").append(view.render().el);
      view.addTodos();
    },

    addDatees: function() {
      Datees.each(this.addDatee);
    },

    createTodoOnEnter: function(e) {
      var text = this.todoInput.val();
      if (!text || e.keyCode != 13) return;

      var flag = 0;
      console.log(Datees.length);
      for (var i = 0; i < Datees.length; i++) {
        var name = Datees.at(i).getName();
        if (name == "today" || name == "Today") { 
          flag = 1;
          break;
        }
      }
      if (flag == 1) {
        var initialDatee = Datees.at(i);
      } else {
        var initialDatee = Datees.at(0);  
      }
      var todo = Todos.create({text: text}); 
      console.log("todo=", todo.get('text'));
      console.log("length=", Todos.length);
      todo.setDatee(initialDatee.id);
      initialDatee.addTodo(todo.id);
      this.todoInput.val('');  
      
    },

    createDateeOnEnter: function(e) {
      var text = this.dateeInput.val();
      if (!text || e.keyCode != 13) return;
      console.log("creating date");
      Datees.create({name: text});
      this.dateeInput.val('');
    },

    backup: function(e) {
      var datees = localStorage.getItem("datees");
      var todos = localStorage.getItem("todos");
      var backup = {
        datees: JSON.parse(datees),
        todos: JSON.parse(todos)
      };
      uriContent = "data:application/octet-stream;filename=guineapig.backup," + encodeURIComponent(JSON.stringify(backup));
      newWindow=window.open(uriContent, 'GuineaPig Backup');
    }

  });

  window.App = new AppView();

});
