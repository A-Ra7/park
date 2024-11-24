let score = 0;
let isPlaying = false;
let neighbor;
let moveInterval = 1000; // Базовая скорость перемещения
let wasteSize = 50;    // Базовый размер мусора

let timeLeft = 60;
let timerInterval;

function startGame() {
    score = 0;
    timeLeft = 60;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    isPlaying = true;
    createNeighbor();
    
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    isPlaying = false;
    clearInterval(timerInterval);
    if (neighbor) {
        neighbor.remove();
        neighbor = null;
    }
    alert(`Время вышло! Вы собрали ${score} из 50 единиц мусора. Вам нужно собрать весь мусор чтобы сделать мир чище! Попробуйте еще раз!`);
}

function createNeighbor() {
    if (!isPlaying) return;
    
    if (neighbor) {
        neighbor.remove();
    }

    neighbor = document.createElement('div');
    neighbor.className = 'neighbor';
    neighbor.onclick = catchNeighbor;

    const gameField = document.getElementById('gameField');
    const maxX = gameField.offsetWidth - 50;
    const maxY = gameField.offsetHeight - 50;

    neighbor.style.left = Math.random() * maxX + 'px';
    neighbor.style.top = Math.random() * maxY + 'px';

    gameField.appendChild(neighbor);

    setTimeout(() => {
        if (neighbor) {
            neighbor.style.left = Math.random() * maxX + 'px';
            neighbor.style.top = Math.random() * maxY + 'px';
        }
    }, 1000);
}

function catchNeighbor() {
    score++;
    document.getElementById('score').textContent = score;
    
    // Проверяем условие победы
    if (score >= 50) {
        victory();
        return;
    }
    
    createNeighbor();
}

function victory() {
    isPlaying = false;
    clearInterval(timerInterval);
    if (neighbor) {
        neighbor.remove();
        neighbor = null;
    }
    alert(`Поздравляем! Вы сделали мир чище! \nВремя: ${60 - timeLeft} секунд\nОчки: ${score}`);
}

// let upgrades = {
//     speed: { level: 0, price: 10, maxLevel: 5 },
//     size: { level: 0, price: 15, maxLevel: 3 },
//     timeBonus: { level: 0, price: 20, maxLevel: 5 }
// };

// function updateDisplay() {
//     document.getElementById('score').textContent = score;
//     document.getElementById('speedUpgradePrice').textContent = upgrades.speed.price;
//     document.getElementById('sizeUpgradePrice').textContent = upgrades.size.price;
//     document.getElementById('timeBonusPrice').textContent = upgrades.timeBonus.price;
    
//     // Отключаем кнопки, если достигнут максимальный уровень или не хватает очков
//     Object.keys(upgrades).forEach(type => {
//         const upgrade = upgrades[type];
//         const element = document.querySelector(`[onclick="buyUpgrade('${type}')"]`);
//         if (upgrade.level >= upgrade.maxLevel || score < upgrade.price) {
//             element.classList.add('disabled');
//         } else {
//             element.classList.remove('disabled');
//         }
//     });
// }

// function buyUpgrade(type) {
//     if (!isPlaying) return;
    
//     const upgrade = upgrades[type];
//     if (score >= upgrade.price) {
//         score -= upgrade.price;
//         upgrade.level++;
        
//         switch(type) {
//             case 'speed':
//                 moveInterval -= 100;
//                 upgrade.price = Math.floor(upgrade.price * 1.5);
//                 break;
//             case 'size':
//                 wasteSize += 10;
//                 upgrade.price = Math.floor(upgrade.price * 1.5);
//                 break;
//             case 'timeBonus':
//                 timeLeft += 5;
//                 document.getElementById('timer').textContent = timeLeft;
//                 upgrade.price = Math.floor(upgrade.price * 1.8);
//                 break;
//         }
//     }
// }