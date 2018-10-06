require("dotenv").config();

//npm require
var keys = require("./key");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var moment = require('moment');

//create spotify object to query spotify API
var spotify = new Spotify(keys.spotify);



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

// Function which takes in command line arguments and executes correct function accordingly


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

		console.log("\n------\nArtist: " + result.lineup); 
		console.log("Venue: " + result.venue.name); 
		console.log("Location: " + result.venue.city + ", " + result.venue.country)
		console.log("Date: " + moment(result.datetime).format("MM/DD/YYYY") + "\n------\n");
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
		console.log("\n------\nArtist: " + data.tracks.items[0].album.artists[0].name);
		console.log("Song: " + data.tracks.items[0].name);
		console.log("Preview Link: " + data.tracks.items[0].preview_url);
		console.log("Album: " + data.tracks.items[0].album.name + "\n------\n");
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
		console.log("\n------\nMovie Title: " + body.Title);
		console.log("Year: " + body.Year);
		console.log("IMBD Rating: " + body.imdbRating);
		console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
		console.log("Country: " + body.Country);
		console.log("Language: " + body.Language);
		console.log("Plot: " + body.Plot);
		console.log("Actors: " + body.Actors + "\n------\n");
	});
	// fs.appendFile("log.txt", actorData + divider, function(err) {
	// 	if (err) throw err;
	// 	console.log(actorData);
	// });
};

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(error, data){
		if (error) throw error;
		// Then split it by commas (to make it more readable)
		var dataArr = data.split(",");

		if (dataArr[0] === "spotify-this-song") {
			var songs = dataArr[1].slice(1, -1);
			spotifyThis(songs);
		} else if (dataArr[0] === "concert-this") {
			var concerts = dataArr[1].slice(1, -1);
			concertThis(concerts);
		} else if(dataArr[0] === "movie-this") {
			var movies = dataArr[1].slice(1, -1);
			movieThis(movies);
		} 
	});
}


