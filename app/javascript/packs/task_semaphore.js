window.addEventListener('turbolinks:load' , () => {
	const rawTasks = document.querySelector('#rawKanbanTasks');
	const tasks = [...rawTasks.children].map(el => {
		return [el.getAttribute('task_id'), el.getAttribute('task_name'), el.getAttribute('task_status')]
	});

	tasks.forEach(el => {
		const container = document.querySelector(`.${el[2]}`);
		const item = document.createElement('div');

		item.className = 'border rounded-1 m-3 p-2';
		item.textContent = el[1];
		item.setAttribute('task_id', el[0]);
		item.setAttribute('draggable', true);

		// Add event listeners to the task items
		item.addEventListener('dragstart', dragStart);
		item.addEventListener('dragenter', dragEnter);
		item.addEventListener('dragover', dragOver);
		item.addEventListener('drop', drop);


		container.appendChild(item);
	});
	rawTasks.remove();
});

function dragStart(e) {
	e.dataTransfer.setData('text/plain', e.target.getAttribute('task_id'));
}

function dragEnter(e) {
	e.preventDefault();
}

function dragOver(e) {
	e.preventDefault();
}

function drop(e) {
  const taskId = e.dataTransfer.getData('text/plain');
  const newStatusID = e.target.parentElement.id;
  const taskEl = document.querySelector(`[task_id="${taskId}"]`);
  const targetEl = e.target.closest('td');
  const targetIndex = Array.from(targetEl.children).indexOf(e.target);
  const currentStatusID = taskEl.parentElement.id;

  // Check if task is already in the same row
  if(currentStatusID === newStatusID) return;

  // Update the task status in the database using an AJAX call
  fetch(`/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    body: JSON.stringify({ status_id: newStatusID })
  }).then(response => {
    if (response.ok) {
      // Move the task to the new column in the UI
      targetEl.insertBefore(taskEl, targetEl.children[targetIndex]);
    } else {
      throw new Error('Error updating task status.');
    }
  }).catch(error => {
    console.error(error);
  });
}

