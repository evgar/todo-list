const list = document.getElementById("todo-list");
const form = document.getElementById('todo-form');
const input = document.getElementById('add-input');
const button = document.getElementById('add-button');

form.addEventListener('submit', addItem);

function bindEvents(listItem) {
	var checkbox = listItem.querySelector('.checkbox'),
		removeBtn = listItem.querySelector('.delete'),
		changeBtn = listItem.querySelector('.change');
	checkbox.addEventListener('change', changeState);

	changeBtn.addEventListener('click', changeItem);

	removeBtn.addEventListener('click', removeItem)

};

function addItem(event) {
	event.preventDefault();
	if (!input.value) {
		alert('Add new item, please');
	} else {
		list.appendChild(createItem(input.value));
		input.value = '';
	}
};

function createItem(title) {
	var li = document.createElement('li');
	li.className = 'todo-item';

	var checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.className = 'checkbox';

	var label = document.createElement('label');
	label.innerText = title;
	label.className = 'textfield';

	var input = document.createElement('input');
	input.value = title;
	input.type = 'text';
	input.setAttribute('disabled', true);
	input.className = 'event-title';

	var deleteButton = document.createElement('button');
	deleteButton.className = 'delete';
	deleteButton.innerText = "Remove";

	var editButton = document.createElement('button');
	editButton.className = 'change';
	editButton.innerText = "Change";

	li.appendChild(checkbox);
	li.appendChild(label);

	li.appendChild(input);
	li.appendChild(deleteButton);
	li.appendChild(editButton);
	bindEvents(li);
	return li;
};

function removeItem(event) {
	event.target.parentNode.remove();
};

function changeState(event) {
	var checkbox = event.target;
	checkbox.parentNode.classList.toggle('discarded');
};

function changeItem(event) {
	var eventTitle = document.querySelector('.event-title');
	if(eventTitle.hasAttribute('disabled')) {
		eventTitle.removeAttribute('disabled');
		event.target.innerHTML = 'SAVE';
	} else {
		eventTitle.setAttribute('disabled','');
		event.target.innerHTML = 'CHANGE';
	}
};