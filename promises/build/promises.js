'use strict';

console.log('--- Javascript Promises ---');

var container = document.querySelector('#container');
container.innerText = 'Loading';

function fetchData(resource, cb) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      return cb(JSON.parse(xhttp.response));
    }
  };
  xhttp.open("GET", resource, true);
  xhttp.send();
}

var data = new Promise(function (resolve, reject) {
  window.setTimeout(function () {
    fetchData('./data.json', function (result) {
      resolve(result);
    });
  }, 1500);
}).then(function (result) {
  container.innerText = '';
  result.map(function (element) {
    var div = document.createElement('DIV');
    // Name
    var h4 = document.createElement('H3');
    h4.innerText = element.name;
    div.appendChild(h4);
    // Age
    var pAge = document.createElement('P');
    pAge.innerText = 'Age: ' + element.age;
    div.appendChild(pAge);
    // Nationality
    var pNat = document.createElement('P');
    pNat.innerText = 'Nationality: ' + element.nationality;
    div.appendChild(pNat);
    // Add to root
    container.appendChild(div);
  });
}).catch(function (err) {});