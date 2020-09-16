var randomNumber1 = Math.floor(Math.random()*6 + 1);
var imageName1 = "images\\dice" + randomNumber1 + ".png";
document.querySelector(".img1").setAttribute("src", imageName1);

var randomNumber2 = Math.floor(Math.random()*6 + 1);
var imageName2 = "images\\dice" + randomNumber2 + ".png";
document.querySelector(".img2").setAttribute("src", imageName2);

var h1Text;
if (randomNumber1 === randomNumber2){
  h1Text = "Draw!";
} else if (randomNumber1 > randomNumber2) {
  h1Text = "🚩 Player 1 wins!";
} else if (randomNumber1 < randomNumber2) {
  h1Text = "Player 2 wins! 🚩";
}

document.querySelector("h1").innerHTML = h1Text;
