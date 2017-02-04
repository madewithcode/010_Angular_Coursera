console.log('foo.js');

var person = {
  firstName: 'John',
  lastName: 'Doe'
}

function greet() {
  console.log('greet()');
  var myObject = {
    msg: 'hello world'
  }
  return myObject;
}

console.log(person.firstName);

greet();
console.log(greet().msg);
