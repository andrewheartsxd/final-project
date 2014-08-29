var selectedColor;
var selectedSize;
var selectedQuantity;
var colors = ["pink", "mint", "army", "dotted", "beach", "surf"];
var sizes = ["s", "m", "l"];
var price = 50;
// var cartFull = false

function Brief (color, size, price, productNo) {
  this.color = color;
  this.size = size;
  this.price = price;
  this.productNo = productNo;
}

function makeProductList() {
  productList = [];

  for(c = 0; c < colors.length; c++) {
    for(s = 0; s < sizes.length; s++) {
      var tempBrief = new Brief(colors[c], sizes[s], price, 0);
      productList.push(tempBrief);
    }
  }
  return productList; //[(pink,s,50,0),(pink,m,50,0)...]
}


function addToCart() {
  for(i = 0; i < productList.length; i++) {
    if(selectedColor === productList[i].color && selectedSize === productList[i].size && selectedQuantity > 0) {
      productList[i].productNo += selectedQuantity;
      // var cartFull = true
    }
    else {
      // var cartFull = false
      document.getElementById("add-cart").value = "Select a size, color, and quantity.";
    }
  }
}

function checkoutFunction() {
  //Checks to see if anything is in cart
  for(i = 0; i < productList.length; i++) {
    if(productList[i].productNo > 0) {
      var cartFull = true
    }
  }

  if(cartFull === true) {


    //scrolls down to checkout section
    location.href="#";
    location.href="#checkout-bookmark";
    //builds order array
    orderList = [];

    for(i = 0; i < productList.length; i++) {
      if(productList[i].productNo > 0) {
        orderList.push(productList[i]);
      }
    }
    //Under "Items" lists items in cart
    for(i = 0; i < orderList.length; i++) {
      var div = document.createElement("div");
      var node = document.createTextNode("Brief: " + orderList[i].color + " " + orderList[i].size);
      div.appendChild(node);

      var element = document.getElementById("checkout-item-title");
      element.appendChild(div);
    }
    //Under "Quantity" lists quantity of items in cart
    for(i = 0; i < orderList.length; i++) {
      var div = document.createElement("div");
      var node = document.createTextNode(orderList[i].productNo + "x");
      div.appendChild(node);

      var element = document.getElementById("checkout-quantity-title");
      element.appendChild(div);
    }
    //Under "Price" lists price of items in cart
    for(i = 0; i < orderList.length; i++) {
      var div = document.createElement("div");
      var node = document.createTextNode("$" + parseFloat(orderList[i].price).toFixed(2));
      div.appendChild(node);

      var element = document.getElementById("checkout-price-title");
      element.appendChild(div);
    }
    //Under "Subtotal" lists subtotal of items in cart
    for(i = 0; i < orderList.length; i++) {
      var div = document.createElement("div");
      var node = document.createTextNode("$" + parseFloat(orderList[i].price * orderList[i].productNo).toFixed(2));
      div.appendChild(node);

      var element = document.getElementById("checkout-total-title");
      element.appendChild(div);
    }
    //Calculates Total, calculates Tax, lists under "Total" and "Tax", respectively
    var total = 0
    for(i = 0; i < orderList.length; i++) {
      var subtotal = (orderList[i].price * orderList[i].productNo);
      total = total + subtotal;
    }
    var tax = (0.095 * total)
    total = total + tax
    document.getElementById("tax-value").innerHTML = "$" + parseFloat(tax).toFixed(2)
    document.getElementById("total-value").innerHTML = "$" + parseFloat(total).toFixed(2)

  }
  else {
    alert("Select a size, color, and quantity.");
  }
}


