// Global State
let siteData = null;
let isScrolled = false;
let activeSection = 'home';

// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slide-out 0.3s ease';
        setTimeout(() => container.removeChild(toast), 300);
    }, 3000);
}

// Load Site Data
async function loadSiteData() {
    try {
        // First try to load from localStorage
        const stored = localStorage.getItem('siteData');
        if (stored) {
            siteData = JSON.parse(stored);
        } else {
            // Load from JSON file
            const response = await fetch('data/site-data.json');
            siteData = await response.json();
        }
        renderSite();
    } catch (error) {
        console.error('Error loading site data:', error);
        showToast('Ошибка загрузки данных', 'error');
    }
}

// Save to LocalStorage
function saveSiteData() {
    try {
        localStorage.setItem('siteData', JSON.stringify(siteData));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Scroll Handling
function handleScroll() {
    const scrolled = window.scrollY > 50;
    if (scrolled !== isScrolled) {
        isScrolled = scrolled;
        const header = document.getElementById('header');
        if (isScrolled) {
            header.classList.add('bg-background/95', 'backdrop-blur-sm', 'shadow-lg', 'glow-border');
            header.classList.remove('bg-transparent', 'border-transparent');
        } else {
            header.classList.remove('bg-background/95', 'backdrop-blur-sm', 'shadow-lg', 'glow-border');
            header.classList.add('bg-transparent', 'border-transparent');
        }
    }
    
    // Update active section
    const sections = ['home', 'about', 'services', 'portfolio', 'cases', 'blog', 'contacts'];
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                if (activeSection !== section) {
                    activeSection = section;
                    updateActiveMenu();
                }
                break;
            }
        }
    }
}

// Update Active Menu Item
function updateActiveMenu() {
    document.querySelectorAll('.menu-item').forEach(item => {
        if (item.dataset.section === activeSection) {
            item.classList.add('text-gold');
            item.classList.remove('text-muted-foreground');
        } else {
            item.classList.remove('text-gold');
            item.classList.add('text-muted-foreground');
        }
    });
}

// Scroll to Section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80;
        const top = element.offsetTop - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMobileMenu();
    }
}

// Mobile Menu
function openMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const content = document.getElementById('mobile-menu-content');
    menu.classList.remove('hidden');
    setTimeout(() => content.classList.add('mobile-menu-open'), 10);
}

function closeMobileMenu() {
    const content = document.getElementById('mobile-menu-content');
    content.classList.remove('mobile-menu-open');
    setTimeout(() => {
        document.getElementById('mobile-menu').classList.add('hidden');
    }, 300);
}

// Get Lucide Icon
function getLucideIcon(iconName) {
    const iconMap = {
        'SearchCheck': 'search-check',
        'UserCheck': 'user-check',
        'FileText': 'file-text',
        'DollarSign': 'dollar-sign',
        'Shield': 'shield',
        'Scale': 'scale',
        'MapPin': 'map-pin',
        'Phone': 'phone',
        'Mail': 'mail'
    };
    return iconMap[iconName] || iconName.toLowerCase();
}

