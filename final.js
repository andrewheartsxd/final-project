 // ---------- CLASS/OBJECT ----------
// User holds two Racks. One for "top" and another for "bottom" The array makes it easy for us to add on another rack for another type of clothing if needed.
function User(name,pass){
  this.name = name;
  this.pass = pass;
  this.racks = [new Rack(), new Rack()];
}

// Rack's hold the clothing in the "item" array.
// The rack will NOT have any information regarding what type of item it SHOULD be holding. This type of sorting will be taken care of within a separate function.
// index is used to tell where in the "item" array the piece of clothing is supposed to go.
function Rack() {
  this.item = new Array();
  this.index = 0;
}

// colors and type will be passed to the class Clothing in array form (clothingtype[0] for example). This makes it easier to add another color or type later.
function Clothing(type, color, picture) {
  this.type = type;
  this.color = color;
  this.picture = picture;
  this.picked = false;
}
// ---------- END ----------


// --------- FUNCTIONS ----------
// Had to be global. Methods/functions are not saved via localStorage.
function addToRack(rack, clothing) {
  rack.item[rack.index] = clothing;
  rack.index++;
}
function getImgSource(clothing) {
  return clothing.picture;
}
function findIndexProp(array, property, propertyValue) {
  var includeIndexes = new Array();
  for(var i = 0; i < array.length; i++) {
    if(array[i][property] === propertyValue) {
      includeIndexes.push(i);
    }
  }
  return includeIndexes;
}
function pushArray(arrayOut, fullRack, arrayIndex) {
  $.each(fullRack, function(indexFullRack, valFullRack) {
    $.each(arrayIndex, function(index, value) {
      if(indexFullRack === value) {
        arrayOut.push(valFullRack);
      }
    });
  });
}
function getClothing(arrayOut, arraySource, property, propertyValues) {
  $.each(propertyValues, function(i, val) {
    var includeIndexes = findIndexProp(arraySource, property, val);
    pushArray(arrayOut, arraySource, includeIndexes);
  });
    if(arrayOut.length > 0) {
      var randomIndex = Math.floor(Math.random() * arrayOut.length);
      var secondClothing = arrayOut[randomIndex];
      localStorage.setItem("secondClothing", JSON.stringify(secondClothing));
      var firstClothing = JSON.parse(localStorage.getItem("firstClothing"));
      $("#match-top")[0].style.background = "url(" + firstClothing.picture + ") no-repeat center";
      $("#match-top")[0].style.backgroundSize = "250px 250px";
      $("#match-bottom")[0].style.background = "url(" + secondClothing.picture + ") no-repeat center";
      $("#match-bottom")[0].style.backgroundSize = "250px 250px";
    }
    else {
      $("#generate").text("Try again...and get more clothes!")
      $("#match-top")[0].style.background = "";
      $("#match-bottom")[0].style.background = "";
    }
}
// ---------- END ----------


// ---------- SETTINGS ----------
// Declare colors and types within arrays so it will be easy to add things in the future.
var clothingColors = ["black","white","grey","blue","yellow","red","green","beige"];
var clothingType = ["top", "bottom"];
// ---------- END ----------

// ---------- LOG-IN ----------
$("#signInButton").on("click", function() {
  if($("#login-username").val() != "") {
    userName = $("#login-username").val();
    if(searchLocalStorage(userName) === true) {
      userObject = JSON.parse(localStorage.getItem(userName));
      if(userObject.pass === $("#login-password").val()) {
        localStorage.setItem("currentKey", JSON.stringify(userName));
        window.location.href = 'closet.html';
      }
      else {
        $("#log-in-feedback").text("Incorrect username/password.");
      }
    }
    else {
      $("#log-in-feedback").text("Incorrect username/password.");
    }
  }
});
// ---------- END ----------

