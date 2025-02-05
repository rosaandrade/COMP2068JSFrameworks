const prompt = require('prompt');
prompt.start();

const schema = {
    properties: {
        userSelection: {
            description: 'Enter your choice (ROCK, PAPER, or SCISSORS)',
            type: 'string',
            required: true,
            pattern: /^(ROCK|PAPER|SCISSORS)$/i,
            message: 'You must enter ROCK, PAPER, or SCISSORS'
        }
    }
};

prompt.get(schema, function(err, result) {
    if (err) {
        console.error(err);
        return;
    }
    //-----------------------------------------------------------
    //USER'S INPUT
    const userSelection = result.userSelection.toUpperCase();


    //-----------------------------------------------------------
    // COMPUTERS DECISION
    // Generate a random computer choice.
    //The Math.random() static method returns a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1,
    const randomValue = Math.random();
    let computerSelection;
    if (randomValue <= 0.34) {
        computerSelection = "PAPER";
    } else if (randomValue <= 0.67) {
        computerSelection = "SCISSORS";
    } else {
        computerSelection = "ROCK";
    }
    console.log("Computer's choice: " + computerSelection+" (Random Value: "+randomValue+")");
    console.log("User's choice: " + userSelection);
    
    //-----------------------------------------------------------
    //CHECK THE RESULT
    if(userSelection === computerSelection) {
        console.log("It's a tie!");
    } else if (
        (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
        (userSelection === "PAPER" && computerSelection === "ROCK") ||
        (userSelection === "SCISSORS" && computerSelection === "PAPER")
    ) {
        console.log("User wins!");
    } else {
        console.log("Computer wins!");
    }
});

