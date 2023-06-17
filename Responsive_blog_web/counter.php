<?php

// CHECK IF PAGE EXISTS IN PAGE HIT TABLE
function checkPageName($page_name){
	$sql = "SELECT * FROM ".$GLOBALS['hits_table_name']." WHERE page = :page";
	$query = $GLOBALS['db']->prepare($sql);
	$query->execute([':page' => $page_name]);
	if ($query->rowCount() == 0){
		$sql = "INSERT INTO ".$GLOBALS['hits_table_name']." (page, count) VALUES (:page, 0)";
		$query = $GLOBALS['db']->prepare($sql);
		$query->execute([':page' => $page_name]);
	}
}

// UPDATE PAGE HIT COUNT
function updateCounter($page_name){
	checkPageName($page_name);
	$sql = "UPDATE ".$GLOBALS['hits_table_name']." SET count = count+1 WHERE page = :page";
	$query = $GLOBALS['db']->prepare($sql);
	$query->execute([':page' => $page_name]);
}

// UPDATE VISITOR INFO
function updateInfo(){
	$sql = "INSERT INTO ".$GLOBALS['info_table_name']." (ip_address, user_agent) VALUES(:ip_address, :user_agent)";
	$query = $GLOBALS['db']->prepare($sql);
	$query->execute([':ip_address' => $_SERVER["REMOTE_ADDR"], ':user_agent' => $_SERVER["HTTP_USER_AGENT"]]);
}

?>