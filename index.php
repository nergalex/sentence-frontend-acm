<html>
    <head>
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','<?php echo getenv('GOOGLETAGID'); ?>');</script>
        <!-- End Google Tag Manager -->
        <title>Random Name Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
        <link href="./css/style.css" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
        <script src="./scripts/script.js"></script>
    </head>
    <body>
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
