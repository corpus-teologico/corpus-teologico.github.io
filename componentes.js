// Función para cargar el Footer automáticamente
function cargarComponentes() {
    const footerHTML = `
        <strong>ROBERTO FORMIGO</strong><br>
        Sistematizado y Validado · 2026<br>
        <small>Soli Deo Gloria</small>
    `;
    
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    }
}

// Ejecutar cuando cargue la página
window.onload = cargarComponentes;
