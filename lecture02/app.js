console.log('app.js running');

var student = {
  name: "",
  type: "student"
};

document.addEventListener('DOMContentLoaded', contentLoaded);

function contentLoaded(event) {
  console.log('contendLoaded()');
  document.getElementById('name').addEventListener('keyup', keyUp);
}

function keyUp(event) {
  console.log('keyup()');
  calculateNumericOutput();
}

function calculateNumericOutput() {
  console.log('calculateNumericOutput()');

  student.name = document.getElementById('name').value;
  var totalNameValue = 0;

  for (var i=0; i<student.name.length; i++) {
    totalNameValue += student.name.charCodeAt(i);
  }

  // insert results into page
  var output = "Total Numeric value of person's name is: " + totalNameValue;
  document.getElementById('output').innerText = output;
}
