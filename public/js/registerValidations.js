window.addEventListener('load', function () {

    let form = document.querySelector("form.registro-popup");
    let names = document.querySelector("input#userNames");
    let lastNames = document.querySelector("input#userLastNames");
    let email = document.querySelector("input#userEmail");
    let password = document.querySelector("input#userPassword");
    let passwordConfirmation = document.querySelector("input#userPasswordConfirmation");
    let image = document.querySelector("input#userImage");
    let ulErrores = document.querySelector("div.errores ul");
  
    form.addEventListener("submit", function(e) {
  
      let error = [];
  
      if (names.value == "") {
        error.push("Please register a name before continuing");
      } else if (names.value.length < 2) {
        error.push('Name must contain a minimum of two characters')
      }
    
      if (lastNames.value == "") {
        error.push("Please register a last name before continuing");
      } else if (lastNames.value.length < 2) {
        error.push('Last name must contain a minimum of two characters')
      }
    
      if (email.value == "") {
        error.push("Please enter an email before continuing")
      } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) == false) {
        error.push("Please enter a valid email")
      }
  
      if (password.value == "") {
        error.push("Please create the password before continuing");
      } else if (password.value.length < 8) {
        error.push('Password must contain at least eight characters')
      }
  
      if (passwordConfirmation.value == "") {
        error.push("Please repeat the password before continuing");
      } else if (passwordConfirmation.value != password.value) {
        error.push("Passwords don't match")
      }
  
      function imageCheck () {
        if (image.value == "") {
          error.push("Please upload an image before continuing")
        } else {
          let acceptedExtensions = [".jpg", ".png", ".jpeg"];
    
          for (let i= 0; i<acceptedExtensions.length; i++) {
            if (image.value.includes(acceptedExtensions[i])) {
              return true;
            } 
          }
            console.log(image.value)
            error.push("The permitted extensions are '.jpg', '.png', and '.jpeg'");
        }
      }

      imageCheck();
  
      if (error.length > 0) {
  
        e.preventDefault();
        ulErrores.innerHTML = "";
        ulErrores.style.display = "block";
        for (let i=0; i< error.length ; i++) {
          ulErrores.innerHTML += "<li>" + error[i] + "</li>"
        }
        console.log(ulErrores.innerHTML);
      }
    })
  })