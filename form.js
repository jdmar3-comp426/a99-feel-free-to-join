
window.addEventListener( "load", function () {
    function sendData() {
        console.log('sending data');
        const XHR = new XMLHttpRequest(),
              FD = new URLSearchParams(new FormData( form ));

            XHR.addEventListener('error', function(event) {
                alert('Something went wrong...');
            });

            XHR.addEventListener('load', function(event) {
                alert('Data was sent and response loaded.');
            });
            XHR.open("GET", `http://localhost:5000/app/users/${FD.get("pass")}`);
            XHR.send();
            XHR.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var json = (JSON.parse(XHR.response));
                    if (Object.keys(json).length === 0) {
                        newUser();
                    } else {
                        if (json.pass == md5(form.getElementById("pass"))) {
                            console.log("Login complete. Sending you to game now...");
                            //TODO do stuff to load user into game with potential saved data
                        }
                    }
                }
            }
            
    }

    // document.getElementById('delete').addEventListener('click', deleteUser);

    function newUser() {
        const XHR = new XMLHttpRequest(),
              FD = new URLSearchParams(new FormData( form ));
        XHR.open("POST", "http://localhost:5000/app/new/user" );
        XHR.send( FD );
    }

    // function deleteUser() {
    //     const XHR = new XMLHttpRequest(),
    //        FD = new URLSearchParams(new FormData( form ));
    //     XHR.open("DELETE", "http://localhost:5000/app/delete/user:id");
    //     XHR.send( FD );
    //    console.log("User Deleted");
    // }
    
    const form = document.getElementById("signup");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        sendData();
    });
})
  