// ---------- SIGNUP BUTTON ----------
// Creates userObject on sign up button click. Will need to make similar function on log-in click. Will pass userObject to memory.
$('#signUpButton').on("click", function() {
  var userName = $("#username").val();
  var password = $("#password").val();
  var email = $("#email").val();
  localStorage.setItem("currentKey", JSON.stringify(userName));
  if(searchLocalStorage(userName) === true) {
    $('#pleasefill').text("Username is taken.");
  }
  else {
    if(userName === "" || password === "" || email === "") {
      $('#pleasefill').text("You do have to fill this stuff out, you know.")
    }
    else {
      var userObject = new User(userName, $("#password").val());
      localStorage.setItem(userName, JSON.stringify(userObject));
      window.location.href = 'closet.html';
    }
  }
});
// ---------- END ----------


// ---------- ADD ITEM BUTTON ---------
// Creates clothing Object based on user drop. Grabs userObject from memory - parse it - sort it based on type - stringify it - return it to memory. Checks if user selected properties. User gets feedback via add-item button.
$("#add-item").on("click", function() {

  var type = $("#type-selector option:selected").attr("value");
  var color = $("#color-selector option:selected").attr("value");
  var wholeString = $('#dropbox').css("background-image");
  var source = wholeString.substring(4, wholeString.length - 1);
  if(type === "type" || color === "color" || wholeString === "none") {
    $("#add-item").val("pick properties");
  }
  else {
    currentKey = JSON.parse(localStorage.getItem("currentKey"));
    var clothing = new Clothing(type, color, source);
    var userObject = JSON.parse(localStorage.getItem(currentKey));
    if(clothing.type === clothingType[0]) {
      addToRack(userObject.racks[0], clothing);
    }
    else if (clothing.type === clothingType[1]) {
      addToRack(userObject.racks[1], clothing);
    }
    userObject.racks[0].item = userObject.racks[0].item.filter(function(n) {
      return n != undefined;
    })
    userObject.racks[1].item = userObject.racks[1].item.filter(function(n) {
      return n != undefined;
    })

    localStorage.setItem(currentKey,JSON.stringify(userObject));
    $("#dropbox")[0].style.background = "";
    $("#type-selector").prop('selectedIndex',0);
    $("#color-selector").prop('selectedIndex',0);
    $("#add-item").val("Item Added");
  }
});
// Returns add-item button to default value on mouseoff.
$("#add-item").on("mouseleave", function() {
  $("#add-item").val("add item");
});
// ---------- END ----------


// ---------- LOAD CLOSET -----------
// As soon as the DOM tree is created, will run this function. UserObject is retrived from memory and parsed - <img> tag assigned to top/bottom section with source.

$(function() {
  var currentKey = JSON.parse(localStorage.getItem("currentKey"));
  if(currentKey != null) {
    var userObject = JSON.parse(localStorage.getItem(currentKey));
    $.each(userObject.racks[0].item, function(index, value) {
      $("#top-images").append("<img class='picture' src='"+ getImgSource(value) + "'>");
    });
    $.each(userObject.racks[1].item, function(index, value) {
      $("#bottom-images").append("<img class='picture' src='"+ getImgSource(value) + "'>");
    });
  }
});
// ---------- END ----------

function filterArray(value, index, array1) {
  return value.picture != delObj;
}

// ---------- DELETE CLOTHING ----------
$(window).load(function () {
  $(".picture").on('click',function() {
    alert($(this).attr('src'));
    delObj = $(this).attr('src');
    var currentKey = JSON.parse(localStorage.getItem("currentKey"));
    var userObject = JSON.parse(localStorage.getItem(currentKey));

    userObject.racks[0].item = userObject.racks[0].item.filter(filterArray);
    userObject.racks[1].item = userObject.racks[1].item.filter(filterArray);

    localStorage.setItem(currentKey, JSON.stringify(userObject));
    location.reload();
  })
})
// ---------- END ----------


// ---------- GENERATE OUTFIT BUTTON -----------
$("#nav-3, #generate").on("click", function() {
  currentKey = JSON.parse(localStorage.getItem("currentKey"));
  var userObject = JSON.parse(localStorage.getItem(currentKey));
  if(userObject.racks[0].item.length > 0) {
    pickNextItem(userObject);
  }
  else {
    alert("get more clothes you bum");
  }
});
// ---------- END ----------


