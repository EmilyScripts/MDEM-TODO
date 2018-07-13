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
      var divNode = document.createElement('div');
      var descriptionDiv = todoNode.appendChild(divNode);
      var inputValue = todo.description;
      var todoTextNode = document.createTextNode(inputValue);
      var descriptionText = descriptionDiv.appendChild(todoTextNode);
      descriptionDiv.classList.add('todo-description');

      //add button container div

      var buttonContainer = document.createElement('div');
      var buttons = todoNode.appendChild(buttonContainer);
      buttons.classList.add('todo-buttons');

      // this adds the delete button
      var deleteButtonNode = document.createElement('button');
      deleteButtonNode.addEventListener('click', function(event) {
        var newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
      });
      buttons.appendChild(deleteButtonNode);
      //adding attributes to the button
      deleteButtonNode.classList.add('item-button');
      deleteButtonNode.classList.add('delete-button');
      deleteButtonNode.setAttribute('type', 'button');
      deleteButtonNode.setAttribute('name', 'delete item button');
      deleteButtonNode.setAttribute('value', 'Delete');
      
      //adding text to button
      
      var deleteSpanNode = document.createElement('span');
      var deleteSpan = deleteButtonNode.appendChild(deleteSpanNode);
      var deleteValue = 'x';
      var deleteTextNode = document.createTextNode(deleteValue);
      var deleteSpanText = deleteSpan.appendChild(deleteTextNode);

      // add markTodo button
      
      var markButtonNode = document.createElement('button');
      markButtonNode.addEventListener('click', function(event) {
        var newState = todoFunctions.markTodo(state, todo.id);
        update(newState);
      });
      buttons.appendChild(markButtonNode);
      //adding attributes to the button
      markButtonNode.classList.add('item-button');
      markButtonNode.classList.add('mark-button');
      if (todo.done) {
        markButtonNode.classList.add('mark-button--done');  
      }
      markButtonNode.setAttribute('type', 'button');
      markButtonNode.setAttribute('name', 'mark button');
      markButtonNode.setAttribute('value', 'Mark');

      //adding text to button
      
      var markSpanNode = document.createElement('span');
      var markSpan = markButtonNode.appendChild(markSpanNode);
      var markValue = String.fromCharCode(10004);
      var markTextNode = document.createTextNode(markValue);
      var markSpanText = markSpan.appendChild(markTextNode);
      
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

      var doneCount = function(x){
        return x.done == true;
      };

      var doneNumber = state.filter(doneCount).length;

      var calculatedProgress = Math.round((doneNumber / state.length) * 100);

      var progressElement = document.createElement("progress");
      progressElement.setAttribute("max", 100);
      progressElement.setAttribute("value", calculatedProgress);

      var progressContainer = document.getElementById("progress-container");

      progressContainer.replaceChild(progressElement, progressContainer.firstChild);

      // container.parentNode.insertBefore(progressElement, container.nextSibling);

      //Mon animation:
      var dodo = document.getElementsByTagName("IMG")[0];
      var tutu = document.getElementsByTagName("IMG")[1];
      if (progressElement.value === 100) {
        dodo.setAttribute("id", "disappear");
        tutu.removeAttribute("id", "disappear");
        }  else {
          tutu.setAttribute("id", "disappear");
          dodo.removeAttribute("id", "disappear");
        }
      }
      

    
  
    if (container) renderState(state);
  })();
  