// User holds two Racks. One for "top" and another for "bottom" The array makes it easy for us to add on another rack for another type of clothing if needed.
function User(name){
  this.name = name;
  this.racks = [new Rack(), new Rack()];
}

// Rack's hold the clohting in the "item" array.
// The rack will NOT have any information regarding what type of item it SHOULD be holding. This type of sorting will be taken care of within a separate function.
// index is used to tell where in the "item" array the piece of clothing is supposed to go.
function Rack() {
  this.item = new Array();
  this.index = 0;
  this.addToRack(item) {
    item[index] = item;
    index++;
  }
}

// colors and type will be passed to the class Clothing in array form (clothingtype[0] for example). This makes it easier to add another color or type later.
function Clothing(color,picture,type) {
  this.color = color;
  this.picture = picture;
  this.type = type;
  picked = false;
}

// Declare colors and types within arrays so it will be easy to add things in the future.
var clothingColors = ["black","white","grey","blue","blue","red","green","beige"];
var clothingType = ["top", "bottom"];






// Used for testing purposes:
var Vincent = new User("Vincent");

// function pickRandom() {
//   if(topRack.length =< bottomRack.length {
//     var startItem = topRack[floor(Math.rand()*(topRack.length - 1))];
//     return startItem;
//   }
//   else {
//     var startItem = bottomRack[floor(Math.rand()*(bottomRack.length - 1))];
//     return startItem;
//   }
// }

// // Category is either bottomRack
// function pickClothes(color,category) {
//   for(i = 0; i < bottomRack.length; i++){
//     if(bottomRack.item.color === "white") {
//       tempRack[i] = bottomRack[i];
//     }
//   }
// }
// // Unsure if to use User.rack.startItem or just startItem.
// function match(startItem) {
//   if(startItem.category === "top") { /* Ensures startItem is a top */
//     switch(startItem.color) {
//       case "blue":
//         for(i = 0; i < bottomRack.length; i++){
//           if(bottomRack.item.color === "white") {
//             tempRack[i] = bottomRack[i];
//           }
//         }
//       case "black":
//         for(i = 0; i < bottomRack.length; i++){
//           if(bottomRack.item.color === "white") {
//             tempRack[i] = bottomRack[i];
//     }
//   }
//   else {
//     switch(startItem.color) {
//       case blue:
//     }
//   }
// }

