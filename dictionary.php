<?php

$file = 'data/my_dictionary.txt';

$words = $_POST['words'];

$data = join("\n", $words);
$data .= "\n";

file_put_contents($file, $data, LOCK_EX);
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <title>カタヌキ</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="style.css">
    <script src="gtag.js"></script>
</head>

<body>
    <div id="app">
        <h1>カタヌキ</h1>

        <h2>登録完了</h2>
        <p>
            <a href=".">戻る</a>
        </p>

        <footer class="footer">
            <p>Ver. 1.4.1</p>
            <p>&copy; 2019 Morico</p>
            <p>Designed by ちきん</p>
        </footer>
    </div>
</body>

</html>
