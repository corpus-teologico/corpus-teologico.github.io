document.addEventListener("DOMContentLoaded", function() {

    // --- 0. CONFIGURACIÓN DE RUTAS Y CONTEXTO ---
    const head = document.head;
    const esEstudio = window.location.pathname.includes('/estudios/');
    const rutaBase = esEstudio ? '../' : './';

    // --- 1. BARRA DE PROGRESO DE LECTURA ---
    const crearBarraProgreso = () => {
        if (document.getElementById('progress-bar')) return;
        const barra = document.createElement('div');
        barra.id = 'progress-bar';
        barra.style.cssText = "position:fixed; top:0; left:0; height:3px; background:#9b804e; z-index:10000; width:0%; transition: width 0.1s ease;";
        document.body.appendChild(barra);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (height > 0) {
                const scrolled = (winScroll / height) * 100;
                barra.style.width = scrolled + "%";
            }
        });
    };
    crearBarraProgreso();
    // --- 10. GEMAS DE SABIDURÍA (Reflexión Final) ---
const inyectarGemaSabiduria = () => {
    const gemas = [
        { texto: "La esencia de la fe es la seguridad; la esencia de la incredulidad es dudar.", autor: "Charles Spurgeon" },
        { texto: "Nos hiciste, Señor, para ti, y nuestro corazón está inquieto hasta que descanse en ti.", autor: "Agustín de Hipona" },
        { texto: "Nadie se conoce a sí mismo si primero no ha contemplado el rostro de Dios.", autor: "Juan Calvino" },
        { texto: "La Biblia no es solo un libro para ser leído, sino un libro para ser vivido.", autor: "R.C. Sproul" },
        { texto: "Un hombre con Dios siempre es la mayoría.", autor: "John Knox" },
        { texto: "La oración es el aliento de la fe.", autor: "Martín Lutero" },
        { texto: "Dios es más glorificado en nosotros cuando estamos más satisfechos en Él.", autor: "John Piper" },
        { texto: "Porque de él, y por él, y para él, son todas las cosas. A él sea la gloria por los siglos.", autor: "Romanos 11:36" },
        { texto: "Tu palabra es antorcha a mis pies y lumbrera a mi camino.", autor: "Salmo 119:105" }
    ];

    // Seleccionamos una gema aleatoria
    const gemaSorteada = gemas[Math.floor(Math.random() * gemas.length)];

    // Creamos el contenedor
    const contenedorGema = document.createElement('div');
    contenedorGema.id = 'gema-sabiduria';
    contenedorGema.style.cssText = `
        max-width: 600px; margin: 40px auto; padding: 30px;
        text-align: center; border-top: 1px double #9b804e;
        border-bottom: 1px double #9b804e; opacity: 0;
        transition: opacity 2s ease-in-out;
    `;

    contenedorGema.innerHTML = `
        <p style="font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.4rem; color: #fff; margin-bottom: 10px;">
            "${gemaSorteada.texto}"
        </p>
        <p style="font-family: 'Montserrat', sans-serif; font-size: 0.7rem; letter-spacing: 3px; color: #9b804e; text-transform: uppercase;">
            — ${gemaSorteada.autor} —
        </p>
    `;

    // Lo inyectamos justo antes del footer global
    const footer = document.getElementById('footer-global');
    if (footer) {
        footer.parentNode.insertBefore(contenedorGema, footer);
    }

    // Lógica para que aparezca solo cuando el usuario llegue al final
    const observarFinal = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            contenedorGema.style.opacity = "1";
            observarFinal.disconnect(); // Solo se activa una vez por sesión
        }
    }, { threshold: 0.1 });

    observarFinal.observe(contenedorGema);
};

inyectarGemaSabiduria();
 // --- 9. MARCADOR DE LECTURA (Save State) ---
