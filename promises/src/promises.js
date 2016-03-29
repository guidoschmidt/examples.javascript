'use strict'
console.log('--- Javascript Promises ---');

const container = document.querySelector('#container')
container.innerText = 'Loading'

function fetchData (resource, cb) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       return cb(JSON.parse(xhttp.response))
    }
  };
  xhttp.open("GET", resource, true);
  xhttp.send();
}


const data = new Promise((resolve, reject) => {
    window.setTimeout(() => {
      fetchData('./data.json', (result) => {
        resolve(result)
      })
    }, 1500)
  })
  .then(result => {
    container.innerText = ''
    result.map(element => {
      const div = document.createElement('DIV')
      // Name
      const h4 = document.createElement('H3')
      h4.innerText = element.name
      div.appendChild(h4)
      // Age
      const pAge = document.createElement('P')
      pAge.innerText = `Age: ${element.age}`
      div.appendChild(pAge)
      // Nationality
      const pNat = document.createElement('P')
      pNat.innerText = `Nationality: ${element.nationality}`
      div.appendChild(pNat)
      // Add to root
      container.appendChild(div)
    })
  })
  .catch(err => {

  })
