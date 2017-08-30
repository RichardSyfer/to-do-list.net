<div class="todo-list--form-wrapper">
	
	<form class="todo-list--change-password-form" id="todo-list--change-password-form" method="post">
		<div class="uavatar"><i class="todo-list--user-avatar fa fa-user-circle-o"></i></div>
		<div class="username"><b><?php echo escape($user->data()->username); ?></b></div>
		<label for="password_current"><b>Current password</b></label>
		<input type="password" name="password_current" placeholder="Enter current password" maxlength="64" required>
		<label for="password_new"><b>New password</b></label>
		<input type="password" name="password_new" placeholder="Enter new password" maxlength="64" required>
		<label for="password_new_again"><b>New password again</b></label>
		<input type="password" name="password_new_again" placeholder="Enter new password again" maxlength="64" required>
		<input type="hidden" name="token" value="<?php echo Token::generate(); ?>">
		<div class="btn-login-wrapper">
			<button type="submit" class="button button-blue btn-login">Change</button>
		</div>
	</form>
	
</div>

</div> <!-- closing tag for content-wrapper -->
