// ==========================================================================
// 1. ANIMACIÓN DE NODOS EN CANVAS (PROTEGIDA CONTRA ERRORES)
// ==========================================================================
const canvas = document.getElementById('network-canvas');

// Verificamos si el canvas existe antes de ejecutar la animación
if (canvas) {
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

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

        nodes.forEach(node => {
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
// 2. CONTROL DE MODAL 1: CUBIERTAS SOLARES
// ==========================================================================
let currentSlide = 0;
let slideInterval = null;

function openSolarModal() {
    const modal = document.getElementById('solar-modal');
    if (modal) modal.classList.add('show');

    const slides = document.querySelectorAll('.slider-img');
    const dots = document.querySelectorAll('.dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });

    currentSlide = 0;
    startSlider();
}

function closeSolarModal() {
    const modal = document.getElementById('solar-modal');
    if (modal) modal.classList.remove('show');
    stopSlider();
}

function startSlider() {
    stopSlider();
    const slides = document.querySelectorAll('.slider-img');
    const dots = document.querySelectorAll('.dot');

    slideInterval = setInterval(() => {
        if (!slides.length) return;
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }, 3000);
}

function stopSlider() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// ==========================================================================
// 3. CONTROL DE MODAL 2: TECHOS SOLARES RESIDENCIALES
// ==========================================================================
let resCurrentSlide = 0;
let resSlideInterval = null;

function openResidentialModal() {
    const modal = document.getElementById('residential-modal');
    if (modal) modal.classList.add('show');

    const slides = document.querySelectorAll('.res-slider-img');
    const dots = document.querySelectorAll('.res-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });

    resCurrentSlide = 0;
    startResSlider();
}

function closeResidentialModal() {
    const modal = document.getElementById('residential-modal');
    if (modal) modal.classList.remove('show');
    stopResSlider();
}

function startResSlider() {
    stopResSlider();
    const slides = document.querySelectorAll('.res-slider-img');
    const dots = document.querySelectorAll('.res-dot');

    resSlideInterval = setInterval(() => {
        if (!slides.length) return;
        slides[resCurrentSlide].classList.remove('active');
        if (dots[resCurrentSlide]) dots[resCurrentSlide].classList.remove('active');

        resCurrentSlide = (resCurrentSlide + 1) % slides.length;

        slides[resCurrentSlide].classList.add('active');
        if (dots[resCurrentSlide]) dots[resCurrentSlide].classList.add('active');
    }, 3000);
}

function stopResSlider() {
    if (resSlideInterval) {
        clearInterval(resSlideInterval);
        resSlideInterval = null;
    }
}

// ==========================================================================
// 4. CONTROL DE MODAL 3: ECOPARKING
// ==========================================================================
let ecoCurrentSlide = 0;
let ecoSlideInterval = null;

function openEcoparkingModal() {
    const modal = document.getElementById('ecoparking-modal');
    if (modal) modal.classList.add('show');

    const slides = document.querySelectorAll('.eco-slider-img');
    const dots = document.querySelectorAll('.eco-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });

    ecoCurrentSlide = 0;
    startEcoSlider();
}

function closeEcoparkingModal() {
    const modal = document.getElementById('ecoparking-modal');
    if (modal) modal.classList.remove('show');
    stopEcoSlider();
}

function startEcoSlider() {
    stopEcoSlider();
    const slides = document.querySelectorAll('.eco-slider-img');
    const dots = document.querySelectorAll('.eco-dot');

    ecoSlideInterval = setInterval(() => {
        if (!slides.length) return;
        slides[ecoCurrentSlide].classList.remove('active');
        if (dots[ecoCurrentSlide]) dots[ecoCurrentSlide].classList.remove('active');

        ecoCurrentSlide = (ecoCurrentSlide + 1) % slides.length;

        slides[ecoCurrentSlide].classList.add('active');
        if (dots[ecoCurrentSlide]) dots[ecoCurrentSlide].classList.add('active');
    }, 3000);
}

function stopEcoSlider() {
    if (ecoSlideInterval) {
        clearInterval(ecoSlideInterval);
        ecoSlideInterval = null;
    }
}

// ==========================================================================
// 5. CONTROL DE MODAL 4: LUMINARIAS SOLARES
// ==========================================================================
let lumCurrentSlide = 0;
let lumSlideInterval = null;

function openLuminariasModal() {
    const modal = document.getElementById('luminarias-modal');
    if (modal) modal.classList.add('show');

    const slides = document.querySelectorAll('.lum-slider-img');
    const dots = document.querySelectorAll('.lum-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });

    lumCurrentSlide = 0;
    startLumSlider();
}

function closeLuminariasModal() {
    const modal = document.getElementById('luminarias-modal');
    if (modal) modal.classList.remove('show');
    stopLumSlider();
}

function startLumSlider() {
    stopLumSlider();
    const slides = document.querySelectorAll('.lum-slider-img');
    const dots = document.querySelectorAll('.lum-dot');

    lumSlideInterval = setInterval(() => {
        if (!slides.length) return;
        slides[lumCurrentSlide].classList.remove('active');
        if (dots[lumCurrentSlide]) dots[lumCurrentSlide].classList.remove('active');

        lumCurrentSlide = (lumCurrentSlide + 1) % slides.length;

        slides[lumCurrentSlide].classList.add('active');
        if (dots[lumCurrentSlide]) dots[lumCurrentSlide].classList.add('active');
    }, 3000);
}

function stopLumSlider() {
    if (lumSlideInterval) {
        clearInterval(lumSlideInterval);
        lumSlideInterval = null;
    }
}

// ==========================================================================
// 6. CONTROL DE MODAL 5: GRANJAS SOLARES
// ==========================================================================
let farmsCurrentSlide = 0;
let farmsSlideInterval = null;

function openFarmsModal() {
    const modal = document.getElementById('farms-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block'; // Compatibilidad adicional
    }

    const slides = document.querySelectorAll('.farms-slider-img');
    const dots = document.querySelectorAll('.farms-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });

    farmsCurrentSlide = 0;
    startFarmsSlider();
}

function closeFarmsModal() {
    const modal = document.getElementById('farms-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
    stopFarmsSlider();
}

function startFarmsSlider() {
    stopFarmsSlider();
    const slides = document.querySelectorAll('.farms-slider-img');
    const dots = document.querySelectorAll('.farms-dot');

    farmsSlideInterval = setInterval(() => {
        if (!slides.length) return;
        slides[farmsCurrentSlide].classList.remove('active');
        if (dots[farmsCurrentSlide]) dots[farmsCurrentSlide].classList.remove('active');

        farmsCurrentSlide = (farmsCurrentSlide + 1) % slides.length;

        slides[farmsCurrentSlide].classList.add('active');
        if (dots[farmsCurrentSlide]) dots[farmsCurrentSlide].classList.add('active');
    }, 4000);
}

function stopFarmsSlider() {
    if (farmsSlideInterval) {
        clearInterval(farmsSlideInterval);
        farmsSlideInterval = null;
    }
}

// ==========================================================================
// 7. EVENTO UNIFICADO DE CIERRE AL HACER CLIC FUERA DE CUALQUIER MODAL
// ==========================================================================
window.addEventListener('click', (e) => {
    const modal1 = document.getElementById('solar-modal');
    const modal2 = document.getElementById('residential-modal');
    const modal3 = document.getElementById('ecoparking-modal');
    const modal4 = document.getElementById('luminarias-modal');
    const modal5 = document.getElementById('farms-modal');

    if (e.target === modal1) closeSolarModal();
    if (e.target === modal2) closeResidentialModal();
    if (e.target === modal3) closeEcoparkingModal();
    if (e.target === modal4) closeLuminariasModal();
    if (e.target === modal5) closeFarmsModal();
});

// ==========================================
// CONTROL DE MODAL: ELECTROMOVILIDAD
// ==========================================
let electroCurrentSlide = 0;
let electroSlideInterval = null;

function openElectromovilidadModal() {
    const modal = document.getElementById('electromovilidad-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }

    const slides = document.querySelectorAll('.electro-slider-img');
    const dots = document.querySelectorAll('.electro-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });

    electroCurrentSlide = 0;
    startElectroSlider();
}

function closeElectromovilidadModal() {
    const modal = document.getElementById('electromovilidad-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
    stopElectroSlider();
}

function startElectroSlider() {
    stopElectroSlider();
    const slides = document.querySelectorAll('.electro-slider-img');
    const dots = document.querySelectorAll('.electro-dot');

    electroSlideInterval = setInterval(() => {
        if (!slides.length) return;
        slides[electroCurrentSlide].classList.remove('active');
        if (dots[electroCurrentSlide]) dots[electroCurrentSlide].classList.remove('active');

        electroCurrentSlide = (electroCurrentSlide + 1) % slides.length;

        slides[electroCurrentSlide].classList.add('active');
        if (dots[electroCurrentSlide]) dots[electroCurrentSlide].classList.add('active');
    }, 3500);
}

function stopElectroSlider() {
    if (electroSlideInterval) {
        clearInterval(electroSlideInterval);
        electroSlideInterval = null;
    }
}

// Listener de cierre global
window.addEventListener('click', (e) => {
    const modal1 = document.getElementById('solar-modal');
    const modal2 = document.getElementById('residential-modal');
    const modal3 = document.getElementById('ecoparking-modal');
    const modal4 = document.getElementById('luminarias-modal');
    const modal5 = document.getElementById('farms-modal');
    const modal6 = document.getElementById('electromovilidad-modal');

    if (e.target === modal1) closeSolarModal();
    if (e.target === modal2) closeResidentialModal();
    if (e.target === modal3) closeEcoparkingModal();
    if (e.target === modal4) closeLuminariasModal();
    if (e.target === modal5) closeFarmsModal();
    if (e.target === modal6) closeElectromovilidadModal();
});

// ==========================================
// CONTROL DE MODAL: SERVICIOS DE INGENIERÍA
// ==========================================
let ingCurrentSlide = 0;
let ingSlideInterval = null;

function openIngenieriaModal() {
    const modal = document.getElementById('ingenieria-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }

    const slides = document.querySelectorAll('.ing-slider-img');
    const dots = document.querySelectorAll('.ing-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });

    ingCurrentSlide = 0;
    startIngSlider();
}

function closeIngenieriaModal() {
    const modal = document.getElementById('ingenieria-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
    stopIngSlider();
}

function startIngSlider() {
    stopIngSlider();
    const slides = document.querySelectorAll('.ing-slider-img');
    const dots = document.querySelectorAll('.ing-dot');

    ingSlideInterval = setInterval(() => {
        if (!slides.length) return;
        slides[ingCurrentSlide].classList.remove('active');
        if (dots[ingCurrentSlide]) dots[ingCurrentSlide].classList.remove('active');

        ingCurrentSlide = (ingCurrentSlide + 1) % slides.length;

        slides[ingCurrentSlide].classList.add('active');
        if (dots[ingCurrentSlide]) dots[ingCurrentSlide].classList.add('active');
    }, 3500);
}

function stopIngSlider() {
    if (ingSlideInterval) {
        clearInterval(ingSlideInterval);
        ingSlideInterval = null;
    }
}

// ==========================================
// CONTROL DE MODAL: EFICIENCIA ENERGÉTICA
// ==========================================
let eficienciaCurrentSlide = 0;
let eficienciaSlideInterval = null;

function openEficienciaModal() {
    const modal = document.getElementById('eficiencia-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }

    const slides = document.querySelectorAll('.eficiencia-slider-img');
    const dots = document.querySelectorAll('.eficiencia-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });

    eficienciaCurrentSlide = 0;
    startEficienciaSlider();
}

function closeEficienciaModal() {
    const modal = document.getElementById('eficiencia-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
    stopEficienciaSlider();
}

function startEficienciaSlider() {
    stopEficienciaSlider();
    const slides = document.querySelectorAll('.eficiencia-slider-img');
    const dots = document.querySelectorAll('.eficiencia-dot');

    eficienciaSlideInterval = setInterval(() => {
        if (!slides.length) return;
        slides[eficienciaCurrentSlide].classList.remove('active');
        if (dots[eficienciaCurrentSlide]) dots[eficienciaCurrentSlide].classList.remove('active');

        eficienciaCurrentSlide = (eficienciaCurrentSlide + 1) % slides.length;

        slides[eficienciaCurrentSlide].classList.add('active');
        if (dots[eficienciaCurrentSlide]) dots[eficienciaCurrentSlide].classList.add('active');
    }, 3500);
}

function stopEficienciaSlider() {
    if (eficienciaSlideInterval) {
        clearInterval(eficienciaSlideInterval);
        eficienciaSlideInterval = null;
    }
}
// Cierre de modal al hacer clic por fuera
window.addEventListener('click', (e) => {
    const modalEfi = document.getElementById('eficiencia-modal');
    if (e.target === modalEfi) closeEficienciaModal();
});

// ==========================================
// CONTROL DE MODAL: DOMÓTICA E INMÓTICA
// ==========================================
let domoticaCurrentSlide = 0;
let domoticaSlideInterval = null;

function openDomoticaModal() {
    const modal = document.getElementById('domotica-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }

    const slides = document.querySelectorAll('.domotica-slider-img');
    const dots = document.querySelectorAll('.domotica-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });

    domoticaCurrentSlide = 0;
    startDomoticaSlider();
}

function closeDomoticaModal() {
    const modal = document.getElementById('domotica-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
    stopDomoticaSlider();
}

function startDomoticaSlider() {
    stopDomoticaSlider();
    const slides = document.querySelectorAll('.domotica-slider-img');
    const dots = document.querySelectorAll('.domotica-dot');

    domoticaSlideInterval = setInterval(() => {
        if (!slides.length) return;
        slides[domoticaCurrentSlide].classList.remove('active');
        if (dots[domoticaCurrentSlide]) dots[domoticaCurrentSlide].classList.remove('active');

        domoticaCurrentSlide = (domoticaCurrentSlide + 1) % slides.length;

        slides[domoticaCurrentSlide].classList.add('active');
        if (dots[domoticaCurrentSlide]) dots[domoticaCurrentSlide].classList.add('active');
    }, 3500);
}

function stopDomoticaSlider() {
    if (domoticaSlideInterval) {
        clearInterval(domoticaSlideInterval);
        domoticaSlideInterval = null;
    }
}

// Evento global para cerrar ventanas al hacer clic por fuera
window.addEventListener('click', (e) => {
    const modalDom = document.getElementById('domotica-modal');
    if (e.target === modalDom) closeDomoticaModal();
});

// ==========================================
// CONTROL DE MODAL: SEGURIDAD ELECTRÓNICA
// ==========================================
let seguridadCurrentSlide = 0;
let seguridadSlideInterval = null;

function openSeguridadModal() {
    const modal = document.getElementById('seguridad-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }

    const slides = document.querySelectorAll('.seguridad-slider-img');
    const dots = document.querySelectorAll('.seguridad-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });

    seguridadCurrentSlide = 0;
    startSeguridadSlider();
}

function closeSeguridadModal() {
    const modal = document.getElementById('seguridad-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
    stopSeguridadSlider();
}

function startSeguridadSlider() {
    stopSeguridadSlider();
    const slides = document.querySelectorAll('.seguridad-slider-img');
    const dots = document.querySelectorAll('.seguridad-dot');

    seguridadSlideInterval = setInterval(() => {
        if (!slides.length) return;
        slides[seguridadCurrentSlide].classList.remove('active');
        if (dots[seguridadCurrentSlide]) dots[seguridadCurrentSlide].classList.remove('active');

        seguridadCurrentSlide = (seguridadCurrentSlide + 1) % slides.length;

        slides[seguridadCurrentSlide].classList.add('active');
        if (dots[seguridadCurrentSlide]) dots[seguridadCurrentSlide].classList.add('active');
    }, 3500);
}

function stopSeguridadSlider() {
    if (seguridadSlideInterval) {
        clearInterval(seguridadSlideInterval);
        seguridadSlideInterval = null;
    }
}

// Listener de cierre global
window.addEventListener('click', (e) => {
    const modalSeg = document.getElementById('seguridad-modal');
    if (e.target === modalSeg) closeSeguridadModal();
});

// ==========================================
// CONTROL DE MODAL: CONSULTORÍA Y PROYECTOS TIC
// ==========================================
let consultoriaCurrentSlide = 0;
let consultoriaSlideInterval = null;

function openConsultoriaModal() {
    const modal = document.getElementById('consultoria-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }

    const slides = document.querySelectorAll('.consultoria-slider-img');
    const dots = document.querySelectorAll('.consultoria-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });

    consultoriaCurrentSlide = 0;
    startConsultoriaSlider();
}

function closeConsultoriaModal() {
    const modal = document.getElementById('consultoria-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
    stopConsultoriaSlider();
}

function startConsultoriaSlider() {
    stopConsultoriaSlider();
    const slides = document.querySelectorAll('.consultoria-slider-img');
    const dots = document.querySelectorAll('.consultoria-dot');

    consultoriaSlideInterval = setInterval(() => {
        if (!slides.length) return;
        slides[consultoriaCurrentSlide].classList.remove('active');
        if (dots[consultoriaCurrentSlide]) dots[consultoriaCurrentSlide].classList.remove('active');

        consultoriaCurrentSlide = (consultoriaCurrentSlide + 1) % slides.length;

        slides[consultoriaCurrentSlide].classList.add('active');
        if (dots[consultoriaCurrentSlide]) dots[consultoriaCurrentSlide].classList.add('active');
    }, 3500);
}

function stopConsultoriaSlider() {
    if (consultoriaSlideInterval) {
        clearInterval(consultoriaSlideInterval);
        consultoriaSlideInterval = null;
    }
}

// Cierre global al hacer clic fuera
window.addEventListener('click', (e) => {
    const modalCon = document.getElementById('consultoria-modal');
    if (e.target === modalCon) closeConsultoriaModal();
});

// ==========================================
// CONTROL DE MODAL: NOSOTROS Y CASOS DE ÉXITO
// ==========================================

function openNosotrosModal() {
    const modal = document.getElementById('nosotros-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
}

function closeNosotrosModal() {
    const modal = document.getElementById('nosotros-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}

// ==========================================
// CASOS DE ÉXITO Y CARRUSEL INTERNO EN SUB-MODAL
// ==========================================

const caseStudiesData = {
    1: {
        title: "Sistema Solar On-Grid · 6 kW",
        project: "Instalación fotovoltaica residencial",
        year: "2025",
        category: "Energía Solar",
        solution: "Diseño e instalación de un sistema fotovoltaico On-Grid de 6 kW para una vivienda, orientado al aprovechamiento de la energía solar y a una generación energética eficiente.",
        images: ["images/solar_1.jpg", "images/solar_2.jpg", "images/solar_3.jpg"],
        components: ["Sistema fotovoltaico On-Grid", "Capacidad instalada: 6 kW", "Aplicación residencial"]
    },
    2: {
        title: "Infraestructura de Electromovilidad",
        project: "Instalación de 2 cargadores eléctricos — UNAD Cúcuta",
        year: "Mayo 2025",
        category: "Electromovilidad",
        solution: "Implementación de infraestructura para movilidad eléctrica mediante la instalación de 2 cargadores eléctricos vehiculares en la sede de la UNAD Cúcuta.",
        // AQUÍ ACTUALIZAMOS LAS RUTAS DE LAS IMÁGENES
        images: [
            "images/unad_cargador_1.jpg", 
            "images/unad_cargador_2.jpg", 
            "images/unad_cargador_3.jpg"
        ],
        components: ["2 cargadores eléctricos vehiculares", "Sede UNAD Cúcuta", "Integración con red existente"]
    },
    3: {
        title: "Sistema de Videovigilancia · Trituradora La Rica",
        project: "32 canales análogos + 2 cámaras IP mediante fibra óptica",
        year: "2014–2016",
        category: "Seguridad Electrónica / Telecomunicaciones",
        solution: "Implementación de un sistema de videovigilancia compuesto por 32 canales análogos y 2 cámaras IP, utilizando fibra óptica para la transmisión de señal Full HD, con cobertura aproximada de 1 hectárea de terreno.",
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

    document.getElementById('case-study-content').innerHTML = contentHtml;
    const caseModal = document.getElementById('case-study-modal');
    if (caseModal) {
        caseModal.classList.add('show');
        caseModal.style.display = 'block';
    }
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
    if (imgElem) {
        imgElem.src = currentCaseImages[currentCaseSlide];
    }
    const dots = document.querySelectorAll('.case-dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentCaseSlide);
    });
}

function closeCaseStudy() {
    const caseModal = document.getElementById('case-study-modal');
    if (caseModal) {
        caseModal.classList.remove('show');
        caseModal.style.display = 'none';
    }
}

// ==========================================
// CONTROL DEL LIGHTBOX FULLSCREEN DE VIDEO (CORREGIDO)
// ==========================================

function openVideoFullscreen() {
    const modal = document.getElementById('video-fullscreen-modal');
    const player = document.getElementById('player-fullscreen');

    if (modal && player) {
        modal.classList.add('active');
        
        // Forzamos la carga del recurso por si no ha iniciado el buffer
        player.load();
        player.currentTime = 0;

        // Intentar reproducir directamente
        const playPromise = player.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Reproducción iniciada exitosamente
            }).catch(error => {
                console.warn("Autoplay bloqueado con audio, intentando reproducir...", error);
                // Si el navegador bloquea por audio, reproducimos silenciado para desbloquear
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

// ==========================================
// CONTROLADOR CENTRALIZADO DE MODALES Y HISTORIAL
// ==========================================

// Variable de estado global para rastrear el modal activo en pantalla
let currentOpenModalId = null;

/**
 * Función genérica para abrir cualquier modal por su ID.
 * Agrega una entrada al historial del navegador (History API).
 * 
 * @param {string} modalId - ID del elemento HTML del modal.
 * @param {string} [displayValue='flex'] - Estilo CSS display ('flex' o 'block').
 */
function openModal(modalId, displayValue = 'flex') {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    currentOpenModalId = modalId;
    modal.classList.add('show');
    modal.style.display = displayValue;

    // Registramos la apertura en el historial para soportar el botón "Atrás"
    history.pushState({ modalOpen: true, activeModalId: modalId }, '', '#' + modalId);
}

/**
 * Función genérica para cerrar cualquier modal por su ID.
 * Gestiona la limpieza del historial del navegador.
 * 
 * @param {string} [modalId] - ID del modal a cerrar (opcional, usa el activo si no se especifica).
 * @param {Object} [options] - Configuración de cierre.
 * @param {boolean} [options.fromPopstate=false] - Indica si el cierre fue iniciado por el botón "Atrás".
 */
function closeModal(modalId, { fromPopstate = false } = {}) {
    const idToClose = modalId || currentOpenModalId;
    if (!idToClose) return;

    const modal = document.getElementById(idToClose);
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }

    // Si el usuario cerró manualmente (X, Clic fuera, Esc), retrocedemos el historial para limpiar la URL
    if (!fromPopstate && history.state && history.state.modalOpen) {
        history.back();
    }

    currentOpenModalId = null;
}

// ==========================================
// LISTENERS GLOBALES (SISTEMA, TECLADO Y MOUSE)
// ==========================================

// 1. Escuchador para el botón "Atrás" del celular o navegador
window.addEventListener('popstate', function () {
    if (currentOpenModalId) {
        closeModal(currentOpenModalId, { fromPopstate: true });
    }
});

// 2. Escuchador para cerrar con la tecla 'Escape' (Esc)
window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && currentOpenModalId) {
        closeModal(currentOpenModalId);
    }
});

// 3. Escuchador para cerrar haciendo clic en el fondo oscuro (overlay)
window.addEventListener('click', function (event) {
    if (currentOpenModalId) {
        const modal = document.getElementById(currentOpenModalId);
        if (event.target === modal) {
            closeModal(currentOpenModalId);
        }
    }
});

// ==========================================
// WRAPPERS PARA LOS 13 MODALES DEL PORTAFOLIO
// ==========================================

// 1. Empresa / Sobre Nosotros
function openNosotrosModal() { openModal('nosotros-modal', 'flex'); }
function closeNosotrosModal() { closeModal('nosotros-modal'); }

// 2. Domótica e Inmótica
function openDomoticaModal() { openModal('domotica-modal', 'flex'); }
function closeDomoticaModal() { closeModal('domotica-modal'); }

// 3. Seguridad Electrónica
function openSeguridadModal() { openModal('seguridad-modal', 'flex'); }
function closeSeguridadModal() { closeModal('seguridad-modal'); }

// 4. Techos Solares Residenciales
function openResidentialModal() { openModal('residential-modal', 'flex'); }
function closeResidentialModal() { closeModal('residential-modal'); }

// 5. Cubiertas Solares - Bioarquitectura (Añadido)
function openSolarModal() { openModal('solar-modal', 'flex'); }
function closeSolarModal() { closeModal('solar-modal'); }

// 6. Granjas Solares & Minigranjas (Añadido)
function openFarmsModal() { openModal('farms-modal', 'flex'); }
function closeFarmsModal() { closeModal('farms-modal'); }

// 7. ElectroMovilidad (Añadido)
function openElectromovilidadModal() { openModal('electromovilidad-modal', 'flex'); }
function closeElectromovilidadModal() { closeModal('electromovilidad-modal'); }

// 8. Servicios de Ingeniería (Añadido)
function openIngenieriaModal() { openModal('ingenieria-modal', 'flex'); }
function closeIngenieriaModal() { closeModal('ingenieria-modal'); }

// 9. Eficiencia Energética (Añadido)
function openEficienciaModal() { openModal('eficiencia-modal', 'flex'); }
function closeEficienciaModal() { closeModal('eficiencia-modal'); }

// 10. Consultoría y Proyectos TIC (Añadido)
function openConsultoriaModal() { openModal('consultoria-modal', 'flex'); }
function closeConsultoriaModal() { closeModal('consultoria-modal'); }

// 11. Ecoparking
function openEcoparkingModal() { openModal('ecoparking-modal', 'flex'); }
function closeEcoparkingModal() { closeModal('ecoparking-modal'); }

// 12. Luminarias
function openLuminariasModal() { openModal('luminarias-modal', 'flex'); }
function closeLuminariasModal() { closeModal('luminarias-modal'); }

// 13. Casos de Éxito
function openCaseStudy(id) {
    const data = caseStudiesData[id];
    if (!data) return;

    // Aquí mantienes tu código existente para inyectar títulos, imágenes o descripciones del caso de éxito:
    // document.getElementById('case-title').textContent = data.title;
    // ...

    openModal('case-study-modal', 'block');
}

function closeCaseStudy() {
    closeModal('case-study-modal');
}