import {sendData, startGame} from "./functions.js";
window.addEventListener( "load" , function() {
    let userInfo = {strikes: 0, word: "", userView: [], started: false}
    const form = document.getElementById("guess");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (!userInfo.started) {
            alert("Please start the game.")
        } else {
            sendData(userInfo, form);
        }
    });

    const setup = document.getElementById("start");
    setup.addEventListener("submit", function(event) {
        event.preventDefault();
        startGame(userInfo, "");
    })
})