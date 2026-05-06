/* 
 Name: Sameeha Thanwey
 File: homework4.js
 Date Created: 05/06/2026
 Date Updated: 04/08/2026
 Purpose: Redisplay/validate data from a form
*/
// New to HW 3: validateForm
function validateForm() {
 let valid = true;

 if (!validateFname()) valid = false;
 if (!validateMid()) valid = false;
 if (!validateLname()) valid = false;
 if (!validateDob()) valid = false;
 if (!validateSsn()) valid = false;
 if (!validateAddr1()) valid = false;
 if (!validateAddr2()) valid = false;
 if (!validateCity()) valid = false;
 if (!validateZip()) valid = false;
 if (!validateEmail()) valid = false;
 if (!validatePhone()) valid = false;
 if (!validateUserid()) valid = false;
 if (!validatePassword()) valid = false;
 if (!confirmPassword()) valid = false;

 if (valid) {
  let firstname =
    document.getElementById("firstname").value;

    setCookie("firstname", firstname);

  if (document.getElementById("rememberMe").checked) {

    localStorage.setItem(
        "firstname",
        document.getElementById("firstname").value
    );

    localStorage.setItem(
        "lastname",
        document.getElementById("lastname").value
    );

    localStorage.setItem(
        "email",
        document.getElementById("email").value
    );

    localStorage.setItem(
        "phone",
        document.getElementById("phone").value
    );

    localStorage.setItem(
        "city",
        document.getElementById("city").value
    );

    localStorage.setItem(
        "zip",
        document.getElementById("zip").value
    );

    localStorage.setItem(
        "state",
        document.getElementById("state").value
    );

}
  
  document.getElementById("submit").disabled = false;
 } else { 
  document.getElementById("submit").disabled = true;
 }
}


// Main section: reviewInput
function reviewInput() {
    let fname = document.getElementById("firstname").value;
    let mid = document.getElementById("middleinitial").value;
    let lname = document.getElementById("lastname").value;
    let dob = document.getElementById("dob").value;
    let ssn = document.getElementById("ssn").value;
    let addr1 = document.getElementById("addr1").value;
    let addr2 = document.getElementById("addr2").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zip = document.getElementById("zip").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let symptoms = document.getElementById("symptoms").value;
    let userid = document.getElementById("userid").value;
    let healthscale = document.getElementById("healthscale").value;

    let gender = document.querySelector('input[name="gender"]:checked');
    let vaccinated = document.querySelector('input[name="vaccinated"]:checked');
    let insurance  = document.querySelector('input[name="insurance"]:checked');
    let surgery = document.querySelector('input[name="surgery"]:checked');

    let history = document.querySelectorAll('input[name="history"]:checked');
    let historyList = [];

    for (let i = 0; i < history.length; i++) {
      historyList.push(history[i].value);
    }

    let reviewText = 
      "Name: " + fname + " " + mid +  " " + lname + "<br>" + 
      "Date of Birth: " + dob + "<br>" +
      "Social Security Number: " + ssn + "<br><br>" +

      "Email: " + email + "<br>" + 
      "Phone: " + phone + "<br>" + 

      "Address Line 1: " + addr1 + "<br>" +
      "Address Line 2: " + addr2 + "<br>" +
      "City: " + city + "<br>" +
      "State: " + state + "<br>" + 
      "Zip code: " + zip + "<br>" + 

      "Medical History: " + historyList.join(", ") + "<br>" +
      "Gender: " + (gender ? gender.value : "") + "<br>" + 
      "Vaccinated: " + (vaccinated ? vaccinated.value : "") + "<br>" + 
      "Insurance: " + (insurance ? insurance.value : "") + "<br>" +
      "Recent Surgery: " + (surgery ? surgery.value : "") + "<br>" +
      "Health Rating: " + healthscale + "<br><br>" +

      "Symptoms: " + symptoms + "<br><br>" + 
      "User ID: " + userid; 

    document.getElementById("showInput").innerHTML = reviewText;
    document.getElementById("reviewArea").hidden = false;

    
}

