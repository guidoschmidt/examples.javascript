var map = new Map();
map.set('DE', { name: 'Germany', capital: 'Berlin' });
map.set('FR', { name: 'France', capital: 'Paris' });
console.log(map.get('DE'));

map.set(new Date(), function today()  {});
map.forEach(function(item) {
	console.log(item);
});

map.set(() => 'key', { pony: 'foo' });
map.forEach(function(key, item) {
	console.log(key + ':' + item);
});