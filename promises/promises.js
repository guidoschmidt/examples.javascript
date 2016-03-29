console.log('Javascript Promises');

var container = $('#container');

const promise = $.get('http://localhost:8080/test.json');

promise
.success(function(data) {
  data.map(function(object, index) {
    console.log(object.name);
    container.append('<h3>' + object.name + ' (' + object.age + ')</h3>');
  });
})
.error(function(xhr, status, error) {
  console.log(xhr + ' | ' + status + ' : ' + error);
});
