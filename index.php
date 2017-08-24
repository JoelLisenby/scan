<?php $ver = '1.0.0'; ?>
<!doctype html>
<html>
<head>
<title>Website Scanner</title>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1" />
<link rel="stylesheet" type="text/css" href="style.css?ver=<?php echo $ver; ?>" />
</head>
<body>
<form method="get">
<label for="url">URL</label><input type="text" id="url" name="url" value="<?php echo $_GET['url']; ?>" />
<input type="submit" value="Scan" />
</form>
<div id="output"></div>
<script src="scan.js?ver=<?php echo $ver; ?>"></script>
</body>
</html>
