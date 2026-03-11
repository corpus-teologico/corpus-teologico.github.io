document.addEventListener("DOMContentLoaded", function() {
    
    // 1. ESTRUCTURAS HTML (Inalteradas)
    const menuHTML = `
        <div id="menu-lateral" class="menu-lateral" style="right: -100%;">
            <button id="cerrar-menu" class="btn-cerrar">&times;</button>
            <div class="menu-contenido">
                <h3>SISTEMA TEOLÓGICO</h3>
                <a href="/index.html" style="color: #9b804e; font-style: italic;">Introducción al Corpus</a>
                <div style="margin: 20px 0; height: 1px; background: rgba(155,128,78,0.2);"></div>
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
                <div style="margin: 20px 0; height: 1px; background: rgba(155,128,78,0.2);"></div>
                <a href="/bibliografia.html" style="color: #9b804e; font-style: italic;">Bibliografía Consultada</a>
            </div>
        </div>
        <button id="abrir-menu" class="btn-abrir">☰ ÍNDICE</button>
    `;

    const headerHTML = `
        <header style="background-color: #151515; padding: 60px 20px; text-align: center; border-bottom: 1px solid #9b804e;">
            <h1 style="font-family: 'Cormorant Garamond', serif; color: #ffffff; font-size: 3rem; font-weight: 300; letter-spacing: 8px; margin: 0;">S T F</h1>
            <p style="font-family: 'Montserrat', sans-serif; color: #888; font-size: 0.7rem; letter-spacing: 5px; text-transform: uppercase;">Sistema Teológico Personal</p>
        </header>
    `;
    
    const footerHTML = `
        <footer style="text-align: center; padding: 50px 20px;">
            <p style="font-family: 'Montserrat', sans-serif; font-size: 0.75rem; color: #777; letter-spacing: 2px; text-transform: uppercase;">Roberto Formigo</p>
            <p style="font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.2rem; color: #9b804e; margin: 0;">Soli Deo Gloria</p>
        </footer>
    `;

    // INYECCIÓN
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    const hGlobal = document.getElementById('header-global');
    const fGlobal = document.getElementById('footer-global');
    if (hGlobal) hGlobal.innerHTML = headerHTML;
    if (fGlobal) fGlobal.innerHTML = footerHTML;

    // --- LÓGICA DE CONTROL (CORREGIDA PARA MOBILE) ---
    const panel = document.getElementById('menu-lateral');

    document.addEventListener('click', function(e) {
        // ABRIR: Si el clic es en el botón de abrir o en sus hijos (el icono ☰)
        if (e.target.closest('#abrir-menu')) {
            e.preventDefault();
            panel.style.right = '0';
        } 
        // CERRAR: Si es el botón X o si es fuera del panel
        else if (e.target.closest('#cerrar-menu') || (!panel.contains(e.target) && panel.style.right === '0px')) {
            panel.style.right = '-100%';
        }
    });
});

// SCROLL DINÁMICO
window.onscroll = function() {
    const btn = document.getElementById('abrir-menu');
    if (btn) {
        if (window.scrollY > 150) btn.classList.add('scrolled');
        else btn.classList.remove('scrolled');
    }
};
