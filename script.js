const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let confettiActive = false;
let confettiParticles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function ConfettiParticle() {
    this.x = random(0, canvas.width);
    this.y = random(-canvas.height, 0);
    this.radius = random(5, 10);
    this.color = `hsl(${random(0, 360)}, 100%, 50%)`;
    this.speed = random(2, 5);
    this.angle = random(0, 2 * Math.PI);
    this.angularSpeed = random(-0.05, 0.05);
}

function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(p.angle) * 2;
        p.angle += p.angularSpeed;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
    confettiParticles = confettiParticles.filter(p => p.y < canvas.height + p.radius);
    if (confettiActive) requestAnimationFrame(updateConfetti);
}

function startConfetti() {
    confettiActive = true;
    confettiParticles = Array.from({length: 150}, () => new ConfettiParticle());
    updateConfetti();
}

function stopConfetti() {
    confettiActive = false;
    confettiParticles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ======== Programmer Stats ========

function isProgrammerDay() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear === Math.pow(2, 8);
}

function balanceWorkTime(isHappyDay) {
    const totalWeekHours = 7 * 24;
    const workHours = isHappyDay ? 0 : 40;
    const personalHours = totalWeekHours - workHours;
    return personalHours / workHours;
}

function codeCoverage(isHappyDay) {
    return isHappyDay ? 100 : random(80, 100);
}

function countBugs(isHappyDay) {
    return isHappyDay ? 0 : Math.floor(random(0, 10));
}

function renderStats() {
    const isHappy = isProgrammerDay();
    const balance = balanceWorkTime(isHappy);
    const coverage = codeCoverage(isHappy);
    const bugs = countBugs(isHappy);

    const statsDiv = document.getElementById('stats');
    const title = document.getElementById('title');

    // Поздравление
    const congratsHtml = isHappy 
        ? `<div class="congrats">
                <h2>🎉 С днем программиста!</h2>
                <p>Пусть код компилируется с первого раза и кофе всегда горячий ☕</p>
           </div>`
        : '';

    // Статистика
    const statsHtml = `<div class="statistics">
        <p>Отношение личного времени к рабочему = ${balance.toFixed(1)}</p>
        <p>Покрытие кода = ${coverage.toFixed(1)}%</p>
        <p>Багов найдено = ${bugs}</p>
    </div>`;

    // Объединяем и вставляем
    statsDiv.innerHTML = congratsHtml + statsHtml;

    // Анимации и конфетти
    if (isHappy) {
        title.classList.add('happy');
        startConfetti();
    } else {
        title.classList.remove('happy');
        stopConfetti();
    }
}

document.getElementById('refresh').addEventListener('click', renderStats);
renderStats();
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
