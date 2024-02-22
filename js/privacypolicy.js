const queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let extern = urlParams.get("extern");

window.addEventListener("load", (event) => {
  if (extern == "yes") {
    setTimeout(function () {
      document.getElementById("nav-menu").style.display = "none";
      document.getElementById("headerRight").style.display = "none";
      document.getElementById("link").href = "../index.html";
    }, 100);
  }
});
