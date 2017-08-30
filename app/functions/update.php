<?php	
  require_once '/../core/init.php';
  
  $dbh = DB::getInstance();
  $tskMatchErr = false;

// update todoList 
  if (!empty($_POST["listId"]) && !empty($_POST["listName"])) {
    $list_id = trim($_POST["listId"]); 
    $list_name = trim($_POST["listName"]);
    if (preg_match($patternList, $list_name) === 1) {
      $sql_update = 'UPDATE projects SET name = :pname WHERE id = :pid';
      $sth = $dbh->exec($sql_update);
      $sth->execute([':pname' => $list_name, ':pid' => $list_id]);
      $reply = '{ "reply" : "TODO List. Successfuly Updated" }';
    } else {
      $reply = '{ "error" : "TODO List NOT Updated. Incoming data not correct" }';
    }
  }
// here we update TASK
  elseif (!empty($_POST["taskId"])) {
    $setstr = [];
    $prms = [];
    
    $task_id = trim($_POST["taskId"]);
    $prms[':tid'] = $task_id;
    
    if (!empty($_POST["taskDesc"])) {
      $taskName = trim($_POST["taskDesc"]);
      if(preg_match($patternTask, $taskName) === 1) {
        $setstr[] = 'name = :tname';
        $prms[':tname'] = $taskName;
      } else {
        $tskMatchErr = true;
      }
    }
    if (isset($_POST["taskDone"])) {
      $taskStatus = trim($_POST["taskDone"]);
      $setstr[] = 'status = :tsatus';
      $prms[':tsatus'] = $taskStatus;
    }
    if (!empty($_POST["taskDeadLine"])) {
      $taskDLine = date_create_from_format('d.m.Y',$_POST["taskDeadLine"]);
      $setstr[] = 'deadline = :tdeadline';
      $prms[':tdeadline'] = $taskDLine->format('Y-m-d H:i:s');
    }
    // if we have additional params for update making query str and exequte it
    if(!empty($setstr) && !$tskMatchErr) {
      $sql_update = 
          'UPDATE tasks'.
          ' SET ' . implode(', ', $setstr).
          ' WHERE id = :tid';
      
      $sth = $dbh->exec($sql_update);
      $sth->execute($prms);
      
      $reply = '{ "reply" : "Task Successfuly Updated" }';
    } else {
      $reply = '{ "error" : "Tasks NOT Updated. Incoming data not correct" }';
    }
  }
  elseif (!empty($_POST["todoListId"])) {
    $list_id = $_POST["todoListId"];
    if (!empty($_POST["tasksPriority"])) {
      $tasksId = $_POST["tasksPriority"];
      $prior = 1;
      foreach ($tasksId as $id) {
        $sql_update = 'UPDATE tasks SET priority = :tprior WHERE id = :tid';
        $sth = $dbh->exec($sql_update);
        $sth->execute([':tprior' => $prior, ':tid' => $id]);
        $prior++;
      }
      $reply = '{ "reply" : "Tasks priority Successfuly Updated" }';
    } else {
      $reply = '{ "error" : "Tasks priority NOT Updated. Incoming data not correct" }';
    }
  }
  else {
    $reply = '{ "error" : "TODO List / Task NOT Updated. Incoming data not correct" }';
  }
  
  echo json_encode($reply);
  die;