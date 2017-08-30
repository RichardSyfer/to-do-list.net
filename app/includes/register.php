<?php	
require_once '/../core/init.php';

if(Input::exists()) {
	if(Token::check(Input::get('token'), 'reg-token')) {
		$validate = new Validation();
		$validation = $validate->check($_POST, array(
				'username' => [
					'required' => true,
					'min'	=> 4,
					'max' => 50,
					'unique' => 'users'
				],
				'password' => [
					'required' => true,
					'min'	=> 6
				],
				'password_again' => [
					'required' => true,
					'matches'	=> 'password'
				]
			));

		if($validation->passed()) {
			$user = new User();

			try {
				$user->create([
					'username' => Input::get('username'),
					'password' => password_hash(Input::get('password'), PASSWORD_DEFAULT),
					'joined' => date('Y-m-d H:i:s')
					]);
				$reply = '{ "reply" : "You have been registered and can now log in!", ';
				$newToken = Token::generate('reg-token');
				$reply .= '"newToken" : "' .$newToken. '"}';
			} catch(Exception $e) {
				$reply = '{"error" : '.json_encode($e->getMessage()).', ';
				$newToken = Token::generate('reg-token');
				$reply .= '"newToken" : "' .$newToken. '"}';
			}
		} else {
			$reply = '{"error" : '.json_encode($validation->getErrors()).', ';
			$newToken = Token::generate('reg-token');
			$reply .= '"newToken" : "' .$newToken. '"}';
		}
	}
	echo json_encode($reply);
}