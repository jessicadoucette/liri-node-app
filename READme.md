<h1>LIRI Node App</h1>

<h2>Overview</h2>
In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. <strong>LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.</strong>

<h2>Node Packages Used</h2>
<ul>
<li><a href = "https://www.npmjs.com/package/node-spotify-api">Node Spotify API</a><li>
<li><a href="https://www.npmjs.com/package/request">Request</a></li>
<li><a href = "http://www.omdbapi.com/">OMBD API</a></li>
<li><a href = "http://www.artists.bandsintown.com/bandsintown-api">Bands in Town API</a></li>
<li><a href = "https://www.npmjs.com/package/moment">Moment</a></li>
<li><a href = "https://www.npmjs.com/package/dotenv">DotEnv</a></li>
</ul>

<h2>The App</h2>
liri.js holds the meat of the project. 

<h3>Bands in Town</h3>
Command Line: node liri.js concer-this <insert artist name>

This will show the following information about the artists' concert date in your terminal/bash window: 

Venue
Location (City and Country)
Date (formatted using moment.js)

Command Line will also append data to the log.txt file.


<h3>Spotify</h3>
Command Line: node liri.js spotify-this-song <insert song title>

This will show the following information about the song in your terminal/bash window: 

Artist(s)
Song Name
A preview link of the song from Spotify
The album that the song is from
If no song is provided then your program will default to "The Sign"

Command Line will also append data to the log.txt file.

<h3>OMBD</h3>
Command Line: node liri.js movie-this <insert movie title>

This will output the following information to your terminal/bash window:

Movie title
Year
IMDB Rating of the movie
Rotten Tomatoes Rating
Country where the movie was produced
Language of the movie
Plot of the movie.
Actors in the movie
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

Command Line will also append data to the log.txt file.

<h3>Do What It Says</h3>
node liri.js do-what-it-says

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call the spotify-this song LIRI command.
