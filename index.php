<html>
    <head>
        <title>Random Name Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
        <link href="./css/style.css" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
        <script type="text/javascript">
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
                loop: true
            })
            .add({
                targets: '.sentence .word',
                translateY: [110, 0],
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 1400,
                delay: anime.stagger(250)
            });
        </script>
    </head>
    <body>
        <div class=wrap>
            <h2 class=sentence>test test test</h2>
            <?php
                $PREFIX = getenv('PREFIX');
                $NS = getenv('NAMESPACE');
                $url='http://'.$PREFIX.'-generator.'.$NS.'/name';
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_URL,$url);
                $result=curl_exec($ch);
                curl_close($ch);
                $generated_name=json_decode($result, true);
                echo '<h1 class=sentence>'.$generated_name['adjectives'].' '.$generated_name['animals'].' of the '.$generated_name['colors'].' '.$generated_name['locations'].'</h1>';
            ?>
        </div>
    </body>
    <footer>
        <div class=logos>
            <div class=img>
                <img src="./images/f5.png">
            </div>       
            <div class=img>
                <img src="./images/nginx.png">
            </div>
            <div class=img>
                <img src="./images/shape.png">
            </div>
            <div class=img>
                <img src="./images/volterra.png">
            </div>   
        </div>
    </footer>
</html>