//customer creator
function Customer (name, street, city, state, zip) {
  this.name = name;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

function createCust () {
  name = document.getElementById("input-name").value;
  street = document.getElementById("input-street").value;
  city = document.getElementById("input-city").value;
  state = document.getElementById("input-state").value;
  zip = document.getElementById("input-zip").value;

  newCust = new Customer(name, street, city, state, zip);

}

function confirmation () {

  //scrolls down to confirmation
  location.href="#";
  location.href="#conf-bookmark";

  document.getElementById("result-name").innerHTML = newCust.name
  document.getElementById("result-address1").innerHTML = newCust.street
  document.getElementById("result-address2").innerHTML = newCust.city + " " + newCust.state + " " + newCust.zip

  for(i = 0; i < orderList.length; i++) {
    var div = document.createElement("div");
    var node = document.createTextNode("Brief: " + orderList[i].color + " " + orderList[i].size);
    div.appendChild(node);

    var element = document.getElementById("result-cart");
    element.appendChild(div);
  }

  document.getElementById("result-total").innerHTML = document.getElementById("total-value").innerHTML


}

// Sets selectedColor to pink/mint/army/dotted/beach/surf
document.getElementById("pink-button").addEventListener('click', selectColorPink,false);
document.getElementById("mint-button").addEventListener("click", selectColorMint,false);
document.getElementById("army-button").addEventListener('click', selectColorArmy,false);
document.getElementById("dotted-button").addEventListener('click', selectColorDotted,false);
document.getElementById("beach-button").addEventListener('click', selectColorBeach,false);
document.getElementById("surf-button").addEventListener('click', selectColorSurf,false);

// Sets selectedSize to s/m/l when clicked
document.getElementById("size-s").addEventListener('click', selectSizeS,false);
document.getElementById("size-m").addEventListener('click', selectSizeM,false);
document.getElementById("size-l").addEventListener('click', selectSizeL,false);

// Displays highlighted s/m/l icon on hover
document.getElementById("size-s").addEventListener('mouseover', hoverOnSizeS,false);
document.getElementById("size-m").addEventListener('mouseover', hoverOnSizeM,false);
document.getElementById("size-l").addEventListener('mouseover', hoverOnSizeL,false);

// Reverts to unhighlighted s/m/l icon when hover lost
document.getElementById("size-s").addEventListener('mouseout', hoverOutSizeS,false);
document.getElementById("size-m").addEventListener('mouseout', hoverOutSizeM,false);
document.getElementById("size-l").addEventListener('mouseout', hoverOutSizeL,false);

document.getElementById("add-cart").addEventListener('click', changeAddToCartTextADDED, false);
document.getElementById("add-cart").addEventListener('mouseout', changeAddToCartTextREVERT, false);
document.getElementById("add-cart").addEventListener('click', addToCart, false);
document.getElementById("quantityInput").addEventListener('change',selectQuantity,false);

document.getElementById("checkout").addEventListener('click', checkoutFunction, false);

document.getElementById("submit-shipping").addEventListener('click', createCust, false);
document.getElementById("confirm").addEventListener('click', confirmation, false);


var mainImageChange = document.getElementById("main-image");

function selectQuantity() {
  selectedQuantity = parseInt(document.getElementById("quantityInput").value);
}
function selectColorPink() {
  selectedColor = "pink";
}
function selectColorMint() {
  selectedColor = "mint";
}
function selectColorArmy() {
  selectedColor = "army";
}
function selectColorDotted() {
  selectedColor = "dotted";
}
function selectColorBeach() {
  selectedColor = "beach";
}
function selectColorSurf() {
  selectedColor = "surf";
}

function selectColorPink(){
  if(selectedColor != "pink"){
    selectedColor = "pink";
    changeImageToClickedPink();
    changeImageToUnclickedMint();
    changeImageToUnclickedArmy();
    changeImageToUnclickedDotted();
    changeImageToUnclickedBeach();
    changeImageToUnclickedSurf();
    mainImageChange.src = "pictures/pink.jpg";
  }else {
    selectedColor = "void";
    changeImageToUnclickedPink();
  }
};

function selectColorMint(){
  if(selectedColor != "mint"){
    selectedColor = "mint";
    changeImageToClickedMint();
    changeImageToUnclickedPink();
    changeImageToUnclickedArmy();
    changeImageToUnclickedDotted();
    changeImageToUnclickedBeach();
    changeImageToUnclickedSurf();
    mainImageChange.src = "pictures/mint.jpg";
  }else {
    selectedColor = "void";
    changeImageToUnclickedMint();
  }
};

function selectColorArmy(){
  if(selectedColor != "army"){
    selectedColor = "army";
    changeImageToClickedArmy();
    changeImageToUnclickedPink();
    changeImageToUnclickedMint();
    changeImageToUnclickedDotted();
    changeImageToUnclickedBeach();
    changeImageToUnclickedSurf();
    mainImageChange.src = "pictures/army.jpg";
  }else {
    selectedColor = "void";
    changeImageToUnclickedArmy();
  }
};

function selectColorDotted(){
  if(selectedColor != "dotted"){
    selectedColor = "dotted";
    changeImageToClickedDotted();
    changeImageToUnclickedPink();
    changeImageToUnclickedMint();
    changeImageToUnclickedArmy();
    changeImageToUnclickedBeach();
    changeImageToUnclickedSurf();
    mainImageChange.src = "pictures/dotted.jpg";
  }else {
    selectedColor = "void";
    changeImageToUnclickedDotted();
  }
};

function selectColorBeach(){
  if(selectedColor != "beach"){
    selectedColor = "beach";
    changeImageToClickedBeach();
    changeImageToUnclickedPink();
    changeImageToUnclickedMint();
    changeImageToUnclickedArmy();
    changeImageToUnclickedDotted();
    changeImageToUnclickedSurf();
    mainImageChange.src = "pictures/beach.jpg";
  }else {
    selectedColor = "void";
    changeImageToUnclickedBeach();
  }
};

function selectColorSurf(){
  if(selectedColor != "surf"){
    selectedColor = "surf";
    changeImageToClickedSurf();
    changeImageToUnclickedPink();
    changeImageToUnclickedMint();
    changeImageToUnclickedArmy();
    changeImageToUnclickedDotted();
    changeImageToUnclickedBeach();
    mainImageChange.src = "pictures/surf.jpg";
  }else {
    selectedColor = "void";
    changeImageToUnclickedSurf();
  }
};

function changeImageToClickedPink() {
  document.getElementById("pink-button").src = "pictures/pink-button-click.jpg";
}

function changeImageToClickedMint() {
  document.getElementById("mint-button").src = "pictures/mint-button-click.jpg";
}

function changeImageToClickedArmy() {
  document.getElementById("army-button").src = "pictures/army-button-click.jpg";
}

function changeImageToClickedDotted() {
  document.getElementById("dotted-button").src = "pictures/dotted-button-click.jpg";
}

function changeImageToClickedBeach() {
  document.getElementById("beach-button").src = "pictures/beach-button-click.jpg";
}

function changeImageToClickedSurf() {
  document.getElementById("surf-button").src = "pictures/surf-button-click.jpg";
}

//Unclicked Color Buttons

function changeImageToUnclickedPink() {
  document.getElementById("pink-button").src = "pictures/pink-button.jpg";
}

function changeImageToUnclickedMint() {
  document.getElementById("mint-button").src = "pictures/mint-button.jpg";
}

function changeImageToUnclickedArmy() {
  document.getElementById("army-button").src = "pictures/army-button.jpg";
}

function changeImageToUnclickedDotted() {
  document.getElementById("dotted-button").src = "pictures/dotted-button.jpg";
}

function changeImageToUnclickedBeach() {
  document.getElementById("beach-button").src = "pictures/beach-button.jpg";
}

function changeImageToUnclickedSurf() {
  document.getElementById("surf-button").src = "pictures/surf-button.jpg";
}



function selectSizeS() {
  if(selectedSize != "s" ) {
    selectedSize = "s";
    changeImageToClickedS();
    changeImageToUnclickedM();
    changeImageToUnclickedL();
  }
  else {
    selectedSize = "void";
    changeImageToUnclickedS();
  }
}
function selectSizeM() {
  if(selectedSize != "m") {
    selectedSize = "m";
    changeImageToClickedM();
    changeImageToUnclickedS();
    changeImageToUnclickedL();
  }
  else {
    selectedSize = "void";
    changeImageToUnclickedM();
  }
}
function selectSizeL() {
  if(selectedSize != "l") {
    selectedSize = "l";
    changeImageToClickedL();
    changeImageToUnclickedS();
    changeImageToUnclickedM();
  }
  else {
    selectedSize = "void";
    changeImageToUnclickedL();
  }
}
function hoverOnSizeS() {
  if(selectedSize != "s") {
    changeImageToHoverS();
  }
}
function hoverOnSizeM() {
  if(selectedSize != "m") {
    changeImageToHoverM();
  }
}
function hoverOnSizeL() {
  if(selectedSize != "l") {
    changeImageToHoverL();
  }
}
function hoverOutSizeS() {
  if(selectedSize != "s") {
    changeImageToUnclickedS();
  }
}
function hoverOutSizeM() {
  if(selectedSize != "m") {
    changeImageToUnclickedM();
  }
}
function hoverOutSizeL() {
  if(selectedSize != "l") {
    changeImageToUnclickedL();
  }
}

function changeImageToClickedS() {
  document.getElementById("size-s").src = "pictures/size-s-click.png";
}
function changeImageToUnclickedS() {
  document.getElementById("size-s").src = "pictures/size-s.png";
}
function changeImageToHoverS() {
  document.getElementById("size-s").src = "pictures/size-s-hover.png";
}
function changeImageToClickedM() {
  document.getElementById("size-m").src = "pictures/size-m-click.png";
}
function changeImageToUnclickedM() {
  document.getElementById("size-m").src = "pictures/size-m.png";
}
function changeImageToHoverM() {
  document.getElementById("size-m").src = "pictures/size-m-hover.png";
}
function changeImageToClickedL() {
  document.getElementById("size-l").src = "pictures/size-l-click.png";
}
function changeImageToUnclickedL() {
  document.getElementById("size-l").src = "pictures/size-l.png";
}
function changeImageToHoverL() {
  document.getElementById("size-l").src = "pictures/size-l-hover.png";
}
function changeAddToCartTextADDED(){
  document.getElementById("add-cart").value = "ITEM ADDED";
}
function changeAddToCartTextREVERT(){
  document.getElementById("add-cart").value = "ADD TO CART";
}



//---- The only actual running code that runs on load.
makeProductList();
