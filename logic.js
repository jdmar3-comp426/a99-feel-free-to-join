import {sendData, startGame} from "./functions.js";
window.addEventListener( "load" , function() {
    let userInfo = {strikes: 0, word: "", userView: [], started: false, currentHighScore: 0, score: 0, id: ""}
    if (localStorage.getItem("id") == -1) {
        alert("Please log in to play the game");
    }
    else {
        console.log(`http://${location.hostname}:5000/app/user/${localStorage.getItem("id")}`)
        const XHR = new XMLHttpRequest();
        XHR.open("GET", `http://${location.hostname}:5000/app/user/${localStorage.getItem("id")}`)
        XHR.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                var json = (JSON.parse(XHR.response));
                console.log(json);
                userInfo.id = json.user;
                document.getElementById("name").innerHTML = userInfo.id;
                if(json.score) {
                    userInfo.currentHighScore = json.score;
                }
                document.getElementById("highscore").innerHTML = userInfo.currentHighScore
            }
        }
        XHR.send();
        
    }
    const form = document.getElementById("guess");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (!userInfo.started) {
            alert("Please start the game or log in to make a guess.")
        } else {
            sendData(userInfo, form);
        }
    });

    const setup = document.getElementById("start");
    setup.addEventListener("submit", function(event) {
        if (localStorage.getItem("id") == -1) {
            alert("I told you... log in...");
        }
        else {
            event.preventDefault();
            startGame(userInfo, "");
        }
    })
})
