
$(document).ready(function(e) {
    $('body').hide()
    $('.bg').hide();
    $('<img/>').attr('src', 'https://picsum.photos/1920/1080?grayscale&blur=1').on('load', function() {
        $(this).remove(); // prevent memory leaks as @benweet suggested
        $('body').show()
        $('.bg').css('background', 'linear-gradient(to top right, rgba(255, 255, 255, 0.75), rgba(0, 0, 0, 0.9)), url(https://picsum.photos/1920/1080?grayscale&blur=1) no-repeat center center fixed');
        $('.bg').css('background-size', 'cover');
        $('.bg').fadeIn(1000);
        wordAnimation();
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
});

function wordAnimation(){
    anime.timeline({
        loop: false
        })
        .add({
            targets: '.sentence .word',
            translateY: [110, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1400,
            delay: anime.stagger(250)
        });
}
 
  