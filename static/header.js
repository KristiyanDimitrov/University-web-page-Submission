// local storage can store only strings ==> strings instead of booleans
    if (localStorage.getItem('logedIn') === null) {
        //console.log("Setting local storage variable!");
        let logedIn = "false";
        localStorage.setItem("logedIn", logedIn);
        let z = document.getElementById("logout");
        z.style.display = "block";
    }

    // local storage can store only strings

    function logIn(logingIn) {
        var x = document.getElementById("login");
        var y = document.getElementById("signup");
        var z = document.getElementById("logout");
        var v = document.getElementById("account");

        var logedIn = localStorage.getItem("logedIn");
        //console.log("localStorageRead: " + logedIn)
       // console.log("logingIn: " + logingIn)
        if (logingIn === "true") {
            logedIn = "true";
            localStorage.clear(logedIn)
            localStorage.setItem("logedIn", logedIn);
            //console.log("localStorageSet: " + localStorage.getItem("logedIn"))
            z.style.display = "block";
            v.style.display = "block";
        } else if (logingIn === "false" && logedIn === "true") {
            z.style.display = "block";
        } else if (logingIn === "logout") {
            localStorage.clear(logedIn)
            localStorage.setItem("logedIn", logingIn);
        }
        else {
            z.style.display = "none";
            v.style.display = "none";
        }

        if (logedIn === "true") {
            //console.log("LOGOUT STYLE IS :" + z.style.display)
            if (x.style.display === "none" && logedIn === "false") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
            if (y.style.display === "none" && logedIn === "false") {
                y.style.display = "block";
            } else {
                y.style.display = "none";
            }



        }
    }
