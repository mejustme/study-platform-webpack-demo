require('./todoMVC.scss');

var Regular = require('regularjs');

//Define Custom Event enter
Regular.event('enter', function(element, fire){
    Regular.dom.on(element, 'keypress', function(ev){

        if(ev.which === 13) fire(ev)
    })
})

var Todo = require('../todo/todo.js');

var TodoMVC = Regular.extend({
    template: require('./todoMVC.html'), // id | template string | preparsed ast
    // get the list;
    computed: {
        completedLength: "this.getList('completed').length",
        activeLength: "this.getList('active').length",
        allCompleted: {
            get: function(){
                return this.data.todos.length === this.getList('completed').length
            },
            set: function(sign){
                this.data.todos.forEach(function(item){
                    item.completed = sign;
                })
            }
        }
    },
    getList: function(filter){
        if(!filter || filter === 'all') return this.data.todos;
        else return this.data.todos.filter(function(item){
            return filter === 'completed'? item.completed : !item.completed;
        });
    },
    // toggle all todo's completed state
    toggleAll: function(sign){
        this.data.todos.forEach(function(item){
            return item.completed = !sign;
        });
    },
    // clear all compleled
    clearCompleted: function(){
        this.data.todos = this.data.todos.filter(function(item){
            return !item.completed
        });
    },
    // create a new todo
    newTodo: function(editTodo){
        var data = this.data;
        data.todos.unshift({description: editTodo});
        data.editTodo = "";
    }
})

module.exports = TodoMVC;
