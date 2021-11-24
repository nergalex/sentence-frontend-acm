$(document).ready(function(e) { 
    $('.bg').hide();
    $('.sentence').hide();
    $('.logos').hide();
    getSentence();

    
    $('<img/>').attr('src', '/api/backgrounds').on('load', function() {
        $(this).remove(); // prevent memory leaks as @benweet suggested 
        $('.bg').css('background', 'linear-gradient(to top right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(/api/backgrounds) no-repeat center center fixed');
        $('.bg').css('background-size', 'cover');
        $('.bg').fadeIn(1000, function(){
            $('.logos').fadeIn(1000)   
        });
    });


    $(".plus-icon#adjective").click(function () {
        showPrompt("Add an adjective", "adjective", "/api/sentence/adjectives", function(value) {
            console.log("entered " + value);

        });
    });

    $(".plus-icon#animal").click(function () {
        showPrompt("Add an animal", "animal", "/api/sentence/animals", function(value) {
            console.log("entered " + value);
        }); 
    });

    $(".plus-icon#color").click(function () {
        showPrompt("Add an color", "color", "/api/sentence/colors", function(value) {
            console.log("entered " + value);
        }); 
    });

    $(".plus-icon#location").click(function () {
        showPrompt("Add an location", "location", "/api/sentence/locations", function(value) {
            console.log("entered " + value);
        }); 
    });

    $( ".plus-icon" )
        .mouseover(function() {
            $( this ).stop().animate({fontSize: "40px"}, 200);
        })
        .mouseout(function() {
            $( this ).stop().animate({fontSize: "32px"}, 200);
        });

});

function showBanner(message, word, success){

    $('.success-banner').removeClass("success failure");
    $('#success-banner-message').html("");
    $('#success-banner-image').removeClass();

    if(success){
        $('.success-banner').addClass("success");
        $('#success-banner-message').html("Success! Your word " + word + " was added!" + message )
        $('#success-banner-image').addClass("fas fa-check-circle")
    } else {
        $('.success-banner').addClass("failure");
        $('#success-banner-message').html("Failure! Your word " + word + " was not added! " + message )
        $('#success-banner-image').addClass("fas fa-times-circle")
    }

    bannerAnimation();
}

function bannerAnimation(){
    
    console.log("bannerAnimation");
    $(".success-banner").show();

    var bannerTimeline = anime.timeline({ 
        targets: '.success-banner',
        easing: "easeOutExpo",
        duration: 1500,
        delay: 1000,
        endDelay: 5000,
        loop: false
    }).add({
        translateY: ['-100%', '0%']
    }).add({
        translateY: ['0%', '-100%']
    });
}

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
        targets: ['.plus-icon'],
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
        if (json.adjectives != "null") {
            $(".sentence#adjective").replaceWith("<h1 class=sentence id=adjective>" + json.adjectives + "</h1>" );
            $(".plus-icon#adjective").addClass("fas fa-plus");
        }
        if (json.animals != "null") {
            $(".sentence#animal").replaceWith("<h1 class=sentence id=animal>" + json.animals + "</h1>" );
            $(".plus-icon#animal").addClass("fas fa-plus");
        }
        if (json.colors != "null") {
            $(".sentence#color").replaceWith("<h1 class=sentence id=color>" + json.colors + "</h1>" );
            $(".plus-icon#color").addClass("fas fa-plus");
        }
        if (json.locations != "null") {
            $(".sentence#location").replaceWith("<h1 class=sentence id=location>" + json.locations + "</h1>" );
            $(".plus-icon#location").addClass("fas fa-plus");
        }

        // Wrap every word in a span for animation  
        $('.sentence').each(function() {
            let text = $(this).text();
            let words = text.split(' ');
        
            // Clear current element
            this.innerHTML = '';
        
            // Loop through each word, wrap each letter in a span
            for (let word of words) {
                //let word_split = word.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");
        
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

function showPrompt(text, word, post_uri, callback){
    let form = document.getElementById('prompt-form');
    let container = document.getElementById("prompt-form-container");
    $("#prompt-message").html(text);
    $(".info").html("");
    $(".inputBox").removeClass("input-error");
    form.text.value = "";

    function complete(value) {
        $("#prompt-form-container").fadeOut(200);
        document.onkeydown = null;
        callback(value);
    };

    form.onsubmit = function(event) {
        console.log("submit");
        $(".info").html("");
        $(".inputBox").removeClass("input-error");

        let value = form.text.value;

        value = sanitizeString(value);
        console.log(value);
        if (value == "" ) {
            $(".info").html("Required");
            $(".inputBox").addClass("input-error");
            return false;
        }

        postData(post_uri, { "value": value })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
                if (data.accepted == "true") {
                    console.log("accepted");
                    showBanner(data.info, data.value, true);
                } else {
                    console.log("not accepted");
                    showBanner(data.info, data.value, false);
                };
            })
        ;
        
        complete(value);
        return false;
    };

    form.cancel.onclick = function() {
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

    $("#prompt-form-container").fadeIn(200);
    form.elements.text.focus();
}

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
} 
  