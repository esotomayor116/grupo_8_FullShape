window.addEventListener('load', function() {

    let name = document.querySelector('input#name');
    let wrongName = document.querySelector('p#wrongName');
    let description = document.querySelector('textarea#description');
    let wrongDescription = document.querySelector('p#wrongDescription');
    let image = document.querySelector('input#image');
    let wrongImage = document.querySelector('p#wrongImage');
    let price = document.querySelector('input#price');
    let wrongPrice = document.querySelector('p#wrongPrice');
    let form = document.querySelector('form.product_creation');
  
    let errors = {};
  
    name.addEventListener('mouseout', () => {
  
      if (name.value == "") {
        wrongName.innerHTML = "Please enter the name of the product to add before continuing";
        wrongName.classList.add('required');
        errors.name1 = 'error';
      } else if (name.value.length >= 5) {
        wrongName.innerHTML = "";
        wrongName.classList.remove('required');
        delete errors.name1;
      }
    })
  
    name.addEventListener('input', (e) => {
      currentValue = e.target.value;
      if (currentValue.length < 5) {
        wrongName.innerHTML = "Name shall contain a minimum of 5 characters";
        wrongName.classList.add('required');
        errors.name2 = 'error';
      } else {
        wrongName.innerHTML = "";
        wrongName.classList.remove('required');
        delete errors.name1;
        delete errors.name2;
      }
    })
  
    description.addEventListener('mouseout', () => {
  
      if (description.value == "") {
        wrongDescription.innerHTML = "Please enter the product description before continuing";
        wrongDescription.classList.add('required');
        errors.description1 = 'error';
      } else if (description.value.length >= 20) {
        wrongDescription.innerHTML = "";
        wrongDescription.classList.remove('required');
        delete errors.description1;
      }
    })
  
    description.addEventListener('keypress', (e) => {
      currentValue = e.target.value + e.key;
      if (currentValue.length < 20) {
        wrongDescription.innerHTML = "Description shall contain a minimum of 20 characters";
        wrongDescription.classList.add('required');
        errors.description2 = 'error';
      } else {
        wrongDescription.innerHTML = "";
        wrongDescription.classList.remove('required');
        delete errors.description1;
        delete errors.description2;
      }
    })
  
    image.addEventListener('mouseout', function() {
      
      if (image.value == "") {
        wrongImage.innerHTML = "Please upload an image to continue";
        wrongImage.classList.add('required');
        errors.image1 = 'error';
      } else {
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        for (let i= 0; i<acceptedExtensions.length; i++) {
          if (image.value.includes(acceptedExtensions[i])) {
            wrongImage.innerHTML = "";
            wrongImage.classList.remove('required');
            delete errors.image1;
            delete errors.image2;
            break;
          } else {
            wrongImage.innerHTML = 'The permitted extensions are ".jpg", ".png" and ".jpeg"'
            wrongImage.classList.add('required');
            errors.image2 = 'error';
          }
        }
      }
    })
  
    price.addEventListener('mouseout', () => {
  
      if (price.value == "") {
        wrongPrice.innerHTML = "Please enter the product unit price";
        wrongPrice.classList.add('required');
        errors.price1 = 'error';
      } else if (price.value.length >= 20) {
        valueArray= [];
        wrongPrice.innerHTML = "";
        wrongPrice.classList.remove('required');
        delete errors.price1;
      }
    })
  
    price.addEventListener('input', (e) => {
      currentValue = e.target.value;
      valueArray = currentValue.split('');
      result = valueArray.map(value => { if (value != ".") { return parseFloat(value) }});
      console.log(result);
      if (result.includes(NaN)) {
        wrongPrice.innerHTML = "Price shall be a number";
        wrongPrice.classList.add('required');
        errors.price2 = 'error';
      } else {
        valueArray = [];
        wrongPrice.innerHTML = "";
        wrongPrice.classList.remove('required');
        delete errors.price1;
        delete errors.price2;
      }
    })
  
    form.addEventListener('submit', (event) => {
      if (Object.keys(errors).length > 0) {
        event.preventDefault();
        console.log(errors);
      }
    })
  })