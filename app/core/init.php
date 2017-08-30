<?php 
	session_start();

	$GLOBALS['config'] = array(
  	'mysql' => array(
  		'db_host' => 'localhost',
			'db_username' => 'root',
			'db_password' => '',
			'db_name' => 'todo_net'
  	),
  	'remember' => array(
  		'cookie_name' => 'hash',
  		'cookie_expiry' => 604800
  	),
  	'session' => array(
      'session_userId' => 'user-id',
  		'session_userName' => 'user-name',
      'token_name' => 'token',
      'log-token' => 'token-login', 
      'reg-token' => 'token-register', 
  	)
	);

$patternList = '/^[\d\w\sа-яА-ЯЁё!?@#№$%&.,:\'\'\"\"-]{3,250}$/';
$patternTask = '/^[\d\w\sа-яА-ЯЁё!?@#№$%&.,:\'\'\"\"-]{3,1000}$/';

 spl_autoload_register(function($class) {
 	require_once '/../classes/' . $class . '.php';
 });

 require_once '/../functions/sanitize.php';

 if(Cookie::exists(Config::get('remember/cookie_name')) && !Session::exists(Config::get('session/session_userId'))) {
  $hash = Cookie::get(Config::get('remember/cookie_name'));
  $hashCheck = DB::getInstance()->get('users_session', ['hash', '=', $hash]);
  if($hashCheck->count()) {
    $user = new User($hashCheck->first()->user_id);
    $user->login();
  }
 }
