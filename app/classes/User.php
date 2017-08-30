<?php
class User {
	private $_db,
					$_data,
					$_sessionUserId,
					$_sessionUserName,
					$_cookieName,
					$_isLoggedIn;

	public function __construct($user = null) {
		$this->_db = DB::getInstance();
		$this->_sessionUserId = Config::get('session/session_userId');
		$this->_sessionUserName = Config::get('session/session_userName');
		$this->_cookieName = Config::get('remember/cookie_name');
		
		if(!$user) {
			if(Session::exists($this->_sessionUserId)) {
				$user = Session::get($this->_sessionUserId);
				if($this->find($user)) {
					$this->_isLoggedIn = true;
				} else {
					// process logout
				}
			}
		} else {
			$this->find($user);
		}
	}

	public function create($fields) {
		if(!$this->_db->insert('users', $fields)) {
			throw new Exception('There was a problem creating an account.');
		}
	}

	public function update($fields = [], $id = null) {
		if(!$id && $this->isLoggedIn()) {
			$id = $this->data()->id;
		}

		if(!$this->_db->update('users', $id, $fields)) {
			throw new Exception('There was a problem updating');			
		}
	}

	public function find($user = null) {
		if($user) {
			$field = (is_numeric($user)) ? 'id' : 'username';
			$data = $this->_db->get('users', [$field, '=', $user]);

			if($data->count()) {
				$this->_data = $data->first();
				return true;
			}
		}
		return false;
	}

	public function login($username = null, $password = null, $remember = false) {
		if(!$username && !$password && $this->exists()) {
			Session::put($this->_sessionUserId, $this->data()->id);
			Session::put($this->_sessionUserName, $this->data()->username);
		} else {
			$user = $this->find($username);
			if($user) {
				if(password_verify($password, $this->data()->password)) {
						Session::put($this->_sessionUserId, $this->data()->id);
						Session::put($this->_sessionUserName, $this->data()->username);
						if($remember) {
							$hash = Hash::unique();
							$hashCheck = $this->_db->get('users_session', ['user_id', '=', $this->data()->id]);

							if(!$hashCheck->count()) {
								$this->_db->insert('users_session', [
										'user_id' => $this->data()->id, 
										'hash' => $hash
									]);
							} else {
								$hash = $hashCheck->first()->hash;
							}
							Cookie::put($this->_cookieName, $hash, Config::get('remember/cookie_expiry'));
						}
						return true;
				}
			}
		}
		return false;
	}

	public function exists() {
		return (!empty($this->_data)) ? true : false;
	}

	public function logout(){
		$this->_db->delete('users_session', ['user_id', '=', $this->data()->id]);

		Session::delete($this->_sessionUserId);
		Session::delete($this->_sessionUserName);
		Cookie::delete($this->_cookieName);
	}

	public function data() { //make it private?
		return $this->_data;
	}
	public function isLoggedIn() {
		return $this->_isLoggedIn;
	}
}