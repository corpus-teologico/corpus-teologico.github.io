document.addEventListener("DOMContentLoaded", function() {
// --- DETECCIÓN DE DISPOSITIVO (Mobile vs Desktop) ---
    function aplicarClaseSoporte() {
        const htmlElement = document.documentElement; // Selecciona la etiqueta <html>
        const anchoPantalla = window.innerWidth;

        // Limpiamos clases previas para evitar duplicados al redimensionar
        htmlElement.classList.remove('media-xs', 'media-lg');

        if (anchoPantalla < 768) {
            htmlElement.classList.add('media-xs');
            console.log("Soporte detectado: Móvil (media-xs)");
        } else {
            htmlElement.classList.add('media-lg');
            console.log("Soporte detectado: Escritorio (media-lg)");
        }
    }

    // Ejecutar al cargar la página
    aplicarClaseSoporte();
    
    // --- CONFIGURACIÓN DE SEO DINÁMICO ---
    const seoConfig = {
        description: "Sistema Teológico Personal de Roberto Formigo. Un estudio profundo sobre la soberanía de Dios, la Sola Gratia y el despertar espiritual a través de las Escrituras.",
        keywords: "Teología Reformada, Roberto Formigo, Juan Calvino, Charles Spurgeon, John MacArthur, Biblia, Gracia, Cristianismo",
        author: "Roberto Formigo"
    };

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

    setMetaTag('description', seoConfig.description);
    setMetaTag('keywords', seoConfig.keywords);
    setMetaTag('author', seoConfig.author);
    setMetaTag('og:title', document.title, true);
    setMetaTag('og:description', seoConfig.description, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', 'STF - Sistema Teológico Formigo', true);

    // 1. EL MENÚ LATERAL (Añadido "Mi Despertar" y corregida numeración)
    const menuHTML = `
        <div id="menu-lateral" class="menu-lateral">
            <button id="cerrar-menu" class="btn-cerrar">&times;</button>
            <div class="menu-contenido">
                <h3>SISTEMA TEOLÓGICO</h3>
                <a href="/index.html" style="color: #9b804e; font-style: italic;">Introducción al Corpus</a>
                <a href="/carta-abierta.html" style="color: #9b804e; font-weight: bold;">Carta abierta (Testimonio)</a>
                <div class="separador-menu"></div>
                <a href="/estudios/como-nos-habla-dios.html">I. ¿Cómo nos habla Dios?</a>
                <a href="/estudios/solo-la-biblia-basta.html">II. Sólo la Biblia basta</a>
                <a href="/estudios/la-vida-de-jesus.html">III. La vida de Jesús</a>
                <a href="/estudios/aprender-a-descansar.html">IV. Aprender a descansar</a>
                <a href="/estudios/conocer-para-amar.html">V. Conocer para amar</a>
                <a href="/estudios/de-donde-viene-el-mal.html">VI. ¿De dónde viene el mal?</a>
                <a href="/estudios/un-mundo-roto.html">VII. Un mundo roto</a>
                <a href="/estudios/el-problema-del-pecado.html">VIII. El problema del pecado</a>
                <a href="/estudios/nuestra-oscuridad.html">IX. Nuestra oscuridad</a>
                <a href="/estudios/el-dios-justo-y-amoroso.html">X. El Dios justo y amoroso</a>
                <a href="/estudios/volver-a-dios.html">XI. Volver a Dios</a>
                <a href="/estudios/ser-de-una-sola-pieza.html">XII. Ser de una sola pieza</a>
                <a href="/estudios/mi-amistad-con-dios.html">XIII. Mi amistad con Dios</a>
                <a href="/estudios/el-matrimonio-ideal.html">XIV. El matrimonio ideal</a>
                <a href="/estudios/libertad-de-las-cadenas.html">XV. Libertad de las cadenas</a>
                <a href="/estudios/defendiendo-mi-fe.html">XVI. Defendiendo mi fe</a>
                <a href="/estudios/ciencia-y-fe.html">XVII. Ciencia y fe</a>
                <a href="/estudios/nuestro-dios-trino.html">XVIII. Nuestro Dios Trino</a>
                <a href="/estudios/lo-que-esta-por-venir.html">XIX. Lo que está por venir</a>
                <a href="/estudios/el-poder-del-espiritu.html">XX. El poder del Espíritu</a>
                <a href="/estudios/la-familia-de-dios.html">XXI. La familia de Dios</a>
                <a href="/estudios/usar-bien-lo-que-dios-me-da.html">XXII. Usar bien lo que Dios me da</a>
                <a href="/estudios/la-guerra-en-mi-interior.html">XXIII. La guerra en mi interior</a>
                <div class="separador-menu"></div>
                <a href="/bibliografia.html" style="color: #9b804e; font-style: italic;">Bibliografía Consultada</a>
            </div>
        </div>
        <button id="abrir-menu" class="btn-abrir">☰ ÍNDICE</button>
    `;

    // 2. CABECERA (Sin cambios)
    const headerHTML = `
        <header style="background-color: #151515; padding: 70px 20px; text-align: center; border-bottom: 1px solid #9b804e; position: relative;">
            <h1 style="font-family: 'Cormorant Garamond', serif; color: #ffffff; font-size: 3rem; font-weight: 300; letter-spacing: 8px; margin: 0;">S T F</h1>
            <p style="font-family: 'Montserrat', sans-serif; color: #888; font-size: 0.7rem; letter-spacing: 5px; text-transform: uppercase; margin-top: 15px;">Sistema Teológico Personal</p>
        </header>
    `;
    
    // 3. PIE DE PÁGINA (Sin cambios)
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

    // LÓGICA DE BOTONES (Corregido a -100% para evitar fallos en móvil)
    const btnAbrir = document.getElementById('abrir-menu');
    const btnCerrar = document.getElementById('cerrar-menu');
    const panel = document.getElementById('menu-lateral');

    if (btnAbrir && panel) {
        btnAbrir.onclick = function(e) { 
            e.stopPropagation();
            panel.style.right = '0'; 
        };
    }

    if (btnCerrar && panel) {
        btnCerrar.onclick = function() { panel.style.right = '-100%'; };
    }

    document.addEventListener('click', function(event) {
        if (panel && !panel.contains(event.target) && panel.style.right === '0px') {
            panel.style.right = '-100%';
        }
    });

    if (panel) {
        panel.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// LÓGICA DE SCROLL (Sin cambios)
window.onscroll = function() {
    const btnMenu = document.getElementById('abrir-menu');
    if (btnMenu) {
        if (window.scrollY > 100) {
            btnMenu.classList.add('scrolled');
        } else {
            btnMenu.classList.remove('scrolled');
        }
    }
};