// Render Site
function renderSite() {
    if (!siteData) return;
    
    // Render Logo
    document.getElementById('header-logo').src = siteData.logo;
    document.getElementById('footer-logo').src = siteData.logo;
    
    // Render Hero
    document.getElementById('hero-title').textContent = siteData.hero.title;
    document.getElementById('hero-subtitle').textContent = siteData.hero.subtitle;
    
    // Render About
    document.getElementById('about-title').textContent = siteData.about.title;
    document.getElementById('about-description').textContent = siteData.about.description;
    
    const statsContainer = document.getElementById('about-stats');
    statsContainer.innerHTML = siteData.about.stats.map(stat => `
        <div class="stat-card">
            <div class="text-4xl font-bold text-gold mb-2">${stat.value}</div>
            <div class="text-muted-foreground">${stat.label}</div>
        </div>
    `).join('');
    
    // Render Services
    document.getElementById('services-title').textContent = siteData.services.title;
    document.getElementById('services-subtitle').textContent = siteData.services.subtitle;
    
    const servicesContainer = document.getElementById('services-grid');
    servicesContainer.innerHTML = siteData.services.items.map(service => `
        <div class="service-card card-hover">
            <div class="icon-container mb-4">
                <i data-lucide="${getLucideIcon(service.icon)}" class="w-12 h-12 text-gold"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">${service.title}</h3>
            <p class="text-muted-foreground">${service.description}</p>
        </div>
    `).join('');
    
    // Render Portfolio
    document.getElementById('portfolio-title').textContent = siteData.portfolio.title;
    
    const portfolioContainer = document.getElementById('portfolio-grid');
    portfolioContainer.innerHTML = siteData.portfolio.items.map(item => `
        <div class="portfolio-card card-hover">
            <h3 class="text-xl font-semibold mb-3">${item.title}</h3>
            <p class="text-muted-foreground mb-4">${item.description}</p>
            <div class="text-2xl font-bold text-gold">${item.result}</div>
        </div>
    `).join('');
    
    // Render Cases
    document.getElementById('cases-title').textContent = siteData.cases.title;
    
    const casesContainer = document.getElementById('cases-grid');
    casesContainer.innerHTML = siteData.cases.items.map(item => `
        <div class="case-card card-hover">
            <h3 class="text-2xl font-semibold mb-4">${item.title}</h3>
            <p class="text-muted-foreground mb-6">${item.description}</p>
            <div class="flex flex-col sm:flex-row gap-4 text-sm">
                <span class="text-gold">${item.duration}</span>
                <span class="text-gold">${item.result}</span>
            </div>
        </div>
    `).join('');
    
    // Render Blog
    document.getElementById('blog-title').textContent = siteData.blog.title;
    
    const blogContainer = document.getElementById('blog-grid');
    blogContainer.innerHTML = siteData.blog.posts.map(post => `
        <div class="blog-card card-hover">
            <div class="mb-3">
                <span class="text-xs text-gold font-semibold">${post.category}</span>
                <span class="text-xs text-muted-foreground ml-2">${post.date}</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">${post.title}</h3>
            <p class="text-muted-foreground">${post.content}</p>
        </div>
    `).join('');
    
    // Render Contacts
    document.getElementById('contacts-title').textContent = siteData.contacts.title;
    
    const contactsContainer = document.getElementById('contacts-grid');
    contactsContainer.innerHTML = siteData.contacts.contacts.map(contact => `
        <div class="contact-card card-hover">
            <div class="icon-container mb-4">
                <i data-lucide="${getLucideIcon(contact.icon)}" class="w-12 h-12 text-gold"></i>
            </div>
            <h3 class="text-lg font-semibold mb-2">${contact.title}</h3>
            <p class="text-muted-foreground">${contact.value}</p>
        </div>
    `).join('');
    
    // Render Footer
    document.getElementById('footer-text').textContent = siteData.footer.text;
    
    // Render Menu
    const menuItems = [
        { id: 'home', label: 'Главная' },
        { id: 'about', label: 'О компании' },
        { id: 'services', label: 'Услуги' },
        { id: 'portfolio', label: 'Портфолио' },
        { id: 'cases', label: 'Кейсы' },
        { id: 'blog', label: 'Блог' },
        { id: 'contacts', label: 'Контакты' }
    ];
    
    const desktopMenu = document.getElementById('desktop-menu');
    desktopMenu.innerHTML = menuItems.map(item => `
        <button onclick="scrollToSection('${item.id}')" class="menu-item text-xs font-medium transition-colors hover:text-gold uppercase tracking-wide text-muted-foreground" data-section="${item.id}">
            ${item.label}
        </button>
    `).join('');
    
    const mobileMenuNav = document.querySelector('#mobile-menu-content nav');
    mobileMenuNav.innerHTML = menuItems.map(item => `
        <button onclick="scrollToSection('${item.id}')" class="menu-item text-left text-lg font-medium transition-colors hover:text-gold uppercase tracking-wide text-muted-foreground" data-section="${item.id}">
            ${item.label}
        </button>
    `).join('');
    
    // Re-initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
    
    updateActiveMenu();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSiteData();
    
    window.addEventListener('scroll', handleScroll);
    
    document.getElementById('mobile-menu-btn').addEventListener('click', openMobileMenu);
    document.getElementById('mobile-menu-overlay').addEventListener('click', closeMobileMenu);
});

// Export for admin
window.exportSiteData = function() {
    const dataStr = JSON.stringify(siteData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'site-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Файл site-data.json скачан!');
};
