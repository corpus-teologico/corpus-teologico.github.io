document.addEventListener("DOMContentLoaded", function() {
    
    // CABECERA COMÚN
    const headerHTML = `
        <header style="background-color: #151515; padding: 70px 20px; text-align: center; border-bottom: 1px solid #9b804e;">
            <h1 style="font-family: 'Cormorant Garamond', serif; color: #ffffff; font-size: 3rem; font-weight: 300; letter-spacing: 8px; margin: 0;">S T F</h1>
            <p style="font-family: 'Montserrat', sans-serif; color: #888; font-size: 0.7rem; letter-spacing: 5px; text-transform: uppercase; margin-top: 15px;">Sistema Teológico Personal</p>
        </header>
    `;
    
    // PIE DE PÁGINA COMÚN
    const footerHTML = `
        <footer style="text-align: center; padding: 50px 20px; margin-top: auto;">
            <p style="font-family: 'Montserrat', sans-serif; font-size: 0.75rem; color: #777; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px;">Roberto Formigo</p>
            <p style="font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.2rem; color: #9b804e; margin: 0;">Soli Deo Gloria</p>
        </footer>
    `;

    // Inyectar en la página
    const headerContainer = document.getElementById('header-global');
    const footerContainer = document.getElementById('footer-global');

    if (headerContainer) headerContainer.innerHTML = headerHTML;
    if (footerContainer) footerContainer.innerHTML = footerHTML;
});
