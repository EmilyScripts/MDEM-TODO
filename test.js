var test = require('tape');
var todoFunctions = require('./logic');
var initialList = [
  {
    id: 0,
    description: 'smash avocados',
    done: true,
  },
  {
    id: 1,
    description: 'make coffee',
    done: false,
  },
];
var additionalTodo = {
  id: 0, // this is a unique number, it will be needed to find a to-do in a to-do list
  description: "make tea", // this is a string that describes what you need to do
  done: false, // This is true or false, it tells us whether a todo is done or not
};
var initialConcatAdditional = [
  {
    id: 0,
    description: 'smash avocados',
    done: true,
  },
  {
    id: 1,
    description: 'make coffee',
    done: false,
  },
  {
    id: 0, // this is a unique number, it will be needed to find a to-do in a to-do list
    description: "make tea", // this is a string that describes what you need to do
    done: false, // This is true or false, it tells us whether a todo is done or not
  }
];

test('First addTodo test', function(t) {
  var actual = typeof todoFunctions.addTodo(initialList);
  var expected = "object";
  t.equal(actual, expected, "should return an array (typeof === obect, as this is what's returned for an array)")
  // t.pass();
  t.end();
});

test('Second addTodo test', function(t){
  var actual = todoFunctions.addTodo(initialList).length;
  var expected = initialList.length + 1;
  t.deepEqual(actual, expected, "array returned should be 1 longer than input");
  t.end();
});

test('Third!!! addTodo test', function(t){
  var actual = todoFunctions.addTodo(initialList, additionalTodo);
  var expected = initialConcatAdditional;
  t.deepEqual(actual, expected, "array should concat the new todo on!")
  t.end();
});

test("Original hasn't been changed?", function(t){
  var actual = initialList.length;
  var expected = 2;
  todoFunctions.addTodo(initialList, additionalTodo);
  t.equal(actual, expected, "unchanged the global?");
  t.end();
});
