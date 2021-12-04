export function arrayToString(userinfo) {
    let array = userinfo.userView;
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
        document.getElementById("words").innerHTML += userinfo.word + ", "
        scoreWord(userinfo);
        startGame(userinfo, "");
    }
    return returnString;
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
            if (userInfo.strikes >= 50) {
                resetGame(userInfo);
            }
        }
        form.reset();
    }
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
            startGame(userInfo, response);
        }
    }
    sendRequest.send();
}

export function startGame(userInfo, w) {
    if (w == ""){
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
            for (let i = 0; i < response.length; i++) {
                let score = response[i];
                document.getElementById("showrank").innerText+=score.user + '\t\t' + score.score + '\n';
            }
        }
    }
    sendRequest.send();
    return response;
}

function scoreWord(userinfo) {
    let score = 0;
    for (let letter of userinfo.word) {
        switch(letter){
            case 'a':
            case 'e':
            case 'i':
            case 'l':
            case 'n':
            case 'o':
            case 'r':
            case 's':
            case 't':
            case 'u':
                score += 1;
                break;
            case 'd':
            case 'g':
                score += 2;
                break;
            case 'b':
            case 'c':
            case 'm':
            case 'p':
                score += 3;
                break;
            case 'f':
            case 'h':
            case 'v':
            case 'w':
            case 'y':
                score += 4;
                break;
            case 'k':
                score += 5;
                break;
            case 'j':
            case 'x':
                score += 8;
                break;
            case 'z':
            case 'q':
                score += 10;
                break;
        }
    }
    userinfo.score += score;
    document.getElementById("score").innerHTML = userinfo.score;
    if (parseInt(document.getElementById("highscore").innerText) < userinfo.score) {
        document.getElementById("highscore").innerHTML = userinfo.score;
    }
}

function resetGame(userInfo) {
    document.getElementById('guesses').innerHTML = "";
    document.getElementById('known').innerHTML = "";
    document.getElementById('strikes').innerHTML = "";
    document.getElementById('score').innerHTML = 0;
    document.getElementById('words').innerHTML = '';
    if(userInfo.score > userInfo.currentHighScore) {
        const XHP = new XMLHttpRequest();
        XHP.open("PATCH", `http://localhost:5000/app/update/highscore/${localStorage.getItem("id")}-${userInfo.score}`)
        XHP.send();
        XHP.addEventListener('load', function() {
            alert("New Highscore!!!");
        })
    }
    userInfo.started = false;
    alert("Game over. Please start a new game.")
}