window.addEventListener('load', function() {

    let form = document.querySelector('form.login');
    let email = document.querySelector('input#email');
    let wrongEmail = document.querySelector('p#wrongEmail');
    let password = document.querySelector('input#password');
    let wrongPassword = document.querySelector('p#wrongPassword');
  
    let errors = {};
  
    email.addEventListener('mouseout', () => {
      if (email.value == '') {
        wrongEmail.innerHTML = "Please enter an email before continuing";
        wrongEmail.classList.add('required');
        errors.email1 = "error";
      } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        wrongEmail.innerHTML = "";
        wrongEmail.classList.remove('required');
        delete errors.email1;
      }
    })
  
    email.addEventListener('input', (e) => {
      currentValue = e.target.value;
  
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        wrongEmail.innerHTML = "Please enter a valid email";
        wrongEmail.classList.add('required');
        errors.email2 = "error";
      } else {
        wrongEmail.innerHTML = "";
        wrongEmail.classList.remove('required');
        delete errors.email1;
        delete errors.email2;
      }
    })
  
    password.addEventListener('mouseout', () => {
      if (password.value == '') {
        wrongPassword.innerHTML = "Please enter your password before continuing";
        wrongPassword.classList.add('required');
        errors.password1 = "error";
      } else {
        wrongPassword.innerHTML = "";
        wrongPassword.classList.remove('required');
        delete errors.password1
      }
    })
  
    password.addEventListener('input', (e) => {
      currentValue = e.target.value;
      if (currentValue != "") {
        wrongPassword.innerHTML = "";
        wrongPassword.classList.remove('required');
        delete errors.password1;
      }
  
    })
  
    form.addEventListener('submit', (e) => {
      if (Object.keys(errors).length > 0) {
        e.preventDefault();
        console.log(errors);
      }
    })
  })