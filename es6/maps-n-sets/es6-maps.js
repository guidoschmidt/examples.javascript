/*
	ECMAScript 6: Mps & Sets

	author: Guido Schmidt <guido.schmidt.2912@gmail.com>
	date: 21.09.2015
*/


// Sets
var capitals = ['Paris', 'Paris', 'Berlin', 'Paris', 'Lisabon'];
var uniqueCapitals = new Set(capitals);
console.log('Sets can eliminate duplicates!');
for(var capital of uniqueCapitals) {
	console.log(capital);
}

// Maps
var map = new Map();
map.set('DE', { name: 'Germany', capital: 'Berlin' });
map.set('FR', { name: 'France', capital: 'Paris' });
console.log( map.get('DE') );
for (var entry of map) {
  console.log(entry);
}
