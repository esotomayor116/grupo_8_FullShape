window.addEventListener('load', function() {

    let formulario = document.querySelector("form.registro-popup");

    formulario.addEventListener("submit", function(e) {


        let fieldName = document.querySelector("input#userNames");
        let fieldLastName = document.querySelector("input#userLastNames");
        let fieldEmail = document.querySelector("input#userEmail");
        let fieldPassword = document.querySelector("input#userPassword");
        let fieldPasswordConfirmation = document.querySelector("input#userPasswordConfirmation");
        let image = document.querySelector('input#userImage');

        let error = [];

        if(fieldName.value == ""){
            error.push(" Por favor ingrese un Nombre para continuar. ")
        } else if (fieldName.value.length < 2 ) {
            error.push(" El Nombre debera tener al menos 2 carácteres")
        }

        if(fieldLastName.value == ""){
            error.push(" Por favor ingrese un Apellido para continuar. ")
        } else if (fieldLastName.value.length < 2 ) {
            error.push(" El Apellido debera tener al menos 2 carácteres")
        }

        if(fieldEmail.value == ""){
            error.push(" Por favor ingrese un email para continuar. ")
        } else if(!fieldEmail.value.includes("@")||(!fieldEmail.value.includes("."))){
            error.push(" Por favor ingrese un email válido para continuar. (debe contener @ y .) ")
        }

        if(fieldPassword.value == ""){
            error.push(" Por favor cree una contraseña para continuar. ")
        } else if (fieldPassword.value.length < 8 ) {
            error.push(" La contraseña debera tener al menos 8 carácteres")
        }

        if(fieldPasswordConfirmation.value == "") {
            error.push(" Por favor confirme la contraseña para continuar. ")
        } else if (fieldPasswordConfirmation.value != fieldPassword.value) {
            error.push(" Las contraseñas no coinciden ")
        }

        if(image.value == ""){
            error.push(" Por favor ingrese una imagen para continuar. ")
        } 
        
        else {
            let errorextension = 1
            let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
            for (i=0; i<acceptedExtensions.length; i++){
                if (image.value.includes(acceptedExtensions[i])) {
                    errorextension = 0
                break;
                } 
            }
            if (errorextension == 1){error.push ('Las extensiones de archivo permitidas son ".jpg", ".png" o ".jpeg"')}
        }

        let ulErrores = document.querySelector("div.errores ul");

        if (error.length > 0){
            e.preventDefault();
            ulErrores.innerHTML = "";
            ulErrores.style.display = "block";
            //let listaError = ""
            for (let i = 0; i < error.length; i++) {
                //listaError += error[i] + '\n'
                ulErrores.innerHTML += "<li>" + error[i] + "</li>"
            }
        
            //alert(listaError)
        }
        
    });
})