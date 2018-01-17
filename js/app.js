const list = document.getElementById("todo-list");
const form = document.getElementById('todo-form');
const input = document.getElementById('add-input');
const button = document.getElementById('add-button');

form.addEventListener('submit', addItem);

function bindEvents(listItem) {
	var checkbox = listItem.querySelector('.checkbox');
	var	removeBtn = listItem.querySelector('.delete');
	var	changeBtn = listItem.querySelector('.change');
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

function createElement(element, properties, ...childrens) {
	var element = document.createElement(element);
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
	var checkbox = createElement('input', {'type': 'checkbox', 'className': 'checkbox'});
	var label = createElement('label', {'innerText': title, 'className': 'textfield'});
	var input = createElement('input', {'value': title, 'type': 'text', 'disabled': true, 'className': 'event-title'});
	var deleteButton = createElement('button', {'className': 'delete', 'innerText': 'Remove'});
	var editButton = createElement('button', {'className': 'change', 'innerText': 'Change'});
	var li = createElement('li', {'className': 'todo-item'}, checkbox, label, input, deleteButton, editButton);

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

	var eventTitle = event.target.parentNode.querySelector('.event-title');
	if (eventTitle.hasAttribute('disabled')) {
		eventTitle.removeAttribute('disabled');
		event.target.innerHTML = 'SAVE';
	} else {
		eventTitle.setAttribute('disabled', '');
		event.target.innerHTML = 'CHANGE';
	}
};