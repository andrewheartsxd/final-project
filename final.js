function User(name){
  this.name = name;
  rack = [[clothingType[0], clothingType[1]];
}

function Closet() {
  var item = new Arrray()
  this.addToRack(item) {

  }
}

var topRack = new Closet();
var bottomRack = new Closet();
var tempRack = Array();
var Vincent = new User("Vincent");

var clothingType = ["top", "bottom"];

Vincent.topRack.addToRack(blueShirt);
Vincent.bottomRack.addToRack(pinkPants);


function Clothing(color,picture,category) {
  this.color = color;
  this.picture = picture;
  this.category = category;
  picked = false;
}

function pickRandom() {
  if(topRack.length =< bottomRack.length {
    var startItem = topRack[floor(Math.rand()*(topRack.length - 1))];
    return startItem;
  }
  else {
    var startItem = bottomRack[floor(Math.rand()*(bottomRack.length - 1))];
    return startItem;
  }
}

// Category is either bottomRack
function pickClothes(color,category) {
  for(i = 0; i < bottomRack.length; i++){
    if(bottomRack.item.color === "white") {
      tempRack[i] = bottomRack[i];
    }
  }
}
// Unsure if to use User.rack.startItem or just startItem.
function match(startItem) {
  if(startItem.category === "top") { /* Ensures startItem is a top */
    switch(startItem.color) {
      case "blue":
        for(i = 0; i < bottomRack.length; i++){
          if(bottomRack.item.color === "white") {
            tempRack[i] = bottomRack[i];
          }
        }
      case "black":
        for(i = 0; i < bottomRack.length; i++){
          if(bottomRack.item.color === "white") {
            tempRack[i] = bottomRack[i];
    }
  }
  else {
    switch(startItem.color) {
      case blue:
    }
  }
}
