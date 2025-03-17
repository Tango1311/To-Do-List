// Получаем элементы из HTML
const inputBox = document.getElementById('input-box') // Поле ввода текста
const listContainer = document.getElementById('list-container') // Контейнер списка задач

// Функция для добавления новой задачи
function addTask() {
	// Убираем пробелы в начале и в конце строки, проверяем, пустая ли строка
	let taskText = inputBox.value.trim()

	if (taskText === '') {
		alert('Ты должен что-нибудь написать!') // Если строка пустая, выводим сообщение
		return // Прерываем выполнение функции
	}

	// Создаем новый элемент списка (<li>)
	let li = document.createElement('li')
	li.textContent = taskText // Устанавливаем текст задачи

	// Создаем кнопку удаления (крестик)
	let deleteButton = document.createElement('span')
	deleteButton.innerHTML = '\u00d7' // Специальный символ "×"

	// Добавляем кнопку удаления внутрь <li>
	li.appendChild(deleteButton)

	// Добавляем задачу в список
	listContainer.appendChild(li)

	// Очищаем поле ввода после добавления задачи
	inputBox.value = ''

	// Сохраняем список в LocalStorage
	saveData()
}

// Обработчик кликов на список (делегирование событий)
listContainer.addEventListener('click', function (event) {
	let targetElement = event.target // Элемент, по которому кликнули

	// Если кликнули по задаче (<li>), переключаем ее состояние (выполнено/не выполнено)
	if (targetElement.tagName === 'LI') {
		targetElement.classList.toggle('checked') // Добавляем/убираем класс
		saveData() // Сохраняем изменения
	}
	// Если кликнули по кнопке удаления (<span>), удаляем задачу
	else if (targetElement.tagName === 'SPAN') {
		targetElement.parentElement.remove() // Удаляем родительский <li>
		saveData() // Сохраняем изменения
	}
})

// Функция сохранения списка задач в LocalStorage
function saveData() {
	localStorage.setItem('tasks', listContainer.innerHTML)
}

// Функция загрузки сохраненного списка задач при открытии страницы
function loadData() {
	let savedTasks = localStorage.getItem('tasks') // Получаем данные из LocalStorage
	if (savedTasks) {
		listContainer.innerHTML = savedTasks // Вставляем задачи в список
	}
}

// Загружаем сохраненные задачи при старте страницы
loadData()
