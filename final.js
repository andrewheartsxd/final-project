// ---------- CLASS/OBJECT ----------
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
  this.addToRack = function(clothing) {
    this.item[this.index] = clothing;
    this.index++;
  }
  this.getImgSource = function(i) {
    return this.item[i].picture;
  }
}

// colors and type will be passed to the class Clothing in array form (clothingtype[0] for example). This makes it easier to add another color or type later.
function Clothing(type, color, picture) {
  this.type = type;
  this.color = color;
  this.picture = picture;
  this.picked = false;
}


// ---------- SETTINGS ----------
// Declare colors and types within arrays so it will be easy to add things in the future.
var clothingColors = ["black","white","grey","blue","blue","red","green","beige"];
var clothingType = ["top", "bottom"];




// ---------- SIGNUP BUTTON ----------
// Creates userObject on sign up button click. Will need to make similar function on log-in click. Will pass userObject to memory.
$('#signUpButton').on("click", function() {
  var username = $("#username").val();
  var userObject = new User(username);
  localStorage.setItem("User", JSON.stringify(userObject));
});


// ---------- ADD ITEM BUTTON ---------
// Creates clothing Object based on user drop. Grabs userObject from memory - parse it - sort it based on type - stringify it - return it to memory. Checks if user selected properties. User gets feedback via add-item button.
$("#add-item").on("click", function() {
  var type = $("#type-selector option:selected").attr("value");
  var color = $("#color-selector option:selected").attr("value");
  var clothing;
  if(type === "--type--" || color === "--color--") {
    $("#add-item").val("Pick properties");
  }
  else {
    var source = /*picture source */
    clothing = new Clothing(type, color, source);
    var userObject = localStorage.getItem("UserKey");
    userObject = JSON.parse(userObject);
    if(clothing.type === clothingType[0]) {
      userObject.racks[0].addToRack(clothing);
    }
    else if (clothing.type === clothingType[1]) {
      userObject.racks[1].addToRack(clothing);
    }
    localStorage.setItem("UserKey",JSON.stringify(userObject));
  }
});
// Returns add-item button to default value on mouseoff.
$("#add-item").on("mouseleave", function() {
  $("#add-item").val("add item");
});

// ---------- CLOSET PAGE LOAD -----------
// As soon as the DOM tree is created, will run this function. UserObject is retrived from memory and parsed - <img> tag assigned to top/bottom section with source.
$(function() {
  var userObject = localStorage.getItem("UserKey");
  userObject = JSON.parse(userObject);
  $.each(userObject.racks.item[0], function(index, value) {
    $("#top-images").append("<img src='"+ getImgSource(index) + "'>");
  });
  $.each(userObject.racks.item[1], function(index, value) {
    $("#bottom-images").append("<img src='"+ getImgSource(index) + "'>");
  });
});



// --------- PICK LONGEST RACK ---------
function pickLongestRack(user) {
  var dummyArray = new Array();
  $.each(user.racks, function(i, value) {
    dummyArray[i] = user.racks[i].length;
  });
  var maxLengthArray = dummyArray.reduce(function(previous, current) {
    return previous > current ? previous : current;
  });
  return maxLengthArray;
}

//  ---------- PICK FIRST ITEM -----------
// Picks the largest rack.
function pickFirstItem(user) {
  var index = pickLongestRack(user);
  var randomIndex = Math.floor(Math.random() * user.racks[index].length);

  var firstClothing = user.racks[index][randomIndex];
  localStorage.setItem("firstClothing", JSON.stringify(firstClothing));
}

// ---------- PICK NEXT ITEM ----------
function pickNextItem(user) {
  pickFirstItem(user);
  var firstClothing = localStorage.getItem("firstClothing");
  firstClothing = JSON.parse(firstClothing);
}





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
