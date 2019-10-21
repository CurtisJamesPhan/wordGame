
var http = require('http');
//var play = require("./play.js");
var fisheryFrenzy = require("./fisheryFrenzy.js");
const exactMath = require('exact-math');


var costOfScratcher = 1;

// Percentage of player wins in decimal format
//                  free $2   $5    $10   $100
//                  30%  8%   3%  .50%    .02% 
// var chanceArray = [.30, .08, .03, .0050, .00002];
var chanceArray = [.25, .075, .025, .015, .00002];
//                 .69  .61  .58  .575  .5748

var safetyNetSum = 0.0;

for (all in chanceArray) {
    safetyNetSum = exactMath.add(safetyNetSum, chanceArray[all]);
}

// var wantedPercentage = .4152;
var wantedPercentage = .36502;

if (safetyNetSum == wantedPercentage) {

    var chanceArrayConversion = [
        exactMath.sub(1.0, chanceArray[0]),
        exactMath.sub(1.0, chanceArray[0], chanceArray[1]),
        exactMath.sub(1.0, chanceArray[0], chanceArray[1], chanceArray[2]),
        exactMath.sub(1.0, chanceArray[0], chanceArray[1], chanceArray[2], chanceArray[3]),
        exactMath.sub(1.0, chanceArray[0], chanceArray[1], chanceArray[2], chanceArray[3], chanceArray[4])
    ];

    // Instantiates a win counter for each category
    let numTicketWins = 0, numTwoDollarWins = 0, numFiveDollarWins = 0, numTenDollarWins = 0, numHundredDollarWins = 0, numHouseWins = 0;

    // Scratches a minimum of the 'numOfBoughtScratchers'
    var numOfBoughtScratchers = 10;
    var staticTotalNumOfScratchers = numOfBoughtScratchers;
    var totalNumOfScratchers = numOfBoughtScratchers;


    for (var i = 0; i < staticTotalNumOfScratchers; i++) {
        var randomValue = Math.random();
        if (randomValue > chanceArrayConversion[0]) {
            console.log("Free Ticket");
            numTicketWins++;
            totalNumOfScratchers++;
            var fisheryArray = fisheryFrenzy.win();



            // since a free ticket was won, i is decremented so that one more scratcher may be scratched
            i = i - 1;
        }
        else if (randomValue > chanceArrayConversion[1]) {
            console.log("$2");
            //         play.twoScratcherWin();
            numTwoDollarWins++;
            var fisheryArray = fisheryFrenzy.win();

            // console.log(`randomWord: ${fisheryArray[0]}`)
            // // randomWord Array
            // console.log(`randomWord: ${fisheryArray[0]}`);
            // // noDupes Array
            // console.log(`noDupes array: ${fisheryArray[1]}`);
            // // extraLetters Array
            // console.log(`extraLetters array: ${fisheryArray[2]}`)
        }
        else if (randomValue > chanceArrayConversion[2]) {
            console.log("$5");
            var fisheryArray = fisheryFrenzy.win();
            numFiveDollarWins++;
        }
        else if (randomValue > chanceArrayConversion[3]) {
            console.log("$10");
            var fisheryArray = fisheryFrenzy.win();
            numTenDollarWins++;
        }
        else if (randomValue > chanceArrayConversion[4]) {
            console.log("$100 -----JACKPOT-----");
            var fisheryArray = fisheryFrenzy.win();
            numHundredDollarWins++;
        }
        else {
            console.log("House Wins");
            numHouseWins++;
            var fisheryArray = fisheryFrenzy.loss();
            // houseScratcherWin();
            //           play.houseScratcherWin();
        }
    }

    var monetaryValue2 = 2 * numTwoDollarWins;
    var monetaryValue5 = 5 * numFiveDollarWins;
    var monetaryValue10 = 10 * numTenDollarWins;
    var monetaryValue100 = 100 * numHundredDollarWins;

    console.log();
    console.log(`The number of free ticket wins: ${numTicketWins}       \t\t | won ${(100 * (numTicketWins / totalNumOfScratchers)).toFixed(4)}% of the time`);
    console.log(`The number of $2 wins: \t\t${numTwoDollarWins} \t\t | won ${(100 * (numTwoDollarWins / totalNumOfScratchers)).toFixed(4)}% of the time`);
    console.log(`\t$${monetaryValue2} `)
    console.log(`The number of $5 wins: \t\t${numFiveDollarWins} \t\t | won ${(100 * (numFiveDollarWins / totalNumOfScratchers)).toFixed(4)}% of the time`);
    console.log(`\t$${monetaryValue5} `)
    console.log(`The number of $10 wins: \t${numTenDollarWins} \t\t | won ${(100 * (numTenDollarWins / totalNumOfScratchers)).toFixed(4)}% of the time`);
    console.log(`\t$${monetaryValue10} `)
    console.log(`The number of $100 wins: \t${numHundredDollarWins} \t\t\t | won ${(100 * (numHundredDollarWins / totalNumOfScratchers)).toFixed(4)}% of the time`);
    console.log(`\t$${monetaryValue100} `)
    console.log(`The number of house wins: \t${numHouseWins} \t | won ${(100 * (numHouseWins / totalNumOfScratchers)).toFixed(4)}% of the time`);

    console.log();
    console.log(`The number of bought scratchers(${numOfBoughtScratchers}) + free scratchers(${(totalNumOfScratchers - numOfBoughtScratchers)}) = ${totalNumOfScratchers} `);
    console.log(`House Profit = $${(numOfBoughtScratchers * costOfScratcher) - (monetaryValue2 + monetaryValue5 + monetaryValue10 + monetaryValue100)} `);

    console.log(`${safetyNetSum} = ${wantedPercentage} `)
}
else {
    console.log(`${safetyNetSum} != ${wantedPercentage} `)
}

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello World!');
}).listen(8080);
