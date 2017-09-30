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
		createItem (input.value);
		input.value = "";
	}
}

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

	var deleteButton = document.createElement('button');
	deleteButton.className = 'delete';

	var editButton = document.createElement('button');
	editButton.className = 'change';

	list.appendChild(li);
	li.appendChild(checkbox);
	li.appendChild(label);
	li.appendChild(input);
	li.appendChild(deleteButton);
	li.appendChild(editButton);

	console.log(form);
};