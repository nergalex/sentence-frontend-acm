
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
    $("#adjective-form").on("submit", function () {
        var valid = true;
        $(".info").html("");
        $("inputBox").removeClass("input-error");

        var adjective = $("#adjective-input").val();

        if (adjective == "") {
            $("#adjective-info").html("required.");
            $("#adjective-input").addClass("input-error");
        }
        return valid;
    });

    $(".plus-icon#animal").click(function () {
        $(".popup#animal-popup").fadeIn(200);
    });
    //Contact Form validation on click event
    $("#animal-form").on("submit", function () {
        var valid = true;
        $(".info").html("");
        $("inputBox").removeClass("input-error");

        var animal = $("#animal-input").val();

        if (animal == "") {
            $("#animal-info").html("required.");
            $("#animal-input").addClass("input-error");
        }
        return valid;

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



 
  