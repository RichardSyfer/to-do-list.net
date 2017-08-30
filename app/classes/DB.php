<?php 
class DB {
	private static $_instance = null;
	private $_dbh, //for PDO handler (instance) 
					$_sth, //statement handler -  query
					$_error = false,
					$_results,
					$_count = 0,
					$_lastInsId;

	private function __construct() {
		try {
			$dsn = 'mysql:dbname=' . Config::get('mysql/db_name').
      	 		 				';host=' . Config::get('mysql/db_host');						

			$this->_dbh = new PDO($dsn,
														Config::get('mysql/db_username'),
														Config::get('mysql/db_password')
  											);

		  $this->_dbh->setAttribute(
		      											PDO::ATTR_ERRMODE,
		      											PDO::ERRMODE_EXCEPTION
		  												 );
		} catch(PDOException $e) {
			die($e->getMessage());
		}
	}

	public static function getInstance() {
		if (!isset(self::$_instance)) {
			self::$_instance = new DB();
		} 
		return self::$_instance;
	}

	public function query($sql, $params = [], $act = '') {
		$this->_error = false;
		$actions = ['insert', 'update', 'delete'];
		
		if($this->_sth = $this->_dbh->prepare($sql)) {
			$x = 1;
			if(count($params)) {
				foreach($params as $param) {
					$this->_sth->bindValue($x, $param);
					$x++;
				}
			}
		}
		if($act=='') {
			if($this->_sth->execute()) {
				$this->_results = $this->_sth->fetchAll(PDO::FETCH_OBJ);
				$this->_count = $this->_sth->rowCount();
			} else {
				$this->_error = true;
			}
		} elseif (in_array($act, $actions)) {
			if($this->_sth->execute()) {
				$act == 'insert' ? $this->_lastInsId = $this->_dbh->lastInsertId() : $this->_count = $this->_sth->rowCount();
			} else {
				$this->_error = true;
			}
		}
		return $this;
	}

	private function action($action, $table, $where = [], $act = '') {
		if(count($where) === 3) {
			$operators = array ('=', '>', '>=', '<', '<=');
			$field    = $where[0];
			$operator = $where[1];
			$value    = $where[2];
			if(in_array($operator, $operators)) {
				$sql = "{$action} FROM {$table} WHERE {$field} {$operator} ?";
				if(!$this->query($sql, array($value), $act)->error()) {
					return $this;
				}
			}
		}
		return false;
	}

	public function exec($sql) {
		return $this->_dbh->prepare($sql);
	}

	public function getLastInsertId(){
		return $this->_lastInsId;
	}

	public function get($table, $where) {
		return $this->action('SELECT *', $table, $where);
	}

	public function insert($table, $fields = []) {
		if(count($fields)) {
			$keys = array_keys($fields);
			$values = '';
			$x = 1;
			foreach($fields as $field) {
				$values .= '?';
				if($x < count($fields)) {
					$values .= ', ';
				}
				$x++;
			}
			$sql  = "INSERT INTO {$table} (`" . implode('`, `',$keys) . "`) VALUES ({$values})";

			if(!$this->query($sql, $fields, 'insert')->error()) {
				return true;
			} 
		}
		return false;
	}

	public function update($table, $id, $fields = []) {
		$set = '';
		$x = 1;
		foreach($fields as $name => $value) {
			$set .= "{$name} = ?";
			if($x < count($fields)) {
				$set .= ', ';
			}
			$x++;
		}
		$sql = "UPDATE {$table} SET {$set} WHERE id = {$id}";

		if(!$this->query($sql, $fields, 'update')->error()) {
				return true;
		} 
	}

	public function delete($table, $where) {
		return $this->action('DELETE', $table, $where, 'delete');
	}

	public function error() {
		return $this->_error;
	}

	public function count(){
		return $this->_count;
	}

	public function results() {
		return $this->_results;
	}

	public function first() {
		return $this->results()[0];
	}

}