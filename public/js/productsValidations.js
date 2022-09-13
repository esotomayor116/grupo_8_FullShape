window.addEventListener('load', function() {

    let name = document.querySelector('input#name');
    let wrongName = document.querySelector('p#wrongName');
    let description = document.querySelector('input#description');
    let wrongDescription = document.querySelector('p#wrongDescription');
    let image = document.querySelector('input#image');
    let wrongImage = document.querySelector('p#wrongImage');
    let price = document.querySelector('input#price');
    let wrongPrice = document.querySelector('p#wrongPrice');
    let form = document.querySelector('form.product_creation');

    let errors = {};

    name.addEventListener('mouseout', function() {


        if (name.value == "") {
            wrongName.innerHTML = 'Por favor ingresa un nombre del producto a agregar para continuar'
            wrongName.classList.add('requerido')
            errors.error1 = 'error';
        } else {
            if (name.value.length < 5) {
                wrongName.innerHTML = 'El nombre debe contener mínimo 5 caracteres'
                wrongName.classList.add('requerido')
                errors.error2 = 'error';
            } else {
                wrongName.innerHTML = ''
                wrongName.classList.remove('requerido')
                delete errors.error1;
                delete errors.error2;
            }
        }
    })
    description.addEventListener('mouseout', function() {

        if (description.value == "") {
            wrongDescription.innerHTML = 'Por favor ingresa una descripción del producto para continuar'
            wrongDescription.classList.add('requerido')
            errors.error3 = 'error';
        } else {
            if (description.value.length < 20) {
                wrongDescription.innerHTML = 'La descripción debe contener mínimo 20 caracteres'
                wrongDescription.classList.add('requerido')
                errors.error4 = 'error';
            } else {
                wrongDescription.innerHTML = ''
                wrongDescription.classList.remove('requerido')
                delete errors.error3;
                delete errors.error4;
            }  
        }
    })
    image.addEventListener('mouseout', function() {

        if (image.value == "") {
            wrongImage.innerHTML = 'Por favor sube una imagen para continuar'
            wrongImage.classList.add('requerido')
            errors.error5 = 'error';
        } else {
            let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
            for (i=0; i<acceptedExtensions.length; i++) {
                if (image.value.includes(acceptedExtensions[i])) {
                    wrongImage.innerHTML = ''
                    wrongImage.classList.remove('requerido')
                    delete errors.error5;
                    delete errors.error6;
                    break;
                } else {
                    wrongImage.innerHTML = 'Las extensiones de archivo permitidas son ".jpg", ".png" o ".jpeg"'
                    wrongImage.classList.add('requerido')
                    errors.error6 = 'error';
                }
            }    
        }
    })
    price.addEventListener('mouseout', function() {

        if (price.value == "") {
            wrongPrice.innerHTML = 'Por favor ingresa un precio del producto (precio unitario)'
            wrongPrice.classList.add('requerido')
            errors.error7 = 'error';
        } else {
            result = parseFloat(price.value);
            if (isNaN(result)) {
                wrongPrice.innerHTML = 'El precio debe ser un número'
                wrongPrice.classList.add('requerido')
                errors.error8 = 'error';     
            } else {
                wrongPrice.innerHTML = ''
                wrongPrice.classList.remove('requerido')
                delete errors.error7;
                delete errors.error8;
            }
        }
    })
    form.addEventListener('submit', function(e) {
        if (Object.keys(errors).length > 0) {
            e.preventDefault()
            console.log(errors)
        }
    })
})
