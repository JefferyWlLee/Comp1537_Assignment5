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

    //clear button unique to the 
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
                    + "</td><td>" + item["Alias"] + "</td><td>" + item["Status"] + "</td></tr><tr>"; //the extra table row element at the end is there to change the design of the table and identify the json table from the html table 
            }
            str += "</table>";
            
            document.getElementById("here").innerHTML = str;
            // console.log("after parsing", parsedData);
            document.getElementById("character-clear").setAttribute("style", "display:inline;");
            document.getElementById("character-exit").setAttribute("style", "display:inline;");
            document.getElementById("character-show").setAttribute("style", "display:none;");
        });
    });

    document.querySelector("#charactersHTML").addEventListener("click", function (e) {
        ajaxGET("/Characters?format=html", function (data) {
            // console.log(data);
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

document.querySelector("#menu-exit").addEventListener("click", function (e) {
    var nodes = document.getElementById("sidebar").getElementsByTagName("div");
    for(var i=0; i<nodes.length; i++) {
        nodes[i].setAttribute("style", "display:none;");
    }
    document.getElementById("sidebar").setAttribute("style", "display:none;");
    document.getElementById("menu-exit").setAttribute("style", "display:none;");

})

document.querySelector("#hamburger-icon").addEventListener("click", function (e) {
    var nodes = document.getElementById("sidebar").getElementsByTagName("div");
    for(var i=0; i<nodes.length; i++) {
        nodes[i].setAttribute("style", "display:inline;");
    }
    document.getElementById("sidebar").setAttribute("style", "display:inline;");
    document.getElementById("menu-exit").setAttribute("style", "display:inline;");

})

document.querySelector("#spearhead-show").addEventListener("click", function(e) {
    document.getElementById("spearhead-squadron").setAttribute("style", "display:inline;");
    document.getElementById("spearhead-show").setAttribute("style", "display:none;");
    document.getElementById("spearhead-clear").setAttribute("style", "display:inline;");
    document.getElementById("spearhead-exit").setAttribute("style", "display:inline;");
})

document.querySelector("#spearhead-clear").addEventListener("click", function(e) {
    document.getElementById("spearhead-squadron").setAttribute("style", "display:none;");
    document.getElementById("spearhead-show").setAttribute("style", "display:inline;");
    document.getElementById("spearhead-clear").setAttribute("style", "display:none;");
    document.getElementById("spearhead-exit").setAttribute("style", "display:none;");
})

document.querySelector("#district-show").addEventListener("click", function(e) {
    document.getElementById("district").setAttribute("style", "display:inline;");
    document.getElementById("district-show").setAttribute("style", "display:none;");
    document.getElementById("district-clear").setAttribute("style", "display:inline;");
    document.getElementById("district-exit").setAttribute("style", "display:inline;");
})

document.querySelector("#district-clear").addEventListener("click", function(e) {
    document.getElementById("district").setAttribute("style", "display:none;");
    document.getElementById("district-show").setAttribute("style", "display:inline;");
    document.getElementById("district-clear").setAttribute("style", "display:none;");
    document.getElementById("district-exit").setAttribute("style", "display:none;");
})

document.querySelector("#processor-show").addEventListener("click", function(e) {
    document.getElementById("processors").setAttribute("style", "display:inline;");
    document.getElementById("processor-show").setAttribute("style", "display:none;");
    document.getElementById("processor-clear").setAttribute("style", "display:inline;");
    document.getElementById("processor-exit").setAttribute("style", "display:inline;");
})

document.querySelector("#processor-clear").addEventListener("click", function(e) {
    document.getElementById("processors").setAttribute("style", "display:none;");
    document.getElementById("processor-show").setAttribute("style", "display:inline;");
    document.getElementById("processor-clear").setAttribute("style", "display:none;");
    document.getElementById("processor-exit").setAttribute("style", "display:none;");
})
document.querySelector("#news-show").addEventListener("click", function(e) {
    document.getElementById("news").setAttribute("style", "display:inline;");
    document.getElementById("news-show").setAttribute("style", "display:none;");
    document.getElementById("news-clear").setAttribute("style", "display:inline;");
    document.getElementById("news-exit").setAttribute("style", "display:inline;");
})

document.querySelector("#news-clear").addEventListener("click", function(e) {
    document.getElementById("news").setAttribute("style", "display:none;");
    document.getElementById("news-show").setAttribute("style", "display:inline;");
    document.getElementById("news-clear").setAttribute("style", "display:none;");
    document.getElementById("news-exit").setAttribute("style", "display:none;");
})
