const list = document.getElementById("todo-list");
const form = document.getElementById('todo-form');
const input = document.getElementById('add-input');
const button = document.getElementById('add-button');

let toDos = [];

form.addEventListener('submit', addItem);

function createList() {
	// toDos = [];
	var parsedList = JSON.parse(localStorage.myToDos);
	parsedList.forEach(function (item) {
		list.appendChild(createItem(item)).setAttribute('data-index', item.serialNumber);
		// addNewItemToList(item.name);
		toDos.push(item);
	});
};

function addItem(event) {
	event.preventDefault();
	if (!input.value) {
		alert('Add new item, please');
	} else {
		addNewItemToList(input.value);
		list.appendChild(createItem(toDos[toDos.length - 1]));
		input.value = '';
	}
};

function createElement(tag, properties, ...childrens) {

	const element = document.createElement(tag);
	Object.keys(properties).forEach(function (value) {
		element[value] = properties[value];
	});

	if (childrens) {
		for (child in childrens) {
			element.appendChild(childrens[child]);
		}
	}

	return element;
};

function createItem(item) {
	console.log(item);
	const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox', checked: item.done});
	const label = createElement('label', {innerText: item.name, className: 'textfield'});
	const input = createElement('input', {value: item.name, type: 'text', disabled: true, className: 'event-title'});
	const deleteButton = createElement('button', {className: 'delete', innerText: 'Remove'});
	const editButton = createElement('button', {className: 'change', innerText: 'Change'});
	const li = createElement('li', {className: 'todo-item'}, checkbox, label, input, deleteButton, editButton);
	li.setAttribute('data-index', item.serialNumber);

	checkbox.addEventListener('click', changeState);
	deleteButton.addEventListener('click', removeItem);
	editButton.addEventListener('click', changeItem);

	if (item.done) {
		li.classList.add('discarded');
	}
	return li;
};

function removeItem(event) {
	toDos.splice(event.target.parentNode.dataset.index ,1);
	addToLocalStorage(toDos);
	list.innerHTML = '';
	createList();
};

function changeState(event) {
	var checkbox = event.target;
	if(toDos[checkbox.parentNode.dataset.index].done) {
		toDos[checkbox.parentNode.dataset.index].done = false;
		checkbox.parentNode.classList.remove('discarded');
	} else {
		toDos[checkbox.parentNode.dataset.index].done = true;
		checkbox.parentNode.classList.add('discarded');
	}
	addToLocalStorage(toDos);
};

function changeItem(event) {
	var eventTitle = event.target.parentNode.querySelector('.event-title');

	if (eventTitle.hasAttribute('disabled')) {
		eventTitle.removeAttribute('disabled');
		event.target.innerHTML = 'SAVE';
	} else {
		toDos[event.target.parentNode.dataset.index].name = eventTitle.value;
		addToLocalStorage(toDos);
		list.innerHTML = '';
		createList();
		eventTitle.setAttribute('disabled', '');
		event.target.innerHTML = 'CHANGE';
	}
};

function addNewItemToList(value) {
	var item = {
		name: value,
		serialNumber: toDos.length,
		done: false
	}
	toDos.push(item);
	addToLocalStorage(toDos);
};

function addToLocalStorage(value) {
	localStorage.setItem('myToDos', JSON.stringify(value));
};

window.onload = createList();