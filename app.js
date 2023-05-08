// --- import --- //
import Player from "./player.js";
import BulletHandler from "./BulletHandler.js";
import EnemyHandler from "./EnemyHandler.js";

// --- canvas fönstret --- //
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";

// --- SOUNDENGINE5000MK2 --- //
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

// --- ändrar utseendet lite --- //
function setStyle() {
  c.shadowBlur = 0;
  c.lineJoin = "bevel";
  c.lineWidth = 10;
}

// --- random nummer --- //
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// --- färger för fiender --- //
const colours = [
  "#1afe49",
  "#f887ff",
  "#de004e",
  "#e96d5e",
  "#ff9760",
  "#ff124f",
  "#ff00a0",
  "#fe75f3",
  "#73fffe",
  "#ff6e27",
  "#c4ffff",
  "#08deea",
  "#1261d1",
  "#65dc98",
  "#a0ffe3",
  "#ff2a6d",
  "#05d9e8",
];

let enemy_x;
let enemy_y;
let enemy_colour;
let enemy_health;
let enemy_xspeed;
let enemy_yspeed;
let enemy_radius;
let enemy_damage;
let enemy_delay;
let timeTilRefresh = 0;
let diffThreshold = 0;
let waveCounter = 0;
let score = 0;
let level = 0;
let attemptCount = 1;

// --- spawnfunktion för fiender --- //
function enemySpawn() {
  // --- Slumpar fienders egenskaper --- //
  if (timeTilRefresh <= 0) {
    enemy_colour = colours[getRandomArbitrary(0, colours.length)];
    enemy_health = getRandomArbitrary(3 + diffThreshold, 4 + diffThreshold);
    enemy_xspeed = getRandomArbitrary(1, 3);
    enemy_yspeed = getRandomArbitrary(-10 + diffThreshold, 10 + diffThreshold);
    enemy_radius = 30 + enemy_health * 3;
    enemy_damage = 10;
    enemy_delay = getRandomArbitrary(10, 15);
    enemy_x = canvas.width + enemy_radius;
    enemy_y = getRandomArbitrary(enemy_radius, canvas.height - enemy_radius);
    timeTilRefresh = 100;
    waveCounter += 1;
  }
  // --- gör spelet svårare med tiden --- //
  if (waveCounter == 10) {
    diffThreshold++;
    waveCounter = 0;
    enemy_damage += 2;
    waveBoss(diffThreshold);
  }

  timeTilRefresh--;
  enemyHandler.spawnEnemy(
    enemy_x,
    enemy_y,
    enemy_colour,
    enemy_health,
    enemy_xspeed,
    enemy_yspeed,
    enemy_radius,
    enemy_damage,
    enemy_delay,
    canvas.width,
    canvas.height
  );
}

function waveBoss(dt) {
  enemyHandler.spawnEnemy(
    canvas.width,
    canvas.height / 2,
    "red",
    20 + dt * 2,
    2 + dt * 2,
    0,
    100,
    50,
    0,
    canvas.width,
    canvas.height
  );
}

// --- hanterar skott --- //
const bulletHandler = new BulletHandler(canvas);

// --- tar in spelaren --- //
const player = new Player(canvas.width / 7, canvas.height / 2, bulletHandler);

// --- fiender --- //
const enemyHandler = new EnemyHandler(canvas);

// --- meny --- //
function menu() {
  c.fillStyle = "white";
  c.font = "50px Orbitron";
  c.fillText("Press Enter to Start", canvas.width / 4, canvas.height / 1.65);
  c.font = "20px Orbitron";
  c.fillText(
    "Move with the Arrow Keys, hold the Spacebar to fire",
    canvas.width / 4,
    canvas.height / 2
  );

  document.addEventListener(
    "keyup",
    (event) => {
      if (player.health <= 0 && event.key === "Enter") {
        player.health = 100;
        intervalID = setInterval(gameLoop, 1000 / 60);
        myMusic = new sound("stolen assets/Guitarmass.mp3");
        myMusic.play();
      }
    },
    false
  );
}
menu();

