document.addEventListener("DOMContentLoaded", function() {
    
    // 1. EL MENÚ LATERAL
    const menuHTML = `
        <div id="menu-lateral" class="menu-lateral">
            <button id="cerrar-menu" class="btn-cerrar">&times;</button>
            <div class="menu-contenido">
                <h3>SISTEMA TEOLÓGICO</h3>
                <a href="index.html" style="color: #9b804e; font-style: italic;">Introducción al Corpus</a>
                <div class="separador-menu"></div>
                <a href="estudios/01.html">I. ¿Cómo nos habla Dios?</a>
                <a href="estudios/02.html">II. Sólo la Biblia basta</a>
                <a href="estudios/03.html">III. La vida de Jesús</a>
                <a href="estudios/04.html">IV. Aprender a descansar</a>
                <a href="estudios/05.html">V. Conocer para amar</a>
                <a href="estudios/06.html">VI. ¿De dónde viene el mal?</a>
                <a href="estudios/07.html">VII. Un mundo roto</a>
                <a href="estudios/08.html">VIII. El problema del pecado</a>
                <a href="estudios/09.html">IX. Nuestra oscuridad</a>
                <a href="estudios/10.html">X. El Dios justo y amoroso</a>
                <a href="estudios/11.html">XI. Volver a Dios</a>
                <a href="estudios/12.html">XII. Ser de una sola pieza</a>
                <a href="estudios/13.html">XIII. Mi amistad con Dios</a>
                <a href="estudios/14.html">XIV. El matrimonio ideal</a>
                <a href="estudios/15.html">XV. Libertad de las cadenas</a>
                <a href="estudios/16.html">XVI. Defendiendo mi fe</a>
                <a href="estudios/17.html">XVII. Ciencia y fe</a>
                <a href="estudios/18.html">XVIII. Nuestro Dios Trino</a>
                <a href="estudios/19.html">XIX. Lo que está por venir</a>
                <a href="estudios/20.html">XX. El poder del Espíritu</a>
                <a href="estudios/21.html">XXI. La familia de Dios</a>
                <a href="estudios/22.html">XXII. Usar bien lo que Dios me da</a>
                <a href="estudios/23.html">XXIII. La guerra en mi interior</a>
                <div class="separador-menu"></div>
                <a href="bibliografia.html" style="color: #9b804e; font-style: italic;">Bibliografía Consultada</a>
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
        btnAbrir.onclick = function() { panel.style.right = '0'; };
    }
    if (btnCerrar && panel) {
        btnCerrar.onclick = function() { panel.style.right = '-400px'; };
    }
});

// LÓGICA PARA CAMBIAR EL COLOR DEL BOTÓN AL HACER SCROLL
    window.onscroll = function() {
        const btnMenu = document.getElementById('abrir-menu');
        if (window.scrollY > 100) { // Si baja más de 100px
            btnMenu.classList.add('scrolled');
        } else {
            btnMenu.classList.remove('scrolled');
        }
    };
