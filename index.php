<html>
    <head>
        <title>Random Name Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
        <link href="./css/style.css" rel="stylesheet">
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
        <script type="text/javascript" src="./scripts/script.js"></script>
    </head>
    <body>
        <div class=bg></div>
        <div class=wrap>
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
