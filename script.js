// ==========================================================================
// 1. ANIMACIÓN DE NODOS EN CANVAS (FONDO INTERACTIVO)
// ==========================================================================
const canvas = document.getElementById('network-canvas');

if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const nodes = [];
    const nodeCount = 65;

    class Node {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.1;
            this.vy = (Math.random() - 0.5) * 1.1;
            this.radius = Math.random() * 2 + 1.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#00a8cc';
            ctx.fill();
        }
    }

    for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        nodes.forEach((node) => {
            node.update();
            node.draw();
        });

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(0, 168, 204, ${1 - distance / 120})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ==========================================================================
// 2. SISTEMA CENTRALIZADO DE MODALES, SUBMENÚS Y CARRUSELES (ACTUALIZADO)
// ==========================================================================

const sliderIntervals = {};

/**
 * Quita el foco táctil en celulares y oculta los menús desplegables de las tarjetas.
 */
function closeAllDropdowns() {
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
    }

    const dropdowns = document.querySelectorAll('.card-dropdown-menu');
    dropdowns.forEach((menu) => {
        menu.classList.add('dropdown-force-closed');
    });
}

/**
 * Control genérico de carruseles de imágenes
 */
function initSlider(sliderId, slideClass, dotClass, intervalTime = 3500) {
    stopSlider(sliderId);

    const slides = document.querySelectorAll(`.${toggleClassClean(slideClass)}`);
    const dots = document.querySelectorAll(`.${toggleClassClean(dotClass)}`);

    if (!slides.length) return;

    let currentIndex = 0;

    slides.forEach((slide, idx) => slide.classList.toggle('active', idx === 0));
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === 0));

    sliderIntervals[sliderId] = setInterval(() => {
        slides[currentIndex].classList.remove('active');
        if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

        currentIndex = (currentIndex + 1) % slides.length;

        slides[currentIndex].classList.add('active');
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }, intervalTime);
}

function stopSlider(sliderId) {
    if (sliderIntervals[sliderId]) {
        clearInterval(sliderIntervals[sliderId]);
        delete sliderIntervals[sliderId];
    }
}

function toggleClassClean(className) {
    return className.startsWith('.') ? className.substring(1) : className;
}

/**
 * Abre cualquier modal y registra el estado en el historial del celular.
 */
function openModalBase(modalId, onOpenCallback = null) {
    // 1. Cierra submenús flotantes activos
    closeAllDropdowns();

    const modal = document.getElementById(modalId);
    if (!modal) return;

    // 2. Registra la apertura en el historial para capturar el botón 'Atrás'
    if (!modal.classList.contains('show')) {
        history.pushState({ level: 'mainModal', modalId: modalId }, '');
    }

    // 3. Muestra la ventana modal
    modal.classList.add('show');
    modal.style.display = 'flex';

    // 4. Reinicia el scroll vertical a la parte superior (0)
    const modalContent = modal.querySelector('.modal-content') || modal;
    if (modalContent) modalContent.scrollTop = 0;

    if (onOpenCallback) onOpenCallback();
}

/**
 * Cierra cualquier modal y asegura ocultar submenús.
 */
function closeModalBase(modalId, onCloseCallback = null) {
    closeAllDropdowns();

    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('show');
    modal.style.display = 'none';

    if (onCloseCallback) onCloseCallback();
}

// ==========================================================================
// 3. FUNCIONES DE MODALES DE SERVICIOS
// ==========================================================================

function openSolarModal() {
    openModalBase('solar-modal', () => initSlider('solar', 'slider-img', 'dot', 3000));
}
function closeSolarModal() {
    closeModalBase('solar-modal', () => stopSlider('solar'));
}

function openResidentialModal() {
    openModalBase('residential-modal', () => initSlider('residential', 'res-slider-img', 'res-dot', 3000));
}
function closeResidentialModal() {
    closeModalBase('residential-modal', () => stopSlider('residential'));
}

function openEcoparkingModal() {
    openModalBase('ecoparking-modal', () => initSlider('ecoparking', 'eco-slider-img', 'eco-dot', 3000));
}
function closeEcoparkingModal() {
    closeModalBase('ecoparking-modal', () => stopSlider('ecoparking'));
}

function openLuminariasModal() {
    openModalBase('luminarias-modal', () => initSlider('luminarias', 'lum-slider-img', 'lum-dot', 3000));
}
function closeLuminariasModal() {
    closeModalBase('luminarias-modal', () => stopSlider('luminarias'));
}

function openFarmsModal() {
    openModalBase('farms-modal', () => initSlider('farms', 'farms-slider-img', 'farms-dot', 4000));
}
function closeFarmsModal() {
    closeModalBase('farms-modal', () => stopSlider('farms'));
}

function openElectromovilidadModal() {
    openModalBase('electromovilidad-modal', () => initSlider('electro', 'electro-slider-img', 'electro-dot', 3500));
}
function closeElectromovilidadModal() {
    closeModalBase('electromovilidad-modal', () => stopSlider('electro'));
}

