// main.js
var update = document.getElementById('update')

update.addEventListener('click', function () {
	// Send PUT Request here
	console.log('update request');

	fetch('quotes', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
		'name': 'Test',
		'quote': 'Meditation quote updated.'
		})
	}).then(res => {
	if (res.ok) return res.json()
	})
	.then(data => {
	console.log(data)
	window.location.reload(true)
	})

})
