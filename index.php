<?php
# ?video=f423g4f4

$width = !empty($_POST['width']) ? $_POST['width'] : null;
$video = $_GET['video'];

if ($width == null) {
    echo '
    <form id="form" method="POST" action="./' . $video . '">
        <input type="hidden" name="width" id="width" value="">
    </form>
    <script type="text/javascript">
        document.getElementById("width").value = screen.width;
        document.getElementById("form").submit();
    </script>
    ';
} else {
    if($width < 700) {
        include 'mobile.php';
    } else {
        include 'desktop.php';
    }
}

?>