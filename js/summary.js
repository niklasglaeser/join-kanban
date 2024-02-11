function changePencilIcon() {
  let icon = document.getElementById("firstRowDivPencilIcon");

  icon.src = "../img/pencil-icon-invert.svg";
}

function changePencilIconBack() {
  let icon = document.getElementById("firstRowDivPencilIcon");

  icon.src = "../img/pencil-icon.svg";
}

function changeHakenIcon() {
  let icon = document.getElementById("firstRowDivHakenIcon");

  icon.src = "../img/haken-icon-invert.svg";
}

function changeHakenIconBack() {
  let icon = document.getElementById("firstRowDivHakenIcon");

  icon.src = "../img/haken-icon.svg";
}

function welcomeMessage() {
  const HOUR = new Date().getHours();
  let greeting;

  if (HOUR > 6 && HOUR < 12) {
    greeting = "Good Morning,";
  } else if (HOUR >= 12 && HOUR < 18) {
    greeting = "Good Afternoon,";
  } else {
    greeting = "Good Evening,";
  }
  document.getElementById("welcomeMessage").innerHTML = greeting;
}
