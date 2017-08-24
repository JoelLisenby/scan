<?php
$dsn = 'mysql:webscanner;host=localhost';
try {
	$db = new PDO($dsn,'dbusername','dbpassword');
} catch(PDOException $e) {
	echo json_encode(array("error"=>true,"message"=>"db fail"));
	die();
}

header('Content-Type: application/json');

if(filter_var($_GET['url'], FILTER_VALIDATE_URL)) {
	$stmt = $db->prepare('SELECT * FROM webscanner.scans WHERE url = :url ORDER BY date DESC');
	$stmt->execute(array('url'=>$_GET['url']));
	$scan = $stmt->fetchAll(PDO::FETCH_ASSOC);
	if(!empty($scan[0]) && strtotime($scan[0]['date']) > strtotime('-15 days')) {
		echo $scan[0]['result'];
	} else {
		$cmd = 'lighthouse '. $_GET['url'] .' --output json --chrome-flags="--headless"';
		$output = shell_exec($cmd);
		if(!empty($output)) {
			$stmt = $db->prepare('INSERT INTO webscanner.scans (`date`, url, result) VALUES (:now, :url, :result);');
			$stmt->execute(array('now'=>date("Y-m-d H:i:s"),'url'=>$_GET['url'],'result'=>$output));
			echo $output;
		} else {
			echo json_encode(array("error"=>true,"message"=>"scan fail"));
		}
	}
} else {
	echo json_encode(array("error"=>true));
}

?>
