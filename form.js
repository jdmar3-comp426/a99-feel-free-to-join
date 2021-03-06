
window.addEventListener( "load", function () {
    localStorage.setItem("id", -1);
    console.log(localStorage.getItem("id"));
    function sendData() {
        console.log('sending data');
        const XHR = new XMLHttpRequest(),
              FD = new URLSearchParams(new FormData( form ));
              XHR.addEventListener('error', function(event) {
                alert('Something went wrong...');
            });
            const XHR2 = new XMLHttpRequest();
            console.log(location.hostname)
            XHR.open("GET", `http://${location.hostname}:5000/app/users/login/${FD.get("user")}&${FD.get("pass")}`);
            XHR.send();
            XHR.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (XHR.response=="") {
                        XHR2.open("GET", `http://${location.hostname}:5000/app/users/${FD.get("user")}`);
                        XHR2.addEventListener('load', function(event) {
                            if (XHR2.readyState == 4 && XHR2.status == 200) {
                              if (XHR2.response=="") {
                                    newUser();
                                } else {
                                    alert("Incorrect password");
                                }
                            }              
                      });
                        XHR2.send();
                    } else {
                        var json = (JSON.parse(XHR.response));
                        console.log(json)
                        localStorage.setItem("id", json.id)
                        console.log(localStorage.getItem("id"))
                        location.href = "gamePage.html"
                    }
                }
            }
            
    }

    function newUser() {
        const XHR = new XMLHttpRequest(),
              FD = new URLSearchParams(new FormData( form ));
        XHR.open("POST", `http://${location.hostname}:5000/app/new/user` );
        XHR.send( FD );
        XHR.addEventListener('load', function(event) {
            alert("New user created. Logging in now...")
        })
        sendData();
    }

    
    
    const form = document.getElementById("signup");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        sendData();
    });
})
  