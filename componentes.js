/* =========================================================
   SISTEMA TEOLÓGICO FORMIGO - COMPONENTE MAESTRO (JS)
   ========================================================= */

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. ESTRUCTURA DEL MENÚ (Corregida y simplificada)
    const menuHTML = `
        <div id="menu-lateral" class="menu-lateral">
            <button id="cerrar-menu" class="btn-cerrar">&times;</button>
            <div class="menu-contenido">
                <h3>SISTEMA TEOLÓGICO</h3>
                <a href="/index.html" class="link-destacado">Introducción al Corpus</a>
                <div class="divisor-menu"></div>
                <nav id="nav-tratados">
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
                </nav>
                <div class="divisor-menu"></div>
                <a href="/bibliografia.html" class="link-destacado">Bibliografía Consultada</a>
            </div>
        </div>
        <button id="abrir-menu" class="btn-abrir">☰ ÍNDICE</button>
    `;

    // 2. ELEMENTOS GLOBALES
    const headerHTML = `
        <header class="header-stf">
            <h1>S T F</h1>
            <p>Sistema Teológico Personal</p>
        </header>
    `;
    
    const footerHTML = `
        <footer class="footer-stf">
            <p>Roberto Formigo</p>
            <p class="slogan">Soli Deo Gloria</p>
        </footer>
    `;

    // INYECCIÓN
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    const hGlobal = document.getElementById('header-global');
    const fGlobal = document.getElementById('footer-global');
    if (hGlobal) hGlobal.innerHTML = headerHTML;
    if (fGlobal) fGlobal.innerHTML = footerHTML;

    // --- LÓGICA DE CONTROL (RECONSTRUIDA) ---
    const panel = document.getElementById('menu-lateral');
    const btnAbrir = document.getElementById('abrir-menu');
    const btnCerrar = document.getElementById('cerrar-menu');

    // Función simple para abrir
    if (btnAbrir) {
        btnAbrir.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            panel.classList.add('active');
        });
    }

    // Función simple para cerrar
    if (btnCerrar) {
        btnCerrar.addEventListener('click', function() {
            panel.classList.remove('active');
        });
    }

    // Cerrar si se toca fuera del menú
    document.addEventListener('click', function(event) {
        if (panel.classList.contains('active') && !panel.contains(event.target) && event.target !== btnAbrir) {
            panel.classList.remove('active');
        }
    });
});

// SCROLL DINÁMICO
window.onscroll = function() {
    const btn = document.getElementById('abrir-menu');
    if (btn) {
        if (window.scrollY > 100) btn.classList.add('scrolled');
        else btn.classList.remove('scrolled');
    }
};
