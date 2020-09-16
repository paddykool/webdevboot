function throwDice() {
    var dice1 = Math.floor(Math.random() * 6) +1 ;
    return dice1;
}

var dice1 = throwDice();
var dice2 = throwDice();

var dice1Img = document.getElementsByTagName("img")[0];
var dice2Img = document.getElementsByTagName("img")[1];

var dice1SrcName = "images\\dice" + dice1 + ".png";
var dice2SrcName = "images\\dice" + dice2 + ".png";

console.log(dice1SrcName);
console.log(dice2SrcName);

dice1Img.setAttribute("src", dice1SrcName);
dice2Img.setAttribute("src", dice2SrcName);

if (dice1 == dice2){
    document.querySelector("h1").innerHTML = "Draw!"
} else if (dice1 > dice2) {
    document.querySelector("h1").innerHTML = "Player 1 Wins!"
} else if (dice1 < dice2) {
    document.querySelector("h1").innerHTML = "Player 2 Wins!"
}
