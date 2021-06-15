<html>
    <head>
        <title>Random Name Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
        <link href="./css/style.css" rel="stylesheet">
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
        <script type="text/javascript" src="./js/script.js"></script>
    </head>
    <body>
        <div class=bg></div>
        <div class="popup" id=adjective-popup>
            <form class="word-form" action="" id="adjective-form" method="post" enctype="application/json">
                <h2>Add an adjective</h2>
                <div>
                    <div>
                        <label>Adjective: </label><span id="adjective-info" class="info"></span>
                    </div>
                    <div>
                        <input type="text" id="adjective-input" name="adjective" class="inputBox" />
                    </div>
                </div>
                <div>
                    <input type="submit" id="send" name="send" value="Send" />
                </div>
            </form>
        </div>
        <div class="popup" id="animal-popup">
            <form class="word-form" action="" id="animal-form" method="post" enctype="application/json">
                <h2>Add an animal</h2>
                <div>
                    <div>
                        <label>Animal: </label><span id="animal-info" class="info"></span>
                    </div>
                    <div>
                        <input type="text" id="animal-input" name="animal" class="inputBox" />
                    </div>
                </div>
                <div>
                    <input type="submit" id="send" name="send" value="Send" />
                </div>
            </form>
        </div>
        <div class="popup" id="color-popup">
            <form class="word-form" action="" id="color-form" method="post" enctype="application/json">
                <h2>Add an color</h2>
                <div>
                    <div>
                        <label>Color: </label><span id="color-info" class="info"></span>
                    </div>
                    <div>
                        <input type="text" id="color-input" name="color" class="inputBox" />
                    </div>
                </div>
                <div>
                    <input type="submit" id="send" name="send" value="Send" />
                </div>
            </form>
        </div>
        <div class="popup" id="location-popup">
            <form class="word-form" action="" id="location-form" method="post" enctype="application/json">
                <h2>Add a location</h2>
                <div>
                    <div>
                        <label>Location: </label><span id="location-info" class="info"></span>
                    </div>
                    <div>
                        <input type="text" id="location-input" name="location" class="inputBox" />
                    </div>
                </div>
                <div>
                    <input type="submit" id="send" name="send" value="Send" />
                </div>
            </form>
        </div>
        <div class=wrap>
            <!-- Sentence -->
            <table>
                <tr>
                    <?php
                        $PREFIX = getenv('PREFIX');
                        $NS = getenv('NAMESPACE');
                        $url='http://'.$PREFIX.'-generator.'.$NS.'/name';
                        $ch = curl_init();
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($ch, CURLOPT_URL,$url);
                        $result=curl_exec($ch);
                        if (curl_errno($ch)) {
                            $error_msg = curl_error($ch);
                        }
                        curl_close($ch);
                        
                        if (isset($error_msg)) {
                            echo "<script>console.log(".$error_msg.")</script>";
                        }
                        $generated_name=json_decode($result, true);
                        echo '<td><h1 class=sentence>'.$generated_name['adjectives'].'</h1></td>';
                        echo '<td><h1 class=sentence>'.$generated_name['animals'].'</h1></td>';
                        echo '<td><h1 class=sentence>of the</h1></td>';
                        echo '<td><h1 class=sentence>'.$generated_name['colors'].'</h1></td>';
                        echo '<td><h1 class=sentence>'.$generated_name['locations'].'</h1></td>';

                        echo "<script>console.log(".json_encode($_POST).")</script>";
                        if (! empty($_POST["send"])) {
                            if (! empty($_POST["adjective"])) {
                                $word = filter_var($_POST["adjective"], FILTER_SANITIZE_STRING);
                                $postURL='http://'.$PREFIX.'-adjectives.'.$NS.'/adjectives';
                                $payload = json_encode(array("name" => $word));
                            }
                            if (! empty($_POST["animal"])) {
                                $word = filter_var($_POST["animal"], FILTER_SANITIZE_STRING);
                                echo '<script>console.log("error: '.$word.'");</script>';
                                $postURL='http://'.$PREFIX.'-animals.'.$NS.'/animals';
                                echo '<script>console.log("error: '.$postURL.'");</script>';
                                $payload = json_encode(array( "name" => $word));
                            }
                            if (! empty($_POST["color"])) {
                                $word = filter_var($_POST["color"], FILTER_SANITIZE_STRING);
                                $postURL='http://'.$PREFIX.'-colors.'.$NS.'/colors';
                                $payload = json_encode(array( "name" => $word));
                            }
                            if (! empty($_POST["location"])) {
                                $word = filter_var($_POST["location"], FILTER_SANITIZE_STRING);
                                $postURL='http://'.$PREFIX.'-locations.'.$NS.'/locations';
                                $payload = json_encode(array( "name" => $word));
                            }
                            $ch2 = curl_init();
                            curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                            curl_setopt($ch2, CURLOPT_VERBOSE, true);
                            curl_setopt($ch2, CURLOPT_URL, $postURL);
                            curl_setopt($ch2, CURLOPT_POSTFIELDS, $payload);
                            curl_setopt($ch2, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
                            #echo '<script>console.log("curl opts: '.$ch2.'");</script>';
                            $res=curl_exec($ch2);
                            $curl_info = json_encode(curl_getinfo($ch2));
                            $curl_error = json_encode(curl_error($ch2));
                            echo '<script>console.log("error: '.$curl_error.'");</script>';
                            echo '<script>console.log("info: '.$curl_info.'");</script>';
                            echo '<script>console.log("res: '.$res.'");</script>';
                            curl_close($ch2);

                            echo '<div id="success">Your new word '.$word.' as been successfully posted!</div>';
                        }
                    ?>
                </tr>
                <tr>
                    <td align=center><h2 class="plus-icon" id="adjective">+</h2></td>
                    <td align=center><h2 class="plus-icon" id="animal">+</h2></td>
                    <td align=center><div></div></td>
                    <td align=center><h2 class="plus-icon" id="color">+</h2></td>
                    <td align=center><h2 class="plus-icon" id="location">+</h2></td>
                </tr>
            </table>
   
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
