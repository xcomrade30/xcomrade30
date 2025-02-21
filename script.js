document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load todos from local storage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        list.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${todo.text}</span>
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="deleteTodo(${index})">✘</button>
            `;
            list.appendChild(li);
        });
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const text = input.value.trim();
        if (text !== '') {
            todos.push({ text, completed: false });
            input.value = '';
            saveTodos();
            renderTodos();
        }
    });

    window.toggleComplete = function(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    window.deleteTodo = function(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    renderTodos();
});