// ---------- SEARCH LOCAL STORAGE ---------
function searchLocalStorage(item) {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if(key === item) {
      return true;
    }
  }
  return false;
}
// ---------- END ----------


//  ---------- PICK FIRST ITEM -----------
// Randomly pick clothes item from largest array.
function pickFirstItem(user) {
  var randomIndex = Math.floor(Math.random() * user.racks[0].item.length);

  var firstClothing = user.racks[0].item[randomIndex];
  localStorage.setItem("firstClothing", JSON.stringify(firstClothing));
}
// ---------- END ----------


// ---------- PICK NEXT ITEM ----------
function pickNextItem(user) {
  pickFirstItem(user);
  var firstClothing = JSON.parse(localStorage.getItem("firstClothing"));
  rules(firstClothing, user);
}
// ---------- END ----------


// ---------- MATCH 2ND ITEM -----------
function rules(firstClothing, user) {
  var firstColor = firstClothing.color;
  var tempArray = new Array(); /*Will copy a rack for so code doesn't change the user's rack*/
  userRack = user.racks[1].item; /*tempArray now holds all of the user's bottoms*/
  switch(firstColor) {
    case clothingColors[0] : /*black*/
      var legalColors = [clothingColors[1],clothingColors[2],clothingColors[3],clothingColors[4],clothingColors[5],clothingColors[6],clothingColors[7]];
      getClothing(tempArray, userRack, "color", legalColors);
      break;
    case clothingColors[1] : /*white*/
      var legalColors = [clothingColors[0],clothingColors[2],clothingColors[3],clothingColors[4],clothingColors[5],clothingColors[6],clothingColors[7]];
      getClothing(tempArray, userRack, "color", legalColors);
      break;
    case clothingColors[2] : /*grey*/
      var legalColors = [clothingColors[0],clothingColors[1],clothingColors[3],clothingColors[4],clothingColors[5],clothingColors[6],clothingColors[7]];
      getClothing(tempArray, userRack, "color", legalColors);
      break;
    case clothingColors[3] : /*blue*/
      var legalColors = [clothingColors[1],clothingColors[2],clothingColors[4],clothingColors[7]];
      getClothing(tempArray, userRack, "color", legalColors);
      break;
    case clothingColors[4] : /*yellow*/
      var legalColors = [clothingColors[1],clothingColors[2],clothingColors[3]];
      getClothing(tempArray, userRack, "color", legalColors);
      break;
    case clothingColors[5] : /*red*/
      var legalColors = [clothingColors[0],clothingColors[1],clothingColors[2],clothingColors[3],clothingColors[7]];
      getClothing(tempArray, userRack, "color", legalColors);
      break;
    case clothingColors[6] : /*green*/
      var legalColors = [clothingColors[1],clothingColors[2],clothingColors[3],clothingColors[4]];
      getClothing(tempArray, userRack, "color", legalColors);
      break;
    case clothingColors[7] : /*beige*/
      var legalColors = [clothingColors[1],clothingColors[2],clothingColors[3]];
      getClothing(tempArray, userRack, "color", legalColors);
      break;
  }
}
// ---------- END ----------


// ----------CHAOS MADE ------------
$("#chaos").on("click", function() {
  var tempArray = new Array();
  var currentKey = JSON.parse(localStorage.getItem("currentKey"));
  var userObject = JSON.parse(localStorage.getItem(currentKey));
  if(userObject.racks[0].item.length > 0 && userObject.racks[1].item.length > 0) {
    pickFirstItem(userObject);
    userRack = userObject.racks[1].item;
    getClothing(userRack, userRack, "color", clothingColors);
  }
  else {
    $("#generate").text("Try again...and get more clothes!")
  }
})
// ---------- END ----------


// ----------- SIGN OUT CONFIRM --------------
    $("#confirm").click(function(){
      localStorage.setItem("currentKey", null);
      alert("Where do you think you're going? Come back again soon!");
    });
// ---------- END -----------
