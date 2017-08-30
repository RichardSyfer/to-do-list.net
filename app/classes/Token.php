<?php
class Token {
	public static function generate($tokenName = '') {
		switch($tokenName) {
			case 'log-token': 
				return Session::put(Config::get('session/log-token'), md5(uniqid()));				
				break;
			case 'reg-token':
				return Session::put(Config::get('session/reg-token'), md5(uniqid()));				
				break;
		}
		// return Session::put(Config::get('session/token_name'), md5(uniqid()));
	}
	public static function check($token, $tokenType) {
		$tokenName = Config::get('session/' . $tokenType);
		if(Session::exists($tokenName) && $token == Session::get($tokenName)) {
			Session::delete($tokenName);
			return true;
		}
		return false;
	}
}