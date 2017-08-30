<?php	
require_once 'core/init.php';

$user = new User(); 

  include_once 'includes/tpls/top.tpl';
  include_once 'includes/tpls/header.tpl';

if($user->isLoggedIn()) {
  require_once 'includes/todolist.php';
} else {
  include_once 'includes/tpls/authform.tpl';
}

  include_once 'includes/tpls/footer.tpl';
