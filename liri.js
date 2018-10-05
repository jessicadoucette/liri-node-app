require("dotenv").config();

//npm require
var keys = require("./key");
var Spotify = require('node-spotify-api');
var request = require('request'); //how does this pull in bands and movie? 
//ombd api - http://www.omdbapi.com/?i=tt3896198&apikey=73682e1e
// var moment = require('moment');
// moment().format();

//create spotify object to query spotify API
var spotify = new Spotify(keys.spotify);



var liriInit = function(nextFunction, userInput) {
	switch (nextFunction) {
	case "concert-this":
		concertThis(userInput);
		break;
	case "spotify-this-song":
		spotifyThis(userInput);
		break;
	case "movie-this":
		movieThis(userInput);
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
	default:
		console.log("LIRI doesn't know that");
	}
 };
 
 // Function which takes in command line arguments and executes correct function accordingly
 
 
 // MAIN PROCESS
 // =====================================
	liriInit(process.argv[2], process.argv.slice(3).join(" "));

	function spotifyThis(song) {
		spotify.search({ type: 'track', query: song }, function(err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
			console.log("Song: " + data.tracks.items[0].name); 
			console.log("Preview Link: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name);
		});


	}

	function movieThis(movie) {
		console.log(movie);
		var urlHit = "http://www.omdbapi.com/?i=tt3896198&apikey=73682e1e&t=" + movie + ""; 
		
		request(urlHit, function(error, response, body) {
			body=JSON.parse(body); 
			console.log(body.Year); 
			console.log(body); 
		}); 
	
	}; 