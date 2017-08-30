<?php	
require_once '/../core/init.php';

if(Input::exists()) {
	if(Token::check(Input::get('token'), 'log-token')) {
		$validate = new Validation();
		$validation = $validate->check($_POST, [
				'username' => ['required' => true, 'min' => 4],
				'password' => ['required' => true]
			]);
		if($validation->passed()) {
			$user = new User();
			$remember = (Input::get('remember') === 'on') ? true : false;
			$login = $user->login(Input::get('username'), Input::get('password'), $remember);
			if($login) {
				$reply = '{ "reply" : "TODO List. Hello '.Input::get('username').'" }';
			} else {
				$reply = '{ "error" : "Sorry logging is failed.", ';
				$newToken = Token::generate('log-token');
				$reply .= '"newToken" : "' .$newToken. '"}';
			}
		} else {
				$reply = '{"error" : '.json_encode($validation->getErrors()).', ';
				$newToken = Token::generate('log-token');
				$reply .= '"newToken" : "' .$newToken. '"}';
		}
	}
	echo json_encode($reply);
}
