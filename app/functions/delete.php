<?php	
  require_once '/../core/init.php';
  
  $dbh = DB::getInstance();

// delete todoList 
  if (!empty($_POST["listId"])) {
    $list_id = $_POST["listId"];
    $user = new User();
    $user_id = $user->data()->id;

    $sql_del_project = "DELETE FROM projects WHERE id = :pid AND user_id = :uid";
    $sql_del_task = "DELETE FROM tasks WHERE project_id = :pid";

    $sth = $dbh->exec($sql_del_task);
    $sth->execute([':pid' => $list_id]); // delete all tasks with deleted project_id
    $sth = $dbh->exec($sql_del_project);
    $sth->execute([':pid' => $list_id, ':uid' => $user_id]);
    $reply = '{"reply" : "TODO List Successfuly DELETED from DB"}';
  }
// delete TASK
  elseif (!empty($_POST["taskId"])) {
    $taskId = $_POST["taskId"];

    $sql = "DELETE FROM tasks WHERE id = :task_id";

    $sth = $dbh->exec($sql);
    $sth->execute([':task_id' => $taskId]);

    $reply = '{"reply" : "Task Successfuly DELETED from DB"}';
  }
  else {
      $reply = '{ "error" : "Operation not executed. Incoming data not correct" }';
  }
  
  echo json_encode($reply);
  die;