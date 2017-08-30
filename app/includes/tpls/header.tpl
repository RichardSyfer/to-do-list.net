		<header class="header">
			<h1 class="h1">Simple TODO List</h1>
			<?php 
						$username = $_SESSION['user-name'];
						if($username) {
							echo '<p> by ' . escape($username) . '<span><a href="/includes/logout.php">  LogOut </a></span></p>';
							echo '<input type="hidden" id="user-id" value="' . escape($_SESSION['user-id']) . '">';
						} else {
							echo '<p></p>';
						}
			?>
		</header>

