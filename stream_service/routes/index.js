var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = 'public/scroll.mp4';

var cors = require('cors')

var app = express()
app.use(cors());
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/get_video', function(req, res, next) {
	var read = fs.createReadStream(file);
	var write = fs.createWriteStream('public/copy.mp4');
	read.pipe(write);
	// res.setHeader("Access-Control-Allow-Origin", 'http://myDomain:8080');
	// res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
	// res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
	res.send({
		status: true,
		data: 'http://localhost:3000/scroll.mp4'
	});
});

module.exports = router;
