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
