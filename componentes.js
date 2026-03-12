document.addEventListener("DOMContentLoaded", function() {

    // --- 0. CONFIGURACIÓN DE RUTAS Y CONTEXTO ---
    const head = document.head;
    const esEstudio = window.location.pathname.includes('/estudios/');
    const rutaBase = esEstudio ? '../' : './';

    // --- 1. BASE DE DATOS DOCTRINAL (DICCIONARIO MAESTRO) ---
    const diccionarioSTF = {
        "inerrancia": "La convicción de que las Escrituras, en sus documentos originales, están libres de error en todo lo que afirman.",
        "infalibilidad": "La incapacidad de la Biblia para fallar en su propósito de revelar la verdad salvadora de Dios.",
        "sola scriptura": "Principio reformado que establece la Biblia como la única autoridad final e infalible para la fe.",
        "canon": "La colección cerrada de 66 libros inspirados que constituyen la regla de fe del creyente.",
        "iluminación": "La obra del Espíritu Santo que permite al lector comprender y aplicar la verdad espiritual de la Biblia.",
        "revelación": "El acto de Dios de comunicarse a la humanidad, ya sea de forma general (creación) o especial (Escrituras).",
        "inspiración": "La influencia sobrenatural del Espíritu Santo sobre los autores bíblicos para que escribieran exactamente lo que Dios quería.",
        "hermenéutica": "La ciencia y el arte de interpretar correctamente el significado de los textos bíblicos.",
        "soberanía": "El gobierno absoluto de Dios sobre toda la creación, ejecutando Su voluntad eterna sin impedimentos.",
        "providencia": "El cuidado continuo por el cual Dios sostiene, dirige y gobierna todas las criaturas y eventos.",
        "omnisciencia": "Atributo por el cual Dios posee conocimiento perfecto y total de todas las cosas: pasadas, presentes, futuras y posibles.",
        "omnipotencia": "El poder ilimitado de Dios para realizar todo lo que es conforme a Su carácter santo.",
        "omnipresencia": "La presencia total de Dios en todo lugar y tiempo con toda Su plenitud.",
        "aseidad": "La cualidad de Dios de existir por Sí mismo, sin depender de ninguna causa externa.",
        "trinidad": "Un solo Dios en tres personas distintas, coeternas y consustanciales: Padre, Hijo y Espíritu Santo.",
        "inmutabilidad": "La perfección de Dios por la cual Él no cambia en Su ser, propósitos o promesas.",
        "santidad": "La separación absoluta de Dios de toda maldad y Su pureza infinita que lo distingue de todo lo creado.",
        "trascendencia": "La existencia de Dios por encima y más allá de los límites del universo creado.",
        "inmanencia": "La presencia y participación activa de Dios dentro de Su creación sin mezclarse con ella.",
        "encarnación": "El acto por el cual el Hijo eterno de Dios asumió una naturaleza humana completa sin dejar de ser Dios.",
        "unión hipostática": "La unión misteriosa de las naturalezas divina y humana en la única persona de Jesucristo.",
        "pneumatología": "El estudio teológico de la persona y la obra del Espíritu Santo.",
        "paráclito": "Término para el Espíritu Santo como Consolador, Abogado o Ayudador enviado por el Padre.",
        "cristocentrismo": "El enfoque teológico que coloca a Jesucristo como el centro de toda la revelación y la historia.",
        "depravación": "La corrupción radical del hombre tras la caída, afectando su voluntad, mente y corazón.",
        "imago dei": "La condición del ser humano creado a 'imagen de Dios', dotado de capacidades morales y espirituales.",
        "caída": "La desobediencia histórica de Adán que introdujo el pecado y la muerte en la experiencia humana.",
        "concupiscencia": "La inclinación desordenada y persistentente hacia el pecado en la naturaleza humana caída.",
        "pecado": "Cualquier falta de conformidad con la ley de Dios o la transgresión de la misma.",
        "justificación": "Acto judicial donde Dios declara justo al pecador sobre la base de la fe en la justicia de Cristo.",
        "gracia": "El favor inmerecido de Dios; Su amor activo hacia quienes solo merecen Su juicio.",
        "redención": "El rescate del pecador de la esclavitud del pecado mediante el pago del sacrificio de Cristo.",
        "propiciación": "El sacrificio de Cristo que satisface la justicia de Dios y aplaca Su ira contra el pecado.",
        "expiación": "La obra de Cristo en la cruz para cubrir el pecado y reconciliar al hombre con Dios.",
        "regeneración": "El acto soberano del Espíritu Santo que imparte nueva vida espiritual al corazón del hombre (nuevo nacimiento).",
        "adopción": "El acto de gracia por el cual Dios recibe al creyente como hijo legítimo en Su familia celestial.",
        "santificación": "El proceso progresivo de crecimiento en santidad por el cual el creyente es conformado a Cristo.",
        "imputación": "El acto legal donde la justicia de Cristo es acreditada a la cuenta del creyente.",
        "escatología": "El estudio teológico de las últimas cosas: el fin del tiempo, el juicio y la eternidad.",
        "parusía": "El término técnico para la segunda venida gloriosa de Jesucristo al final de la historia.",
        "exégesis": "La extracción objetiva del sentido original de un texto bíblico.",
        "soli deo gloria": "El principio de que todo el propósito de la existencia es la gloria de Dios.",
        "eclesiología": "El estudio de la naturaleza, misión y estructura de la Iglesia como cuerpo de Cristo."
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

    // --- 4. GENERADOR DE PÁGINA GLOSARIO ---
    const generarPaginaGlosario = () => {
        const contenedor = document.getElementById('glosario-dinamico');
        const nav = document.getElementById('alfabeto-nav');
        if (!contenedor) return;

        contenedor.innerHTML = ""; 
        if(nav) nav.innerHTML = "";

        const ordenados = Object.keys(diccionarioSTF).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
        let letras = new Set();

        ordenados.forEach(term => {
            const L = term[0].toUpperCase();
            if (!letras.has(L)) {
                letras.add(L);
                contenedor.innerHTML += `<h2 id="letra-${L}" style="color:#9b804e; border-bottom:1px solid #333; margin-top:50px; font-family:'Cormorant Garamond'; font-size:2.5rem;">${L}</h2>`;
                if(nav) {
                    const a = document.createElement('a');
                    a.href = `#letra-${L}`; a.innerText = L;
                    a.style.cssText = "margin:0 10px; text-decoration:none; color:#9b804e; font-family:'Montserrat'; font-weight:bold;";
                    nav.appendChild(a);
                }
            }
            contenedor.innerHTML += `
                <div style="margin:25px 0; padding-left:20px; border-left:2px solid #9b804e; text-align:left;">
                    <h3 style="text-transform:capitalize; color:#fff; font-family:'Montserrat'; font-size:1.1rem; margin-bottom:5px;">${term}</h3>
                    <p style="font-family:'Cormorant Garamond'; font-style:italic; font-size:1.2rem; color:#aaa; margin:0;">${diccionarioSTF[term]}</p>
                </div>`;
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
