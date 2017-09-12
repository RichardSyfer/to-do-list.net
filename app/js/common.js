$(function() {

// show buttons for task - operations
$(document).on("mouseover", ".todo-list--task", function(){
   $(this).find(".todo-list--task-btns").addClass("active");
});

$(document).on("mouseout", ".todo-list--task",function(){
    $(this).find(".todo-list--task-btns").removeClass("active");
});

// mark task done
$(document).on("click", ".todo-list--task-chkbx-done", function() {
	var task = $(this).parent(),
			taskDesc = $(this).next(),
			chBox = $(this).children();
	var taskId = task.data("taskId");

	if( chBox.prop('checked'))
	{
		task.addClass('task-done');
		taskDesc.addClass('done');
		$.ajax({
			type: "POST",
			url: "/../functions/update.php",
			data:{ 
							taskId: taskId,
							taskDone: 1
			},
			dataType: "json",
			success: function(data) {
				var data = JSON.parse(data);
				console.log(data.reply);
				$().toastmessage('showSuccessToast', data.reply);			
			},
		  error: function (jqXHR, exception) {
		  	var errMsg = ajErrMessage(jqXHR, exception);
		  	console.log(errMsg); 
			  $().toastmessage('showErrorToast', errMsg);
	 		}
		});	// $.ajax done task
	} else {
		task.removeClass('task-done');
		taskDesc.removeClass('done');
		$.ajax({
			type: "POST",
			url: "/../functions/update.php",
			data: {
							taskId: taskId,
							taskDone: 0
						},
			dataType: "json",
			success: function(data) {
				var data = JSON.parse(data);
				console.log(data.reply);
				$().toastmessage('showSuccessToast', data.reply);			
			},
		  error: function (jqXHR, exception) {
	      var errMsg = ajErrMessage(jqXHR, exception);
		  	console.log(errMsg); 
			  $().toastmessage('showErrorToast', errMsg);
 			}
		});	// $.ajax undone task
	}
});

////LIST-FUNCTIONS///
//add new empty list block
$(document).on("click", ".todo-list--btn-add", function() {
    if (!newListBlockAdded) {
        newListBlockAdded = true;
        $('.todo-list--btn-add-wrapper').before(
            '<div class="todo-list" data-todo-list-id="">' +
            '<div class="todo-list--name" name="todo-list--name">' +
            '<i class="todo-list--ico fa fa-list-alt"></i>' +
            '<p class="todo-list-name">' +
            '<input type="text" '+
            'name="todo-list--add-new-project-description" ' +
            'placeholder="Start typing here new TODO list description... "' +
            'maxlength="1000">' +
            '</p>' +
            '<div class="todo-list--btn">' +
            '<i class="todo-list--btn-insert fa fa-save"></i>' +
            '<i class="todo-list--btn-remove fa fa-trash"></i>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        $('input[name $= -add-new-project-description]').focus();
    } else {
        console.log('You have unsaved TODO list');
        $().toastmessage('showNoticeToast', 'You have unsaved TODO list');
    }
});	// onClick Add new todo-list

//remove empty list block
$(document).on("click", ".todo-list--btn-remove", function() {
    newListBlockAdded = false;
    $(this).closest('.todo-list').remove();
});//remove empty list block

//insert new list
$(document).on("click", ".todo-list--btn-insert",function() {
	var list = $(this).closest('.todo-list');
			listEdit(list, 'insert');
});

///Edit list
$(document).on("click", ".todo-list--btn-edit", function() {
	var list = $(this).closest('[class $= list]');
  		listEdit(list, 'edit');
});	// edit list description
// save edited list description
$(document).on("click", ".todo-list--btn-save", function() {
	var list = $(this).closest('[class $= list]');
  		listEdit(list, 'save');
});

// Delete list
$(document).on("click", ".todo-list--btn-delete", function() {
	var list = $(this).closest('[class $= list]');
			listEdit(list, 'delete');
});

////TASK-FUNCTIONS///
// Insert new task to db
$(document).on("click", ".todo-list--btn-add-new-task", function() {
	var list = $(this).closest('[class $= list]');
  		taskEdit(list, 'insert');
});	// onClick Add new task

// Edit task deadline
$(document).on("click", ".todo-list--task-btn-dt", function() {
	var task = $(this).closest('.todo-list--task');
			taskEdit(task, 'edit-dl');
});
//save task deadline 
$(document).on("click", ".todo-list--task-btn-save-dline", function() {
	var task = $(this).closest('.todo-list--task');
			taskEdit(task, 'save-dl');
});

// Edit task description
$(document).on("click", ".todo-list--task-btn-edit", function() {
	var task = $(this).closest('.todo-list--task');
			taskEdit(task, 'edit');
});

$(document).on("click", ".todo-list--task-btn-save", function() {
	var task = $(this).closest('.todo-list--task');
			taskEdit(task, 'save');
});

// Delete task
$(document).on("click", ".todo-list--task-btn-delete", function() {
	var task = $(this).closest('.todo-list--task');
			taskEdit(task, 'delete');
});

// pressEnter on input field
$(document).keypress(function(e) {
	if(e.keyCode == 13 || e.keyCode == 27) {
		var inpTaskDesc = $("input[class $=-task-description-editor]:focus"),
				taskDesc = inpTaskDesc.val();
			if(taskDesc) {
				var task = inpTaskDesc.closest('.todo-list--task');
						e.keyCode != 27 ? taskEdit(task, 'save') : taskEdit(task, 'escape'); 
				}

		var inpNewTaskDesc = $("input[name $= -add-new-task-description]:focus"),
				newTaskDesc = inpNewTaskDesc.val();
			if(newTaskDesc) {
				var list = inpNewTaskDesc.closest('[class $= list]');
						if (e.keyCode != 27) taskEdit(list, 'insert');
 				}

 		var inpListDesc = $("input[class $= -list--description-editor]:focus"),
				listDesc = inpListDesc.val();
			if(listDesc) {
				var list = inpListDesc.closest('[class $= list]');
						e.keyCode != 27 ? listEdit(list, 'save') : listEdit(list, 'escape'); 
 				}

 		var inpNewListDesc = $("input[name $= -add-new-project-description]:focus"),
				newListDesc = inpNewListDesc.val();
			if(newListDesc) {
				var list = inpNewListDesc.closest('[class $= list]');
						if (e.keyCode != 27) listEdit(list, 'insert');
 				}
 				
		return false;
	}
});

$(document).on('focus', 'input', function() {
	$('input[class $= -deadline-editor]').datepicker({
		dateFormat: 'dd.mm.yy',	//'yy-mm-dd',
		appendText: ' (dd.mm.yyyy)',
		maxDate: '+1y',
		minDate: '-1y',
		showAnim: 'slideDown',
		showButtonPanel: true,
		onSelect: function(dateText, inst) { 
			var task = inst.input.closest('.todo-list--task');
					taskEdit(task, 'save-dl');
		}
	});	
});



// task list - sortable
$('.todo-list--task-wrapper').sortable(sortableOptions);

//for login/register form tabs
    $('#login-form-link').click(function(e) {
		$("#todo-list--login-form").delay(100).fadeIn(100);
 		$("#todo-list--register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#todo-list--register-form").delay(100).fadeIn(100);
 		$("#todo-list--login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

// login form handler
$(document).on("click", "#btn-login", function(e) {
	e.preventDefault();

	$.ajax({
		type: "POST",
		url: "/../includes/login.php",
		data: $('#todo-list--login-form').serialize(),
		dataType: "json",
		success: function(data) {
			var data = JSON.parse(data);
			if(data.reply) {
				$.get('includes/todolist.php', function(data) {
			  	$('.content-wrapper').html(data);
			  	$('.todo-list--task-wrapper').sortable(sortableOptions);
				});
				console.log(data.reply);
				$().toastmessage('showSuccessToast', data.reply);
			} else if(data.error) {
				console.log(data.error);
				$().toastmessage('showErrorToast', data.error);
				$('#log-token').val(data.newToken);
			} else {
				console.log(data);
				$().toastmessage('showErrorToast', data);
				window.setTimeout('location.reload()', 1500);
			}
		},
	  error: function (jqXHR, exception) {
	  	var errMsg = ajErrMessage(jqXHR, exception);
		  console.log(errMsg); 
		  $().toastmessage('showErrorToast', errMsg);
		}
	});	// $.ajax login
});

// register form handler
$(document).on("click", "#btn-register", function(e) {
	e.preventDefault();
		$.ajax({
		type: "POST",
		url: "/../includes/register.php",
		data: $('#todo-list--register-form').serialize(),
		dataType: "json",
		success: function(data) {
			var data = JSON.parse(data);
			if(data.reply) {
				$().toastmessage('showSuccessToast', data.reply);
				console.log(data.reply);
				$('#reg-token').val(data.newToken);
			} else if(data.error) {
				console.log(data.error);
				$().toastmessage('showErrorToast', data.error);
				$('#reg-token').val(data.newToken);
			} else {
				console.log(data);
				$().toastmessage('showErrorToast', data);
				window.setTimeout('location.reload()', 1500);
			}
		},
	  error: function (jqXHR, exception) {
	  	var errMsg = ajErrMessage(jqXHR, exception);
		  console.log(errMsg); 
		  $().toastmessage('showErrorToast', errMsg);
		}
	});	// $.ajax register
});

});	// onLoad JQ

// GLOBAL vars FOR function listEdit 
	var listNameTxt = [];
	var newListBlockAdded = false;
// list functions
function listEdit(list, event) {
	var listId = list.data('todoListId'),
			listName = list.find('p[class $= name]');
	switch (event) {
		case 'edit':
								listNameTxt['e.'+listId] = listName.text().trim();
								listName.html('<input class="todo-list--description-editor" type="text" title="You can enter here new TODO list description">');
								listName.children('input[class $=-description-editor]').val(listNameTxt['e.'+listId]).focus();
								list.find('.todo-list--btn-edit').replaceWith('<i class="todo-list--btn-save fa fa-save"></i>');	
					break;
		case 'save':
								listNameTxt['s.'+listId] = listName.children('input').val().trim();
								if (listNameTxt['s.'+listId] !== listNameTxt['e.'+listId]) {
									var regex = /^[a-zA-Zа-яА-ЯЁё0-9-_!?@#№$%&.,'":\s]{3,250}$/;			
									if(regex.test(listNameTxt['s.'+listId])) { // input validation
										$.ajax({
											type: "POST",
											url: "/../functions/update.php",
											data: { 
															listId: listId,
															listName: listNameTxt['s.'+listId]
														},
											dataType: "json",
											success: function(data) {
												var data = JSON.parse(data);
												if(data.reply) {
													console.log(data.reply);
													$().toastmessage('showSuccessToast', data.reply);
													listName.html(listNameTxt['s.'+listId]);
													list.find('.todo-list--btn').html('<i class="todo-list--btn-edit fa fa-pencil"></i>' +
																														'<i class="todo-list--btn-delete fa fa-trash"></i>'	);
													delete listNameTxt['e.'+listId];
													delete listNameTxt['s.'+listId];
												} else if(data.error) {
													console.log(data.error);
													$().toastmessage('showErrorToast', data.error);
												}
											},
										  error: function (jqXHR, exception) {
										  	var errMsg = ajErrMessage(jqXHR, exception);
										  	console.log(errMsg); 
										  	$().toastmessage('showErrorToast', errMsg);
											}
										});	// $.ajax UPDATE task
									} else { // validation failed
										console.log("New list name - invalid");
										$().toastmessage('showErrorToast', "New TODO List description - invalid, it should contain 3-250 symbols without some specialchars");
										listName.children('input').addClass("error").on("input",function() { $(this).removeClass("error"); });
									}
								} else {
									listName.html(listNameTxt['s.'+listId]);
									list.find('.todo-list--btn').html('<i class="todo-list--btn-edit fa fa-pencil"></i>' +
																										'<i class="todo-list--btn-delete fa fa-trash"></i>'	);
									delete listNameTxt['s.'+listId];
									delete listNameTxt['e.'+listId];
									console.log('TODO list description not changed');
									$().toastmessage('showNoticeToast', 'TODO list description not changed');
								}
					break;
		case 'escape':
		console.log(listName);
									listName.html(listNameTxt['e.'+listId]);
									list.find('.todo-list--btn').html('<i class="todo-list--btn-edit fa fa-pencil"></i>' +
																										'<i class="todo-list--btn-delete fa fa-trash"></i>'	);
									delete listNameTxt['e.'+listId];
									$().toastmessage('showNoticeToast', 'TODO list description not changed');
					break;
		case 'delete':
									var str = "Do you realy want to delete TODO List:\n";
											listName.children('input').val() ? str = str + listName.children('input').val() : str = str + listName.html();
									if (confirm(str)) {
										$.ajax({
											type: "POST",
											url: "/../functions/delete.php",
											data: { 
															listId: listId
														},
											dataType: "json",
											success: function(data) {
												var data = JSON.parse(data);
												if(data.reply) {
													$().toastmessage('showSuccessToast', data.reply);
													console.log(data.reply);
													
													list.remove();

												} else if(data.error) {
													console.log(data.error);
													$().toastmessage('showErrorToast', data.error);
												} 
											},
										  error: function (jqXHR, exception) {
										  	var errMsg = ajErrMessage(jqXHR, exception);
										  	console.log(errMsg); 
										  	$().toastmessage('showErrorToast', errMsg);
											}
										});	// $.ajax delete task
									} // delete confirmed
					break;
		case 'insert':
									newListName = listName.find('input[name $= -add-new-project-description]').val().trim();
									if(newListName){ // if project description not empty  do next code
										var regex = /^[a-zA-Zа-яА-ЯЁё0-9-_!?@#№$%&.,'":\s]{3,250}$/;			
										if(regex.test(newListName)) {
											$.ajax({
												type: "POST",
												url: "/../functions/insert.php",
												data: { 
																listName: newListName,
																userId: $('#user-id').val()
															},
												dataType: "json",
												success: function(data) {
													var data = JSON.parse(data);
													if(data.reply) {
														$().toastmessage('showSuccessToast', data.reply);
														console.log(data.reply);

														listName.html(newListName);
                                                        newListBlockAdded = false;
														list.find('.todo-list--btn').html(
															'<i class="todo-list--btn-edit fa fa-pencil"></i>' +
															'<i class="todo-list--btn-delete fa fa-trash"></i>'	);
														list.data('todoListId', data.lastInsertId);
														console.log(list.data('todoListId'));
														list.append(
															'<div class="todo-list--add-new-task">' +
																'<i class="fa fa-plus"></i>' +
																	'<input type="text" '+
																		 'name="todo-list--add-new-task-description" ' +
																		 'placeholder="Start typing here to create a task... "' +
																		 'maxlength="1000">' +
																	'<div class="button todo-list--btn-add-new-task">Add Task</div>' +
															'</div>' +
															'<div class="todo-list--task-wrapper">' +
															'</div>' 
														);

													} else if(data.error) {
														console.log(data.error);
														$().toastmessage('showErrorToast', data.error);
													}
												},
											  error: function (jqXHR, exception) {
											  	var errMsg = ajErrMessage(jqXHR, exception);
											  	console.log(errMsg); 
											  	$().toastmessage('showErrorToast', errMsg);
											  }
											});	// $.ajax Add new project (todo-list)
										} else { // validation failed
											console.log("New TODO list name - invalid");
											$().toastmessage('showErrorToast', "New TODO List description - invalid, it should contain 3-250 symbols without some specialchars");
											listName.children('input').addClass("error").on("input",function() { $(this).removeClass("error"); });
										}
									} else { 
										console.log("TODO List description is empty"); 
										listName.children('input').addClass("error").on("input",function() { $(this).removeClass("error"); });
										$().toastmessage('showWarningToast', 'TODO list description is empty');
									}
					break;		
	}
// list edit functions: edit, save, delete
}

// GLOBAL vars FOR function taskEdit 
	var	taskDescTxt = [];

// options for sortable
	var sortableOptions = {
		tolerance: 'pointer',
		cursor: 'move',
		update: function(event, ui) {
			var tasksPrior = ui.item.closest('.todo-list').find('.todo-list--task').map(function() {return $(this).data('taskId');}).get(),
					todoListId = ui.item.closest('.todo-list').data('todoListId');
			$.ajax({
				type: "POST",
				url: "/../functions/update.php",
				data: { 
								todoListId: todoListId,
								tasksPriority: tasksPrior
							},
				dataType: "json",
				success: function(data) {
					var data = JSON.parse(data);
					console.log(data.reply);
					$().toastmessage('showSuccessToast', data.reply);
				},
			  error: function (jqXHR, exception) {
			  	var errMsg = ajErrMessage(jqXHR, exception);
			  	console.log(errMsg); 
			  	$().toastmessage('showErrorToast', errMsg);
				}
			});	// $.ajax UPDATE task
		}
	}

// task edit functions: edit, save, delete
function taskEdit(task, event) {
	var taskId = task.data("taskId"),
			taskDesc = task.children('[name $= -task-description]');

	switch (event) {
		case 'edit':
								taskDescTxt['e.'+taskId] = taskDesc.children('p:first-child').text().trim();
								taskDescTxt['dlt.'+taskId] = taskDesc.children('p[class $= -task-deadline]').text().trim();

								taskDesc.html('<input class="todo-list--task-description-editor" type="text" title="You can enter here new task description">');
								taskDesc.children('input').val(taskDescTxt['e.'+taskId]).focus();
								task.find('.todo-list--task-btn-edit').replaceWith('<i class="todo-list--task-btn-save fa fa-save"></i>');		
					break;
		case 'edit-dl':
									taskDescTxt['e-dl.'+taskId] = taskDesc.children('p[class $= -task-deadline]').children('span').text().trim();
									taskDesc.children('p[class $= -task-deadline]').children('span').html('<input class="todo-list--task-deadline-editor" type="text" title="You can enter here new task deadline">');
									taskDesc.find('input[class $= -deadline-editor]').val(taskDescTxt['e-dl.'+taskId]).focus();
									task.find('.todo-list--task-btn-dt').replaceWith('<i class="todo-list--task-btn-save-dline fa fa-save"></i>');		
			break;
		case 'save-dl':
								taskDescTxt['s-dl.'+taskId] = taskDesc.find('.todo-list--task-deadline-editor').val().trim();
								if(taskDescTxt['s-dl.'+taskId] !== taskDescTxt['e-dl.'+taskId]) { // changes check
									var regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;	

									if(regex.test(taskDescTxt['s-dl.'+taskId])) { // input validation
										$.ajax({
											type: "POST",
											url: "/../functions/update.php",
											data: { 
															taskId: taskId,
															taskDeadLine: taskDescTxt['s-dl.'+taskId]
														},
											dataType: "json",
											success: function(data) {
												var data = JSON.parse(data);
												if(data.reply) {
													console.log(data.reply);
													$().toastmessage('showSuccessToast', data.reply);
													taskDesc.children('p[class $= -task-deadline]').children('span').html(taskDescTxt['s-dl.'+taskId]);
													task.find('.todo-list--task-btn-save-dline').replaceWith('<i class="todo-list--task-btn-dt fa fa-calendar"></i>');
													delete taskDescTxt['e-dl.'+taskId];
													delete taskDescTxt['s-dl.'+taskId];
												} else if(data.error) {
													console.log(data.error);
													$().toastmessage('showErrorToast', data.error);
												}
											},
										  error: function (jqXHR, exception) {
										  	var errMsg = ajErrMessage(jqXHR, exception);
											  console.log(errMsg); 
											  $().toastmessage('showErrorToast', errMsg);
											}
										});	// $.ajax UPDATE task
									} else { // validation failed
										console.log("New task deadline - invalid");
										$().toastmessage('showErrorToast', "New task deadline - invalid, it should be in format (dd.mm.yyyy)");
										taskDesc.find('.todo-list--task-deadline-editor').addClass("error").on("input",function() { 
											$(this).removeClass("error"); 
											$(this).focus();
										});
									}
								} else {
									taskDesc.children('p[class $= -task-deadline]').children('span').html(taskDescTxt['s-dl.'+taskId]);
									task.find('.todo-list--task-btn-save-dline').replaceWith('<i class="todo-list--task-btn-dt fa fa-calendar"></i>');
												
									delete taskDescTxt['e-dl.'+taskId];
									delete taskDescTxt['s-dl.'+taskId];
									console.log('Task deadline not changed');
									$().toastmessage('showNoticeToast', 'Task deadline not changed');
								}
					break;
		case 'save':
								taskDescTxt['s.'+taskId] = taskDesc.children('[class $= -task-description-editor]').val().trim();

								if(taskDescTxt['s.'+taskId] !== taskDescTxt['e.'+taskId]) { // changes check
									var regex = /^[a-zA-Zа-яА-ЯЁё0-9-_!?@#№$%&.,'":\s]{3,1000}$/;			
									if(regex.test(taskDescTxt['s.'+taskId])) { // validation input
										$.ajax({
											type: "POST",
											url: "/../functions/update.php",
											data: { 
															taskId: taskId,
															taskDesc: taskDescTxt['s.'+taskId]
														},
											dataType: "json",
											success: function(data) {
												var data = JSON.parse(data);
												if(data.reply) {
													console.log(data.reply);
													$().toastmessage('showSuccessToast', data.reply);
													taskDesc.html('<p>'+taskDescTxt['s.'+taskId]+'</p><p class="todo-list--task-deadline">' +taskDescTxt['dlt.'+taskId]+ '</p>');
													task.find('.todo-list--task-btn-save').replaceWith('<i class="todo-list--task-btn-edit fa fa-pencil"></i>');
												
													delete taskDescTxt['e.'+taskId];
													delete taskDescTxt['s.'+taskId];
												} else if(data.error) {
													console.log(data.error);
													$().toastmessage('showErrorToast', data.error);
												}
											},
										  error: function (jqXHR, exception) {
										  	var errMsg = ajErrMessage(jqXHR, exception);
											  console.log(errMsg); 
											  $().toastmessage('showErrorToast', errMsg);
											}
										});	// $.ajax UPDATE task
									} else { // validation failed
										console.log("New task description - invalid");
										$().toastmessage('showErrorToast', "New task description - invalid, it should contain 3-1000 symbols without some specialchars");
										taskDesc.children('input').addClass("error").on("input",function() { $(this).removeClass("error"); });
									}
								} else {
									taskDesc.html('<p>'+taskDescTxt['s.'+taskId]+'</p><p class="todo-list--task-deadline">' +taskDescTxt['dlt.'+taskId]+ '</p>');
									task.find('.todo-list--task-btn-save').replaceWith('<i class="todo-list--task-btn-edit fa fa-pencil"></i>');
									
									delete taskDescTxt['s.'+taskId];
									delete taskDescTxt['e.'+taskId];
									console.log('Task description not changed');
									$().toastmessage('showNoticeToast', 'Task description not changed');
								}
					break;
		case 'escape':
									taskDesc.html('<p>'+taskDescTxt['e.'+taskId]+'</p><p class="todo-list--task-deadline">' +taskDescTxt['dlt.'+taskId]+ '</p>');
									task.find('.todo-list--task-btn-save').replaceWith('<i class="todo-list--task-btn-edit fa fa-pencil"></i>');
									delete taskDescTxt['e.'+taskId];
									$().toastmessage('showNoticeToast', 'Task description not changed');
					break;
		case 'delete':
									var str = "Do you realy want to delete task:\n";
									taskDesc.children('input').val() ? str = str + taskDesc.children('input').val() : str = str + taskDesc.children('p:first-child').html();

									if (confirm(str)) {
										$.ajax({
											type: "POST",
											url: "/../functions/delete.php",
											data: { 
															taskId: taskId,
														},
											dataType: "json",
											success: function(data) {
												var data = JSON.parse(data);
												if(data.reply) {
													console.log(data.reply);
													$().toastmessage('showSuccessToast', data.reply);
													task.remove();
												} else if(data.error) {
													console.log(data.error);
													$().toastmessage('showErrorToast', data.error);
												}
											},
										  error: function (jqXHR, exception) {
										  	var errMsg = ajErrMessage(jqXHR, exception);
											  console.log(errMsg); 
											  $().toastmessage('showErrorToast', errMsg);
											}
										});	// $.ajax delete task
									} // delete confirmed
					break;
		case 'insert':
									var list = task,
											listId = list.data("todoListId"),
											newTaskDesc = list.find('input[name $= -task-description]').val().trim();
									var d  = new Date(),
											dd = d.getDate(),
											mm = d.getMonth() + 1,
										  Y  = d.getFullYear();
											mm < 10 ? mm = '0' + mm : mm ; 
									if (newTaskDesc) { // if task description not empty  do next code
										var regex = /^[a-zA-Zа-яА-ЯЁё0-9-_!?@#№$%&.,'":\s]{3,1000}$/;			
										if(regex.test(newTaskDesc)) { // валидация ввода
										$.ajax({
											type: "POST",
											url: "/../functions/insert.php",
											data: { 
															listId: listId,
															taskDesc: newTaskDesc
														},
											dataType: "json",
											success: function(data) {
												var data = JSON.parse(data);
												if(data.reply) {
													console.log(data.reply);
													$().toastmessage('showSuccessToast', data.reply);

													list.children(".todo-list--task-wrapper").sortable(sortableOptions).append(
													'<div class="todo-list--task"  data-task-id="'+ data.lastInsertId +'">' +
														'<div class="todo-list--task-chkbx-done">' +
															'<input type="checkbox" name="todo-list--task-chkbx-done">' +
														'</div>' +
														'<div class="todo-list--task-description" name="todo-list--task-description">'+
															'<p>'+ newTaskDesc +'</p>'+
															'<p class="todo-list--task-deadline"> Deadline at: <span>' +dd+'.'+mm+'.'+Y+ '</span></p>'+
														'</div>' +
														'<div class="todo-list--task-btns-wrapper">' +
															'<div class="todo-list--task-btns">' +
																'<i class="todo-list--task-btn-dt fa fa-calendar"></i>' +
																'<i class="todo-list--task-btn-edit fa fa-pencil"></i>' +
																'<i class="todo-list--task-btn-delete fa fa-trash"></i>' +
															'</div>' +
														'</div>' +
													'</div>');
													
													list.find('input[name $= -task-description]').val("");

												} else if(data.error) {
													console.log(data.error);
													$().toastmessage('showErrorToast', data.error);
												}
											},
										  error: function (jqXHR, exception) {
										  	var errMsg = ajErrMessage(jqXHR, exception);
											  console.log(errMsg); 
											  $().toastmessage('showErrorToast', errMsg);
										  }
										});	// $.ajax Add new task
									} else { // invalid input
										console.log("New task description - invalid");
										$().toastmessage('showErrorToast', "New task description - invalid, it should contain 3-1000 symbols without some specialchars");
										list.find('input[name $= -task-description]').addClass("error").on("input",function() { $(this).removeClass("error"); });
									}
									} else { 
										console.log("New task description is empty"); 
										$().toastmessage('showWarningToast', 'New task description is empty');
										list.find('input[name $= -task-description]').addClass("error").on("input",function() { $(this).removeClass("error"); });
									}
					break;
	}
}

//Formatting ajax error message
function ajErrMessage(jqXHR, exception) {
	var msg = '';
  if (jqXHR.status === 0) {
      msg = 'Not connect.\n Verify Network.';
  } else if (jqXHR.status == 404) {
      msg = 'Requested page not found. [404]';
  } else if (jqXHR.status == 500) {
      msg = 'Internal Server Error [500].';
  } else if (exception === 'parsererror') {
      msg = 'Requested JSON parse failed.';
  } else if (exception === 'timeout') {
      msg = 'Time out error.';
  } else if (exception === 'abort') {
      msg = 'Ajax request aborted.';
  } else {
      msg = 'Uncaught Error.\n' + jqXHR.responseText;
  }
  return(msg);
}
 
// preloader
$(window).on('load', function() {
	$('.preloader').delay(10).fadeOut('slow');
	$('html').css('background-color', 'transparent');
});
