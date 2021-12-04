export function arrayToString(userinfo) {
    let array = userinfo.userView;
    console.log(array);
    let returnString = "";
    let finished = true;
    for (let i = 0; i < array.length; i++) {
        returnString += array[i]
        if(array[i] == "_") { 
            returnString += " ";
            finished = false;
        }
    }
    if (finished) {
        startGame(userinfo, "");
    }
    return returnString;
}

function win() {
    alert("Wow you won!");
}
function loss() {
    alert("RIP, the zombies got to you :/")
}

export function sendData(userInfo, form) {
    const sendRequest = new XMLHttpRequest();
    let signupInfo = new FormData(form);

    sendRequest.addEventListener("error", function(event) {
        alert("Submission unsuccessful, please try again");
    });
    if (document.getElementById('guesses').innerText.includes([...signupInfo][0][1]) || [...signupInfo][0][1] in userInfo.userView) { 
        form.reset();
    }
    else {
        let correctGuess = false;
        for(let i = 0; i < userInfo.word.length; i++) {
            if(userInfo.word[i].toLowerCase() == [...signupInfo][0][1].toLowerCase()) {
                userInfo.userView[i] = [...signupInfo][0][1].toLowerCase();
                correctGuess = true;
            }
        }
        if (correctGuess){
            document.getElementById("known").innerHTML = arrayToString(userInfo);
        } else {
            document.getElementById('guesses').innerHTML += [...signupInfo][0][1].toLowerCase();
            userInfo.strikes += 1;
            document.getElementById('strikes').innerHTML = userInfo.strikes;
            if (strikes == 100) {

            }
        }
        form.reset();
    }
}

export function countScore(score) {
    return score + 1;
}

export function resetScore() {
    return 0;
}

export function loadWords(startGame, userInfo) {
    const sendRequest = new XMLHttpRequest();
    sendRequest.open("GET", "http://localhost:5000/app/word/");
    let response = "incorrect";
    sendRequest.onreadystatechange = function() {
        if (this.readyState==4 && this.status == 200) {
            response = (JSON.parse(sendRequest.response).message);
            console.log("no");
            startGame(userInfo, response);
        }
    }
    sendRequest.send();
}

export function startGame(userInfo, w) {
    if (w == ""){
        console.log("yes");
        w = loadWords(startGame, userInfo);
    } else {
        document.getElementById('guesses').innerHTML = "";
        userInfo.started = true;
        userInfo.userView = [];
        userInfo.word = w;
        for(let i = 0; i < userInfo.word.length; i++) {
            userInfo.userView.push("_")
        }
        document.getElementById("known").innerHTML = arrayToString(userInfo);
    }
}

export function leaderBoard() {
    const sendRequest = new XMLHttpRequest();
    sendRequest.open("GET", "http://localhost:5000/app/users/scores/", true);
    let response = "incorrect";
    sendRequest.onreadystatechange = function() {
        if (this.readyState==4 && this.status == 200) {
            response = (JSON.parse(sendRequest.response));
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                let score = response[i];
                document.getElementById("showrank").innerText+=score.user + '\t\t' + score.score + '\n';
            }
        }
    }
    sendRequest.send();
    return response;
}