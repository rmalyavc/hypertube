var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var file = 'public/scroll.mp4';

var cors = require('cors')

var app = express()
app.use(cors());

var WebTorrent = require('webtorrent');
var client = new WebTorrent();

const OS = require('opensubtitles-api');
const OpenSubtitles = new OS('TemporaryUserAgent');

var downloaded = {};

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
			data: {
				path: file_name.replace('public/', ''),
				percentage: downloaded[req.query.movie_id]
			}
		});
	}
	else {
		var link = `magnet:?xt=urn:btih:${req.query.hash}&tr=http://track.one:1234/announce&tr=udp://track.two:80`;
		console.log(link);
	    client.add(link, function (torrent) {
	    	let sent = false;
	    	torrent.on('download', function() {
	    		downloaded[req.query.movie_id] = torrent.downloaded / torrent.length * 100;
	    		// console.log(`Length = ${torrent.length}`, `Downloaded = ${torrent.downloaded}`, `Pecentage = ${downloaded[req.query.movie_id]}%`);
	    		if (!sent && fs.existsSync(file_name) && downloaded[req.query.movie_id] > 3) {
	    			sent = true;
	    			send_link(req, res, file_name);
			    }
	    	});
	    	torrent.on('done', function () {
			    console.log('torrent download finished');
			    if (!sent && fs.existsSync(file_name)) {
			    	downloaded[req.query.movie_id] = 100;
	    			sent = true;
	    			send_link(req, res, file_name);
			    }
			    client.remove(link);
			    let tmp_folder = '/tmp/webtorrent/' + req.query.hash.toLowerCase();
			    if (fs.existsSync(tmp_folder)) {
			    	fs.removeSync(tmp_folder);
			    }
			});
   	    	for (let i = 0; i < torrent.files.length; i++) {
	    		file = torrent.files[i];
				console.log(file.name);
				if (file.name.endsWith('.mp4')) {
					if (typeof source == 'undefined') {
						if (!fs.existsSync(`public/${req.query.movie_id}`))
							fs.mkdirSync(`public/${req.query.movie_id}`);
						const source = file.createReadStream(file);
						const destination = fs.createWriteStream(file_name);
						source.pipe(destination);
					}
					// break ;
				}   	
    		}

	    });
	}
});

router.get('/get_subtitles', async function(req, res, next) {
	try {
		let path = req.query.path.replace('http://localhost:3000/', '');
		let metadata = await OpenSubtitles.identify({
	        path: `public/${path}`,
	        extend: true
	    });
	    console.log('Metadata', metadata);
		let subtitles = await OpenSubtitles.search({
		    sublanguageid: req.query.lang,
		    lang: req.query.lang,
		    langcode: req.query.lang,
		    filesize: metadata.moviebytesize,
		    hash: metadata.moviehash,
		    path: `public/${path}`,
		    filename: path.substring((path.lastIndexOf('/') + 1), path.length),
		    limit: '3',
		    imdbid: req.query.imdb
		});
		console.log('Result', subtitles[req.query.lang] || subtitles);
		res.send({
			status: true,
			data: subtitles[req.query.lang] || subtitles
		});
	}
	catch (err) {
		res.send({
			status: false,
			error: 'Error getting subtitles'
		});
		console.log(err);
	}
});

router.get('/check_percentage', function(req, res, next) {
	var file_name = `public/${req.query.movie_id}/${req.query.movie_id}.mp4`;
	if (fs.existsSync(file_name)) {
		res.send({
			status: true,
			data: {
				percentage: downloaded[req.query.movie_id]
			}
		});
	}
	else {
		res.send({
			status: false,
			data: {
				percentage: 0
			}
		});
	}
});


function send_link(req, res, file_name) {
	res.send({
		status: true,
		data: {
			path: file_name.replace('public/', ''),
			percentage: downloaded[req.query.movie_id]
		}
	});
}

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
