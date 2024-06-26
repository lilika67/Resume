var myInput = document.getElementById("psw");
var confirmInput = document.getElementById("cpw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var form = document.getElementById("registration");

// Function to validate password on input
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

// Function to validate confirm password on input
confirmInput.onkeyup = function() {
  if(myInput.value === confirmInput.value) {
    // Passwords match
    confirmInput.setCustomValidity(""); // Reset the validation message
  } else {
    // Passwords don't match
    confirmInput.setCustomValidity("Passwords do not match"); // Set custom validation message
  }
};

// Function to show/hide validation message on focus/blur
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
};
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
};

// Function to prevent form submission if passwords don't match
document.getElementById("myForm").onsubmit = function() {
  if (myInput.value !== confirmInput.value) {
    alert("Passwords do not match");
    return false; 
  }
};

// Function to show success message
function showSuccessMessage(message) {
  Toastify({
      text: message || "Operation completed successfully!",
      duration: 3000,
      close: true,
      backgroundColor:"green",
      className: "toastify-success"
  }).showToast();
}

// Function to show error message
function showErrorMessage(message) {
  Toastify({
      text: message || "Error: Something went wrong!",
      duration: 3000,
      close: true,
      backgroundColor:"red",
      className: "toastify-error"
  }).showToast();
}

