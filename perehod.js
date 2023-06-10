function redirectToReg2Page() {
  window.location.href = "reg2.html";
}

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  var usernamePattern = /^[a-zA-Z0-9]{5,20}$/;
  var passwordPattern = /^[A-Z][a-zA-Z0-9]{4,19}$/;

  if (!usernamePattern.test(username) || !passwordPattern.test(password)) {
    alert('Имя пользователя и пароль должны содержать английские символы и цифры. Пароль должен начинаться с заглавной буквы.');
  } else {
    redirectToReg2Page();
  }
});
function redirectToPayPage() {
  window.location.href = "pay.html";
}

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  var course = document.getElementById('course').value;
  var time = document.getElementById('time').value;

  if (course !== '' && time !== '') {
    redirectToPayPage();
  } else {
    alert('Пожалуйста, выберите курс и время.');
  }
});