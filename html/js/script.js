
$(document).ready(function(e) { 
    $('.bg').hide();
    $('.sentence').hide();
    $('.logos').hide();
    getSentence();
    
    $('<img/>').attr('src', 'https://picsum.photos/1920/1080?grayscale&blur=1').on('load', function() {
        $(this).remove(); // prevent memory leaks as @benweet suggested 
        $('.bg').css('background', 'linear-gradient(to top right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(https://picsum.photos/1920/1080?grayscale&blur=1) no-repeat center center fixed');
        $('.bg').css('background-size', 'cover');
        $('.bg').fadeIn(1000, function(){
            $('.logos').fadeIn(1000)   
        });
    });


    $(".plus-icon#adjective").click(function () {
        $(".popup#adjective-popup").fadeIn(200);
        
    });
    //Contact Form validation on click event
    $("#adjective-form").on("submit", function (event) {
        event.preventDefault();
        var valid = true;
        $(".info").html("");
        $("inputBox").removeClass("input-error");

        var adjective = sanitizeString($("#adjective-input").val());

        console.log(adjective);

        if (adjective == "") {
            $("#adjective-info").html("required.");
            $("#adjective-input").addClass("input-error");
        } else {
            postData('/api/sentence/adjectives', { value: adjective })
                .then(data => {
                    console.log(data); // JSON data parsed by `data.json()` call
                    if (data.accepted) {
                        console.log("accepted");
                        $(".success-banner").html("test");
                        $("#adjective-input").value = "";
                    } else {
                        console.log("not accepted");
                        $("#adjective-info").html("not accepted");
                        $("#adjective-input").addClass("input-error");
                    };
            });
        }
        

        return valid;
    });

    $(".plus-icon#animal").click(function () {
        showPrompt("test123", "test", function(value) {
            console.log("entered" + value)
        }
    ); 
    });
    //Contact Form validation on click event
    $("#animal-form").on("submit", function () {
         
        /* var valid = true;
        $(".info").html("");
        $("inputBox").removeClass("input-error");

        var animal = $("#animal-input").val();

        if (animal == "") {
            $("#animal-info").html("required.");
            $("#animal-input").addClass("input-error");
        }
        return valid; */

    });

    $(".plus-icon#color").click(function () {
        $(".poput#color-popup").show();
    });
    //Contact Form validation on click event
    $("#color-form").on("submit", function () {
        var valid = true;
        $(".info").html("");
        $("inputBox").removeClass("input-error");

        var color = $("#color-input").val();

        if (color == "") {
            $("#color-info").html("required.");
            $("#color-input").addClass("input-error");
        }
        return valid;

    });

    $(".plus-icon#location").click(function () {
        $(".popup#location-popup").show();
    });
    //Contact Form validation on click event
    $("#location-form").on("submit", function () {
        var valid = true;
        $(".info").html("");
        $("inputBox").removeClass("input-error");

        var location = $("#location-input").val();

        if (location == "") {
            $("#location-info").html("required.");
            $("#location-input").addClass("input-error");
        }
        return valid;

    });

});

function wordAnimation(){

    console.log("Word animation")
    $('.sentence').show();
    
    var animTimeline = anime.timeline({
        loop: false
    });

    animTimeline.add({
        targets: '.word',
        translateY: [100, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: anime.stagger(200)
    });

    animTimeline.add({
        targets: ['.plus-icon', '.success-banner'],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1400,
    });
}

function getSentence(){
    fetch('/api/sentence').then( response => {
        console.log(response);
        return response.json();
    }).then( json => {
        console.log(json);
        $(".sentence#adjective").replaceWith("<h1 class=sentence id=adjective>" + json.adjectives + "</h1>" );
        $(".sentence#animal").replaceWith("<h1 class=sentence id=animal>" + json.animals + "</h1>" );
        $(".sentence#color").replaceWith("<h1 class=sentence id=color>" + json.colors + "</h1>" );
        $(".sentence#location").replaceWith("<h1 class=sentence id=location>" + json.locations + "</h1>" );

        console.log("wrap started");
        // Wrap every word in a span for animation  
        $('.sentence').each(function() {
            let text = $(this).text();
            let words = text.split(' ');
        
            // Clear current element
            this.innerHTML = '';
        
            // Loop through each word, wrap each letter in a span
            for (let word of words) {
                //let word_split = word.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");
        
                console.log('<span class="word">' + word + '</span>');
        
                // Wrap another span around each word, add word to header
                this.innerHTML += '<span class="word">' + word + '</span>';
            }
        });
        wordAnimation();
    });
}

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function showPrompt(text, post_uri, callback){
    let form = $("#prompt-form");
    let container = $("#prompt-form-container");
    $("#prompt-message").innerHTML = text;
    form.text.value = "";

    function complete(value) {
        $("#prompt-form-container").fadeOut(200);
        document.onkeydown = null;
        callback(value);
    };

    form.onsubmit = function(event) {
        console.log("submit");
        let value = form.text.value;

        if (value == "" ) return false;
        
        complete(value);
        return false;
    };

    form.cancel.onclick = function(event) {
        complete(null);
    };

    document.onkeydown = function(e) {
        if (e.key == 'Escape') {
            complete(null);
        }
    };

    let lastElem = form.elements[form.elements.length - 1];
    let firstElem = form.elements[0];

    lastElem.onkeydown = function(e) {
        if (e.key == 'Tab' && !e.shiftKey) {
            firstElem.focus();
            return false;
        }
    };

    firstElem.onkeydown = function(e) {
        if (e.key == 'Tab' && e.shiftKey) {
            lastElem.focus();
            return false;
        }
    };

    container.fadeIn(200);
    $("#prompt-form-container").fadeIn(200);
    form.elements.text.focus();
}

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
} 
  