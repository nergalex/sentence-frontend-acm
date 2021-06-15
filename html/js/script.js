
$(document).ready(function(e) {
    $('body').hide();
    $('.bg').hide();
    $('<img/>').attr('src', 'https://picsum.photos/1920/1080?grayscale&blur=1').on('load', function() {
        $(this).remove(); // prevent memory leaks as @benweet suggested
        $('body').show();
        $('.bg').css('background', 'linear-gradient(to top right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(https://picsum.photos/1920/1080?grayscale&blur=1) no-repeat center center fixed');
        $('.bg').css('background-size', 'cover');
        $('.bg').fadeIn(1000, function(){
           wordAnimation(); 
        });
    });

    // Wrap every word in a span   
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
    var animTimeline = anime.timeline({
        loop: false
    });

    animTimeline.add({
        targets: '.sentence .word',
        translateY: [110, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: anime.stagger(250)
    });

    animTimeline.add({
        targets: '.plus-icon',
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1400,
    });
}



 
  