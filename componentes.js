document.addEventListener("DOMContentLoaded", function() {
    const head = document.head;
    const esEstudio = window.location.pathname.includes('/estudios/');
    const rutaBase = esEstudio ? '../' : './';

    // 1. CONFIGURACIÓN DINÁMICA DEL HEAD (Favicons, Fuentes, CSS)
    const setupHead = () => {
        const headContent = `
            <link rel="icon" type="image/svg+xml" href="${rutaBase}favicon.svg">
            <link rel="alternate icon" href="${rutaBase}favicon.svg">
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;500&display=swap" rel="stylesheet">
        `;
        head.insertAdjacentHTML('beforeend', headContent);
        
        if (!document.querySelector('link[rel="stylesheet"]')) {
            const css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = `${rutaBase}style.css`;
            head.appendChild(css);
        }
    };
    setupHead();

    // 2. DETECCIÓN DE DISPOSITIVO
    function aplicarClaseSoporte() {
        const htmlElement = document.documentElement;
        const anchoPantalla = window.innerWidth;
        htmlElement.classList.remove('media-xs', 'media-lg');
        if (anchoPantalla < 768) {
            htmlElement.classList.add('media-xs');
        } else {
            htmlElement.classList.add('media-lg');
        }
    }
    aplicarClaseSoporte();
    window.addEventListener('resize', aplicarClaseSoporte);
    
    // 3. SEO DINÁMICO
    function setMetaTag(name, content, isProperty = false) {
        let element = isProperty 
            ? document.querySelector(`meta[property="${name}"]`)
            : document.querySelector(`meta[name="${name}"]`);
        if (!element) {
            element = document.createElement('meta');
            if (isProperty) element.setAttribute('property', name);
            else element.setAttribute('name', name);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    }

    const desc = "Sistema Teológico Personal de Roberto Formigo. Un estudio profundo sobre la soberanía de Dios y las Escrituras.";
    setMetaTag('description', desc);
    setMetaTag('keywords', "Teología Reformada, Roberto Formigo, Biblia, Gracia");
    setMetaTag('author', "Roberto Formigo");
    setMetaTag('og:title', document.title, true);
    setMetaTag('og:description', desc, true);

    // 4. COMPONENTES VISUALES (Menú, Header, Footer)
    // Nota: Usamos ${rutaBase} para que los links funcionen siempre
    const menuHTML = `
        <div id="menu-lateral" class="menu-lateral">
            <button id="cerrar-menu" class="btn-cerrar">&times;</button>
            <div class="menu-contenido">
                <h3>SISTEMA TEOLÓGICO</h3>
                <a href="${rutaBase}index.html" style="color: #9b804e; font-style: italic;">Introducción al Corpus</a>
                <a href="${rutaBase}carta-abierta.html" style="color: #9b804e; font-weight: bold;">Carta abierta (Testimonio)</a>
                <div class="separador-menu"></div>
                <a href="${rutaBase}estudios/como-nos-habla-dios.html">I. ¿Cómo nos habla Dios?</a>
                <a href="${rutaBase}estudios/solo-la-biblia-basta.html">II. Sólo la Biblia basta</a>
                <a href="${rutaBase}estudios/la-armonia-de-los-evangelios.html">III. La Armonía de los Evangelios</a>                <a href="${rutaBase}estudios/aprender-a-descansar.html">IV. Aprender a descansar</a>
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

    const headerHTML = `
        <header style="background-color: #151515; padding: 70px 20px; text-align: center; border-bottom: 1px solid #9b804e; position: relative;">
            <h1 style="font-family: 'Cormorant Garamond', serif; color: #ffffff; font-size: 3rem; font-weight: 300; letter-spacing: 8px; margin: 0;">S T F</h1>
            <p style="font-family: 'Montserrat', sans-serif; color: #888; font-size: 0.7rem; letter-spacing: 5px; text-transform: uppercase; margin-top: 15px;">Sistema Teológico Personal</p>
        </header>
    `;
    
    const footerHTML = `
        <footer style="text-align: center; padding: 50px 20px; margin-top: auto;">
            <p style="font-family: 'Montserrat', sans-serif; font-size: 0.75rem; color: #777; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px;">Roberto Formigo</p>
            <p style="font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.2rem; color: #9b804e; margin: 0;">Soli Deo Gloria</p>
        </footer>
    `;

    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    const hGlobal = document.getElementById('header-global');
    const fGlobal = document.getElementById('footer-global');
    if (hGlobal) hGlobal.innerHTML = headerHTML;
    if (fGlobal) fGlobal.innerHTML = footerHTML;

    // LÓGICA DE BOTONES
    const btnAbrir = document.getElementById('abrir-menu');
    const btnCerrar = document.getElementById('cerrar-menu');
    const panel = document.getElementById('menu-lateral');

    if (btnAbrir && panel) {
        btnAbrir.onclick = function(e) { 
            e.stopPropagation();
            panel.style.right = '0'; 
        };
    }

    const cerrarPanel = () => { if (panel) panel.style.right = '-100%'; };

    if (btnCerrar) btnCerrar.onclick = cerrarPanel;

    document.addEventListener('click', function(event) {
        if (panel && !panel.contains(event.target) && panel.style.right === '0px') {
            cerrarPanel();
        }
    });

    // LÓGICA DE SCROLL PARA EL BOTÓN FLOTANTE
    window.addEventListener('scroll', function() {
        const btnMenu = document.getElementById('abrir-menu');
        if (btnMenu) {
            if (window.scrollY > 100) btnMenu.classList.add('scrolled');
            else btnMenu.classList.remove('scrolled');
        }
    });
});
