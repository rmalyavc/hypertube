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
	var file_name = `public/${req.query.movie_id}/${req.query.movie_id}.mp4`;
	console.log(file_name);
	if (fs.existsSync(file_name)) {
		console.log('File exists!');
		res.send({
			status: true,
			data: file_name.replace('public/', '')
		});
	}
	else {
		var count = 0;
		// console.log('Else entered');
		var link = `magnet:?xt=urn:btih:${req.query.hash}&tr=http://track.one:1234/announce&tr=udp://track.two:80`;
		console.log(link);
	    client.add(link, function (torrent) {
	    	let sent = false;
	    	torrent.on('download', function() {
	    		console.log(`DOWNLOAD_${count}`);
	    		if (!sent && fs.existsSync(file_name)) {
	    			console.log('Exists!');
	    			sent = true;
	    			res.send({
						status: true,
						data: file_name.replace('public/', ''),
					});
			    }
			    count++;
	    	});
	    	torrent.on('done', function () {
			    console.log('torrent download finished');
			});
   	    	for (let i = 0; i < torrent.files.length; i++) {
	    		file = torrent.files[i];
	    		console.log(file.name);
				if (file.name.endsWith('.mp4')) {
					if (!fs.existsSync(`public/${req.query.movie_id}`))
						fs.mkdirSync(`public/${req.query.movie_id}`);
					const source = file.createReadStream(file);
					// file_name = 'public/test.mp4';
					const destination = fs.createWriteStream(file_name);
					source.pipe(destination);
					break ;
				}   	
    		}

	    });
	}
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
