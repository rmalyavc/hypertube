var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var file = 'public/scroll.mp4';
var http = require('http');

var cors = require('cors')

var app = express()
app.use(cors());

var WebTorrent = require('webtorrent');
var client = new WebTorrent();
var torrentStream = require('torrent-stream');

const OS = require('opensubtitles-api');
const OpenSubtitles = new OS('TemporaryUserAgent');

var downloaded = {};
let torrentLength = 0;
let lastChunk = 0;
let chunkSize = 0;
let lastChunkSize = 0;
let downloadedChunksTracker = [];
let lastDownloadedPartLength = 0;
let newDownloadedPartLength = 0;
let downloadedBytes = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/get_video', function(req, res, next) {
	var file_name = `public/${req.query.movie_id}/${req.query.movie_id}.mp4`;
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
		var engine = torrentStream(link);
		let sent = false;
		
		engine.on('ready', () => {
			sent = false;
			torrentLength = engine.store.store.length;
			lastChunk = engine.store.store.lastChunkIndex;
			chunkSize = engine.store.store.chunkLength;
			lastChunkSize = engine.store.store.lastChunkLength;
			Array.from(Array(lastChunk + 1).keys()).forEach(idx => {downloadedChunksTracker[idx] = false});
			console.log('torrentLength', torrentLength);
			console.log('lastChunk', lastChunk);
			console.log('chunkSize', chunkSize);
			console.log('lastChunkSize', lastChunkSize);
			console.log('downloadedChunksTracker', downloadedChunksTracker);

			for (let i = 0; i < engine.files.length; i++) {
				file = engine.files[i];
				if (file.name.endsWith('.mp4')) {
					if (typeof src == 'undefined') {
						if (!fs.existsSync(`public/${req.query.movie_id}`))
							fs.mkdirSync(`public/${req.query.movie_id}`);
						const src = file.createReadStream();
						const dest = fs.createWriteStream(file_name);
						src.pipe(dest);
					}
				}
			}
		});

		engine.on('download', pieceIdx => {
			// console.log('Downloaded piece #', pieceIdx);
			downloadedChunksTracker[pieceIdx] = true;
			newDownloadedPartLength = getFullyDownloadedLength(downloadedChunksTracker);
			if (newDownloadedPartLength == lastDownloadedPartLength) // Only proceed if fully downloaded part grew, 
				return; // i.e. all the chunks [0:pieceIdx] are downloaded, none are skipped.
			lastDownloadedPartLength = newDownloadedPartLength; // Both these variables are measured in chunks.
			downloadedBytes = newDownloadedPartLength * chunkSize;
			downloaded[req.query.movie_id] = downloadedBytes / torrentLength * 100;
			console.log(
				`Length = ${torrentLength}`,
				`Downloaded = ${downloadedBytes}`,
				`Pecentage = ${downloaded[req.query.movie_id]}%`
			);
			if (!sent && fs.existsSync(file_name) && downloaded[req.query.movie_id] > 3) {
				sent = true;
				send_link(req, res, file_name);
			}
		});

		engine.on('idle', () => {
			console.log('All selected files downloaded');
			if (!sent && fs.existsSync(file_name)) {
				downloaded[req.query.movie_id] = 100;
				sent = true;
				send_link(req, res, file_name);
			}
			engine.destroy();
			let tmp_folder = '/tmp/torrent-stream/' + req.query.hash.toLowerCase();
			if (fs.existsSync(tmp_folder))
				fs.removeSync(tmp_folder);
		});

	  //   client.add(link, function (torrent) {
	  //   	let sent = false;
	  //   	torrent.on('download', function() {
	  //   		downloaded[req.query.movie_id] = torrent.downloaded / torrent.length * 100;
	  //   		console.log(`Length = ${torrent.length}`, `Downloaded = ${torrent.downloaded}`, `Pecentage = ${downloaded[req.query.movie_id]}%`);
	  //   		if (!sent && fs.existsSync(file_name) && downloaded[req.query.movie_id] > 3) {
	  //   			sent = true;
	  //   			send_link(req, res, file_name);
			//     }
	  //   	});
	  //   	torrent.on('done', function () {
			//     console.log('torrent download finished');
			//     if (!sent && fs.existsSync(file_name)) {
			//     	downloaded[req.query.movie_id] = 100;
	  //   			sent = true;
	  //   			send_link(req, res, file_name);
			//     }
			//     client.remove(link);
			//     let tmp_folder = '/tmp/webtorrent/' + req.query.hash.toLowerCase();
			//     if (fs.existsSync(tmp_folder)) {
			//     	fs.removeSync(tmp_folder);
			//     }
			// });
   // 	    	for (let i = 0; i < torrent.files.length; i++) {
	  //   		file = torrent.files[i];
			// 	console.log(file.name);
			// 	if (file.name.endsWith('.mp4')) {
			// 		if (typeof source == 'undefined') {
			// 			if (!fs.existsSync(`public/${req.query.movie_id}`))
			// 				fs.mkdirSync(`public/${req.query.movie_id}`);
			// 			const source = file.createReadStream(file);
			// 			const destination = fs.createWriteStream(file_name);
			// 			source.pipe(destination);
			// 		}
			// 		// break ;
			// 	}   	
   //  		}

	  //   });
	}
});

