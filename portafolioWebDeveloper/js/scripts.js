

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
    
});

function iniciarApp() {  
    logo();  
    scrollNav();
    ir_arriba();
    portafolio();
}

function logo() {
    const typed = new Typed('.typed', {
        strings: [
            '<i class="profesion">Web Developer</i>',
            '<i class="profesion">Freelancer</i>',
            '<i class="profesion">Web Desing</i>'
        ],
            // stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
        typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
        startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
        backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
        smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
        shuffle: false, // Alterar el orden en el que escribe las palabras.
        backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
        loop: true, // Repetir el array de strings
        loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
        showCursor: true, // Mostrar cursor palpitanto
        cursorChar: '|', // Caracter para el cursor
        contentType: 'html', // 'html' o 'null' para texto sin formato
    });
};


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

// Ir arriba Boton
function ir_arriba() {
    $(document).ready(function(){

        $('.ir-arriba').click(function(){
            $('body, html').animate({
                scrollTop: '0px'
            }, 300);
        });
    
        $(window).scroll(function(){
            if( $(this).scrollTop() > 0 ){
                $('.ir-arriba').slideDown(300);
            } else {
                $('.ir-arriba').slideUp(300);
            }
        });
    
    });
};


// GRID Portafolio
function portafolio() {
    const grid = new Muuri('.grid', {
        layout: {
           rounding: false
        }
    });
    
    
    window.addEventListener('load', () => {
        grid.refreshItems().layout();
        document.getElementById('grid').classList.add('imagenes-cargadas');
    
    
        // Se agrega los listeners de los enlaces para filtrar por categoria
        const enlaces = document.querySelectorAll('#categorias a');
        enlaces.forEach((elemento) => {
            elemento.addEventListener('click', (evento) => {
                evento.preventDefault();
                enlaces.forEach((enlace) => enlace.classList.remove('activo'));
                evento.target.classList.add('activo');
    
                const categoria = evento.target.innerHTML.toLowerCase();
                categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
            });
        });
    
        // Se agrega los listeners para la barra de busqueda
          document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
              const busqueda = evento.target.value;
              grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
          });
    
        //Se agrega un listener para las imagenes
        const overlay = document.getElementById('overlay');
        document.querySelectorAll('.grid .item img').forEach((elemento) =>{
            const ruta = elemento.getAttribute('src');
            const link = elemento.getAttribute('href');
            const descripcion = elemento.parentNode.parentNode.parentNode.dataset.descripcion;        
            
            elemento.addEventListener('click', () => {
                overlay.classList.add('activo');
                document.querySelector('#overlay img').src = ruta;
                document.querySelector('#overlay a').href.location = link;
                document.querySelector('#overlay .descripcion').innerHTML = descripcion;
                
               
            });
          
    
        });
    
        // Eventlistener del botón de cerrar
        document.querySelector('#btn-cerrar-popup').addEventListener('click', () =>   {
            overlay.classList.remove('activo');
          
        });
    
        // Eventlistener del overlay
        overlay.addEventListener('click', (evento) => {        
            evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
           
        });  
        
    });
};


// Validacion del formulario de contacto

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()