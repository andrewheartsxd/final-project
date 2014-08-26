 // ---------- CLASS/OBJECT ----------
// User holds two Racks. One for "top" and another for "bottom" The array makes it easy for us to add on another rack for another type of clothing if needed.
function User(name){
  this.name = name;
  this.racks = [new Rack(), new Rack()];
}

// Rack's hold the clothing in the "item" array.
// The rack will NOT have any information regarding what type of item it SHOULD be holding. This type of sorting will be taken care of within a separate function.
// index is used to tell where in the "item" array the piece of clothing is supposed to go.
function Rack() {
  this.item = new Array();
  this.index = 0;
}

function addToRack(rack, clothing) {
  rack.item[rack.index] = clothing;
  rack.index++;
}

function getImgSource(clothing) {
  return clothing.picture;
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
var clothingColors = ["black","white","grey","blue","yellow","red","green","beige"];
var clothingType = ["top", "bottom"];




// ---------- SIGNUP BUTTON ----------
// Creates userObject on sign up button click. Will need to make similar function on log-in click. Will pass userObject to memory.
$('#signUpButton').on("click", function() {
  var username = $("#username").val();

  if(username === "") {
    $('#pleasefill').text("You do have to fill this stuff out, you know.")
  }
  else {
    var userObject = new User(username);
    localStorage.setItem("UserKey", JSON.stringify(userObject));
    window.location.href = 'closet.html';
  }
});


// ---------- ADD ITEM BUTTON ---------
// Creates clothing Object based on user drop. Grabs userObject from memory - parse it - sort it based on type - stringify it - return it to memory. Checks if user selected properties. User gets feedback via add-item button.
$("#add-item").on("click", function() {

  var type = $("#type-selector option:selected").attr("value");
  var color = $("#color-selector option:selected").attr("value");
  var wholeString = $('#dropbox').css("background-image");
  var source = wholeString.substring(4, wholeString.length - 1);
  if(type === "type" || color === "color" || wholeString === "none") {
    $("#add-item").val("Pick properties");
  }
  else {
    var clothing = new Clothing(type, color, source);
    var userObject = JSON.parse(localStorage.getItem("UserKey"));
    if(clothing.type === clothingType[0]) {
      addToRack(userObject.racks[0], clothing);
    }
    else if (clothing.type === clothingType[1]) {
      addToRack(userObject.racks[1], clothing);
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
  var userObject = JSON.parse(localStorage.getItem("UserKey"));
  $.each(userObject.racks[0].item, function(index, value) {
    $("#top-images").append("<img class='picture' src='"+ getImgSource(value) + "'>");
  });
  $.each(userObject.racks[1].item, function(index, value) {
    $("#bottom-images").append("<img class='picture' src='"+ getImgSource(value) + "'>");
  });
});



// --------- PICK LONGEST RACK ---------
// Picks the largest rack.
function pickLongestRack(user) {
  var dummyArray = new Array();
  $.each(user.racks, function(i, value) {
    dummyArray[i] = user.racks[i].length;
  });
  var maxLengthArray = dummyArray.reduce(function(previous, current) {
    return previous > current ? previous : current;
  });
  var index = dummyArray.indexOf(maxLengthArray);
  return index;
}

//  ---------- PICK FIRST ITEM -----------
// Randomly pick clothes item from largest array.
function pickFirstItem(user) {
  var index = pickLongestRack(user);
  var randomIndex = Math.floor(Math.random() * user.racks[index].length);

  var firstClothing = user.racks[index].item[randomIndex];
  localStorage.setItem("firstClothing", JSON.stringify(firstClothing));
}

// ---------- PICK NEXT ITEM ----------
function pickNextItem(user) {
  pickFirstItem(user);
  var firstClothing = JSON.parse(localStorage.getItem("firstClothing"));
  rules(firstClothing);
}

function rules(firstClothing) {
  var firstType = firstClothing.type;
  var firstColor = firstClothing.color;

  switch(firstType) {
    case "top":

      switch(firstColor) {
        case "black"
      }

    break;

    case: "bottom"
    break;
  }






}



// Image Drag and Drop
// (function dragDrop() {

  var dropbox = $('#dropbox')[0]
  var state = $('#state')[0]

  // Checks for FileReader

  if(typeof window.FileReader === 'undefined') {
    state.className = 'fail' ;
  } else {
    state.className = 'success';
    // state.innerHTML = 'File API & FileReader available'
  }

  dropbox.ondragover = function() {
    this.className = 'hover'; return false;
  };
  dropbox.ondragend = function () {
    this.className = ''; return false;
  };
  dropbox.ondrop = function (e) {
    this.className = 'dropped';
    e.preventDefault();

    var file = e.dataTransfer.files[0],
        reader = new FileReader();
    reader.onload = function (event) {
      console.log(event.target);
      dropbox.style.background = 'url('+ event.target.result + ') no-repeat center';
      dropbox.style.backgroundSize = "250px 250px";
    };

    console.log(file);
    reader.readAsDataURL(file);
  }
// })

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
