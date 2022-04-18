class TextoAnimado {
    constructor(id, objetivo){
        this.texto = document.getElementById(id);
        this.objetivo = document.getElementById(objetivo);
        this.letras = this.texto.innerText.split("");

        this.texto.innerText = '';

        this.letras.forEach((letra) => {
            let caracter = letra === ' ' ? '&nbsp;' : letra;

            this.texto.innerHTML = this.texto.innerHTML + `
                <div>
                    <span>${caracter}</span>
                    <span class="segunda-linea">${caracter}</span>
                </div>
            `;
        });

        this.objetivo.addEventListener('mouseenter', () => {
            let cuenta = 0;

            const intervalo = setInterval(() => {
                if(cuenta < this.texto.children.length){
                    this.texto.children[cuenta].classList.remove('animacion');
                    cuenta += 1;
                } else {
                    clearInterval(intervalo)
                }
            }, 30);
        });
        this.objetivo.addEventListener('mouseleave', () => {
            let cuenta = 0;

            const intervalo = setInterval(() => {
                if(cuenta < this.texto.children.length){
                    this.texto.children[cuenta].classList.add('animacion');
                    cuenta += 1;
                } else {
                    clearInterval(intervalo)
                }
            }, 30);
        });

                        
    }
}

new TextoAnimado('logo', 'logotipo');

const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');
const contacto = document.querySelector('#contacto');

//Variables para campos
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Variables
eventListener();
function eventListener() {
    // Cuando inicia la app 
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    nombre.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //enviar email
    formulario.addEventListener('submit', enviarEmail);

    
    
}

//Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    btnEnviar.classList.remove('cursor-pointer');  
         
    scrollNav();
      
}

//Scroll de navegación
function scrollNav() {
    const enlaces = document.querySelectorAll('.menu a');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: 'smooth'});
        });
    });
}


// Valida el formulario
function validarFormulario(e) {


    if(e.target.value.length > 0) {

        //elimina los errores
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }

        e.target.classList.remove('error-msj');
        e.target.classList.add('ok-msj');        
    }else {
        e.target.classList.remove('ok-msj');
        e.target.classList.add('error-msj');
        mostrarError('¡ Todos los campos del formulario son obligatorios !');
    }

    if(e.target.type === 'email') {  
        
        if(er.test(e.target.value) ) {
            //elimina los errores
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }
    
            e.target.classList.remove('error-msj');
            e.target.classList.add('ok-msj');   
        }else {
            e.target.classList.remove('ok-msj');
            e.target.classList.add('error-msj');
            mostrarError('¡ La dirección de correo electrónico no es válida !');
        }
    }

    if(nombre.value !== '' && er.test(email.value) && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
        btnEnviar.classList.add('cursor-pointer');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error-bg', 'error');    

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0 ) {
        formulario.appendChild(mensajeError);
    }

}

//Envia el email
function enviarEmail(e) {
    e.preventDefault();

    setTimeout(() => {
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El Mensaje se envió satisfactoriamente';
        parrafo.classList.add('msj'); 
        formulario.insertBefore(parrafo, msj);

        resetearFormulario();

        setTimeout(() => {
            
            parrafo.remove(); // Elimina el mensaje de texto

            
        }, 5000);
    }, 3000);
}

// funcion que resetea el formulario
function resetearFormulario() {
    formulario.reset();

    iniciarApp();
}