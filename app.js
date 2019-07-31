require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const spotify = new Spotify(keys.spotify);
const moment = require('moment');

// ---- Moment Testing ----- //
// let randomDate = "02/23/1999";
// let randomFormat = "MM/DD/YYYY"
// let convertedDate = moment(randomDate, randomFormat);
// console.log(convertedDate.format("MM/DD/YY"));
// ----- End of Testing ----- //


const askQuestion = function () {
    return inquirer.prompt([
        {
            name:"question",
            type:"list",
            message:"Insert search category",
            choices: ["song", "movie", "concert"]
        }
    ]).then(function(response){
        if (response.question === "song") {
            try {
                console.log('-----\nYou picked song!\n-----');
                songSearch();
            } catch {
                console.log("Something didn't work. Try again.\n-----");
                askQuestion();
            }
        } else if (response.question === "movie") {
            try {
                console.log('-----\nYou picked movie!\n-----');
                movieSearch();
            } catch {
                console.log("Something didn't work. Try again.\n-----");
                askQuestion();
            }
        }else if (response.question === "concert"){
            try {
                console.log("-----\nYou picked concert!\n-----");
                concertSearch();
            } catch {
                console.log("Something didn't work. Try again.\n-----");
                askQuestion();
            }
        }
    });
};


const movieSearch = async () => {
    const inquiry = await inquirer.prompt([
        {
            name:"movie",
            message:"What movie do you want to search for?"
        }
    ])


    if (inquiry.movie === ''){
        console.log(`-----\nWell, I'm not a mind reader but...\nIf you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>\n-----`);
        console.log('Thanks for using Liri!\nLoad the app again to search again!\n-----');
    }else{
    // Then run a request with axios to the OMDB API with the movie specified
        queryUrl = "http://www.omdbapi.com/?t=" + inquiry.movie + "&y=&plot=short&apikey=trilogy";


         // This line is just to help us debug against the actual URL.
        // console.log(queryUrl);
        
        // Then create a request with axios to the queryUrl
        // ...

        axios.get(queryUrl).then(function(response){
        
            const {Title, Year, imdbRating, pH, Country, Language, Plot, Actors} = response.data;
        
            // If the request with axios is successful
            console.log('It worked! See movie info below:');
            console.log(`-----\nTitle: ${Title}\nYear: ${Year}\nIMDB Rating: ${imdbRating}\nRotten Tomatoes Rating: ${pH}\nCountry: ${Country}\nLanguage: ${Language}\nPlot: ${Plot}\nActors: ${Actors}\n-----`);
            console.log('Thanks for using Liri!\nLoad the app again for additional searches! (TEMP)');
        });
    }
}

const songSearch = async () => {
    const query = await inquirer.prompt([
        {
            name:'song',
            message:'What song do you want to search for?'
        }
    ])
    song = query.song;
    if (song === ''){
        console.log(`-----\nI'm not a mind reader, please try again:\n `);
        songSearch();
    }else {
        spotify.search({
            type:'track',
            query: song,
            limit: 5
        }).then(function(response) {
            console.log(`-----\nAlbum: ${response.tracks.items[0].album.name}\nArtists: ${response.tracks.items[0].artists[0].name}Track Number: ${response.tracks.items[0].track_number}\nTrack: ${response.tracks.items[0].name}\n-----`);
            console.log('Thanks for using Liri!\nLoad the app again for additional searches! (TEMP)');
        }).catch(function(err) {
            console.log(err + "Something didn't work. Try again");
            songSearch();
        });
    };
};


// console.log('-----\nHello! Welcome to Liri! Your CLI-based Search Engine!\nPlease select your search critera below:');
// askQuestion();

// * Name of the venue

// * Venue location

// * Date of the Event (use moment to format this as "MM/DD/YYYY")

const concertSearch = async () => {

    const inq = await inquirer.prompt([
        {
            name:"concert",
            message:"What band would you like the upcoming gigs for?"
        }
    ])
    artist = inq.concert;
    if (artist === ''){
        console.log(`-----\nI'm not a mind reader, please try again:\n `);
        concertSearch();
    } 
    else{
        queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming";
        axios.get(queryUrl).then(function(response){
            try {
                const {venue, datetime} = response.data[0];
                // const {venue2, datetime2} = response.data[1];
                // const {venue3, datetime3} = response.data[2];
                let date = datetime.substring(0,10);
                let convertedSongDate = moment(date, "YYYY/MM/DD");
                // let date = datetime2.substring(0,10);
                // let convertedSongDate2 = moment(date, "YYYY/MM/DD");
                // let date = datetime3.substring(0,10);
                // let convertedSongDate3 = moment(date, "YYYY/MM/DD");
                console.log(`-----\nVenue Name: ${venue.name}\nCountry: ${venue.country}, City: ${venue.city}\nDate of Concert: ${convertedSongDate.format("MM/DD/YYYY")}`);
                // console.log(`Venue Name: ${venue2.name}\nCountry: ${venue2.country}, City: ${venue2.city}\nDate of Concert: ${convertedSongDate2.format("MM/DD/YYYY")}`);
                // console.log(`Venue Name: ${venue3.name}\nCountry: ${venue3.country}, City: ${venue3.city}\nDate of Concert: ${convertedSongDate3.format("MM/DD/YYYY")}\n-----`);
            } catch {
                console.log("-----\nSomething didn't work. Try again.\n-----");
                concertSearch();
            }
        });
    };
};


// ----- Working Code to grab txt from file in folder -----

// fs.readFile('./random.txt', "utf8", bar);


// function bar (err, data) {
//     err ? Function("error", "throw error")(err) : console.log(data);

//     const dataArr = data.split(',');

//     console.log(dataArr);
// };

askQuestion();