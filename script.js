const animals = [
  {name:"kucing", clue:"Hewan lucu berbulu lembut, suka mengeong.", img:"K.webp"},
  {name:"kuda", clue:"Hewan cepat, berkaki empat, sering ditunggangi manusia.", img:"D.webp"},
  {name:"penguin", clue:"Burung yang tidak bisa terbang tapi pandai berenang.", img:"ping.jpg"},
  {name:"gajah", clue:"Mamalia terbesar dengan belalai panjang.", img:"G.jpg"},
  {name:"anjing", clue:"Hewan setia, suka menggonggong dan bermain.", img:"A.jpg"},
  {name:"harimau", clue:"Bergaris oranye hitam, predator hutan.", img:"H.jpg"},
  {name:"jerapah", clue:"Lehernya sangat panjang, pemakan daun di pohon tinggi.", img:"J.jpg"},
  {name:"panda", clue:"Beruang hitam-putih, suka makan bambu.", img:"P.jpg"},
  {name:"kelinci", clue:"Hewan kecil berbulu, suka melompat dan makan wortel.", img:"k.jpg"},
  {name:"tikus", clue:"Hewan kecil, suka makan keju dan berlari cepat.", img:"T.png"},
  {name:"unta", clue:"Hewan gurun dengan punuk untuk menyimpan lemak.", img:"unta.avif"},
  {name:"buaya", clue:"Reptil besar pemakan daging, tinggal di sungai.", img:"B.jpg"},
  {name:"singa", clue:"Raja hutan dengan surai besar pada jantan.", img:"s.avif"},
  {name:"zebra", clue:"Mamalia bergaris hitam-putih, mirip kuda.", img:"Z.jpg"},
  {name:"monyet", clue:"Hewan gesit, suka memanjat pohon, pintar.", img:"M.jpg"},
  {name:"lumba-lumba", clue:"Mamalia laut cerdas, suka meloncat di air.", img:"L.jpg"},
  {name:"kangguru", clue:"Hewan Australia, melompat tinggi dengan kantong di perut.", img:"guru.jpg"},
  {name:"kudanil", clue:"Hewan besar, hidup di air dan darat, gigi taring besar.", img:"N.jpg"},
  {name:"merak", clue:"Burung indah berekor panjang dan berwarna cerah.", img:"E.jpg"},
  {name:"rusa", clue:"Hewan bertanduk, lari cepat, hidup di hutan.", img:"R.jpg"}
];;

let level = 0;
let lives = 3;
let coins = 10;
let diamonds = 3;

function startGame() {
    document.getElementById("menuScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    loadLevel();
}

function toggleGuide() {
    let g = document.getElementById("guideBox");
    g.style.display = g.style.display === "none" ? "block" : "none";
}

function loadLevel() {
    let animal = animals[level];

    document.getElementById("animalImg").src = animal.img;
    document.getElementById("animalImg").style.filter = "blur(10px)"; 

    document.getElementById("emojiEffect").style.opacity = "0";
    document.getElementById("emojiEffect").style.transform = "translate(-50%, -50%) scale(0)";

    document.getElementById("levelNumber").innerText = level + 1;
    document.getElementById("clueBox").innerText = "";
    document.getElementById("answerInput").value = "";

    updateStats();
}

function updateStats() {
    document.getElementById("lives").innerText = lives;
    document.getElementById("coins").innerText = coins;
    document.getElementById("diamonds").innerText = diamonds;
}

function checkAnswer() {
    let input = document.getElementById("answerInput").value.toLowerCase();
    let animal = animals[level];

    if (input === animal.name) {
        document.getElementById("resultText").innerHTML = "Benar! 😲🎉";

        // Hilangkan blur
        document.getElementById("animalImg").style.filter = "blur(0px)";

        // Emoji animasi
        const emoji = document.getElementById("emojiEffect");
        emoji.style.opacity = "1";
        emoji.style.transform = "translate(-50%, -50%) scale(1.3)";

        // Tambah koin otomatis
        coins += 3;
        updateStats();

        // Lanjut level
        setTimeout(() => {
            level++;
            if (level >= animals.length) {
                endGame(true);
            } else {
                loadLevel();
            }
        }, 1500);

    } else {
        document.getElementById("resultText").innerHTML = "Salah!";
        lives--;
        updateStats();

        if (lives <= 0) endGame(false);
    }
}

function buyClueCoin() {
    if (coins < 2) {
        document.getElementById("clueBox").innerText = "Koin tidak cukup!";
        return;
    }

    coins -= 2;
    updateStats();
    document.getElementById("clueBox").innerText = animals[level].clue;
}

function buyClueDiamond() {
    if (diamonds < 1) {
        document.getElementById("clueBox").innerText = "Diamond tidak cukup!";
        return;
    }

    diamonds--;
    updateStats();

    let word = animals[level].name;
    document.getElementById("clueBox").innerText = "Huruf pertama: " + word.charAt(0).toUpperCase();
}

function endGame(win) {
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("endScreen").style.display = "block";

    document.querySelector("#endScreen h1").innerText =
        win ? "Selamat! Kamu Menyelesaikan Semua Level 🎉" : "Game Over 😢";
}

function restart() {
    level = 0;
    lives = 3;
    coins = 10;
    diamonds = 3;
    document.getElementById("endScreen").style.display = "none";
    startGame();
}