const inicializarMarcadorLectura = () => {
    const idPagina = window.location.pathname; // Identificador único por tratado
    const posicionGuardada = localStorage.getItem(`scroll-pos-${idPagina}`);

    // 1. Guardar la posición mientras el usuario hace scroll (con debounce para no saturar)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollActual = window.scrollY || document.documentElement.scrollTop;
            // Solo guardamos si ha bajado más de 300px para evitar marcar el inicio
            if (scrollActual > 300) {
                localStorage.setItem(`scroll-pos-${idPagina}`, scrollActual);
            }
        }, 500);
    });

    // 2. Si existe una posición previa, preguntar al lector
    if (posicionGuardada && posicionGuardada > 300) {
        // Crear un pequeño aviso elegante
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; 
            background: #1a1a1a; color: #fff; border: 1px solid #9b804e;
            padding: 15px 20px; font-family: 'Montserrat', sans-serif;
            font-size: 0.75rem; z-index: 10002; display: flex;
            flex-direction: column; gap: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            animation: aparecerBoton 0.5s ease-out;
        `;

        toast.innerHTML = `
            <span style="color: #9b804e; letter-spacing: 1px; font-weight: bold;">LECTURA PENDIENTE</span>
            <span style="font-style: italic; opacity: 0.8;">¿Desea retomar el estudio donde lo dejó?</span>
            <div style="display: flex; gap: 10px; margin-top: 5px;">
                <button id="btn-retomar" style="background: #9b804e; color: white; border: none; padding: 5px 12px; cursor: pointer; font-family: 'Montserrat'; font-size: 0.6rem; font-weight: bold; text-transform: uppercase;">Retomar</button>
                <button id="btn-ignorar" style="background: transparent; color: #888; border: 1px solid #444; padding: 5px 12px; cursor: pointer; font-family: 'Montserrat'; font-size: 0.6rem; text-transform: uppercase;">Ignorar</button>
            </div>
        `;
        document.body.appendChild(toast);

        // Lógica de los botones
        document.getElementById('btn-retomar').onclick = () => {
            window.scrollTo({
                top: parseInt(posicionGuardada),
                behavior: 'smooth'
            });
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 1000);
        };

        document.getElementById('btn-ignorar').onclick = () => {
            localStorage.removeItem(`scroll-pos-${idPagina}`);
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 1000);
        };

        // El aviso desaparece solo tras 15 segundos si no se interactúa
        setTimeout(() => {
            if (toast) {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 1000);
            }
        }, 15000);
    }
};

inicializarMarcadorLectura();   
// --- 8. RECORDATORIO CÍCLICO DE FUNCIONES ---
const iniciarRecordatorioCiclico = () => {
    // Creamos el elemento una sola vez
    const aviso = document.createElement('div');
    aviso.id = 'aviso-sistema-ciclico';
    aviso.innerHTML = `
        <div style="border-bottom: 1px solid #9b804e; margin-bottom: 8px; padding-bottom: 4px; font-weight: bold; text-transform: uppercase; font-size: 0.6rem;">Manual del Corpus</div>
        Subraye texto para exégesis ✍<br>
        Use ◐ para alto contraste.
    `;
    
    aviso.style.cssText = `
        position: fixed; bottom: 85px; left: 25px; width: 220px;
        background: rgba(26, 26, 26, 0.95); color: #c5a367; padding: 18px;
        border: 1px solid #9b804e; font-family: 'Montserrat', sans-serif;
        font-size: 0.7rem; line-height: 1.5; z-index: 10000;
        box-shadow: 0 15px 35px rgba(0,0,0,0.6); 
        opacity: 0; pointer-events: none;
        transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateY(20px);
    `;
    document.body.appendChild(aviso);

    const mostrar = () => {
        aviso.style.opacity = "1";
        aviso.style.transform = "translateY(0)";
        aviso.style.pointerEvents = "auto";
        
        // Se oculta automáticamente a los 10 segundos
        setTimeout(() => {
            aviso.style.opacity = "0";
            aviso.style.transform = "translateY(20px)";
            aviso.style.pointerEvents = "none";
        }, 10000); 
    };

    // Ejecutar inmediatamente la primera vez
    setTimeout(mostrar, 3000);

    // Iniciar el bucle: cada 60 segundos (1 minuto)
    setInterval(mostrar, 60000);

    // Permitir al usuario cerrarlo al hacer clic si le molesta
    aviso.onclick = () => {
        aviso.style.opacity = "0";
        aviso.style.transform = "translateY(20px)";
    };
};

iniciarRecordatorioCiclico();
    // --- 2. HERRAMIENTA DE EXÉGESIS (Selección de texto) ---
    const inicializarHerramientaExegesis = () => {
        let btnExegesis = document.getElementById('btn-exegesis');
        if (!btnExegesis) {
            btnExegesis = document.createElement('button');
            btnExegesis.id = 'btn-exegesis';
            btnExegesis.innerHTML = '✍'; 
            btnExegesis.title = 'Consultar término teológico';
            btnExegesis.style.cssText = "position:absolute; display:none; background:#1a1a1a; color:#9b804e; border:1px solid #9b804e; border-radius:4px; padding:5px 10px; font-size:16px; cursor:pointer; z-index:10001; box-shadow:0 4px 10px rgba(0,0,0,0.3);";
            document.body.appendChild(btnExegesis);
        }

        document.addEventListener('mouseup', (e) => {
            const seleccion = window.getSelection().toString().trim();
            if (seleccion.length > 3) {
                btnExegesis.style.left = `${e.pageX + 5}px`;
                btnExegesis.style.top = `${e.pageY - 45}px`;
                btnExegesis.style.display = 'block';
                
                btnExegesis.onclick = () => {
                    const url = `https://www.google.com/search?q=${encodeURIComponent(seleccion + " teología cristiana")}`;
                    window.open(url, '_blank');
                    btnExegesis.style.display = 'none';
                    window.getSelection().removeAllRanges(); // Limpia la selección azul
                };
            }
        });

        document.addEventListener('mousedown', (e) => {
            if (e.target !== btnExegesis) btnExegesis.style.display = 'none';
        });
    };
    inicializarHerramientaExegesis();

    // --- 3. FUNCIÓN DE ACCESIBILIDAD ---
    const inicializarAccesibilidad = () => {
        if (document.getElementById('btn-access-float')) return;
        const btn = document.createElement('button');
        btn.id = 'btn-access-float';
        btn.innerHTML = '◐'; 
        btn.style.cssText = "position:fixed; bottom:20px; left:20px; z-index:9999; width:45px; height:45px; border-radius:50%; cursor:pointer; background:#9b804e; color:white; border:none; box-shadow:0 2px 10px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; font-size:20px;";
        document.body.appendChild(btn);

        if (localStorage.getItem('stf-contraste') === 'activo') {
            document.body.classList.add('alto-contraste');
        }

        btn.onclick = () => {
            document.body.classList.toggle('alto-contraste');
            localStorage.setItem('stf-contraste', document.body.classList.contains('alto-contraste') ? 'activo' : 'inactivo');
        };
    };
    inicializarAccesibilidad();

    // --- 4. DETECCIÓN DE DISPOSITIVO (Clases de soporte) ---
    const aplicarClaseSoporte = () => {
        const htmlElement = document.documentElement;
        htmlElement.classList.remove('media-xs', 'media-lg');
        if (window.innerWidth < 768) htmlElement.classList.add('media-xs');
        else htmlElement.classList.add('media-lg');
    };
    aplicarClaseSoporte();
    window.addEventListener('resize', aplicarClaseSoporte);

    // --- 5. COMPONENTES VISUALES E INYECCIÓN DE HEAD ---
    const setupVisuals = () => {
        // Inyectar Favicon y Fuentes si no existen
        if (!document.querySelector('link[rel="icon"]')) {
            const headContent = `
                <link rel="icon" type="image/svg+xml" href="${rutaBase}favicon.svg">
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;500&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="${rutaBase}style.css">
            `;
            head.insertAdjacentHTML('beforeend', headContent);
        }

        const menuHTML = `
            <div id="menu-lateral" class="menu-lateral">
                <button id="cerrar-menu" class="btn-cerrar">&times;</button>
                <div class="menu-contenido">
                    <h3>SISTEMA TEOLÓGICO</h3>
                    <a href="${rutaBase}index.html" style="color: #9b804e; font-style: italic;">Introducción al Corpus</a>
                    <a href="${rutaBase}carta-abierta.html" style="color: #9b804e; font-weight: bold;">Carta abierta</a>
                    <div class="separador-menu"></div>
                    <a href="${rutaBase}estudios/como-nos-habla-dios.html">I. ¿Cómo nos habla Dios?</a>
                    <a href="${rutaBase}estudios/solo-la-biblia-basta.html">II. Sólo la Biblia basta</a>
                    <a href="${rutaBase}estudios/la-armonia-de-los-evangelios.html">III. Armonía de los Evangelios</a>
                    <a href="${rutaBase}estudios/aprender-a-descansar.html">IV. Aprender a descansar</a>
                    <a href="${rutaBase}estudios/conocer-para-amar.html">V. Conocer para amar</a>
                    <a href="${rutaBase}estudios/de-donde-viene-el-mal.html">VI. ¿De dónde viene el mal?</a>
                    <a href="${rutaBase}estudios/un-mundo-roto.html">VII. Un mundo roto</a>
                    <a href="${rutaBase}estudios/el-problema-del-pecado.html">VIII. El problema del pecado</a>
                    <a href="${rutaBase}estudios/nuestra-oscuridad.html">IX. Nuestra oscuridad</a>
                    <a href="${rutaBase}estudios/el-dios-justo-y-amoroso.html">X. El Dios justo y amoroso</a>
                    <a href="${rutaBase}estudios/volver-a-dios.html">XI. Volver a Dios</a>
                    <a href="${rutaBase}estudios/ser-de-una-sola-pieza.html">XII. Ser de una sola pieza</a>
                    <a href="${rutaBase}estudios/mi-amistad-con-dios.html">XIII. Mi amistad con Dios</a>
                    <a href="${rutaBase}estudios/el-matrimonio-ideal.html">XIV. El matrimonio ideal</a>
                    <a href="${rutaBase}estudios/libertad-de-las-cadenas.html">XV. Libertad de las cadenas</a>
                    <a href="${rutaBase}estudios/defendiendo-mi-fe.html">XVI. Defendiendo mi fe</a>
                    <a href="${rutaBase}estudios/ciencia-y-fe.html">XVII. Ciencia y fe</a>
                    <a href="${rutaBase}estudios/nuestro-dios-trino.html">XVIII. Nuestro Dios Trino</a>
                    <a href="${rutaBase}estudios/lo-que-esta-por-venir.html">XIX. Lo que está por venir</a>
                    <a href="${rutaBase}estudios/el-poder-del-espiritu.html">XX. El poder del Espíritu</a>
                    <a href="${rutaBase}estudios/la-familia-de-dios.html">XXI. La familia de Dios</a>
                    <a href="${rutaBase}estudios/usar-bien-lo-que-dios-me-da.html">XXII. Usar bien lo que Dios me da</a>
                    <a href="${rutaBase}estudios/la-guerra-en-mi-interior.html">XXIII. La guerra en mi interior</a>
                    <div class="separador-menu"></div>
                    <a href="${rutaBase}bibliografia.html" style="color: #9b804e; font-style: italic;">Bibliografía Consultada</a>
                </div>
            </div>
            <button id="abrir-menu" class="btn-abrir">☰ ÍNDICE</button>
        `;

        document.body.insertAdjacentHTML('afterbegin', menuHTML);

        const hGlobal = document.getElementById('header-global');
        const fGlobal = document.getElementById('footer-global');

        if (hGlobal) {
            hGlobal.innerHTML = `
                <header style="background-color:#151515; padding:70px 20px; text-align:center; border-bottom:1px solid #9b804e;">
                    <h1 style="font-family:'Cormorant Garamond',serif; color:#fff; font-size:3rem; letter-spacing:8px; margin:0;">S T F</h1>
                    <p style="font-family:'Montserrat',sans-serif; color:#888; font-size:0.7rem; letter-spacing:5px; text-transform:uppercase; margin-top:15px;">Sistema Teológico Personal</p>
                </header>`;
        }

        if (fGlobal) {
            fGlobal.innerHTML = `
                <footer style="text-align:center; padding:50px 20px; margin-top:auto;">
                    <p style="font-family:'Montserrat',sans-serif; font-size:0.75rem; color:#777; letter-spacing:2px; text-transform:uppercase; margin-bottom:5px;">Roberto Formigo</p>
                    <p style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:1.2rem; color:#9b804e; margin:0;">Soli Deo Gloria</p>
                </footer>`;
        }
    };
    setupVisuals();
