<?php foreach ($todoLists as $todoListName => $items): $vr=$items[0]; ?>
<div class="todo-list" data-todo-list-id="<?php echo $vr->projId; ?>">
	<div class="todo-list--name" name="todo-list--name">
		<i class="todo-list--ico fa fa-list-alt"></i>
		<p class="todo-list-name"><?php echo $todoListName; ?></p>
		<div class="todo-list--btn">
			<i class="todo-list--btn-edit fa fa-pencil"></i>
			<i class="todo-list--btn-delete fa fa-trash"></i>
		</div>
	</div>
	<div class="todo-list--add-new-task">
		<i class="fa fa-plus"></i>
			<input type="text" 
						 name="todo-list--add-new-task-description" 
						 placeholder="Start typing here to create a task... "
						 maxlength="1000">
			<div class="button todo-list--btn-add-new-task">Add Task</div>
	</div>
	<div class="todo-list--task-wrapper">
<?php foreach ($items as $task): ?>
	<?php if ($task->taskId): ?>
			<div class="todo-list--task  <?php if($task->taskDone) echo 'task-done'; ?>" 
					data-task-id="<?php echo $task->taskId; ?>"
					data-task-priority="<?php echo $task->taskPriority; ?>">
				<div class="todo-list--task-chkbx-done">
					<input type="checkbox" name="todo-list--task-chkbx-done" <?php if($task->taskDone) echo 'checked="checked"'; ?>>
				</div>
				<div class="todo-list--task-description  <?php if($task->taskDone) echo 'done'; ?>" 
							name="todo-list--task-description"><p><?php echo $task->taskName; ?></p>
				<p class="todo-list--task-deadline">
					<?php 
								if ($task->taskDl) {
									$date = date_create($task->taskDl);
									echo 'Deadline at: <span>'. date_format($date, 'd.m.Y'). '</span>';
								} 
					?>
				</p>				
				</div>
				<div class="todo-list--task-btns-wrapper">
					<div class="todo-list--task-btns">
						<i class="todo-list--task-btn-dt fa fa-calendar"></i>
						<i class="todo-list--task-btn-edit fa fa-pencil"></i>
						<i class="todo-list--task-btn-delete fa fa-trash"></i>
					</div>
				</div>
			</div>
	<?php endif; ?>
<?php endforeach; ?>
		</div>
</div>
<?php  endforeach; ?>
	<div class="todo-list--btn-add-wrapper">
		<div class="button button-blue todo-list--btn-add"><i class="fa fa-plus"></i>Add TODO list</div>
	</div>
