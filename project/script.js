// Portfolio Website JavaScript

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const notificationBell = document.getElementById('notificationBell');
const notificationBadge = document.getElementById('notificationBadge');
const navbar = document.querySelector('.navbar');

// Theme Management
let darkMode = localStorage.getItem('darkMode') === 'true';

function initializeTheme() {
    if (darkMode) {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

function toggleTheme() {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    initializeTheme();
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Active Navigation Link Based on Scroll Position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Typing Animation for Hero Section
function initializeTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const texts = ['Développeur Full Stack', 'Expert C# .NET', 'Créateur d\'Applications', 'Consultant Technique'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
}

// Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Portfolio Filter
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hide');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => observer.observe(element));
}

// Notification System
function showNotifications() {
    const modal = new bootstrap.Modal(document.getElementById('notificationModal'));
    modal.show();
    
    // Reset notification count
    notificationBadge.textContent = '0';
    notificationBadge.style.display = 'none';
}

// Project Details Modal
const projectData = {
    myscc: {
        title: 'MySCC - System Care & Cleaning',
        description: 'Application Windows complète développée en C# pour l\'optimisation et la maintenance système.',
        features: [
            'Nettoyage automatique des fichiers temporaires et inutiles',
            'Optimisation du registre Windows',
            'Gestion des programmes de démarrage',
            'Surveillance des performances en temps réel',
            'Interface utilisateur moderne et intuitive',
            'Planification automatique des tâches',
            'Rapports détaillés de maintenance',
            'Sauvegarde et restauration du système'
        ],
        technologies: ['C#', 'WPF', 'Windows API', '.NET Framework', 'SQLite'],
        challenges: 'Le principal défi était d\'assurer la sécurité des opérations système tout en maintenant de hautes performances.',
        results: 'L\'application a permis d\'améliorer les performances système de 40% en moyenne pour les utilisateurs.',
        image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    mystudent: {
        title: 'MyStudent - Plateforme de Gestion Scolaire',
        description: 'Système web complet pour la gestion des étudiants, cours et administrations scolaires.',
        features: [
            'Gestion complète des inscriptions étudiantes',
            'Système de notation et évaluation',
            'Emplois du temps interactifs et dynamiques',
            'Messagerie intégrée professeurs-étudiants',
            'Tableau de bord administrateur avancé',
            'Génération de rapports automatisés',
            'Système de paiement en ligne',
            'Interface responsive multi-dispositifs'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
        challenges: 'Gérer la complexité des relations entre étudiants, cours et professeurs tout en assurant la sécurité des données.',
        results: 'Utilisé par plus de 500 étudiants et 50 professeurs, réduisant le temps administratif de 60%.',
        image: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    digitalmarket: {
        title: 'DigitalMarket - Plateforme E-commerce',
        description: 'Solution e-commerce moderne avec système de paiement intégré et gestion avancée.',
        features: [
            'Catalogue produits avec recherche avancée',
            'Panier d\'achat et système de commandes',
            'Intégration paiements sécurisés (Stripe, PayPal)',
            'Dashboard administrateur complet',
            'Gestion des stocks en temps réel',
            'Système de reviews et ratings',
            'Notifications push et email',
            'Analytics et rapports de vente'
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Stripe API'],
        challenges: 'Assurer la sécurité des transactions tout en maintenant une expérience utilisateur fluide.',
        results: 'Traitement de plus de 1000 commandes mensuelles avec un taux de satisfaction de 95%.',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    taskmaster: {
        title: 'TaskMaster - Application Mobile de Gestion',
        description: 'Application mobile cross-platform pour la gestion collaborative de projets et tâches.',
        features: [
            'Gestion de projets collaboratifs',
            'Synchronisation temps réel entre équipes',
            'Notifications push intelligentes',
            'Mode hors ligne avec synchronisation',
            'Interface native iOS et Android',
            'Système de chat intégré',
            'Calendrier et planification',
            'Rapports de productivité'
        ],
        technologies: ['Xamarin', 'C#', 'SQLite', 'Azure', 'SignalR'],
        challenges: 'Maintenir la synchronisation en temps réel tout en optimisant la consommation batterie.',
        results: 'Amélioration de la productivité des équipes de 35% et adoption par plus de 200 utilisateurs.',
        image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    healthtracker: {
        title: 'HealthTracker - Plateforme de Suivi Médical',
        description: 'Solution web pour le suivi médical patient-professionnel avec téléconsultation.',
        features: [
            'Suivi des constantes vitales',
            'Gestion des rendez-vous médicaux',
            'Historique médical complet',
            'Téléconsultation intégrée',
            'Rappels de médication',
            'Tableaux de bord interactifs',
            'Génération de rapports médicaux',
            'Sécurité HIPAA compliant'
        ],
        technologies: ['Angular', 'ASP.NET Core', 'SQL Server', 'Chart.js', 'WebRTC'],
        challenges: 'Assurer la conformité aux réglementations médicales tout en maintenant l\'ergonomie.',
        results: 'Utilisé par 15 cliniques avec une réduction de 50% du temps administratif.',
        image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    inventorypro: {
        title: 'InventoryPro - Gestion d\'Inventaire',
        description: 'Système desktop avancé pour la gestion complète des stocks et inventaires.',
        features: [
            'Gestion des stocks en temps réel',
            'Scanner de codes-barres intégré',
            'Alertes automatiques de stock bas',
            'Rapports et analytics avancés',
            'Gestion multi-entrepôts',
            'Traçabilité complète des produits',
            'Interface tactile optimisée',
            'Intégration comptabilité'
        ],
        technologies: ['C#', 'WPF', 'Entity Framework', 'SQL Server', 'Crystal Reports'],
        challenges: 'Gérer des volumes importants de données tout en maintenant des performances optimales.',
        results: 'Réduction de 70% des erreurs d\'inventaire et gain de temps de 50% pour les opérations.',
        image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
};

function showProjectDetails(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const title = document.getElementById('projectModalTitle');
    const body = document.getElementById('projectModalBody');
    
    title.textContent = project.title;
    
    body.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${project.image}" alt="${project.title}" class="img-fluid rounded mb-3">
            </div>
            <div class="col-md-6">
                <h5>Description</h5>
                <p>${project.description}</p>
                
                <h5>Technologies utilisées</h5>
                <div class="mb-3">
                    ${project.technologies.map(tech => `<span class="badge bg-primary me-1 mb-1">${tech}</span>`).join('')}
                </div>
                
                <h5>Défis techniques</h5>
                <p>${project.challenges}</p>
                
                <h5>Résultats obtenus</h5>
                <p>${project.results}</p>
            </div>
        </div>
        
        <hr>
        
        <h5>Fonctionnalités principales</h5>
        <div class="row">
            ${project.features.map((feature, index) => `
                <div class="col-md-6">
                    <div class="d-flex align-items-start mb-2">
                        <i class="fas fa-check-circle text-success me-2 mt-1"></i>
                        <span>${feature}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

// Blog Post Modal
const blogData = {
    'csharp-practices': {
        title: 'Les meilleures pratiques en C# pour 2024',
        content: `
            <p>Le développement en C# continue d'évoluer avec .NET 8 et ses nouvelles fonctionnalités. Voici les pratiques essentielles à adopter en 2024.</p>
            
            <h5>1. Utilisation des Records et Pattern Matching</h5>
            <p>Les records offrent une syntaxe concise pour créer des types immuables, essentiels pour un code robuste et thread-safe.</p>
            
            <h5>2. Programmation Asynchrone Moderne</h5>
            <p>Maîtrisez async/await, ConfigureAwait, et les nouvelles APIs asynchrones pour des applications performantes.</p>
            
            <h5>3. Nullable Reference Types</h5>
            <p>Activez cette fonctionnalité pour éliminer les NullReferenceException à la compilation.</p>
            
            <h5>4. Performance et Mémoire</h5>
            <p>Utilisez Span<T>, Memory<T>, et les outils de profiling pour optimiser vos applications.</p>
        `,
        date: '15 Nov 2024',
        category: 'C#',
        readTime: '8 min'
    },
    'fullstack-guide': {
        title: 'Développement Full Stack : Guide complet 2024',
        content: `
            <p>Le développement full stack moderne nécessite une maîtrise de l'écosystème complet. Voici votre roadmap pour 2024.</p>
            
            <h5>Frontend Moderne</h5>
            <p>React, Angular, ou Vue.js avec TypeScript pour un code type-safe et maintenable.</p>
            
            <h5>Backend Robuste</h5>
            <p>Node.js avec Express, ou ASP.NET Core pour des APIs performantes et sécurisées.</p>
            
            <h5>Base de Données</h5>
            <p>SQL avec PostgreSQL ou NoSQL avec MongoDB selon vos besoins de scalabilité.</p>
            
            <h5>DevOps et Déploiement</h5>
            <p>Docker, CI/CD avec GitHub Actions, et déploiement cloud sur Azure ou AWS.</p>
        `,
        date: '10 Nov 2024',
        category: 'Web Dev',
        readTime: '12 min'
    },
    'performance-tips': {
        title: 'Optimiser les performances de vos applications',
        content: `
            <p>Les performances sont cruciales pour l'expérience utilisateur. Voici mes techniques éprouvées d'optimisation.</p>
            
            <h5>Profiling et Mesure</h5>
            <p>Utilisez dotMemory, PerfView, et les outils navigateur pour identifier les goulots d'étranglement.</p>
            
            <h5>Optimisation Mémoire</h5>
            <p>Évitez les fuites mémoire avec using statements, disposable patterns, et weak references.</p>
            
            <h5>Cache Intelligent</h5>
            <p>Implémentez des stratégies de cache multi-niveaux : mémoire, Redis, CDN.</p>
            
            <h5>Base de Données</h5>
            <p>Indexation optimale, requêtes efficaces, et pagination pour gérer de gros volumes.</p>
        `,
        date: '5 Nov 2024',
        category: 'Performance',
        readTime: '10 min'
    },
    'database-design': {
        title: 'Conception de bases de données efficaces',
        content: `
            <p>Une base de données bien conçue est la fondation d'une application performante et scalable.</p>
            
            <h5>Normalisation vs Dénormalisation</h5>
            <p>Trouvez l'équilibre entre intégrité des données et performance selon votre cas d'usage.</p>
            
            <h5>Indexation Stratégique</h5>
            <p>Créez des index composites intelligents basés sur vos patterns de requêtes.</p>
            
            <h5>SQL vs NoSQL</h5>
            <p>Choisissez la bonne technologie selon vos besoins de consistance et de scalabilité.</p>
            
            <h5>Sécurité et Backup</h5>
            <p>Implémentez le chiffrement, les sauvegardes automatisées, et la récupération d'urgence.</p>
        `,
        date: '1 Nov 2024',
        category: 'Database',
        readTime: '15 min'
    },
    'xamarin-mobile': {
        title: 'Développement mobile avec Xamarin',
        content: `
            <p>Xamarin permet de partager 90% de votre code C# entre iOS et Android tout en conservant des performances natives.</p>
            
            <h5>Architecture MVVM</h5>
            <p>Structurez vos applications avec le pattern MVVM pour une séparation claire des responsabilités.</p>
            
            <h5>Performance Native</h5>
            <p>Compilez en code natif pour des performances équivalentes aux applications natives.</p>
            
            <h5>UI Native</h5>
            <p>Xamarin.Forms ou interface native selon vos besoins de personnalisation.</p>
            
            <h5>Intégrations Avancées</h5>
            <p>Accès aux APIs natives, notifications push, et services cloud Azure.</p>
        `,
        date: '28 Oct 2024',
        category: 'Mobile',
        readTime: '11 min'
    },
    'devops-intro': {
        title: 'Introduction au DevOps pour développeurs',
        content: `
            <p>DevOps révolutionne la façon dont nous développons et déployons nos applications. Voici les essentiels.</p>
            
            <h5>CI/CD Pipeline</h5>
            <p>Automatisez vos builds, tests, et déploiements avec GitHub Actions ou Azure DevOps.</p>
            
            <h5>Containerisation</h5>
            <p>Docker pour l'isolation des environnements et Kubernetes pour l'orchestration.</p>
            
            <h5>Infrastructure as Code</h5>
            <p>Terraform ou ARM templates pour gérer votre infrastructure de façon reproductible.</p>
            
            <h5>Monitoring et Logs</h5>
            <p>Application Insights, ELK Stack pour surveiller vos applications en production.</p>
        `,
        date: '25 Oct 2024',
        category: 'DevOps',
        readTime: '9 min'
    }
};

function showBlogPost(postId) {
    const post = blogData[postId];
    if (!post) return;
    
    const modal = document.getElementById('blogModal');
    const title = document.getElementById('blogModalTitle');
    const body = document.getElementById('blogModalBody');
    
    title.textContent = post.title;
    
    body.innerHTML = `
        <div class="blog-post-meta mb-4">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="badge bg-primary me-2">${post.category}</span>
                    <small class="text-muted">
                        <i class="fas fa-calendar me-1"></i>${post.date} •
                        <i class="fas fa-clock me-1"></i>${post.readTime} de lecture
                    </small>
                </div>
                <div class="blog-social-share">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="shareOnFacebook('${postId}')">
                        <i class="fab fa-facebook"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-info me-1" onclick="shareOnTwitter('${postId}')">
                        <i class="fab fa-twitter"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-success" onclick="shareOnWhatsApp('${postId}')">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="blog-post-content">
            ${post.content}
        </div>
        
        <hr>
        
        <div class="blog-post-footer">
            <p class="text-muted">
                <i class="fas fa-user me-2"></i>Écrit par <strong>Wilfred Djikiakam</strong> • 
                <a href="https://wa.me/672922360" target="_blank">Contactez-moi pour vos projets</a>
            </p>
        </div>
    `;
    
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

// Social Sharing Functions
function shareOnFacebook(postId) {
    const post = blogData[postId];
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
}

function shareOnTwitter(postId) {
    const post = blogData[postId];
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${post.title} - par @respocodeur`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnWhatsApp(postId) {
    const post = blogData[postId];
    const text = encodeURIComponent(`${post.title} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function shareBlogPost() {
    // Get current post from modal title
    const title = document.getElementById('blogModalTitle').textContent;
    shareOnWhatsApp('current-post');
}

// Show All Blog Posts
function showAllBlogPosts() {
    alert('Fonctionnalité en cours de développement. Tous les articles seront bientôt disponibles dans une section dédiée!');
}

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Contact Form Validation (if needed)
function validateContactForm(form) {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    
    if (!email.value || !message.value) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        alert('Veuillez entrer une adresse email valide.');
        return false;
    }
    
    return true;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Initialize all features
    initializeSmoothScrolling();
    initializeTypingAnimation();
    animateSkillBars();
    initializePortfolioFilter();
    initializeScrollAnimations();
    initializeLazyLoading();
    
    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    notificationBell.addEventListener('click', showNotifications);
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
    });
    
    // Add fade-in classes to elements for animation
    const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-card, .blog-card, .testimonial-card');
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
    
    console.log('Portfolio website initialized successfully!');
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization
const debouncedScroll = debounce(() => {
    handleNavbarScroll();
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Add smooth reveal animations for better user experience
const revealElements = document.querySelectorAll('.reveal-on-scroll');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(element => {
    revealObserver.observe(element);
});