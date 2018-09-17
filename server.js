const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
var server;

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())

var db

/*
mongoose.connect(uri, 
    { server: { 
        // sets how many times to try reconnecting
        reconnectTries: Number.MAX_VALUE,
        // sets the delay between every retry (milliseconds)
        reconnectInterval: 1000 
        } 
    }
);
*/
MongoClient.connect('mongodb://naveen:nkg22_DB09@ds131721.mlab.com:31721/my-quotes', (err, client) => {
	if (err) return console.log(err)

	db = client.db('my-quotes') // whatever your database name is

	//start server
	server = app.listen(3000, () => {
		console.log('listening on 3000')
	})

	module.exports = server;
})

app.get('/', (req,res)=> {
	//res.send('Hello Node MongoDB')
	//console.log(__dirname)
	//res.sendFile(__dirname + '/index.html')

	//var cursor = db.collection('quotes').find()

	db.collection('quotes').find().toArray(function(err, results) {
		console.log(results)

		// send HTML file populated with quotes here
		if (err) return console.log(err)
		// renders index.ejs
		res.render('index', {quotes: results})
	})

})

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})
})

app.put('/quotes', (req, res) => {
	// Handle put request
	console.log('put-req')

	db.collection('quotes')
	.findOneAndUpdate({name: 'Yoga'}, {
	$set: {
	name: req.body.name,
	quote: req.body.quote
	}
	}, {
	sort: {_id: -1},
	upsert: true
	}, (err, result) => {
	if (err) return res.send(err)
	res.send(result)
	})
})
