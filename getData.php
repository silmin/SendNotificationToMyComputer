<?php
function escapeEmpty($base) {
    return preg_replace("/( |　)/", '\ ', $base);
}

$title = $_POST["title"];
$msg = $_POST["msg"];

$title = escapeEmpty($title); 
$msg = escapeEmpty($msg); 

exec("/usr/bin/node /var/www/push-me/push.js $title $msg", $output);
//var_dump($output);

$url = "https://silmin.net/push-me/";
header("Location: " . $url, true, 301);

exit;
?>