function openIngenieriaModal() {
    openModalBase('ingenieria-modal', () => initSlider('ingenieria', 'ing-slider-img', 'ing-dot', 3500));
}
function closeIngenieriaModal() {
    closeModalBase('ingenieria-modal', () => stopSlider('ingenieria'));
}

function openEficienciaModal() {
    openModalBase('eficiencia-modal', () => initSlider('eficiencia', 'eficiencia-slider-img', 'eficiencia-dot', 3500));
}
function closeEficienciaModal() {
    closeModalBase('eficiencia-modal', () => stopSlider('eficiencia'));
}

function openDomoticaModal() {
    openModalBase('domotica-modal', () => initSlider('domotica', 'domotica-slider-img', 'domotica-dot', 3500));
}
function closeDomoticaModal() {
    closeModalBase('domotica-modal', () => stopSlider('domotica'));
}

function openSeguridadModal() {
    openModalBase('seguridad-modal', () => initSlider('seguridad', 'seguridad-slider-img', 'seguridad-dot', 3500));
}
function closeSeguridadModal() {
    closeModalBase('seguridad-modal', () => stopSlider('seguridad'));
}

function openConsultoriaModal() {
    openModalBase('consultoria-modal', () => initSlider('consultoria', 'consultoria-slider-img', 'consultoria-dot', 3500));
}
function closeConsultoriaModal() {
    closeModalBase('consultoria-modal', () => stopSlider('consultoria'));
}

// ==========================================================================
// 4. MODAL NOSOTROS (CON HISTORIAL Y SCROLL REINICIADO)
// ==========================================================================

function openNosotrosModal() {
    const modal = document.getElementById('nosotros-modal');
    if (modal) {
        openModalBase('nosotros-modal');

        // Registro de Nivel 1 en el historial
        history.pushState({ level: 'mainModal', modalId: 'nosotros-modal' }, '');

        // Reinicio de scroll a la parte superior
        const modalContent = modal.querySelector('.modal-content') || modal;
        modalContent.scrollTop = 0;
    }
}

function closeNosotrosModal() {
    closeModalBase('nosotros-modal');
}

// ==========================================================================
// 5. SUB-MODAL DE CASOS DE ÉXITO ("VER PROYECTO")
// ==========================================================================

const caseStudiesData = {
    1: {
        title: "Sistema Solar On-Grid · 6 kW",
        project: "Instalación fotovoltaica residencial",
        year: "2025",
        solution: "Diseño e instalación de un sistema fotovoltaico On-Grid de 6 kW para una vivienda, orientado al aprovechamiento de la energía solar y a una generación energética eficiente.",
        images: ["images/solar_1.jpg", "images/solar_2.jpg", "images/solar_3.jpg"],
        components: ["Sistema fotovoltaico On-Grid", "Capacidad instalada: 6 kW", "Aplicación residencial"]
    },
    2: {
        title: "Infraestructura de Electromovilidad",
        project: "Instalación de 2 cargadores eléctricos — UNAD Cúcuta",
        year: "Mayo 2025",
        solution: "Implementación de infraestructura para movilidad eléctrica mediante la instalación de 2 cargadores eléctricos vehiculares en la sede de la UNAD Cúcuta.",
        images: ["images/unad_cargador_1.jpg", "images/unad_cargador_2.jpg", "images/unad_cargador_3.jpg"],
        components: ["2 cargadores eléctricos vehiculares", "Sede UNAD Cúcuta", "Integración con red existente"]
    },
    3: {
        title: "Sistema de Videovigilancia · Trituradora La Rica",
        project: "32 canales análogos + 2 cámaras IP mediante fibra óptica",
        year: "2014–2016",
        solution: "Implementación de un sistema de videovigilancia compuesto por 32 canales análogos y 2 cámaras IP, utilizando fibra óptica para la transmisión de señal Full HD.",
        images: ["images/cctv_1.jpg", "images/cctv_2.jpg", "images/cctv_3.jpg"],
        components: ["32 canales análogos", "2 cámaras IP", "Enlace por fibra óptica", "Cobertura de 1 hectárea"]
    }
};

let currentCaseSlide = 0;
let currentCaseImages = [];

