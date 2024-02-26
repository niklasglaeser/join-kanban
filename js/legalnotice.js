contacts = activeUser["contacts"];
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let extern = urlParams.get("extern");

window.addEventListener("load", () => {
  if (extern == "yes") {
    setTimeout(function () {
      document.getElementById("link-privacy").href =
        "../pages/privacypolicy.html?extern=yes";
      document.getElementById("link-privacy").setAttribute("target", "_blank");
      document.getElementById("link-legal").href =
        "../pages/legalnotice.html?extern=yes";
      document.getElementById("link-legal").setAttribute("target", "_blank");
      document.getElementById("nav-menu").style.display = "none";
      document.getElementById("headerRight").style.display = "none";
      document.getElementById("link").href = "../index.html";
    }, 100);
  }
});
