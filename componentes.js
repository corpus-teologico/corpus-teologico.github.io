document.addEventListener("DOMContentLoaded", function() {

    // --- 0. CONFIGURACIÓN DE RUTAS Y CONTEXTO ---
    const head = document.head;
    const esEstudio = window.location.pathname.includes('/estudios/');
    const rutaBase = esEstudio ? '../' : './';

   // --- 1. BASE DE DATOS DOCTRINAL (DICCIONARIO MAESTRO INTEGRAL) ---
    const diccionarioSTF = {
        "Aseidad": "Atributo divino por el cual Dios tiene vida en sí mismo y es totalmente independiente de Su creación.",
        "Adopción": "Acto de gracia por el cual Dios recibe al creyente como hijo legítimo en Su familia celestial.",
        "Antropomorfismo": "Uso de lenguaje humano para describir atributos o acciones de Dios para nuestra comprensión limitada.",
        "Bibliología": "El estudio sistemático de las Escrituras, su inspiración, inerrancia, autoridad y suficiencia.",
        "Canon": "La colección cerrada de los 66 libros inspirados que constituyen la única regla de fe y conducta.",
        "Cristocentrismo": "Enfoque teológico que coloca a Jesucristo como el centro y cumplimiento de toda la revelación divina.",
        "Concupiscencia": "La inclinación desordenada hacia el pecado que permanece en la naturaleza humana tras la caída.",
        "Depravación Radical": "La corrupción total del hombre que afecta su voluntad, mente y corazón, incapacitándolo para buscar a Dios.",
        "Doxología": "Expresión de alabanza a la gloria de Dios como el fin supremo de toda teología y existencia.",
        "Escatología": "El estudio de las últimas cosas: la parusía, el juicio final, la resurrección y el estado eterno.",
        "Exégesis": "La extracción objetiva del significado original de un texto bíblico mediante un análisis gramatical e histórico.",
        "Expiación": "La obra de Cristo en la cruz para cubrir el pecado y satisfacer las demandas de la justicia divina.",
        "Fideísmo": "La postura errónea que sostiene que la fe es independiente o contraria a la razón.",
        "Gracia Irresistible": "La obra del Espíritu Santo que vence la resistencia del pecador y lo atrae eficazmente a la salvación.",
        "Glorificación": "La etapa final de la redención donde el creyente es liberado de la presencia misma del pecado en la eternidad.",
        "Hermenéutica": "La ciencia y el arte de interpretar correctamente el mensaje y la aplicación de las Escrituras.",
        "Hipóstasis": "Término técnico para referirse a la 'persona' en el contexto de la Trinidad y la Unión Hipostática.",
        "Inerrancia": "La convicción de que las Escrituras, en sus autógrafos originales, están libres de todo error.",
        "Imputación": "Acto legal donde la justicia de Cristo es acreditada a la cuenta del pecador creyente.",
        "Justificación": "Declaración judicial de Dios por la cual el pecador es visto como justo solo por la fe en Cristo.",
        "Kenosis": "El acto del Hijo de Dios de despojarse de la manifestación de Su gloria al asumir la forma de siervo.",
        "Legalismo": "El error de intentar ganar el favor de Dios o la santidad mediante el cumplimiento mecánico de reglas.",
        "Monergismo": "La doctrina de que la regeneración es una obra exclusiva de Dios sin la cooperación del hombre.",
        "Naturaleza Divina": "La esencia pura y perfecta de Dios que Cristo posee en plenitud desde la eternidad.",
        "Omnisciencia": "La perfección de Dios por la cual Él conoce todas las cosas reales y posibles de manera inmediata.",
        "Pneumatología": "La rama de la teología que estudia la persona, deidad y obra del Espíritu Santo.",
        "Propiciación": "El aspecto del sacrificio de Cristo que aplaca la ira santa de Dios contra el pecado.",
        "Quididad": "La esencia de lo que algo es; en teología, se usa para discutir la naturaleza de los atributos divinos.",
        "Regeneración": "El nuevo nacimiento obrado por el Espíritu Santo que imparte vida espiritual al muerto en pecados.",
        "Sola Scriptura": "Principio que establece la Biblia como la única norma que norma (norma normans) la fe de la Iglesia.",
        "Trinidad": "Un solo Dios en tres personas distintas, coeternas y consustanciales: Padre, Hijo y Espíritu Santo.",
        "Unión Hipostática": "La unión de la naturaleza divina y humana en la única persona de Jesucristo sin mezcla ni confusión.",
        "Vicario": "El carácter sustitutivo de Cristo, quien actuó en lugar de Sus elegidos bajo el juicio de Dios.",
        "Westminster": "Referencia a los estándares doctrinales que resumen con precisión la fe reformada y el sistema teológico.",
        "Xenoglosia": "El fenómeno bíblico de hablar en idiomas humanos reales no aprendidos, como señal del Espíritu.",
        "Yahweh": "El nombre pactual de Dios que revela Su autoexistencia, fidelidad y relación con Su pueblo.",
        "Zelote": "Históricamente, aquellos celosos por la ley; teológicamente, el celo por la gloria de Dios en la verdad."
    };

    // --- 2. BARRA DE PROGRESO ---
    const crearBarraProgreso = () => {
        if (document.getElementById('progress-bar')) return;
        const barra = document.createElement('div');
        barra.id = 'progress-bar';
        barra.style.cssText = "position:fixed; top:0; left:0; height:3px; background:#9b804e; z-index:10000; width:0%; transition: width 0.1s ease;";
        document.body.appendChild(barra);
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (height > 0) barra.style.width = (winScroll / height) * 100 + "%";
        });
    };

    // --- 3. DICCIONARIO FLOTANTE (EXÉGESIS) ---
    const inicializarDiccionarioPropio = () => {
        let box = document.createElement('div');
        box.id = 'exegesis-box';
        box.style.cssText = "position:absolute; display:none; background:#1a1a1a; color:#fff; border:1px solid #9b804e; border-radius:4px; padding:18px; font-size:14px; z-index:10001; box-shadow:0 10px 40px rgba(0,0,0,0.7); max-width:320px; line-height:1.6; font-family:'Montserrat',sans-serif;";
        document.body.appendChild(box);

        window.buscarEnGoogleSTF = (termino) => {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(termino + " teología cristiana")}`, '_blank');
            box.style.display = 'none';
        };

        document.addEventListener('mouseup', (e) => {
            const rawSelection = window.getSelection().toString().trim();
            if (rawSelection.length < 3) return;

            let norm = rawSelection.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (norm.endsWith('s') && !diccionarioSTF[norm]) norm = norm.slice(0, -1);

            const keys = Object.keys(diccionarioSTF);
            const keysNorm = keys.map(k => k.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            const index = keysNorm.indexOf(norm);

            if (index !== -1) {
                const term = keys[index];
                box.innerHTML = `
                    <div style="color:#9b804e; font-weight:bold; text-transform:uppercase; font-size:0.6rem; letter-spacing:2px; border-bottom:1px solid #333; padding-bottom:5px; margin-bottom:10px;">Definición STF</div>
                    <div style="font-family:'Cormorant Garamond'; font-size:1.1rem;"><b>${term}:</b> "${diccionarioSTF[term]}"</div>
                    <a href="${rutaBase}glosario.html#letra-${term[0].toUpperCase()}" style="display:block; margin-top:10px; color:#9b804e; font-size:0.6rem; text-decoration:none; text-align:right;">VER EN GLOSARIO →</a>
                `;
            } else {
                box.innerHTML = `<div onclick="buscarEnGoogleSTF('${rawSelection.replace(/'/g, "\\'")}')" style="color:#9b804e; cursor:pointer; font-family:'Montserrat';">✍ Investigar "${rawSelection}"</div>`;
            }
            box.style.left = `${e.pageX + 10}px`;
            box.style.top = `${e.pageY - 100}px`;
            box.style.display = 'block';
        });

        document.addEventListener('mousedown', (e) => { if (!box.contains(e.target)) box.style.display = 'none'; });
    };

 // --- 4. GENERADOR DE PÁGINA GLOSARIO (ARQUITECTURA PROFESIONAL STF) ---
    const generarPaginaGlosario = () => {
        const contenedor = document.getElementById('glosario-dinamico');
        const nav = document.getElementById('alfabeto-nav');
        if (!contenedor) return;

        contenedor.innerHTML = ""; 
        if(nav) nav.innerHTML = "";

        // Ordenar términos alfabéticamente
        const ordenados = Object.keys(diccionarioSTF).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
        let letras = new Set();

        ordenados.forEach(term => {
            const L = term[0].toUpperCase();
            
            // Crear encabezado de letra elegante
            if (!letras.has(L)) {
                letras.add(L);
                contenedor.innerHTML += `
                    <div class="separador-seccion" id="letra-${L}" style="margin-top: 100px; margin-bottom: 50px;">
                        <span>SECCIÓN ${L}</span>
                    </div>`;
                
                if(nav) {
                    const a = document.createElement('a');
                    a.href = `#letra-${L}`; a.innerText = L;
                    a.style.cssText = "margin:0 10px; text-decoration:none; color:#9b804e; font-family:'Montserrat'; font-weight:bold; font-size: 0.85rem; letter-spacing: 1px;";
                    nav.appendChild(a);
                }
            }

            // Bloque de Término con look de Tratado
            contenedor.innerHTML += `
                <article class="entrada-glosario-maestra" style="margin-bottom: 45px; transition: 0.3s;">
                    <div class="introduccion-texto" style="text-align: justify;">
                        <p style="font-size: 1.3rem; line-height: 1.7; border-left: 3px solid #9b804e; padding-left: 35px; font-family: 'Cormorant Garamond', serif; color: #d1d1d1; margin:0;">
                            <strong style="font-family: 'Montserrat', sans-serif; font-size: 0.8rem; color: #9b804e; display: block; margin-bottom: 12px; letter-spacing: 3px; font-weight: 500; text-transform: uppercase;">
                                ${term}
                            </strong>
                            ${diccionarioSTF[term]}
                        </p>
                    </div>
                </article>`;
        });
    };

    // --- 5. COMPONENTES VISUALES Y MENÚ COMPLETO ---
    const setupVisuals = () => {
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
                    <a href="${rutaBase}glosario.html" style="color: #9b804e; font-weight: bold;">Glosario Maestro</a>
                    <a href="${rutaBase}carta-abierta.html" style="color: #9b804e;">Carta Abierta</a>
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
                    <a href="${rutaBase}bibliografia.html" style="color: #777;">Bibliografía</a>
                </div>
            </div>
            <button id="abrir-menu" class="btn-abrir">☰ ÍNDICE</button>
        `;
        document.body.insertAdjacentHTML('afterbegin', menuHTML);

        const hGlobal = document.getElementById('header-global');
        const fGlobal = document.getElementById('footer-global');
        if (hGlobal) hGlobal.innerHTML = `<header style="background-color:#151515; padding:70px 20px; text-align:center; border-bottom:1px solid #9b804e;"><h1 style="font-family:'Cormorant Garamond',serif; color:#fff; font-size:3rem; letter-spacing:8px; margin:0;">S T F</h1><p style="font-family:'Montserrat',sans-serif; color:#888; font-size:0.7rem; letter-spacing:5px; text-transform:uppercase; margin-top:15px;">Sistema Teológico Personal</p></header>`;
        if (fGlobal) fGlobal.innerHTML = `<footer style="text-align:center; padding:50px 20px; margin-top:auto;"><p style="font-family:'Montserrat',sans-serif; font-size:0.75rem; color:#777; letter-spacing:2px; text-transform:uppercase; margin-bottom:5px;">Roberto Formigo</p><p style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:1.2rem; color:#9b804e; margin:0;">Soli Deo Gloria</p></footer>`;
    };

    // --- 6. GEMAS DE SABIDURÍA ---
    const inyectarGemaSabiduria = () => {
        const gemas = [
            { texto: "La esencia de la fe es la seguridad; la esencia de la incredulidad es dudar.", autor: "Charles Spurgeon" },
            { texto: "Nos hiciste, Señor, para ti, y nuestro corazón está inquieto hasta que descanse en ti.", autor: "Agustín de Hipona" },
            { texto: "Dios es más glorificado en nosotros cuando estamos más satisfechos en Él.", autor: "John Piper" },
            { texto: "La Biblia no es solo un libro para ser leído, sino un libro para ser vivido.", autor: "R.C. Sproul" },
            { texto: "Un hombre con Dios siempre es la mayoría.", autor: "John Knox" }
        ];
        const gema = gemas[Math.floor(Math.random() * gemas.length)];
        const div = document.createElement('div');
        div.style.cssText = "max-width:600px; margin:60px auto; padding:30px; text-align:center; border-top:1px double #9b804e; border-bottom:1px double #9b804e; opacity:0; transition:opacity 2s;";
        div.innerHTML = `<p style="font-family:'Cormorant Garamond'; font-style:italic; font-size:1.4rem; color:#777;">"${gema.texto}"</p><p style="font-family:'Montserrat'; font-size:0.7rem; color:#9b804e; letter-spacing:3px;">— ${gema.autor} —</p>`;
        const footer = document.getElementById('footer-global');
        if (footer) {
            footer.parentNode.insertBefore(div, footer);
            const obs = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) { div.style.opacity = "1"; obs.disconnect(); } }, { threshold: 0.1 });
            obs.observe(div);
        }
    };

    // --- 7. CITAS, MARCADOR Y ACCESIBILIDAD ---
    const inicializarUtilidades = () => {
        // Citas automáticas
        document.addEventListener('copy', (e) => {
            const s = window.getSelection();
            if (s.toString().length < 50) return;
            const cita = `\n\n---\nFuente: "${document.title}"\nAutor: Roberto Formigo\nCorpus: Sistema Teológico Formigo\n"Soli Deo Gloria"`;
            e.clipboardData.setData('text/plain', s.toString() + cita);
            e.preventDefault();
        });

        // Marcador de lectura
        const id = window.location.pathname;
        const pos = localStorage.getItem(`scroll-pos-${id}`);
        window.addEventListener('scroll', () => { if (window.scrollY > 500) localStorage.setItem(`scroll-pos-${id}`, window.scrollY); });
        if (pos && pos > 500) {
            const t = document.createElement('div');
            t.style.cssText = "position:fixed; bottom:20px; right:20px; background:#1a1a1a; color:#fff; border:1px solid #9b804e; padding:15px; z-index:10002; font-family:'Montserrat'; font-size:0.7rem;";
            t.innerHTML = `LECTURA PENDIENTE<br><button id='retomar' style='background:#9b804e; border:none; color:#fff; margin-top:10px; cursor:pointer; padding:5px 10px;'>RETOMAR</button>`;
            document.body.appendChild(t);
            document.getElementById('retomar').onclick = () => { window.scrollTo({top: parseInt(pos), behavior:'smooth'}); t.remove(); };
            setTimeout(() => t.remove(), 12000);
        }

        // Accesibilidad (Alto Contraste)
        const btnAcc = document.createElement('button');
        btnAcc.innerHTML = '◐';
        btnAcc.style.cssText = "position:fixed; bottom:20px; left:20px; z-index:9999; width:45px; height:45px; border-radius:50%; background:#9b804e; color:#fff; border:none; cursor:pointer; font-size:20px;";
        document.body.appendChild(btnAcc);
        if (localStorage.getItem('stf-contraste') === 'activo') document.body.classList.add('alto-contraste');
        btnAcc.onclick = () => {
            document.body.classList.toggle('alto-contraste');
            localStorage.setItem('stf-contraste', document.body.classList.contains('alto-contraste') ? 'activo' : 'inactivo');
        };
    };

    // --- 8. CONTROL DEL MENÚ LATERAL ---
    const inicializarMenu = () => {
        const btnAbrir = document.getElementById('abrir-menu');
        const btnCerrar = document.getElementById('cerrar-menu');
        const panel = document.getElementById('menu-lateral');
        if(!btnAbrir || !panel) return;

        btnAbrir.onclick = (e) => { e.stopPropagation(); panel.style.right = '0'; };
        btnCerrar.onclick = () => { panel.style.right = '-400px'; };
        document.addEventListener('click', (e) => { if (!panel.contains(e.target) && e.target !== btnAbrir) panel.style.right = '-400px'; });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) btnAbrir.style.opacity = "0.8";
            else btnAbrir.style.opacity = "1";
        });
    };

    // --- EJECUCIÓN ---
    setupVisuals();
    crearBarraProgreso();
    inicializarDiccionarioPropio();
    generarPaginaGlosario();
    inyectarGemaSabiduria();
    inicializarUtilidades();
    inicializarMenu();
});
