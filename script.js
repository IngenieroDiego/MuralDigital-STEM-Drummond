// SVG íconos STEM como strings para uso dinámico
const stemIcons = {
    ciencia: `<svg viewBox="0 0 24 24" width="48" height="48">
        <title>Ciencia</title>
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="13" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" stroke-width="2"/>
        <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    
    tecnologia: `<svg viewBox="0 0 24 24" width="48" height="48">
        <title>Tecnología</title>
        <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="7" y="7" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="10" y1="4" x2="10" y2="2" stroke="currentColor" stroke-width="2"/>
        <line x1="14" y1="4" x2="14" y2="2" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    
    ingenieria: `<svg viewBox="0 0 24 24" width="48" height="48">
        <title>Ingeniería</title>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="12" y1="2" x2="12" y2="7" stroke="currentColor" stroke-width="2"/>
        <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" stroke-width="2"/>
        <line x1="2" y1="12" x2="7" y2="12" stroke="currentColor" stroke-width="2"/>
        <line x1="17" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    
    matematicas: `<svg viewBox="0 0 24 24" width="48" height="48">
        <title>Matemáticas</title>
        <path d="M10 7L17 17M17 7L10 17" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M5 21C6.10457 21 7 20.1046 7 19C7 17.8954 6.10457 17 5 17C3.89543 17 3 17.8954 3 19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M19 7C20.1046 7 21 6.10457 21 5C21 3.89543 20.1046 3 19 3C17.8954 3 17 3.89543 17 5C17 6.10457 17.8954 7 19 7Z" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>`
};

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tema
    initTheme();
    
    // Inicializar navegación
    initNavigation();
    
    // Inicializar menú hamburguesa
    initMobileMenu();
    
    // Inicializar tabs
    initTabs();
    
    // Inicializar tooltips
    initTooltips();
    
    // Inicializar modal de imágenes
    initImageModal();
    
    // Inicializar animaciones al hacer scroll
    initScrollAnimations();
    
    // Inicializar botones de funcionalidad
    initFunctionButtons();
});

// Gestión del tema claro/oscuro
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Verificar preferencia guardada o del sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Alternar tema al hacer clic
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Navegación suave y activa
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Actualizar enlace activo
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Cerrar menú móvil si está abierto
                closeMobileMenu();
            }
        });
    });
    
    // Actualizar enlace activo al hacer scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Menú hamburguesa para móviles
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Cambiar ícono del menú
        const menuIcon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.getElementById('menu-toggle');
    const menuIcon = menuToggle.querySelector('i');
    
    navLinks.classList.remove('active');
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
}

// Sistema de tabs
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remover clase activa de todos los botones y contenidos
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Activar el botón y contenido seleccionado
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Tooltips para íconos STEM
function initTooltips() {
    const stemIcons = document.querySelectorAll('.stem-icon');
    
    stemIcons.forEach(icon => {
        // Los tooltips ya están implementados con CSS, pero podemos añadir funcionalidad adicional si es necesario
        icon.addEventListener('click', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            showNotification(`Ícono STEM: ${tooltipText}`);
        });
    });
}

// Modal para imágenes ampliadas
function initImageModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close-modal');
    
    // Abrir modal al hacer clic en una imagen
    document.querySelectorAll('.clickable-image').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalCaption.textContent = this.nextElementSibling?.textContent || '';
        });
    });
    
    // Cerrar modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.feature-card, .aspecto-item, .propuesta-card, .problema-card, .contraste-content, .image-container');
    
    // Crear IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar elementos
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Botones de funcionalidad
function initFunctionButtons() {
    // Botón de descarga
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadMural);
    }
    
    // Botón de copiar referencias
    const copyRefsBtn = document.getElementById('copy-refs-btn');
    if (copyRefsBtn) {
        copyRefsBtn.addEventListener('click', copyReferences);
    }
}

// Descargar mural como PNG
function downloadMural() {
    // Mostrar notificación de proceso
    showNotification('Generando imagen, por favor espere...');
    
    // Ocultar elementos que no deben aparecer en la captura
    const elementsToHide = document.querySelectorAll('#navbar, .hero-actions, .theme-btn, .menu-btn, #notification, #image-modal');
    elementsToHide.forEach(el => {
        el.style.visibility = 'hidden';
    });
    
    // Usar html2canvas para capturar el contenido
    html2canvas(document.body, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY
    }).then(canvas => {
        // Restaurar elementos ocultos
        elementsToHide.forEach(el => {
            el.style.visibility = 'visible';
        });
        
        // Convertir canvas a imagen y descargar
        const link = document.createElement('a');
        link.download = 'mural-stem-drummond.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Mostrar notificación de éxito
        showNotification('Mural descargado exitosamente');
    }).catch(error => {
        console.error('Error al generar la imagen:', error);
        showNotification('Error al generar la imagen. Intente nuevamente.');
        
        // Restaurar elementos ocultos en caso de error
        elementsToHide.forEach(el => {
            el.style.visibility = 'visible';
        });
    });
}

// Copiar referencias al portapapeles
function copyReferences() {
    const referencesList = document.querySelector('.referencias-list');
    
    if (!referencesList) {
        showNotification('No se encontraron referencias para copiar');
        return;
    }
    
    // Obtener texto de las referencias
    let referencesText = '';
    const referenceItems = referencesList.querySelectorAll('li');
    
    referenceItems.forEach((item, index) => {
        referencesText += `${index + 1}. ${item.textContent}\n`;
    });
    
    // Copiar al portapapeles usando la API moderna
    navigator.clipboard.writeText(referencesText).then(() => {
        showNotification('Referencias copiadas con éxito');
    }).catch(err => {
        console.error('Error al copiar al portapapeles:', err);
        
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = referencesText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        showNotification('Referencias copiadas con éxito');
    });
}

// Mostrar notificaciones
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    if (!notification || !notificationText) return;
    
    notificationText.textContent = message;
    notification.classList.add('show');
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    // Cerrar menú móvil si se cambia a pantalla grande
    if (window.innerWidth > 992) {
        closeMobileMenu();
    }
});