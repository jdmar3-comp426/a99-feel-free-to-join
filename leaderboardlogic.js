import {leaderBoard} from "./functions.js";
window.addEventListener( "load" , function() {
    const setup = document.getElementById("ranking");
    console.log(setup);
    setup.addEventListener("click", function(event) {
        event.preventDefault();
        leaderBoard();
        console.log("got here");

    })
})