// --- main loop --- //
function gameLoop() {
  setStyle();
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  bulletHandler.draw(c);
  player.draw(c);

  // --- scoremeter --- //
  c.rect(0, canvas.height - 10, score, 10);
  c.fill();
  if (score >= canvas.width) {
    score = 0;
    level += 1;
    player.health += 5;
    player.damage += 0.07;
  }

  // --- spawnar fiender --- //
  enemyHandler.draw(c);
  enemySpawn();

  // --- ui --- //
  c.shadowBlur = 0;
  c.fillStyle = "white";
  c.font = "50px Orbitron";
  c.fillText("Game " + attemptCount, 25, 50);
  c.fillText("HP: " + player.health, 25, 150);
  c.fillText("LVL: " + level, 25, 100);

  displayTips();

  // --- kollosion --- //
  enemyHandler.enemies.forEach((enemy) => {
    if (bulletHandler.collideWith(enemy)) {
      score += 10;
      if (enemy.health <= 0) {
        score += 50;
        const index = enemyHandler.enemies.indexOf(enemy);
        enemyHandler.enemies.splice(index, 1);
      }
    }
    if (enemyHandler.playerCollide(player)) {
      // --- om spelaren dör --- //
      if (player.health <= 0) {
        playerDeath();
      }
    }
  });
}

// --- Lista med Tips --- //
const tipArray = [
  "Press the Arrow Keys to move",
  "You can fire bullets at enemies to eliminate them",
  "Hold down the Spacebar to shoot",
  "You deal more damage when you level up",
  "Reaching a new level restores some health",
  "You lose when your health reaches zero",
  "Your maximum health is 100",
  "The game becomes harder as you keep playing it",
  "Enemies come in all sorts of colours",

  "One could make all kinds of explosives, using simple household items",
  "Chlorine gas can be created by mixing bleach with ammonia",
  "Approximately 1 in 5 adults in the US experience mental illness in a given year",
  "Over 40 million people worldwide are victims of modern slavery",

  "Think about all the things that went wrong in your life",
  "Avoid doing things that make you happy",
  "Focus on your mistakes rather than your accomplishments",
  "Give up on your dreams",
];

// --- visar tips --- //
let tipTimer = 0;
let currentTip = "";
function displayTips() {
  if (tipTimer <= 0) {
    currentTip = tipArray[getRandomArbitrary(0, tipArray.length)];
    tipTimer = 500;
  }
  tipTimer--;
  c.fillStyle = "white";
  c.font = "24px Orbitron";
  c.fillText("Fun Tip:  " + currentTip, 25, canvas.height - 25);
}

// --- starta om --- //
function reset() {
  document.addEventListener(
    "keyup",
    (event) => {
      if (player.health <= 0 && event.key === "Enter") {
        window.location.reload(true);
        timeTilRefresh = 0;
      }
    },
    false
  );
}
reset();

// --- spelaren dör --- //
function playerDeath() {
  clearInterval(intervalID);
  // --- tar bort fiender och skott --- //
  enemyHandler.enemies = [];
  bulletHandler.bullets = [];
  player.x = canvas.width / 7;
  player.y = canvas.height / 2;
  // --- ställer om spelet --- //
  attemptCount += 1;
  timeTilRefresh = 0;
  diffThreshold = 0;
  waveCounter = 0;
  score = 0;
  level = 0;
  // --- ändrar till döds-skärmen --- //
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "red";
  c.shadowBlur = 10;
  c.shadowColor = "red";
  c.font = "50px Orbitron";
  c.fillText("You Are Dead", 50, 100);
  c.fillText("Press Enter to Try Again", 50, canvas.height - 50);
  // --- stoppar musiken --- //
  myMusic.stop();
}

// --- spelar musik --- //
var myMusic;
myMusic = new sound("stolen assets/Guitarmass.mp3");

// --- intervall --- //
let intervalID;
