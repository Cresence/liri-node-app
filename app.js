const dotenv = require('dotenv').config();
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
    
    // Then run a request with axios to the OMDB API with the movie specified
    queryUrl = "http://www.omdbapi.com/?t=" + inquiry.movie + "&y=&plot=short&apikey=trilogy";


     // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);
    
    // Then create a request with axios to the queryUrl
    // ...

    axios.get(queryUrl).then(function(response){
    
        // const {name, Year, plot} = response.data;
    
        // If the request with axios is successful
        console.log('It worked! See response below:');
        console.log(response.data);
        // console.log(name);
        // console.log(Year);
        // console.log(plot);
    });

}


askQuestion();