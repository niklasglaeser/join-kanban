/**
 * contacts of the active user.
 */
contacts = activeUser["contacts"];

/**
 * Extracts the query string from the URL.
 */
let queryString = window.location.search;

/**
 * Creates a new URLSearchParams object from the query string.
 */
let urlParams = new URLSearchParams(queryString);

/**
 * Retrieves the value of the "extern" parameter from the URL query string.
 */
let extern = urlParams.get("extern");


/**
 * hide sidebar and user icon if user not login
 */
function updatePageForExternal() {
  document.getElementById("link-privacy").href = "../pages/privacypolicy.html?extern=yes";
  document.getElementById("link-privacy").setAttribute("target", "_blank");
  document.getElementById("link-legal").href = "../pages/legalnotice.html?extern=yes";
  document.getElementById("link-legal").setAttribute("target", "_blank");
  document.getElementById("nav-menu").style.display = "none";
  document.getElementById("headerRight").style.display = "none";
  document.getElementById("link").href = "../index.html";
}


/**
 * check if user logged in - close tab if not
 * @returns 
 */
function checkExtern() {
  if (extern === 'yes') {
      close_window();
      return false;
  }
    return true;
}

/**
 * close current tab
 */
function close_window() {
    window.close();
}
