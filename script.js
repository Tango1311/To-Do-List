const inputBox = document.getElementById('input-box')
const listContainer = document.getElementById('list-container')

function addTask() {
	if (inputBox.value.trim() === '') {
		alert('Ты должен что-нибудь написать!')
		return
	}

	let li = document.createElement('li')
	li.innerHTML = inputBox.value
	listContainer.appendChild(li)

	let span = document.createElement('span')
	span.innerHTML = '\u00d7' // Крестик для удаления
	li.appendChild(span)

	inputBox.value = ''
	saveData()
}

// Добавляем делегирование событий (чтобы можно было кликать по <li> и <span>)
listContainer.addEventListener('click', function (e) {
	if (e.target.tagName === 'LI') {
		e.target.classList.toggle('checked') // Переключение состояния выполненного задания
		saveData()
	} else if (e.target.tagName === 'SPAN') {
		e.target.parentElement.remove() // Удаление элемента
		saveData()
	}
})

// Функции для сохранения списка в LocalStorage
function saveData() {
	localStorage.setItem('tasks', listContainer.innerHTML)
}

function loadData() {
	listContainer.innerHTML = localStorage.getItem('tasks') || ''
}

// Загружаем сохраненные задачи при запуске
loadData()