// Password Validation Section Here
function validatePassword() {
    let password = document.getElementById("password").value;
    let userid = document.getElementById("userid").value;

    let errorMessage = [];

    // lowercase requirement
    if (!password.match(/[a-z]/)) {
      errorMessage.push("Must include at least one lowercase letter.");
    }

    // uppercase requirement
    if (!password.match(/[A-Z]/)) {
      errorMessage.push("Must include at least one uppercase letter.");
    }

    // number requirement
    if (!password.match(/[0-9]/)) {
      errorMessage.push("Must include at least one number.");
    }

    // special character requirement
    if (!password.match(/[!\@#\$%&*\-_\\.+\(\)]/)) {
      errorMessage.push("Must include at least one special character.");
    }

    // password length and quotes
    if (password.length < 8 || password.length > 30) {
      errorMessage.push("Password must be between 8-30 characters long.");
    }

    if (password.includes('"') || password.includes("'")) {
      errorMessage.push("Password cannot contain quotes.");
    }

    // password cannot contain userid
    if (userid !== "" && password.toLowerCase().includes(userid.toLowerCase())) {
      errorMessage.push("Password cannot contain User Id");
    }

    // display messages
    let errorContainer = document.querySelector(".pword-message");

    errorContainer.innerHTML = errorMessage
      .map(msg => `<span>${msg}</span><br>`)
      .join("");

    if (errorMessage.length > 0) {
      document.getElementById("password1-error").innerHTML = 
        "Password does not meet requirements.";
      return false;
    } else {
      document.getElementById("password1-error").innerHTML = "";
      return true;
    }
}

function confirmPassword() {
    let password = document.getElementById("password").value;
    let reenter = document.getElementById("reenter").value;

    if (reenter !== password) {
      document.getElementById("password2-error").innerHTML = 
        "Passwords do not match.";
      return false;
    } else { 
      document.getElementById("password2-error").innerHTML = "";
      return true;
    }
}

// Important validations (date of birth & user id) (Also SSN)
function validateDob() {
    let dob = document.getElementById("dob");
    let date = new Date(dob.value);
    let maxDate = new Date().setFullYear(new Date().getFullYear() - 120);

    if (date > new Date()) {
        document.getElementById("dob-error").innerHTML = 
          "Date can't be in the future";
        dob.value = "";
        return false;
    } else if (date < new Date(maxDate)) {
        document.getElementById("dob-error").innerHTML = 
          "Date can't be more than 120 years ago";
        dob.value = "";
        return false;
    } else {
        document.getElementById("dob-error").innerHTML = "";
        return true;
    }
}

function validateSsn() {
    let ssn = document.getElementById("ssn");
    let pattern = /^\d{3}-\d{2}-\d{4}$/;

    if (!pattern.test(ssn.value)) {
      document.getElementById("ssn-error").innerHTML = 
        "Enter SSN as 123456789 or 123-45-6789.";
      return false;
    } else { 
      document.getElementById("ssn-error").innerHTML = "";
      return true;
    }
}

function formatSsn() {
 let ssnField = document.getElementById("ssn");
 let ssn = ssnField.value.replace(/\D/g, ""); // this will hopefully remove numbers 

 if (ssn.length > 9) {
  ssn = ssn.slice(0,9);
 }

 if (ssn.length > 5) {
  ssn = ssn.slice(0,3) + "-" + ssn.slice(3,5) + "-" + ssn.slice(5);
 } else if (ssn.length > 3) {
  ssn = ssn.slice(0,3) + "-" + ssn.slice(3);
 }
 ssnField.value = ssn; 
}

 function showSsn() {
    document.getElementById("ssn").type = "text";
 }

 function hideSsn() {
    document.getElementById("ssn").type = "password";
 }
  

function validateUserid() {
    let userid = document.getElementById("userid");
    let pattern = /^[A-Za-z][A-Za-z0-9_-]{4,19}$/;

    if (!pattern.test(userid.value)) {
      document.getElementById("userid-error").innerHTML = 
        "User ID must start with a letter and be 5-20 characters. Letters, numbers, _ and - only.";
      return false;
    } else {
      document.getElementById("userid-error").innerHTML = "";
      return true;
    }
}

// Name validations
function validateFname() {
    let fname = document.getElementById("firstname");
    let pattern = /^[A-Za-z'-]{1,30}$/;

    if (!pattern.test(fname.value)) {
      document.getElementById("fname-error").innerHTML = 
        "Enter 1-30 characters. Letters, apostrophes, and dashes only.";
      return false;
    } else {
      document.getElementById("fname-error").innerHTML = "";
      return true;
    }
}

function validateMid() {
    let mid = document.getElementById("middleinitial");
    let pattern = /^[A-Za-z]?$/;

    if (!pattern.test(mid.value)) {
      document.getElementById("mid-error").innerHTML = 
        "Enter one letter only or leave blank.";
      return false;
    } else {
      document.getElementById("mid-error").innerHTML = "";
      return true;
    }
}

function validateLname() {
  let lname = document.getElementById("lastname");
  let pattern = /^[A-Za-z'-]{1,30}$/;

  if (!pattern.test(lname.value)) {
    document.getElementById("lname-error").innerHTML = 
      "Enter 1-30 characters. Letters, apostrophes, and dashes only.";
    return false;
  } else {
    document.getElementById("lname-error").innerHTML = "";
    return true;
  }
}

// Address Validations
function validateAddr1() {
    let addr1 = document.getElementById("addr1");

    if (addr1.value.trim() === "") {
      document.getElementById("addr1-error").innerHTML = 
        "Address Line 1 is required.";
      return false;
    } else {
      document.getElementById("addr1-error").innerHTML = "";
      return true;
    }
}
function validateAddr2() {
    let addr2 = document.getElementById("addr2");

    if (addr2.value.trim() == "") {
     document.getElementById("addr2-error").innerHTML = "";
     return true;
    } else if (addr2.value.length > 30) {
     document.getElementById("addr2-error").innerHTML = 
      "Address Line 2 must be less than 30 characters.";
     return false;
    } else if (addr2.value.length < 2) {
     document.getElementById("addr2-error").innerHTML = 
      "Address Line 2 must be at least 2 characters if used.";
     return false;
    } else {
     document.getElementById("addr2-error").innerHTML = "";
     return true;
    }
}

function validateCity() {
  let city = document.getElementById("city");

  if (city.value.trim() === "") {
    document.getElementById("city-error").innerHTML = 
      "City is required.";
    return false;
  } else {
    document.getElementById("city-error").innerHTML = "";
    return true;
  }
}

function validateZip() {
    let zip = document.getElementById("zip").value.replace(/[^\d-]/g, "");

    if (zip === "") {
      document.getElementById("zip-error").innerHTML = 
        "Zip code cannot be blank";
      return false;
    } 
    if (zip.length > 5) {
      zip = zip.slice(0, 5) + "-" + zip.slice(5, 9);
    } else { 
      zip = zip.slice(0, 5);
    }

    document.getElementById("zip").value = zip;
    document.getElementById("zip-error").innerHTML = "";
    return true;    
}

// Validate Email & Phone
function validateEmail() {
    let email = document.getElementById("email");
    let pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,20}$/;

    if (!pattern.test(email.value)) {
      document.getElementById("email-error").innerHTML = 
        "Enter a valid email address.";
      return false;
    } else {
      document.getElementById("email-error").innerHTML = "";
      return true;
    }
}

function validatePhone() {
    let phone = document.getElementById("phone");
    let pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

    if (!pattern.test(phone.value)) {
      document.getElementById("phone-error").innerHTML = 
        "Enter phone number as 000-000-0000.";
      return false;
    } else {
      document.getElementById("phone-error").innerHTML = "";
      return true;
    }
}

function formatPhone() {
   let phoneField = document.getElementById("phone");
   let phone = phoneField.value.replace(/\D/g, "");

   if (phone.length > 10) {
    phone = phone.slice(0, 10);
   }

  if (phone.length > 6){
   phone = phone.slice(0,3) + "-" + phone.slice(3,6) + "-" + phone.slice(6);
  } else if (phone.length > 3) {
   phone = phone.slice(0,3) + "-" + phone.slice(3);
  }

  phoneField.value = phone;
}

// Fetch API States
function loadStates() {
 fetch("states.html") 
  .then(function(response) {
   return response.text();
  })
 .then(function(data) {
  document.getElementById("state").innerHTML = data;
 })
 .catch(function(error) {
  console.log("Error loading states:", error);
  document.getElementById("state").innerHTML = '<option value="">Unable to load states</option>';
 });
}

//Adding Cookies
function setCookie(name, value) {

    let date = new Date();

    date.setTime(date.getTime() + (48 * 60 * 60 * 1000));

    let expires = "expires=" + date.toUTCString();

    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {

    let cookieName = name + "=";

    let decodedCookie = decodeURIComponent(document.cookie);

    let cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {

        let c = cookieArray[i].trim();

        if (c.indexOf(cookieName) == 0) {

            return c.substring(cookieName.length, c.length);
        }
    }

    return "";
}

//User should be able to reset user
function welcomeUser() {
    let firstname = getCookie("firstname");

    if (firstname != "") {
        document.getElementById("welcome").innerHTML =
            "Welcome back, " + firstname + "!";

        document.getElementById("newUserMessage").style.display = "block";
        document.getElementById("newUserText").innerHTML =
            "Not " + firstname + "? Click here to start as a new user.";

        document.getElementById("firstname").value = firstname;

    } else {
        document.getElementById("welcome").innerHTML =
            "Welcome New User";

        document.getElementById("newUserMessage").style.display = "none";
    }
}

function resetUser() {
    document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();

    document.getElementById("registrationForm").reset();
    document.getElementById("welcome").innerHTML = "Welcome New User";
    document.getElementById("newUserMessage").style.display = "none";
    document.getElementById("submit").disabled = true;

    alert("User has been cleared. You may start as a new user.");
}

//Remember me section

function loadUserData() {

    if (localStorage.getItem("firstname")) {

        document.getElementById("firstname").value =
            localStorage.getItem("firstname");
    }

    if (localStorage.getItem("lastname")) {

        document.getElementById("lastname").value =
            localStorage.getItem("lastname");
    }

    if (localStorage.getItem("email")) {

        document.getElementById("email").value =
            localStorage.getItem("email");
    }

    if (localStorage.getItem("phone")) {

        document.getElementById("phone").value =
            localStorage.getItem("phone");
    }

    if (localStorage.getItem("city")) {

        document.getElementById("city").value =
            localStorage.getItem("city");
    }

    if (localStorage.getItem("zip")) {

        document.getElementById("zip").value =
            localStorage.getItem("zip");
    }

    if (localStorage.getItem("state")) {

        document.getElementById("state").value =
            localStorage.getItem("state");
    }
}
   
