window.addEventListener('load', function() {
    console.log('Estoy aqui')
    let formulario = document.querySelector('form.login');
    let email = document.querySelector('input#email');
    let password = document.querySelector('input#password');
    let wrongEmail = document.querySelector('p#wrongEmail');
    let wrongPassword = document.querySelector('p#wrongPassword');

    email.addEventListener('mouseout', function (){
        if(email.value == ''){
            wrongEmail.innerHTML = 'Por favor ingresa un email para continuar'
            wrongEmail.classList.add('requerido')
            } else{
                if(!email.value.includes("@")||(!email.value.includes("."))){
                    wrongEmail.innerHTML = 'El correo debe incluir un @ y un servidor'
                    wrongEmail.classList.add('requerido')
                }else{
                    wrongEmail.innerHTML = ''
                    wrongEmail.classList.remove('requerido')
                }
            }
    })

    password.addEventListener('mouseout', function (){
        if(password.value == ''){
            wrongPassword.innerHTML = 'Por favor ingresa un password para continuar'
            wrongPassword.classList.add('requerido')
        } else {
            wrongPassword.innerHTML = ''
            wrongPassword.classList.remove('requerido')
        }
    })

})