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
  
  