async function fetchItems() {
    const listElement = document.getElementById('items-list');
    const errorElement = document.getElementById('error-message');

    try {
        // Делаем запрос к нашему API
        const response = await fetch('/api/items');
        
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const items = await response.json();

        // Очищаем список (удаляем надпись "Загрузка")
        listElement.innerHTML = '';

        if (items.length === 0) {
            listElement.innerHTML = '<li>Список пуст</li>';
            return;
        }

        // Отрисовываем элементы
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `ID: ${item.id} — <span>${item.name}</span>`;
            listElement.appendChild(li);
        });

    } catch (error) {
        console.error('Ошибка:', error);
        listElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.innerText = 'Не удалось загрузить данные. Проверьте подключение к БД.';
    }
}

// Запускаем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchItems);