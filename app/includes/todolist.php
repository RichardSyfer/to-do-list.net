<?php	
  require '/../core/init.php';
	
  $user_id = $_SESSION['user-id'];

	$sql = "SELECT p.name as projName, 
                  p.id as projId, 
                  t.name as taskName, 
                  t.id as taskId, 
                  t.status as taskDone,
                  t.deadline as taskDl,
                  t.priority as taskPriority
					FROM tasks as t RIGHT JOIN projects as p ON t.project_id=p.id
          WHERE p.user_id = $user_id
					ORDER BY p.id, t.priority";

  try{
    $dbh = DB::getInstance();
    $stmt = $dbh->exec($sql);
    $stmt->execute();
    $todoLists = $stmt->fetchAll(PDO::FETCH_OBJ | PDO::FETCH_GROUP);
    
    include_once '/tpls/header.tpl';
    include_once('/tpls/todolist.tpl');

  } catch (PDOException $e) {
      print $e->getMessage();
  }
