export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrsarMensajeDeError(tipoDeInput, input)

    }
  }

  const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
  ];

  const mensajesDeError = {
    nombre: {
      valueMissing: "Este campo no puede estar vacio"
    },
    email: {
      valueMissing: "Este campo no puede estar vacio",
      typeMismatch: 'El correo no es valido'
    },
    password: {
      valueMissing: "Este campo no puede estar vacio",
      patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales'
    },
    nacimiento: {
      valueMissing: "Este campo no puede estar vacio",
      customError: 'Debes tener al menos 18 años de edad',
    },
    numero: {
      valueMissing: 'Este campo no puede estar vacio',
      patternMismatch: 'El formato requerido es XXXXXXXXXX 10 nums',
    },
    direccion: {
      valueMissing: 'Este campo no puede estar vacio',
      patternMismatch: 'La direccion debe tener entre 10 y 40 caracteres',
    },
    ciudad: {
      valueMissing: 'Este campo no puede estar vacio',
      patternMismatch: 'La ciudad debe tener entre 4 y 30 caracteres',
    },
    estado: {
      valueMissing: 'Este campo no puede estar vacio',
      patternMismatch: 'El estado debe tener entre 4 y 30 caracteres',
    },
  };
  
  const validadores = {
    nacimiento: (input) => validarNacimiento(input),
  };

  function mostrsarMensajeDeError(tipoDeInput, input){
    let mensaje = '';
    tipoDeErrores.forEach(error => {
      if(input.validity[error]){
        console.log(error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput[error]]);
        mensaje = mensajesDeError[tipoDeInput][error];
      }
    });
    return mensaje;
  }
  
  function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
  
    input.setCustomValidity(mensaje);
  }
  
  function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
      fecha.getUTCFullYear() + 18,
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
  }
  