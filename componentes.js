document.addEventListener("DOMContentLoaded", function() {

    // --- 0. CONFIGURACIÓN DE RUTAS Y CONTEXTO ---
    const head = document.head;
    const esEstudio = window.location.pathname.includes('/estudios/');
    const rutaBase = esEstudio ? '../' : './';

    // --- 1. BASE DE DATOS DOCTRINAL (DICCIONARIO MAESTRO) ---
    const diccionarioSTF = {
        "Abba": "Término arameo que denota una intimidad profunda y filial con Dios Padre, expresando confianza y seguridad.",
        "Adopción": "Acto de gracia por el cual Dios recibe al creyente como hijo legítimo en Su familia celestial.",
        "Amilenialismo": "Postura escatológica que interpreta el 'milenio' de Apocalipsis como el reinado espiritual actual de Cristo desde Su ascensión.",
        "Analogía de la Fe": "Principio hermenéutico que establece que los pasajes oscuros de la Biblia deben interpretarse a la luz de los claros.",
        "Antropomorfismo": "Uso de lenguaje humano para describir atributos o acciones de Dios para nuestra comprensión limitada.",
        "Apologética": "La disciplina de defender la fe cristiana mediante la razón, la evidencia histórica y la coherencia lógica.",
        "Apostasia": "El abandono deliberado de la fe profesada o la rebelión contra la verdad revelada.",
        "Aseidad": "Atributo divino por el cual Dios tiene vida en sí mismo y es totalmente independiente de Su creación.",
        "Atributos Comunicables": "Perfecciones de Dios que pueden ser reflejadas de forma limitada en los seres humanos (amor, justicia, sabiduría).",
        "Atributos Incomunicables": "Perfecciones de Dios que pertenecen solo a Su esencia divina (omnipresencia, eternidad, inmutabilidad).",
        "Bibliología": "El estudio sistemático de las Escrituras, su inspiración, inerrancia, autoridad y suficiencia.",
        "Bienaventuranza": "El estado de felicidad suprema y paz que proviene de estar en una relación correcta con Dios.",
        "Canon": "La colección cerrada de los 66 libros inspirados que constituyen la única regla de fe y conducta.",
        "Cristocentrismo": "Enfoque teológico que coloca a Jesucristo como el centro y cumplimiento de toda la revelación divina.",
        "Concupiscencia": "La inclinación desordenada hacia el pecado que permanece en la naturaleza humana tras la caída.",
        "Consustancial": "Término teológico que afirma que el Padre, el Hijo y el Espíritu Santo son de la misma esencia o sustancia.",
        "Cosmovisión": "El marco de creencias a través del cual una persona interpreta la realidad y el mundo.",
        "Deísmo": "Creencia en un Dios creador que no interviene en el mundo ni se revela de forma especial.",
        "Depravación Radical": "La corrupción total del hombre que afecta su voluntad, mente y corazón, incapacitándolo para buscar a Dios.",
        "Doxología": "Expresión de alabanza a la gloria de Dios como el fin supremo de toda teología y existencia.",
        "Eclesiología": "La rama de la teología que estudia la naturaleza, misión, orden y ordenanzas de la Iglesia.",
        "Eficacia de la Gracia": "La doctrina de que el Espíritu Santo aplica la salvación de tal manera que el pecador responde voluntariamente al llamado.",
        "Elección": "El acto soberano de Dios de escoger a ciertos individuos para salvación antes de la fundación del mundo.",
        "Encarnación": "El misterio por el cual el Hijo eterno de Dios asumió una naturaleza humana completa en la persona de Jesús.",
        "Escatología": "El estudio de las últimas cosas: la parusía, el juicio final, la resurrección y el estado eterno.",
        "Exégesis": "La extracción objetiva del significado original de un texto bíblico mediante un análisis gramatical e histórico.",
        "Ex Nihilo": "Concepto latino que significa 'de la nada', refiriéndose al acto creativo de Dios sin materiales preexistentes.",
        "Expiación": "La obra de Cristo en la cruz para cubrir el pecado y satisfacer las demandas de la justicia divina.",
        "Fe Salvadora": "Confianza personal en la obra de Cristo, producida por el Espíritu Santo, que resulta en la justificación.",
        "Fideísmo": "La postura errónea que sostiene que la fe es independiente o contraria a la razón.",
        "General, Revelación": "El conocimiento de Dios disponible para todos los hombres a través de la creación y la conciencia.",
        "Glorificación": "La etapa final de la redención donde el creyente es liberado de la presencia misma del pecado en la eternidad.",
        "Gracia Común": "El favor de Dios hacia toda la humanidad que refrena el mal y permite el orden social y la bondad relativa.",
        "Hermenéutica": "La ciencia y el arte de interpretar correctamente el mensaje y la aplicación de las Escrituras.",
        "Hipóstasis": "Término técnico para referirse a la 'persona' en el contexto de la Trinidad y la Unión Hipostática.",
        "Iluminación": "La obra del Espíritu Santo que permite al creyente comprender y aplicar la verdad espiritual de la Biblia.",
        "Imago Dei": "La condición del hombre creado a imagen y semejanza de Dios, poseyendo dignidad y capacidad moral.",
        "Impeccabilidad": "La doctrina de que Jesucristo, debido a Su naturaleza divina, no podía pecar.",
        "Imputación": "Acto legal donde la justicia de Cristo es acreditada a la cuenta del pecador creyente.",
        "Inerrancia": "La convicción de que las Escrituras, en sus autógrafos originales, están libres de todo error.",
        "Infalibilidad": "La propiedad de la Biblia de no fallar en sus promesas ni errar en sus enseñanzas de fe.",
        "Inmanencia": "La presencia activa y el sustento de Dios dentro de Su creación.",
        "Inmutabilidad": "El atributo divino por el cual Dios no cambia en Su ser, perfecciones, propósitos o promesas.",
        "Inspiración": "La influencia sobrenatural del Espíritu Santo sobre los autores bíblicos para registrar la revelación de Dios.",
        "Ira de Dios": "La respuesta santa y justa de Dios contra el pecado y la injusticia.",
        "Justificación": "Declaración judicial de Dios por la cual el pecador es visto como justo solo por la fe en Cristo.",
        "Kenosis": "El acto del Hijo de Dios de despojarse de la manifestación externa de Su gloria al asumir la forma de siervo.",
        "Legalismo": "El error de intentar ganar el favor de Dios o la santidad mediante el cumplimiento mecánico de reglas.",
        "Logos": "Término griego para 'Palabra' o 'Razón', usado para describir la deidad y preexistencia de Cristo.",
        "Mediador": "Oficio de Jesucristo como el único puente entre Dios y los hombres para la reconciliación.",
        "Monergismo": "La doctrina de que la regeneración es una obra exclusiva de Dios sin la cooperación del hombre.",
        "Omnipotencia": "El poder ilimitado de Dios para hacer todo lo que sea consistente con Su carácter santo.",
        "Omnipresencia": "La presencia total de Dios en todo lugar y en todo momento con Su plenitud.",
        "Omnisciencia": "La perfección de Dios por la cual Él conoce todas las cosas reales y posibles de manera inmediata.",
        "Ordo Salutis": "El 'orden de la salvación', la secuencia lógica de los actos de la gracia de Dios en el individuo.",
        "Paráclito": "Título del Espíritu Santo que significa Consolador, Abogado o Ayudador.",
        "Parusía": "Término que designa la segunda venida gloriosa de Jesucristo al final de los tiempos.",
        "Pecado Original": "La condición de culpa y corrupción heredada de Adán por toda la humanidad.",
        "Perseverancia": "La doctrina de que aquellos que son verdaderamente renacidos serán guardados por el poder de Dios hasta el fin.",
        "Pneumatología": "La rama de la teología que estudia la persona, deidad y obra del Espíritu Santo.",
        "Propiciación": "El aspecto del sacrificio de Cristo que aplaca la ira santa de Dios contra el pecado.",
        "Providencia": "El cuidado continuo y el gobierno soberano de Dios sobre todos los eventos y criaturas.",
        "Quididad": "La esencia de lo que algo es; en teología, se usa para discutir la naturaleza de los atributos divinos.",
        "Redención": "El rescate del pecador de la esclavitud del pecado y la muerte mediante el pago de la sangre de Cristo.",
        "Regeneración": "El nuevo nacimiento obrado por el Espíritu Santo que imparte vida espiritual al muerto en pecados.",
        "Santificación": "El proceso progresivo de ser apartado del pecado y conformado a la imagen de Cristo.",
        "Soberanía": "El ejercicio del poder y la autoridad suprema de Dios sobre todo el universo.",
        "Sola Fide": "Principio reformado que afirma que la justificación es recibida únicamente por medio de la fe.",
        "Sola Gratia": "La salvación es un don gratuito de Dios, sin mérito alguno por parte del hombre.",
        "Sola Scriptura": "Principio que establece la Biblia como la única norma que norma (norma normans) la fe de la Iglesia.",
        "Soli Deo Gloria": "El fin supremo de todas las cosas es la gloria de Dios exclusivamente.",
        "Solus Christus": "Jesucristo es el único mediador y el único camino de salvación.",
        "Soteriología": "El estudio de la doctrina de la salvación.",
        "Teodicea": "La defensa de la bondad y justicia de Dios ante la existencia del mal.",
        "Teontología": "El estudio del ser, la existencia y los atributos de Dios en Sí mismo.",
        "Trascendencia": "La existencia de Dios por encima y más allá de las limitaciones del universo creado.",
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
        barra.style.cssText = "position:fixed; top:0; left:0; height:3px; background:#9b804e; z-index:11000; width:0%; transition: width 0.1s ease;";
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
                contenedor.innerHTML += `<div class="separador-seccion" id="letra-${L}" style="margin-top: 100px; margin-bottom: 50px;"><span>SECCIÓN ${L}</span></div>`;
                if(nav) {
                    const a = document.createElement('a');
                    a.href = `#letra-${L}`; a.innerText = L;
                    a.style.cssText = "margin:0 10px; text-decoration:none; color:#9b804e; font-family:'Montserrat'; font-weight:bold; font-size: 0.85rem; letter-spacing: 1px;";
                    nav.appendChild(a);
                }
            }
            contenedor.innerHTML += `
                <article class="entrada-glosario-maestra" style="margin-bottom: 45px; text-align: justify;">
                    <p style="font-size: 1.3rem; line-height: 1.7; border-left: 3px solid #9b804e; padding-left: 35px; font-family: 'Cormorant Garamond', serif; margin:0;">
                        <strong style="font-family: 'Montserrat', sans-serif; font-size: 0.8rem; color: #9b804e; display: block; margin-bottom: 12px; letter-spacing: 3px; font-weight: 500; text-transform: uppercase;">${term}</strong>
                        ${diccionarioSTF[term]}
                    </p>
                </article>`;
        });
    };