// --- 7. NOTIFICACIÓN DE BIENVENIDA ---
const mostrarAvisoHabilidades = () => {
    if (localStorage.getItem('stf-leido') === 'si') return;

    const aviso = document.createElement('div');
    aviso.style.cssText = `
        position: fixed; bottom: 80px; left: 20px; 
        background: #1a1a1a; color: #9b804e; padding: 15px;
        border: 1px solid #9b804e; font-family: 'Montserrat', sans-serif;
        font-size: 0.7rem; letter-spacing: 1px; z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5); opacity: 0;
        transition: opacity 1s ease;
    `;
    aviso.innerHTML = "SISTEMA ACTIVO: Use ◐ para contraste y subraye texto para consultar términos.";
    document.body.appendChild(aviso);

    setTimeout(() => aviso.style.opacity = "1", 2000);
    setTimeout(() => {
        aviso.style.opacity = "0";
        setTimeout(() => aviso.remove(), 1000);
        localStorage.setItem('stf-leido', 'si');
    }, 8000);
};
mostrarAvisoHabilidades();
    // --- 6. LÓGICA DE INTERACCIÓN FINAL ---
    const btnAbrir = document.getElementById('abrir-menu');
    const btnCerrar = document.getElementById('cerrar-menu');
    const panel = document.getElementById('menu-lateral');

    if (btnAbrir) {
        btnAbrir.onclick = (e) => { 
            e.stopPropagation(); 
            panel.style.right = '0'; 
        };
    }

    if (btnCerrar) {
        btnCerrar.onclick = () => { 
            panel.style.right = '-400px'; 
        };
    }

    document.addEventListener('click', (e) => {
        if (panel && !panel.contains(e.target) && e.target !== btnAbrir) {
            panel.style.right = '-400px';
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            btnAbrir.classList.add('scrolled');
        } else {
            btnAbrir.classList.remove('scrolled');
        }
    });
});
