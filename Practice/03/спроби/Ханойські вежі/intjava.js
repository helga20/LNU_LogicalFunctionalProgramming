// Імпортуємо бібліотеку Tau-Prolog
const pl = require('tau-prolog');

// Ініціалізуємо Tau-Prolog
const session = pl.create(1000); // Максимальна кількість мілісекунд для виконання запиту

// Ініціалізуємо стан гри
const gameState = [
    { tower: 'towerA', disks: [3, 2, 1] },
    { tower: 'towerB', disks: [] },
    { tower: 'towerC', disks: [] }
];

// Функція для відображення дисків на вежах
function displayGameState() {
    // Очищаємо вежі
    document.querySelectorAll('.tower').forEach(tower => {
        tower.innerHTML = '';
    });

    // Додаємо диски на вежі відповідно до стану гри
    gameState.forEach(state => {
        const tower = document.getElementById(state.tower);
        state.disks.forEach(diskSize => {
            const disk = document.createElement('div');
            disk.className = 'disk';
            disk.style.width = `${diskSize * 30}px`; // Залежить від розміру дисків
            tower.appendChild(disk);
        });
    });
}

// Оновлюємо інтерфейс після завантаження сторінки
window.onload = () => {
    displayGameState();
};

// Логіка для кнопки "Розв'язати"
const solveButton = document.getElementById('solveButton');
solveButton.addEventListener('click', () => {
    // Викликаємо Tau-Prolog для знаходження послідовності ходів і оновлюємо інтерфейс
    // Код для розв'язання гри та оновлення інтерфейсу тут
});

// Додайте логіку для взаємодії з гравцем, руху дисків та перевірки завершення гри
