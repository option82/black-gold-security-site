// Admin State
let isAdminMode = false;
const ADMIN_PASSWORD = 'admin123';

// Show Auth Dialog
function showAuthDialog() {
    document.getElementById('auth-dialog').classList.remove('hidden');
    document.getElementById('auth-dialog').classList.add('flex');
    document.getElementById('auth-password').value = '';
    document.getElementById('auth-password').focus();
}

// Hide Auth Dialog
function hideAuthDialog() {
    document.getElementById('auth-dialog').classList.add('hidden');
    document.getElementById('auth-dialog').classList.remove('flex');
}

// Authenticate Admin
function authenticateAdmin() {
    const password = document.getElementById('auth-password').value;
    if (password === ADMIN_PASSWORD) {
        isAdminMode = true;
        hideAuthDialog();
        showAdminPanel();
        enableEditing();
        showToast('Режим редактирования активирован');
    } else {
        showToast('Неверный пароль', 'error');
    }
}

// Show Admin Panel
function showAdminPanel() {
    document.getElementById('admin-panel').classList.remove('hidden');
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Hide Admin Panel
function hideAdminPanel() {
    document.getElementById('admin-panel').classList.add('hidden');
}

// Exit Admin Mode
function exitAdminMode() {
    isAdminMode = false;
    hideAdminPanel();
    disableEditing();
    saveSiteData();
    showToast('Изменения сохранены');
}

// Enable Editing
function enableEditing() {
    makeEditable('hero-title', 'hero.title');
    makeEditable('hero-subtitle', 'hero.subtitle');
    makeEditable('about-title', 'about.title');
    makeEditable('about-description', 'about.description');
    makeEditable('services-title', 'services.title');
    makeEditable('services-subtitle', 'services.subtitle');
    makeEditable('portfolio-title', 'portfolio.title');
    makeEditable('cases-title', 'cases.title');
    makeEditable('blog-title', 'blog.title');
    makeEditable('contacts-title', 'contacts.title');
    makeEditable('footer-text', 'footer.text');
}

// Disable Editing
function disableEditing() {
    document.querySelectorAll('.editable').forEach(el => {
        el.classList.remove('editable');
        el.contentEditable = false;
        el.removeEventListener('blur', saveContentFromElement);
    });
}

// Make Element Editable
function makeEditable(elementId, dataPath) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.classList.add('editable');
    element.contentEditable = true;
    element.dataset.path = dataPath;
    
    element.addEventListener('blur', function() {
        saveContentFromElement(this);
    });
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.blur();
        }
    });
}

// Save Content from Element
function saveContentFromElement(element) {
    const path = element.dataset.path;
    const value = element.textContent.trim();
    
    if (!path || !value) return;
    
    const keys = path.split('.');
    let obj = siteData;
    
    for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
    }
    
    obj[keys[keys.length - 1]] = value;
    saveSiteData();
}

// Update Nested Value
function updateNestedValue(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
}

// Enable Array Item Editing
function enableArrayEditing() {
    // Services
    document.querySelectorAll('.service-card h3').forEach((el, index) => {
        makeArrayItemEditable(el, `services.items.${index}.title`);
    });
    
    document.querySelectorAll('.service-card p').forEach((el, index) => {
        makeArrayItemEditable(el, `services.items.${index}.description`);
    });
    
    // Portfolio
    document.querySelectorAll('.portfolio-card h3').forEach((el, index) => {
        makeArrayItemEditable(el, `portfolio.items.${index}.title`);
    });
    
    document.querySelectorAll('.portfolio-card p').forEach((el, index) => {
        makeArrayItemEditable(el, `portfolio.items.${index}.description`);
    });
    
    // Cases
    document.querySelectorAll('.case-card h3').forEach((el, index) => {
        makeArrayItemEditable(el, `cases.items.${index}.title`);
    });
    
    document.querySelectorAll('.case-card > p').forEach((el, index) => {
        makeArrayItemEditable(el, `cases.items.${index}.description`);
    });
    
    // Blog
    document.querySelectorAll('.blog-card h3').forEach((el, index) => {
        makeArrayItemEditable(el, `blog.posts.${index}.title`);
    });
    
    document.querySelectorAll('.blog-card > p').forEach((el, index) => {
        makeArrayItemEditable(el, `blog.posts.${index}.content`);
    });
    
    // Contacts
    document.querySelectorAll('.contact-card p').forEach((el, index) => {
        makeArrayItemEditable(el, `contacts.contacts.${index}.value`);
    });
    
    // Stats
    document.querySelectorAll('.stat-card .text-4xl').forEach((el, index) => {
        makeArrayItemEditable(el, `about.stats.${index}.value`);
    });
    
    document.querySelectorAll('.stat-card .text-muted-foreground').forEach((el, index) => {
        makeArrayItemEditable(el, `about.stats.${index}.label`);
    });
}

// Make Array Item Editable
function makeArrayItemEditable(element, path) {
    element.classList.add('editable');
    element.contentEditable = true;
    element.dataset.path = path;
    
    element.addEventListener('blur', function() {
        const keys = this.dataset.path.split('.');
        const value = this.textContent.trim();
        
        let obj = siteData;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!isNaN(key)) {
                obj = obj[parseInt(key)];
            } else {
                obj = obj[key];
            }
        }
        
        const lastKey = keys[keys.length - 1];
        obj[lastKey] = value;
        
        saveSiteData();
    });
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.blur();
        }
    });
}

// Event Listeners for Admin
document.addEventListener('DOMContentLoaded', () => {
    // Admin button
    document.getElementById('admin-btn').addEventListener('click', showAuthDialog);
    
    // Auth overlay
    document.getElementById('auth-overlay').addEventListener('click', hideAuthDialog);
    
    // Auth submit
    document.getElementById('auth-submit').addEventListener('click', authenticateAdmin);
    
    // Auth password enter key
    document.getElementById('auth-password').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            authenticateAdmin();
        }
    });
    
    // Admin exit
    document.getElementById('admin-exit').addEventListener('click', exitAdminMode);
    
    // Export button
    document.getElementById('export-btn').addEventListener('click', () => {
        window.exportSiteData();
    });
    
    // Watch for content changes to enable array editing
    const observer = new MutationObserver(() => {
        if (isAdminMode) {
            enableArrayEditing();
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Logo Upload
function setupLogoUpload() {
    const logoElements = [
        document.getElementById('header-logo'),
        document.getElementById('footer-logo')
    ];
    
    logoElements.forEach(logo => {
        if (!isAdminMode) return;
        
        logo.style.cursor = 'pointer';
        logo.title = 'Кликните для изменения логотипа';
        
        logo.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageUrl = event.target.result;
                    siteData.logo = imageUrl;
                    saveSiteData();
                    renderSite();
                    showToast('Логотип обновлен');
                };
                reader.readAsDataURL(file);
            });
            
            input.click();
        });
    });
}

// Enable logo upload when admin mode is active
setInterval(() => {
    if (isAdminMode && siteData) {
        setupLogoUpload();
    }
}, 1000);
