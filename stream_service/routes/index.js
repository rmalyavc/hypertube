var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = 'public/scroll.mp4';

var cors = require('cors')

var app = express()
app.use(cors());

var WebTorrent = require('webtorrent');
var client = new WebTorrent();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/get_video', function(req, res, next) {
	var link = `magnet:?xt=urn:btih:${req.query.hash}&tr=http://track.one:1234/announce&tr=udp://track.two:80`;
	console.log(link);

    client.add(link, function (torrent) {
    	let sent = false;
    	let file_name = '';
    	torrent.on('download', function() {
    		console.log('Exists!');
    		if (!sent && fs.existsSync('public/test.mp4')) {
    			sent = true;
    			res.send({
					status: true,
					data: `http://localhost:3000/test.mp4`
				});
		    }
    	});
    	torrent.on('done', function () {
		    console.log('torrent download finished');
		});
		const files = torrent.files;
		let length = files.length;
		torrent.files.forEach(function (file) {
			if (file.name.endsWith('.mp4')) {
				// var folder = 'public/' + file.name.replace('.mp4', '').replace('.', '_');
				// file_name = `${folder}/test.mp4`;
				const source = file.createReadStream(file);
				const destination = fs.createWriteStream('public/test.mp4');
				source.pipe(destination);
				// file_name = `${file.name}`;
			}
			// console.log(Object.keys(file));
		
			// console.log(file._torrent);
			// console.log(file.path);
			// console.log(file.name);
        	// length -= 1;
		    // if (!length)
		   	// 	process.exit();
		   	
        });
        // client.remove(link);
    })

	// var read = fs.createReadStream(file);
	// var write = fs.createWriteStream('public/copy.mp4');
	// read.pipe(write);
});

// router.get('/test_torrent', function(req, res, next) {
// 	var read = fs.createReadStream(file);
// 	var write = fs.createWriteStream('public/copy.mp4');
// 	read.pipe(write);
// 	// res.setHeader("Access-Control-Allow-Origin", 'http://myDomain:8080');
// 	// res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
// 	// res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
// 	res.send({
// 		status: true,
// 		data: 'http://localhost:3000/scroll.mp4'
// 	});
// });

module.exports = router;
