require("dotenv").config();

//npm require
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var moment = require('moment');

//create spotify object to query spotify API
var spotify = new Spotify(keys.spotify);

//initates switch/case function to guide user input to the correct function
var liriInit = function (nextFunction, userInput) {
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

// MAIN PROCESS
// =====================================
liriInit(process.argv[2], process.argv.slice(3).join(" "));

function concertThis(artist) {
	if (!artist) {
		artist = 'Fleetwood Mac';
	}
	var urlHit = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

	request(urlHit, function (error, reponse, body) {
		if (error) {
			return console.log('Error occurred: ' + error);
		};

		var result = JSON.parse(body)[0];

		var concertData = [
		"\n------\nArtist: " + result.lineup,
		"Venue: " + result.venue.name,
		"Location: " + result.venue.city + ", " + result.venue.country,
		"Date: " + moment(result.datetime).format("MM/DD/YYYY") + "\n------\n",
		].join("\n\n"); 

		fs.appendFile("log.txt", concertData, function (error) {
			if (error) throw error;
			console.log(concertData);
		});
	})
}

function spotifyThis(song) {
	if (!song) {
		song = 'The Sign';
	}

	spotify.search({ type: 'track', query: song }, function (error, data) {
		if (error) {
			return console.log('Error occurred: ' + error);
		}

		var songData = [

		"\n------\nArtist: " + data.tracks.items[0].album.artists[0].name,
		"Song: " + data.tracks.items[0].name,
		"Preview Link: " + data.tracks.items[0].preview_url,
		"Album: " + data.tracks.items[0].album.name + "\n------\n",
		].join("\n\n"); 

		fs.appendFile("log.txt", songData, function (error) {
			if (error) throw error;
			console.log(songData);
		});
	});
}

function movieThis(movie) {
	if (!movie) {
		movie = 'Mr. Nobody';
	}

	var urlHit = "http://www.omdbapi.com/?i=tt3896198&apikey=73682e1e&t=" + movie + "";

	request(urlHit, function (error, response, body) {
		if (error) {
			return console.log('Error occurred: ' + error);
		}
		//this cleans the code up
		body = JSON.parse(body);
		//console logs
		var movieData = [

		"\n------\nMovie Title: " + body.Title,
		"Year: " + body.Year,
		"IMBD Rating: " + body.imdbRating,
		"Rotten Tomatoes Rating: " + body.Ratings[1].Value,
		"Country: " + body.Country,
		"Language: " + body.Language,
		"Plot: " + body.Plot,
		"Actors: " + body.Actors + "\n------\n",
		].join("\n\n"); 

		fs.appendFile("log.txt", movieData, function (error) {
			if (error) throw error;
			console.log(movieData);
		});
	});

};

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) throw error;
		// Then split it by commas (to make it more readable)
		var dataArr = data.split(",");

		if (dataArr[0] === "spotify-this-song") {
			var songs = dataArr[1].slice(1, -1);
			spotifyThis(songs);
		} else if (dataArr[0] === "concert-this") {
			var concerts = dataArr[1].slice(1, -1);
			concertThis(concerts);
		} else if (dataArr[0] === "movie-this") {
			var movies = dataArr[1].slice(1, -1);
			movieThis(movies);
		}
	});
}