router.get('/get_subtitles', async function(req, res, next) {
	try {
		let subtitles_file = `public/${req.query.movie_id}/${req.query.lang}.vtt`;
		if (fs.existsSync(subtitles_file)) {
			res.send({
				status: true,
				data: subtitles_file.replace('public/', '')
			});
		}
		else {
			let path = req.query.path;
			let metadata = await OpenSubtitles.identify({
		        path: `public/${path}`,
		        extend: true
		    });
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
			if (subtitles[req.query.lang] && subtitles[req.query.lang][0]) {
				let tmp_file = `public/${req.query.movie_id}/${subtitles[req.query.lang][0]['filename']}`;
				let dest = fs.createWriteStream(subtitles_file);
				let tmp_dest = fs.createWriteStream(tmp_file);
				let download_link = subtitles[req.query.lang][0]['url'];

				let request = http.get(download_link, function(response) {
				    response.pipe(tmp_dest);
				    tmp_dest.on('finish', function() {
				    	tmp_dest.close(function() {
				    		let content = fs.readFileSync(tmp_file, 'utf8');
				    		let vvt_content = srt2webvtt(content);
				    		fs.writeFileSync(subtitles_file, vvt_content)
			    			res.send({
								status: true,
								data: subtitles_file.replace('public/', ''),
			    			});
				    		fs.unlink(tmp_file);
				    	});
				    });
				}).on('error', function(err) {
				    fs.unlink(tmp_file);
			    	res.send({
			    		status: false,
			    		error: 'Error on downloading subtitles'
			    	});
				});
			}
			else {
				res.send({
		    		status: false,
		    		error: 'Cannot found subtitles for specified language'
		    	});
			}
		}
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

/*\
|*| Returns the length of array part
|*| form begin (included) to first falsy element (excluded)
|*| For instance, if fed an array like this:
|*| {
|*| 	0: true,
|*| 	1: true,
|*| 	2: true,
|*| 	3: false,
|*| 	4: true
|*| }
|*| this function will return 3.
|*| 
|*| Used for calculating length of the part of video from the start
|*| that is fully downloaded with no chunks missing.
\*/

function getFullyDownloadedLength(tracker) {
	let result = 0;
	for (let i = 0; i < tracker.length; i++) {
		if (tracker[i])
			result++;
		else
			return result;
	}
}

function send_link(req, res, file_name) {
	res.send({
		status: true,
		data: {
			path: file_name.replace('public/', ''),
			percentage: downloaded[req.query.movie_id]
		}
	});
}

function srt2webvtt(data) {
  // remove dos newlines
  var srt = data.replace(/\r+/g, '');
  // trim white space start and end
  srt = srt.replace(/^\s+|\s+$/g, '');
  // get cues
  var cuelist = srt.split('\n\n');
  var result = "";
  if (cuelist.length > 0) {
    result += "WEBVTT\n\n";
    for (var i = 0; i < cuelist.length; i=i+1) {
      result += convertSrtCue(cuelist[i]);
    }
  }
  return result;
}
function convertSrtCue(caption) {
  // remove all html tags for security reasons
  //srt = srt.replace(/<[a-zA-Z\/][^>]*>/g, '');
  var cue = "";
  var s = caption.split(/\n/);
  // concatenate muilt-line string separated in array into one
  while (s.length > 3) {
      for (var i = 3; i < s.length; i++) {
          s[2] += "\n" + s[i]
      }
      s.splice(3, s.length - 3);
  }
  var line = 0;
  // detect identifier
  if (!s[0].match(/\d+:\d+:\d+/) && s[1].match(/\d+:\d+:\d+/)) {
    cue += s[0].match(/\w+/) + "\n";
    line += 1;
  }
  // get time strings
  if (s[line].match(/\d+:\d+:\d+/)) {
    // convert time string
    var m = s[1].match(/(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/);
    if (m) {
      cue += m[1]+":"+m[2]+":"+m[3]+"."+m[4]+" --> "
            +m[5]+":"+m[6]+":"+m[7]+"."+m[8]+"\n";
      line += 1;
    } else {
      // Unrecognized timestring
      return "";
    }
  } else {
    // file format error or comment lines
    return "";
  }
  // get cue text
  if (s[line]) {
    cue += s[line] + "\n\n";
  }
  return cue;
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
