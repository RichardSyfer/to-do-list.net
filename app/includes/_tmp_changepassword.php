<?php
require_once 'core/init.php';

$user = new User();
if(!$user->isLoggedIn()) {
	Redirect::to('index-0.php');
}

if(Input::exists())	{
	if(Token::check(Input::get('token'))) {
		$validate = new Validation();
		$validation = $validate->check($_POST, [
				'password_current' => [
					'required' => true,
					'min' => 6,
					'max' => 64
				],
				'password_new' => [
					'required' => true,
					'min' => 6, 
					'max' => 64
				],
				'password_new_again' => [
					'required' => true, 
					'min' => 6,
					'max' => 64,
					'matches' => 'password_new'
				],
			]);
	if($validation->passed()) {
		//or make Hash::make and add- current salt - it you will be using own salt generation
		if(!password_verify(Input::get('password_current'), $user->data()->password)) {
			// here make json string reply
			echo 'Your current password is wrong.';
		} else {
			//generate here new salt if need and add it to update array 
			$user->update([
					'password' => password_hash(Input::get('password_new'), PASSWORD_DEFAULT)
				]);
			// here make json string reply and load todo-list
			Session::flash('home', 'Your password has been changed!');
			Redirect::to('index-0.php');
		}
	} else {
		foreach ($validation->getErrors() as $error) {
			// here make json string reply
			echo $error. '<br>';
		}
	}

	}
}

	include_once 'top.tpl';
	include_once 'header.tpl';
	
	require_once 'chpassform.tpl';

	include_once 'footer.tpl';