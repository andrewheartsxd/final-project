// ---------- DRAG/DROP ----------
  var dropbox = $('#dropbox')[0]
  var state = $('#state')[0]
  // Checks for FileReader
  if(typeof window.FileReader === 'undefined') {
    alert("File API & FileReader unavailable.")
    // state.className = 'fail' ;
  } else {
    console.log("File API & FileReader available")
    // state.className = 'success';
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
// ---------- END ----------
