// Javascript for Homework Assignment 4
// jQuery - Crystal Collector
// Rhonda Johnson

$(document).ready(function () {
    crystalButton = ['assets/images/red.png', 'assets/images/blue.png', 'assets/images/yellow.png', 'assets/images/green.png'];
    var crystals = $("#crystals");
    var wins = 0;
    var losses = 0;
    var playerTotal = 0;
    var targetNumber = 0;
    var targetMin = 19;
    var targetMax = 120;
    var crystalMin = 1;
    var crystalMax = 12;
    var numberOfCrystals = 4;

    //Formula for random number between x & y
    //Math.floor(Math.random() * ((y-x)+1) + x);
    var getRandomNumber = function (x, y) {
        var number = Math.floor(Math.random() * ((y - x) + 1) + x);
        return number;
    }

    // Check to see if the game is over
    var checkGameOver = function () {

        // Player Wins : total = targetNumber
        if (playerTotal == targetNumber) {
            wins++;
                       $("#winLossMessage").text("You Win! Great Job!!")
            $("#winCount").text(wins);

            // Clear the crystals div
            crystals.empty();
            newGame();
        }

        // Player Loses : total > targetNumber
        else if (playerTotal > targetNumber) {
            losses++;
            $("#winLossMessage").text("Over Target - You Lose!");
            $("#lossCount").text(losses);

            // Clear the crystals div
            crystals.empty();
            newGame();

        }
        // Continue with game
        else {
            $("#winLossMessage").text("Keep on Playing");
        }

        // update the running total display
        $("#runningTotal").text(playerTotal);
    }


    // **************************************************************************************
    // Begin a new game by getting a new Target number and new values for the 4 crystals      *
    // **************************************************************************************

    var newGame = function () {
        playerTotal = 0;
        var crystalValue = -1;

        // Get targetNumber for user to guess
        targetNumber = getRandomNumber(targetMin, targetMax);
        $("#targetNumber").text(targetNumber);

        // Make the crystals
        for (var i = 0; i < numberOfCrystals; i++) {
            crystalValue = getRandomNumber(crystalMin, crystalMax);

            // For debugging
            console.log("New Game\nBetween 19 & 120: " + targetNumber + "\nBetween 1 and 12: "
                + "\n i = " + i + " current crystalValue = " + crystalValue);

            // For each iteration, we will create an imageCrystal
            var imageCrystal = $("<img>");

            // First each crystal will be given the class ".crystal-image".
            // This will allow the CSS to take effect.
            imageCrystal.addClass("crystal-image");

            // Each imageCrystal will be given a src link to the crystal image
            imageCrystal.attr("src", crystalButton[i]);

            // Each imageCrystal will be given a data attribute called data-crystalValue.
            // This data attribute will be set equal to the array value.
            imageCrystal.attr("data-crystalvalue", crystalValue);

            // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
            // alert("imageCrystal = " + imageCrystal);
            crystals.append(imageCrystal);
        }
    }

    //  ********************
    //  Begin a New Game   *
    //  ********************
    newGame();

    // This time, our click event applies to every single crystal on the page. Not just one.
    crystals.on("click", ".crystal-image", function () {

        // Determining the crystal's value requires us to extract the value from the data attribute.
        // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
        // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
        // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

        var crystalValue = ($(this).attr("data-crystalvalue"));
        crystalValue = parseInt(crystalValue);

        // We then add the crystalValue to the user's "counter" which is a global variable.
        // Every click, from every crystal adds to the global counter.
        playerTotal += crystalValue;

        // Check if player wins/loses/continues
        checkGameOver();
    });
})
