// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword() {
  //Declares and sets password length
  var passLength = parseInt(prompt("How long would you like your password to be?"));

  //Validates password length
  if(passLength < 8 || passLength > 128 || isNaN(passLength)) {
    var lengthValid = false;
    while(lengthValid === false) {
      passLength = prompt("Pease enter a number between 8 and 128.")
      if(passLength >= 8 && passLength <= 128){
        lengthValid = true;
      }
    }
  }

  //Declares and sets whether they want lowercase letters
  var passLC = confirm("Would you like lowercase letters in your password?");
  //Declares and sets whether they want uppercase letters
  var passUC = confirm("Would you like uppercase letters in your password?");
  //Declares and sets whether they want numbers
  var passNum = confirm("Would you like numbers in your password?");
  //Declares and sets whether they want special characters
  var passSpecial = confirm("Would you like special characters in your password?");

  //Validates they selected at least one
  if(passLC === false && passUC === false && passNum === false && passSpecial === false) {
    alert("Please select at least one character type to include in your password.");
    var typeValid = false;
    while(typeValid === false) {
      var passLC = confirm("Would you like lowercase letters in your password?");
      var passUC = confirm("Would you like uppercase letters in your password?");
      var passNum = confirm("Would you like numbers in your password?");
      var passSpecial = confirm("Would you like special characters in your password?");

      if(passLC === true || passUC === true || passNum === true || passSpecial === true) {
        typeValid = true;
      }
    }
  }

  //Creates array of criteria. 0 = lc, 1 = uc, 2 = num, 3 = special
  var criteriaArr = [passLC, passUC, passNum, passSpecial];
  
  //Declares lowercase letters
  var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  //Declares uppercase letters 
  var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //Declares numbers
  var numbersList = "0123456789";
  //Declares special characters
  var specialCharacters = "!@#$%^&*()_+=-|{}[]`~";

  //Array to check which charset to use
  var charSet = [];
  //Run through criteria array, check if the criteria is selected, add it to charSet[c]
  for(var i = 0; i < criteriaArr.length; i++) {
    if(criteriaArr[i] === true) {
      if(i === 0) {
        charSet.push(lowercaseLetters);
      } else if(i === 1) {
        charSet.push(uppercaseLetters);
      } else if (i === 2) {
        charSet.push(numbersList);
      } else if(i === 3) {
        charSet.push(specialCharacters);
      }
    }
  }

  //Declares password variable for return
  var password = "";
  //Password is valid variable
  var passwordValid;
  do {
    //Runs through every spot of the password based on length
    for(var i = 0; i < passLength; i++){
      //Generates a number to pick which charset it's in
      var charSetRandom = Math.floor(Math.random() * charSet.length);
      var randomNum = Math.floor(Math.random() * charSet[charSetRandom].length);

      password += charSet[charSetRandom][randomNum];
    }

    //VALIDATE
    var validCount = 0;
    //Run through each character set
    for(var i = 0; i < charSet.length; i++) {
      //Loop through characters of the password
      for(var c = 0; c < password.length; c++) {
        //Declare break variable
        var breakLoop = false;
        //Loop through the characters of the charset and see if one matches
        for(var j = 0; j < charSet[i].length; j++) {
          //If one does, up the valid counter and exit loop
          if(password[c] === charSet[i][j]) {
            validCount++;
            breakLoop = true;
            break;
          }
        }
        if(breakLoop === true) {
          break;
        }
      }
      //If there was a match for each charset set passwordValid to true and break out of validating for loop
      if(validCount === charSet.length) {
        passwordValid = true;
        break;
      }
    }

  }while(passwordValid === false);
  //Return the password
  return password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