// --- 5. COMPONENTES VISUALES (SIN ESTILOS INLINE) ---
    const setupVisuals = () => {
        const menuHTML = `
            <div id="menu-fullscreen" class="menu-overlay">
                <div class="menu-card">
                    <button id="cerrar-menu" class="btn-cerrar-full">✕</button>
                    <p class="menu-label-top">Sistema Teológico Formigo</p>
                    <div class="nav-grid">
                        <div class="nav-col">
                            <span class="nav-group-title">Navegación</span>
                            <a href="${rutaBase}index.html" class="nav-link-full" data-path="index.html">Introducción</a>
                            <a href="${rutaBase}glosario.html" class="nav-link-full" data-path="glosario.html">Glosario</a>
                            <a href="${rutaBase}carta-abierta.html" class="nav-link-full" data-path="carta-abierta.html">Carta Abierta</a>
                            <a href="${rutaBase}bibliografia.html" class="nav-link-full" data-path="bibliografia.html">Bibliografía</a>
                        </div>
                        <div class="nav-col">
                            <span class="nav-group-title">Tratados I — X</span>
                            <a href="${rutaBase}estudios/como-nos-habla-dios.html" class="nav-link-full" data-path="como-nos-habla-dios.html">I. ¿Cómo nos habla Dios?</a>
                            <a href="${rutaBase}estudios/solo-la-biblia-basta.html" class="nav-link-full" data-path="solo-la-biblia-basta.html">II. Sólo la Biblia basta</a>
                            <a href="${rutaBase}estudios/la-armonia-de-los-evangelios.html" class="nav-link-full" data-path="la-armonia-de-los-evangelios.html">III. Armonía de los Evangelios</a>
                            <a href="${rutaBase}estudios/aprender-a-descansar.html" class="nav-link-full" data-path="aprender-a-descansar.html">IV. Aprender a descansar</a>
                            <a href="${rutaBase}estudios/conocer-para-amar.html" class="nav-link-full" data-path="conocer-para-amar.html">V. Conocer para amar</a>
                            <a href="${rutaBase}estudios/de-donde-viene-el-mal.html" class="nav-link-full" data-path="de-donde-viene-el-mal.html">VI. ¿De dónde viene el mal?</a>
                            <a href="${rutaBase}estudios/un-mundo-roto.html" class="nav-link-full" data-path="un-mundo-roto.html">VII. Un mundo roto</a>
                            <a href="${rutaBase}estudios/el-problema-del-pecado.html" class="nav-link-full" data-path="el-problema-del-pecado.html">VIII. El problema del pecado</a>
                            <a href="${rutaBase}estudios/nuestra-oscuridad.html" class="nav-link-full" data-path="nuestra-oscuridad.html">IX. Nuestra oscuridad</a>
                            <a href="${rutaBase}estudios/el-dios-justo-y-amoroso.html" class="nav-link-full" data-path="el-dios-justo-y-amoroso.html">X. El Dios justo y amoroso</a>
                        </div>
                        <div class="nav-col">
                            <span class="nav-group-title">Tratados XI — XXIII</span>
                            <a href="${rutaBase}estudios/volver-a-dios.html" class="nav-link-full" data-path="volver-a-dios.html">XI. Volver a Dios</a>
                            <a href="${rutaBase}estudios/ser-de-una-sola-pieza.html" class="nav-link-full" data-path="ser-de-una-sola-pieza.html">XII. Ser de una sola pieza</a>
                            <a href="${rutaBase}estudios/mi-amistad-con-dios.html" class="nav-link-full" data-path="mi-amistad-con-dios.html">XIII. Mi amistad con Dios</a>
                            <a href="${rutaBase}estudios/el-matrimonio-ideal.html" class="nav-link-full" data-path="el-matrimonio-ideal.html">XIV. El matrimonio ideal</a>
                            <a href="${rutaBase}estudios/libertad-de-las-cadenas.html" class="nav-link-full" data-path="libertad-de-las-cadenas.html">XV. Libertad de las cadenas</a>
                            <a href="${rutaBase}estudios/defendiendo-mi-fe.html" class="nav-link-full" data-path="defendiendo-mi-fe.html">XVI. Defendiendo mi fe</a>
                            <a href="${rutaBase}estudios/ciencia-y-fe.html" class="nav-link-full" data-path="ciencia-y-fe.html">XVII. Ciencia y fe</a>
                            <a href="${rutaBase}estudios/nuestro-dios-trino.html" class="nav-link-full" data-path="nuestro-dios-trino.html">XVIII. Nuestro Dios Trino</a>
                            <a href="${rutaBase}estudios/lo-que-esta-por-venir.html" class="nav-link-full" data-path="lo-que-esta-por-venir.html">XIX. Lo que está por venir</a>
                            <a href="${rutaBase}estudios/el-poder-del-espiritu.html" class="nav-link-full" data-path="el-poder-del-espiritu.html">XX. El poder del Espíritu</a>
                        </div>
                    </div>
                </div>
            </div>
            <button id="abrir-menu" class="btn-abrir-full">☰ ÍNDICE</button>
        `;
        document.body.insertAdjacentHTML('afterbegin', menuHTML);
        
        const pathActual = window.location.pathname.toLowerCase();
        document.querySelectorAll('.nav-link-full').forEach(link => {
            if (pathActual.includes(link.getAttribute('data-path').toLowerCase())) {
                link.classList.add('active-page');
            }
        });
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

    // --- 7. UTILIDADES ---
    const inicializarUtilidades = () => {
        document.addEventListener('copy', (e) => {
            const s = window.getSelection();
            if (s.toString().length < 50) return;
            const cita = `\n\n---\nFuente: "${document.title}"\nAutor: Roberto Formigo\nCorpus: Sistema Teológico Formigo\n"Soli Deo Gloria"`;
            e.clipboardData.setData('text/plain', s.toString() + cita);
            e.preventDefault();
        });

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
// --- 8. CONTROL DEL MENÚ (REPARADO Y ROBUSTO) ---
    const inicializarMenu = () => {
        const btnAbrir = document.getElementById('abrir-menu');
        const btnCerrar = document.getElementById('cerrar-menu');
        const overlay = document.getElementById('menu-fullscreen');

        // Verificación de seguridad
        if (!btnAbrir || !overlay) {
            console.error("No se encontraron los elementos del menú");
            return;
        }

        // Función Abrir
        btnAbrir.onclick = (e) => {
            e.preventDefault();
            overlay.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        };

        // Función Cerrar
        const cerrarMenu = () => {
            overlay.classList.remove('is-open');
            document.body.style.overflow = 'auto';
        };

        if (btnCerrar) btnCerrar.onclick = cerrarMenu;

        // Cerrar al hacer clic en cualquier enlace
        const links = overlay.querySelectorAll('.nav-link-full');
        links.forEach(link => {
            link.onclick = cerrarMenu;
        });

        // Cerrar si hacen clic fuera del recuadro (en el fondo oscuro)
        overlay.onclick = (e) => {
            if (e.target === overlay) cerrarMenu();
        };
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
