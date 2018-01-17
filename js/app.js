const list = document.getElementById("todo-list");
const form = document.getElementById('todo-form');
const input = document.getElementById('add-input');
const button = document.getElementById('add-button');

form.addEventListener('submit', addItem);

function addItem(event) {
	event.preventDefault();
	if (!input.value) {
		alert('Add new item, please');
	} else {
		list.appendChild(createItem(input.value));
		input.value = '';
	}
};

function createElement(tag, properties, ...childrens) {
	const element = document.createElement(tag);
	Object.keys(properties).forEach(function (value) {
		element[value] = properties[value];
		console.log(element);
	});
	if (childrens) {
		for (child in childrens) {
			element.appendChild(childrens[child]);
		}
	}
	return element;
};

function createItem(title) {
	const checkbox = createElement('input', {'type': 'checkbox', 'className': 'checkbox'});
	const label = createElement('label', {'innerText': title, 'className': 'textfield'});
	const input = createElement('input', {'value': title, 'type': 'text', 'disabled': true, 'className': 'event-title'});
	const deleteButton = createElement('button', {'className': 'delete', 'innerText': 'Remove'});
	const editButton = createElement('button', {'className': 'change', 'innerText': 'Change'});
	const li = createElement('li', {'className': 'todo-item'}, checkbox, label, input, deleteButton, editButton);

	checkbox.addEventListener('click', changeState);
	deleteButton.addEventListener('click', removeItem);
	editButton.addEventListener('click', changeItem);

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
	var eventTitle = event.target.parentNode.querySelector('.event-title');
	if (eventTitle.hasAttribute('disabled')) {
		eventTitle.removeAttribute('disabled');
		event.target.innerHTML = 'SAVE';
	} else {
		eventTitle.setAttribute('disabled', '');
		event.target.innerHTML = 'CHANGE';
	}
};