// ---------- LOAD CLOSET -----------
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
// ---------- END ----------
