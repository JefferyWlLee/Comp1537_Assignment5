// invoke ready and pass in a callback function
ready(function () {

    console.log("Client script loaded.");

    // a function declaration inside of a callback ... which takes a callback function :O
    function ajaxGET(url, callback) {

        const xhr = new XMLHttpRequest();
        console.log("xhr", xhr);
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                //console.log('responseText:' + xhr.responseText);
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    //clear button unique to the spearheads content
    document.querySelector("#character-clear").addEventListener("click", function (e) {

            for (let i = 0; i < this.parentNode.childNodes.length; i++) {
                if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
                    document.getElementById("here").innerHTML = "";
                }
            }
            document.getElementById("character-clear").setAttribute("style", "display:none;");
            document.getElementById("character-exit").setAttribute("style", "display:none;");
            document.getElementById("character-show").setAttribute("style", "display:inline;");
        });
        document.querySelector("#character-clear-html").addEventListener("click", function (e) {

            for (let i = 0; i < this.parentNode.childNodes.length; i++) {
                if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
                    document.getElementById("html").innerHTML = "";
                }
            }
            document.getElementById("character-clear-html").setAttribute("style", "display:none;");
            document.getElementById("character-exit-html").setAttribute("style", "display:none;");
            document.getElementById("charactersHTML").setAttribute("style", "display:inline;");
        });

    

    // let's wire our ajax call function to an mouse click so we get data
    // when the user clicks
    document.querySelector("#character-show").addEventListener("click", function (e) {
        ajaxGET("/Characters?format=json", function (data) {
            //console.log("before parsing", data);
            // this call is JSON so we have to parse it:
            let parsedData = JSON.parse(data);
            let str = "<table> <tr><td>Name</td><td>Hair Colour</td><td>Eye Colour</td><td>Alias</td><td>Status</td></tr>";
            for(let i = 0; i < parsedData.length; i++) {
                let item = parsedData[i];
                str += "<tr><td>" + item["Name"] + "</td><td>" + item["Hair Colour"] + "</td><td>" + item["Eye Colour"]
                    + "</td><td>" + item["Alias"] + "</td><td>" + item["Status"] + "</td></tr><tr>";
            }
            str += "</table>";
            // let d1 = document.createElement("div");
            // d1.innerHTML = str;
            // document.body.appendChild(d1);
            document.getElementById("here").innerHTML = str;
            console.log("after parsing", parsedData);
            document.getElementById("character-clear").setAttribute("style", "display:inline;");
            document.getElementById("character-exit").setAttribute("style", "display:inline;");
            document.getElementById("character-show").setAttribute("style", "display:none;");
        });
    });

    document.querySelector("#charactersHTML").addEventListener("click", function (e) {
        ajaxGET("/Characters?format=html", function (data) {
            console.log(data);
            // since it's HTML, let's drop it right in
            document.getElementById("html").innerHTML = data;
            document.getElementById("character-clear-html").setAttribute("style", "display:inline;");
            document.getElementById("character-exit-html").setAttribute("style", "display:inline;");
            document.getElementById("charactersHTML").setAttribute("style", "display:none;");
        });
    });

});

//});
// callback function declaration
function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}
