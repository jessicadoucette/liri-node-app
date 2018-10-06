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
	var urlHit = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"; 

	request(urlHit, function (error, reponse, body) {
		if (error) {
			return console.log('Error occurred: ' + error);
		}; 

		var result = JSON.parse(body)[0]; 

		console.log("\nArtist: " + result.lineup); 
		console.log("Venue: " + result.venue.name); 
		console.log("Location: " + result.venue.city + ", " + result.venue.country)
		console.log("Date: " + moment(result.datetime).format("MM/DD/YYYY") + "\n");

		// console.log(Venue: )
	})
}

// 	Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

function spotifyThis(song) {
	spotify.search({ type: 'track', query: song }, function (err, data) {
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
	var urlHit = "http://www.omdbapi.com/?i=tt3896198&apikey=73682e1e&t=" + movie + "";

	request(urlHit, function (error, response, body) {
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
		// console.log(body); 

		fs.appendFile("random.txt", showData, function (err) {
			if (err) throw err;
			console.log(showData);
		});
	});

};


