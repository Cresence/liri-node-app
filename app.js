const axios = require('axios');
const inquirer = require('inquirer');
const saved = [];

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
                console.log('You picked song!');
            } catch {
                console.log("Something didn't work. Try again.");
            }
        } else if (response.question === "movie") {
            try {
                console.log('You picked movie!');
                movieSearch();
            } catch {
                console.log("Something didn't work. Try again.");
            }
        }else if (response.question === "concert"){
            try {
                console.log("You picked concert!");
            } catch {
                console.log("Something didn't work. Try again.");
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
        console.log(`If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>`)
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
            console.log(`Title: ${Title}\nYear: ${Year}\nIMDB Rating: ${imdbRating}\nRotten Tomatoes Rating: ${pH}\nCountry: ${Country}\nLanguage: ${Language}\nPlot: ${Plot}\nActors: ${Actors}`);
            console.log('Thanks for using Liri!');
        });
    }
}


askQuestion();