
// DATA HEWAN
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
];

let index=0, coins=10, diamonds=3, lives=3;

// MENU
function toggleGuide(){ 
  const g=document.getElementById("guideBox"); 
  g.style.display=g.style.display==="none"?"block":"none";
}
function startGame(){ 
  document.getElementById("menuScreen").style.display="none";
  document.getElementById("gameScreen").style.display="block";
  loadLevel();
}

// GAME
function loadLevel(){
  const a=animals[index];
  document.getElementById("animalImg").src=a.img;
  document.getElementById("animalImg").classList.remove("revealed");
  document.getElementById("answerInput").value="";
  document.getElementById("resultText").innerText="";
  document.getElementById("clueBox").style.display="none";
  document.getElementById("levelNumber").innerText=index+1;
}
function checkAnswer(){
  const input=document.getElementById("answerInput").value.toLowerCase();
  const result=document.getElementById("resultText");
  const img=document.getElementById("animalImg");
  if(input===animals[index].name){
    result.innerHTML="🎉 Benar!";
    result.className="correct";
    img.classList.add("revealed");
    coins+=5; document.getElementById("coins").innerText=coins;
    setTimeout(()=>{
      index++; if(index>=animals.length) gameOver(true); else loadLevel();
    },1000);
  }else{
    lives--; document.getElementById("lives").innerText=lives;
    result.innerHTML="❌ Salah! Nyawa berkurang"; result.className="wrong";
    if(lives<=0) setTimeout(gameOver,false);
  }
}

function buyClueCoin(){
  if(coins<2){ alert("Koin tidak cukup!"); return; }
  coins-=2; document.getElementById("coins").innerText=coins;
  showClue();
}
function buyClueDiamond(){
  if(diamonds<1){ alert("Diamond tidak cukup!"); return; }
  diamonds-=1; document.getElementById("diamonds").innerText=diamonds;
  showClue(true);
}
function showClue(reveal=false){
  const clueBox=document.getElementById("clueBox");
  clueBox.innerHTML="💡 "+animals[index].clue;
  clueBox.style.display="block";
  if(reveal) document.getElementById("animalImg").classList.add("revealed");
}

// GAME OVER
function gameOver(won=false){
  document.getElementById("gameScreen").style.display="none";
  const end=document.getElementById("endScreen");
  if(won){ end.querySelector("h1").innerText="🎉 Kamu Menang! 🎉"; }
  end.style.display="block";
}
function restart(){
  index=0; coins=10; diamonds=3; lives=3;
  document.getElementById("coins").innerText=coins;
  document.getElementById("diamonds").innerText=diamonds;
  document.getElementById("lives").innerText=lives;
  document.getElementById("endScreen").style.display="none";
  document.getElementById("menuScreen").style.display="block";
}