function openCaseStudy(id) {
    const data = caseStudiesData[id];
    if (!data) return;

    currentCaseImages = data.images;
    currentCaseSlide = 0;

    const contentHtml = `
        <h2 style="color: #00a8cc; margin-bottom: 8px;">${data.title}</h2>
        <p style="color: #cbd5e1; font-size: 0.9rem;"><strong>Proyecto:</strong> ${data.project} | <strong>Año:</strong> ${data.year}</p>
        <hr style="border-color: rgba(0,168,204,0.2); margin: 15px 0;">

        <h3 style="color: #ffffff; font-size: 1.1rem; margin-bottom: 8px;">Solución Implementada</h3>
        <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.6;">${data.solution}</p>

        <div class="case-carousel-wrapper">
            <button class="case-carousel-btn prev-btn" onclick="changeCaseSlide(-1)">&#10094;</button>
            <div class="case-carousel-slide">
                <img id="case-carousel-img" src="${data.images[0]}" alt="${data.title}">
            </div>
            <button class="case-carousel-btn next-btn" onclick="changeCaseSlide(1)">&#10095;</button>

            <div class="case-carousel-dots" id="case-carousel-dots">
                ${data.images.map((_, i) => `<span class="case-dot ${i === 0 ? 'active' : ''}" onclick="goToCaseSlide(${i})"></span>`).join('')}
            </div>
        </div>

        <h3 style="color: #ffffff; font-size: 1.1rem; margin-bottom: 8px; margin-top: 20px;">Componentes del Proyecto</h3>
        <ul style="color: #cbd5e1; font-size: 0.9rem; padding-left: 20px;">
            ${data.components.map(c => `<li style="margin-bottom: 6px;">${c}</li>`).join('')}
        </ul>
    `;

    const container = document.getElementById('case-study-content');
    if (container) container.innerHTML = contentHtml;

    openModalBase('case-study-modal');

    // Registro de Nivel 2 en el historial
    history.pushState({ level: 'subModal', type: 'casestudy' }, '');
}

function changeCaseSlide(direction) {
    if (!currentCaseImages.length) return;
    currentCaseSlide = (currentCaseSlide + direction + currentCaseImages.length) % currentCaseImages.length;
    updateCaseCarouselUI();
}

function goToCaseSlide(index) {
    currentCaseSlide = index;
    updateCaseCarouselUI();
}

function updateCaseCarouselUI() {
    const imgElem = document.getElementById('case-carousel-img');
    if (imgElem) imgElem.src = currentCaseImages[currentCaseSlide];

    const dots = document.querySelectorAll('.case-dot');
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentCaseSlide));
}

function closeCaseStudy() {
    closeModalBase('case-study-modal');
}

// ==========================================================================
// 6. REPRODUCTOR DE VIDEO FULLSCREEN
// ==========================================================================

function openVideoFullscreen() {
    const modal = document.getElementById('video-fullscreen-modal');
    const player = document.getElementById('player-fullscreen');

    if (modal && player) {
        modal.classList.add('active');
        player.load();
        player.currentTime = 0;

        // Registro de Nivel 2 en el historial
        history.pushState({ level: 'subModal', type: 'video' }, '');

        const playPromise = player.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                player.muted = true;
                player.play();
            });
        }
    }
}

function closeVideoFullscreen() {
    const modal = document.getElementById('video-fullscreen-modal');
    const player = document.getElementById('player-fullscreen');

    if (modal && player) {
        player.pause();
        player.currentTime = 0;
        modal.classList.remove('active');
    }
}

// ==========================================================================
// 7. EVENTOS GLOBALES DE NAVEGACIÓN Y REACTIVACIÓN DE SUBMENÚS
// ==========================================================================

/**
 * Cierra capas por niveles (Submodal -> Modal Principal -> Inicio)
 */
function handleBackNavigation() {
    closeAllDropdowns();

    const videoModal = document.getElementById('video-fullscreen-modal');
    const caseModal = document.getElementById('case-study-modal');

    // Nivel 2: Cierra el video si está activo y mantiene "Nosotros"
    if (videoModal && videoModal.classList.contains('active')) {
        closeVideoFullscreen();
        return;
    }

    // Nivel 2: Cierra el proyecto si está abierto y mantiene "Nosotros"
    if (caseModal && caseModal.classList.contains('show')) {
        closeCaseStudy();
        return;
    }

    // Nivel 1: Cierra modales principales
    const openModals = document.querySelectorAll('.modal.show');
    openModals.forEach((modal) => {
        modal.classList.remove('show');
        modal.style.display = 'none';
    });

    if (typeof sliderIntervals !== 'undefined') {
        Object.keys(sliderIntervals).forEach(id => stopSlider(id));
    }
}

// A) Clic fuera del contenido de la tarjeta para cerrar
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        const activeModalId = e.target.id;
        closeModalBase(activeModalId, () => {
            Object.keys(sliderIntervals).forEach(id => stopSlider(id));
        });
    }
});

// B) Control de navegación "Atrás" en Celulares/Tablets
window.addEventListener('popstate', () => {
    handleBackNavigation();
});

// C) Control de la tecla 'Escape' (Esc) en Computadores
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        handleBackNavigation();
    }
});

// D) Reactiva los submenús únicamente al volver a tocar o pasar el cursor por la tarjeta
document.addEventListener('DOMContentLoaded', () => {
    const dropdownWrappers = document.querySelectorAll('.card-dropdown-wrapper, .card-with-dropdown, .card, .card-servicio');

    dropdownWrappers.forEach((wrapper) => {
        const resetDropdown = () => {
            const menu = wrapper.querySelector('.card-dropdown-menu');
            if (menu) {
                menu.classList.remove('dropdown-force-closed');
            }
        };

        wrapper.addEventListener('touchstart', resetDropdown, { passive: true });
        wrapper.addEventListener('mouseenter', resetDropdown);
    });
});