// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application

var state = [
  { id: -3, description: 'Example uncompleted', done: false },
  { id: -2, description: 'Example completed', done: true },
  { id: -1, description: 'Add more items...', done: false },
]; // this is our initial todoList (TODO: move back into the function scope)


(function() {
    // This is the dom node where we will keep our todo
    var container = document.getElementById('todo-container');
    var addTodoForm = document.getElementById('add-todo');
  
   
  
    // This function takes a todo, it returns the DOM node representing that todo
    var createTodoNode = function(todo) {
      var todoNode = document.createElement('li');
      // you will need to use addEventListener
      // add span holding description
      var spanNode = document.createElement('span');
      var span = todoNode.appendChild(spanNode);
      var inputValue = todo.description;
      var todoTextNode = document.createTextNode(inputValue);
      var spanText = span.appendChild(todoTextNode);

      // this adds the delete button
      var deleteButtonNode = document.createElement('button');
      deleteButtonNode.addEventListener('click', function(event) {
        var newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
      });
      todoNode.appendChild(deleteButtonNode);
  
      // add markTodo button

      // add classes for css
  
      return todoNode;
    };
  
    // bind create todo form
    if (addTodoForm) {
      addTodoForm.addEventListener('submit', function(event) {
        // https://developer.mozilla.org/en-US/docs/Web/Events/submit
        // what does event.preventDefault do?
        // what is inside event.target?
        event.preventDefault();
        var description = event.target.description.value;
        var todo = {
          id: todoFunctions.generateId(),
          description: description,
          done: false,
        }
        // hint: todoFunctions.addTodo
        var newState = todoFunctions.addTodo(state, todo);
        update(newState);
      });
    }
  
    // you should not need to change this function
    var update = function(newState) {
      state = newState;
      renderState(state);
    };
  
    // you do not need to change this function
    var renderState = function(state) {
      var todoListNode = document.createElement('ul');
  
      state.forEach(function(todo) {
        todoListNode.appendChild(createTodoNode(todo));
      });
  
      // you may want to add a class for css
      container.replaceChild(todoListNode, container.firstChild);
    };
  
    if (container) renderState(state);
  })();
  