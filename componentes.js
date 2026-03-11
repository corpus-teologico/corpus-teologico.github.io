document.addEventListener("DOMContentLoaded", function() {
    
    // DETECCIÓN DE RUTA: Si la URL contiene "/estudios/", necesitamos volver un nivel atrás (../)
    const esEstudio = window.location.pathname.includes('/estudios/');
    const base = esEstudio ? '../' : '';
    const folder = esEstudio ? '' : 'estudios/';

    // 1. EL MENÚ LATERAL (Rutas dinámicas con ${base} y ${folder})
    const menuHTML = `
        <div id="menu-lateral" class="menu-lateral">
            <button id="cerrar-menu" class="btn-cerrar">&times;</button>
            <div class="menu-contenido">
                <h3>SISTEMA TEOLÓGICO</h3>
                <a href="${base}index.html" style="color: #9b804e; font-style: italic;">Introducción al Corpus</a>
                <div class="separador-menu"></div>
                <a href="${base}${folder}como-nos-habla-dios.html">I. ¿Cómo nos habla Dios?</a>
                <a href="${base}${folder}solo-la-biblia-basta.html">II. Sólo la Biblia basta</a>
                <a href="${base}${folder}la-vida-de-jesus.html">III. La vida de Jesús</a>
                <a href="${base}${folder}aprender-a-descansar.html">IV. Aprender a descansar</a>
                <a href="${base}${folder}conocer-para-amar.html">V. Conocer para amar</a>
                <a href="${base}${folder}de-donde-viene-el-mal.html">VI. ¿De dónde viene el mal?</a>
                <a href="${base}${folder}un-mundo-roto.html">VII. Un mundo roto</a>
                <a href="${base}${folder}el-problema-del-pecado.html">VIII. El problema del pecado</a>
                <a href="${base}${folder}nuestra-oscuridad.html">IX. Nuestra oscuridad</a>
                <a href="${base}${folder}el-dios-justo-y-amoroso.html">X. El Dios justo y amoroso</a>
                <a href="${base}${folder}volver-a-dios.html">XI. Volver a Dios</a>
                <a href="${base}${folder}ser-de-una-sola-pieza.html">XII. Ser de una sola pieza</a>
                <a href="${base}${folder}mi-amistad-con-dios.html">XIII. Mi amistad con Dios</a>
                <a href="${base}${folder}el-matrimonio-ideal.html">XIV. El matrimonio ideal</a>
                <a href="${base}${folder}libertad-de-las-cadenas.html">XV. Libertad de las cadenas</a>
                <a href="${base}${folder}defendiendo-mi-fe.html">XVI. Defendiendo mi fe</a>
                <a href="${base}${folder}ciencia-y-fe.html">XVII. Ciencia y fe</a>
                <a href="${base}${folder}nuestro-dios-trino.html">XVIII. Nuestro Dios Trino</a>
                <a href="${base}${folder}lo-que-esta-por-venir.html">XIX. Lo que está por venir</a>
                <a href="${base}${folder}el-poder-del-espiritu.html">XX. El poder del Espíritu</a>
                <a href="${base}${folder}la-familia-de-dios.html">XXI. La familia de Dios</a>
                <a href="${base}${folder}usar-bien-lo-que-dios-me-da.html">XXII. Usar bien lo que Dios me da</a>
                <a href="${base}${folder}la-guerra-en-mi-interior.html">XXIII. La guerra en mi interior</a>
                <div class="separador-menu"></div>
                <a href="${base}bibliografia.html" style="color: #9b804e; font-style: italic;">Bibliografía Consultada</a>
            </div>
        </div>
        <button id="abrir-menu" class="btn-abrir">☰ ÍNDICE</button>
    `;

    // 2. CABECERA
    const headerHTML = `
        <header style="background-color: #151515; padding: 70px 20px; text-align: center; border-bottom: 1px solid #9b804e; position: relative;">
            <h1 style="font-family: 'Cormorant Garamond', serif; color: #ffffff; font-size: 3rem; font-weight: 300; letter-spacing: 8px; margin: 0;">S T F</h1>
            <p style="font-family: 'Montserrat', sans-serif; color: #888; font-size: 0.7rem; letter-spacing: 5px; text-transform: uppercase; margin-top: 15px;">Sistema Teológico Personal</p>
        </header>
    `;
    
    // 3. PIE DE PÁGINA
    const footerHTML = `
        <footer style="text-align: center; padding: 50px 20px; margin-top: auto;">
            <p style="font-family: 'Montserrat', sans-serif; font-size: 0.75rem; color: #777; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px;">Roberto Formigo</p>
            <p style="font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.2rem; color: #9b804e; margin: 0;">Soli Deo Gloria</p>
        </footer>
    `;

    // INYECCIÓN DE CÓDIGO
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

    if (btnCerrar && panel) {
        btnCerrar.onclick = function() { panel.style.right = '-400px'; };
    }

    document.addEventListener('click', function(event) {
        if (panel && !panel.contains(event.target) && panel.style.right === '0px') {
            panel.style.right = '-400px';
        }
    });

    if (panel) {
        panel.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// LÓGICA DE SCROLL
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
