const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');
const planets = [];
const shootingStars = [];
const twinklingStars = [];
const maxPlanets = 10;
const maxShootingStars = 5;
const maxTwinklingStars = 50; // Adjust for sparsity of twinkling stars
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

canvas.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generatePlanets();
    initializeTwinklingStars();
}

function generatePlanets() {
    planets.length = 0; // Clear existing planets
    for (let i = 0; i < maxPlanets; i++) {
        planets.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * (20 - 5) + 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
}

function calculateParallaxPosition(x, y, depth) {
    const movementFactor = 0.05 * depth;
    const deltaX = (mouseX - window.innerWidth / 2) * movementFactor;
    const deltaY = (mouseY - window.innerHeight / 2) * movementFactor;
    return { x: x + deltaX, y: y + deltaY };
}

function drawPlanet(planet) {
    const newPos = calculateParallaxPosition(planet.x, planet.y, 1);
    ctx.fillStyle = planet.color;
    ctx.beginPath();
    ctx.arc(newPos.x, newPos.y, planet.radius, 0, Math.PI * 2);
    ctx.fill();
}

function maybeGenerateShootingStar() {
    if (shootingStars.length < maxShootingStars && Math.random() < 0.01) {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: 0,
            length: Math.random() * (80 - 30) + 30,
            angle: Math.PI / 4,
        });
    }
}

function updateShootingStars() {
    shootingStars.forEach(star => {
        star.x += Math.cos(star.angle) * 10;
        star.y += Math.sin(star.angle) * 10;
    });
    // Remove off-screen shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        if (shootingStars[i].x > canvas.width || shootingStars[i].y > canvas.height) {
            shootingStars.splice(i, 1);
        }
    }
}

function drawShootingStar(star) {
    const startPos = calculateParallaxPosition(star.x, star.y, 0.5);
    const endPos = calculateParallaxPosition(star.x - Math.cos(star.angle) * star.length, star.y - Math.sin(star.angle) * star.length, 0.5);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startPos.x, startPos.y);
    ctx.lineTo(endPos.x, endPos.y);
    ctx.stroke();
}

function initializeTwinklingStars() {
    twinklingStars.length = 0; // Clear existing stars
    for (let i = 0; i < maxTwinklingStars; i++) {
        twinklingStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random()
        });
    }
}

function updateTwinklingStars() {
    twinklingStars.forEach(star => {
        star.opacity += (Math.random() - 0.5) * 0.02; // Adjust for slower twinkling
        star.opacity = Math.max(0, Math.min(1, star.opacity)); // Clamp opacity between 0 and 1
    });
}

function drawTwinklingStar(star) {
    const newPos = calculateParallaxPosition(star.x, star.y, 0.3);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.beginPath();
    ctx.arc(newPos.x, newPos.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawTwinklingStars() {
    twinklingStars.forEach(drawTwinklingStar);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    planets.forEach(drawPlanet);
    shootingStars.forEach(drawShootingStar);
    drawTwinklingStars();
}

function update() {
    maybeGenerateShootingStar();
    updateShootingStars();
    updateTwinklingStars(); // Update the twinkling effect
    draw();
    requestAnimationFrame(update);
}

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();
update();
