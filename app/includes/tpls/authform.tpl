
<div class="todo-list--auth-form-wrapper">
	<div class="todo-list--auth-form">
	<div class="todo-list--auth-form-heading">
		<a href="#" class="active" id="login-form-link">Login<i class="todo-list--auth-form-log-icon fa fa-key"></i></a>
		<a href="#" id="register-form-link">Register<i class="todo-list--auth-form-reg-icon fa fa-pencil-square-o"></i></a>
		<hr>
	</div>

	<div class="todo-list--form-wrapper">
		<form  id="todo-list--login-form" class="todo-list--login-form" method="post" style="display: block;">
			<label><b>Username</b></label>
			<input type="text" name="username" id="lf_username" tabindex="1" value="<?php echo escape(Input::get('username')); ?>" placeholder="Enter username" autocomplete="off" minlength="4" maxlength="50" autofocus required>
			<label><b>Password</b></label>
			<input type="password" name="password" id="lf_password" tabindex="2" placeholder="Enter password" minlength="6" required>
			<input type="checkbox" name="remember" id="lf_remember" tabindex="3" checked="checked">
			<label for="remember">Remember me</label>
			<input type="hidden" id="log-token" name="token" value="<?php echo Token::generate('log-token'); ?>">
			<div class="btn-login-wrapper">
				<button id="btn-login" tabindex="4" class="button button-blue btn-login">Login</button>
			</div>
		</form>
	</div>
	<div class="todo-list--form-wrapper">
		<form id="todo-list--register-form" class="todo-list--register-form" method="post" style="display: none;">
			<label><b>Username</b></label>
			<input type="text" name="username" id="rf_username" tabindex="1" value="<?php echo escape(Input::get('username')); ?>" placeholder="Enter username" autocomplete="off" minlength="4" maxlength="50" autofocus required>
			<label><b>Password</b></label>
			<input type="password" name="password" id="rf_password" tabindex="2" placeholder="Enter new password" minlength="6" required>
			<input type="password" name="password_again" id="rf_password_again" tabindex="3" placeholder="Confirm new password" minlength="6" required>
			<input type="hidden" id="reg-token" name="token" value="<?php echo Token::generate('reg-token'); ?>">
			<div class="btn-register-wrapper">
				<button id="btn-register" tabindex="4" class="button button-blue btn-register">Register</button>
			</div>
		</form>
		</div>
	</div>
</div>
