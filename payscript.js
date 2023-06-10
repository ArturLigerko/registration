var cardNumberInput = document.getElementById("cardNumber");
var expirationDateInput = document.getElementById("expirationDate");
var cvvInput = document.getElementById("cvv");

cardNumberInput.addEventListener("input", function(event) {
  var input = event.target;
  var trimmed = input.value.replace(/\s+/g, "");
  var cardNumber = trimmed.replace(/[^0-9]/gi, "");
  
  var maskedCardNumber = maskCardNumber(cardNumber);
  
  input.value = maskedCardNumber;
});

expirationDateInput.addEventListener("input", function(event) {
  var input = event.target;
  var trimmed = input.value.replace(/\s+/g, "");
  var expirationDate = trimmed.replace(/[^0-9/]/gi, "");
  
  var maskedExpirationDate = maskExpirationDate(expirationDate);
  
  input.value = maskedExpirationDate;
});

cvvInput.addEventListener("input", function(event) {
  var input = event.target;
  var trimmed = input.value.replace(/\s+/g, "");
  var cvv = trimmed.replace(/[^0-9]/gi, "");
  
  input.value = cvv;
});

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var cardNumber = cardNumberInput.value.replace(/\s+/g, "");
  var expirationDate = expirationDateInput.value.replace(/\s+/g, "");
  var cvv = cvvInput.value.replace(/\s+/g, "");
  
  if (!validateCardNumber(cardNumber) || !validateExpirationDate(expirationDate) || !validateCVV(cvv)) {
    showMessage("Ошибка в данных карты. Проверьте введенные данные.");
  } else {
    showMessage("Спасибо большое за покупку!");
    setTimeout(function() {
      redirectToMainPage();
    }, 3000);
  }
});

function maskCardNumber(cardNumber) {
  var maskedNumber = "";
  for (var i = 0; i < cardNumber.length; i++) {
    if (i > 0 && i % 4 === 0) {
      maskedNumber += " ";
    }
    maskedNumber += cardNumber[i];
  }
  return maskedNumber;
}

function maskExpirationDate(expirationDate) {
  var maskedDate = "";
  for (var i = 0; i < expirationDate.length; i++) {
    if (i === 2) {
      maskedDate += "/";
    }
    maskedDate += expirationDate[i];
  }
  return maskedDate;
}

function validateCardNumber(cardNumber) {
  var trimmed = cardNumber.replace(/\s+/g, "");
  return trimmed.length === 16 && /^\d+$/.test(trimmed);
}

function validateExpirationDate(expirationDate) {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear() % 100;
  var currentMonth = currentDate.getMonth() + 1;
  
  var inputYear = parseInt(expirationDate.slice(3, 5));
  var inputMonth = parseInt(expirationDate.slice(0, 2));
  
  return (
    /^\d{2}\/\d{2}$/.test(expirationDate) &&
    inputYear >= currentYear &&
    (inputYear > currentYear || inputMonth >= currentMonth)
  );
}

function validateCVV(cvv) {
  return /^\d{3}$/.test(cvv);
}

function showMessage(message) {
  var container = document.querySelector(".container");
  var messageElement = document.createElement("p");
  messageElement.textContent = message;
  container.appendChild(messageElement);
}

function redirectToMainPage() {
  window.location.href = "site.html";
}
