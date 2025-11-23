/**
 * MODERN PET SALON - PROFESSIONAL JAVASCRIPT
 * Clean, modular, and performance-optimized
 */

'use strict';

// ==========================================
// DOM ELEMENTS
// ==========================================
const DOM = {
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('navMenu'),
    menuToggle: document.getElementById('menuToggle'),
    navOverlay: document.getElementById('navOverlay'),
    langToggle: document.getElementById('langToggle'),
    scrollTop: document.getElementById('scrollTop'),
    galleryTrack: document.getElementById('galleryTrack'),
    galleryDots: document.getElementById('galleryDots'),
};

// ==========================================
// CONFIGURATION
// ==========================================
const CONFIG = {
    scrollOffset: 70,
    currentLang: 'ar',
    currentGalleryIndex: 0,
    galleryItems: 5, // Number of gallery items
};

// ==========================================
// NAVIGATION
// ==========================================
class Navigation {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        // Menu toggle
        DOM.menuToggle?.addEventListener('click', () => this.toggle());
        DOM.navOverlay?.addEventListener('click', () => this.close());

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close menu when clicking on links
        const navLinks = DOM.navMenu?.querySelectorAll('a');
        navLinks?.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 968) {
                    setTimeout(() => this.close(), 300);
                }
            });
        });

        // Scroll effect
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        DOM.navMenu?.classList.add('active');
        DOM.navOverlay?.classList.add('active');
        DOM.menuToggle?.classList.add('active');
        DOM.menuToggle?.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        DOM.navMenu?.classList.remove('active');
        DOM.navOverlay?.classList.remove('active');
        DOM.menuToggle?.classList.remove('active');
        DOM.menuToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    handleScroll() {
        if (window.scrollY > 50) {
            DOM.navbar?.classList.add('scrolled');
        } else {
            DOM.navbar?.classList.remove('scrolled');
        }
    }
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - CONFIG.scrollOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
class ScrollToTop {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        DOM.scrollTop?.addEventListener('click', () => this.scrollToTop());
    }

    handleScroll() {
        if (window.scrollY > 500) {
            DOM.scrollTop?.classList.add('active');
        } else {
            DOM.scrollTop?.classList.remove('active');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ==========================================
// LANGUAGE TOGGLE
// ==========================================
class LanguageToggle {
    constructor() {
        this.currentLang = CONFIG.currentLang;
        this.init();
    }

    init() {
        DOM.langToggle?.addEventListener('click', () => this.toggle());
        this.applyTranslations(this.currentLang);
    }

    toggle() {
        this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
        this.applyTranslations(this.currentLang);
    }

    applyTranslations(lang) {
        const translations = this.getTranslations();
        const dict = translations[lang];
        
        if (!dict) return;

        // Update all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        // Update document properties
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.title = dict['page.title'] || document.title;

        // Update button text
        const langToggleSpan = DOM.langToggle?.querySelector('span');
        if (langToggleSpan) {
            langToggleSpan.textContent = lang === 'ar' ? 'EN' : 'عربي';
        }
    }

    getTranslations() {
        return {
            ar: {
                'page.title': 'صالون العناية بالحيوانات الأليفة - خدمات احترافية',
                'logo.title': 'صالون الحيوانات الأليفة',
                'nav.home': 'الرئيسية',
                'nav.about': 'من نحن',
                'nav.services': 'خدماتنا',
                'nav.gallery': 'معرض الأعمال',
                'nav.contact': 'اتصل بنا',
                'hero.title': 'العناية الاحترافية بحيوانك الأليف',
                'hero.subtitle': 'خدمات متميزة في راحة منزلك • نقدم أفضل رعاية لأصدقائك الأوفياء',
                'hero.ctaContact': 'احجز موعد الآن',
                'hero.ctaServices': 'اكتشف خدماتنا',
                'about.badge': 'من نحن',
                'about.title': 'نقدم جميع الخدمات الخاصة بالحيوانات الأليفة',
                'about.description': 'نحن متخصصون في تقديم خدمات العناية الشاملة لجميع أنواع الحيوانات الأليفة بأعلى معايير الجودة والاحترافية',
                'about.dogs': 'الكلاب',
                'about.dogs.desc': 'جميع السلالات والأحجام',
                'about.cats': 'القطط',
                'about.cats.desc': 'رعاية خاصة ولطيفة',
                'about.birds': 'الطيور',
                'about.birds.desc': 'عناية متخصصة',
                'about.others': 'القوارض',
                'about.others.desc': 'خدمات شاملة',
                'about.feature1.title': 'خدمات احترافية',
                'about.feature1.desc': 'على أعلى مستوى من الجودة',
                'about.feature2.title': 'قصات عالمية',
                'about.feature2.desc': 'أحدث التصميمات العصرية',
                'about.feature3.title': 'خدمات منزلية',
                'about.feature3.desc': 'نأتي إليك في أي مكان',
                'about.feature4.title': 'سيارة مجهزة',
                'about.feature4.desc': 'صالون متنقل بالكامل',
                'services.badge': 'خدماتنا',
                'services.title': 'ماذا نقدم لحيوانك الأليف؟',
                'services.description': 'مجموعة واسعة من الخدمات الاحترافية المصممة خصيصاً لراحة وصحة حيوانك الأليف',
                'services.haircut.title': 'قصات الشعر العالمية',
                'services.haircut.desc': 'قصات عصرية واحترافية تناسب جميع السلالات والأنواع بأحدث التقنيات العالمية',
                'services.shower.title': 'الاستحمام والتنظيف',
                'services.shower.desc': 'حمامات كاملة باستخدام منتجات عالية الجودة مناسبة لكل نوع',
                'services.nails.title': 'قص الأظافر',
                'services.nails.desc': 'قص وتنظيف الأظافر بشكل آمن ومريح لحيوانك الأليف',
                'services.brush.title': 'تمشيط وتصفيف الشعر',
                'services.brush.desc': 'تصفيف احترافي وإزالة الشعر المتشابك والميت',
                'services.spray.title': 'العطور والتعطير',
                'services.spray.desc': 'استخدام عطور آمنة وخاصة بالحيوانات الأليفة',
                'services.teeth.title': 'العناية بالأسنان',
                'services.teeth.desc': 'تنظيف الأسنان والعناية بصحة الفم',
                'gallery.badge': 'معرض الأعمال',
                'gallery.title': 'شاهد أعمالنا الاحترافية',
                'gallery.description': 'نفخر بتقديم أفضل النتائج لعملائنا الكرام',
                'contact.badge': 'اتصل بنا',
                'contact.title': 'تواصل معنا الآن',
                'contact.description': 'نحن هنا لخدمتك وخدمة حيوانك الأليف في أي وقت',
                'contact.phone.title': 'اتصل بنا',
                'contact.phone.hours': 'متاحون من 9 صباحاً - 9 مساءً',
                'contact.whatsapp.title': 'واتساب',
                'contact.whatsapp.cta': 'تواصل عبر واتساب',
                'contact.whatsapp.fast': 'رد فوري على استفساراتك',
                'footer.brand': 'صالون الحيوانات الأليفة',
                'footer.tagline': 'نقدم أفضل خدمات العناية بالحيوانات الأليفة في راحة منزلك',
                'footer.quickLinks.title': 'روابط سريعة',
                'footer.quickLinks.home': 'الرئيسية',
                'footer.quickLinks.about': 'من نحن',
                'footer.quickLinks.services': 'خدماتنا',
                'footer.quickLinks.gallery': 'معرض الأعمال',
                'footer.services.title': 'خدماتنا',
                'footer.services.haircut': 'قصات الشعر العالمية',
                'footer.services.shower': 'الاستحمام والتنظيف',
                'footer.services.nails': 'قص الأظافر',
                'footer.services.home': 'خدمات منزلية',
                'footer.hours.title': 'أوقات العمل',
                'footer.hours.weekdays': 'السبت - الخميس: 9ص - 9م',
                'footer.hours.friday': 'الجمعة: 2م - 9م',
                'footer.copyright': '© 2024 صالون الحيوانات الأليفة. جميع الحقوق محفوظة.',
            },
            en: {
                'page.title': 'Pet Care Salon - Professional Services',
                'logo.title': 'Pet Grooming Salon',
                'nav.home': 'Home',
                'nav.about': 'About Us',
                'nav.services': 'Services',
                'nav.gallery': 'Gallery',
                'nav.contact': 'Contact',
                'hero.title': 'Professional Care for Your Pet',
                'hero.subtitle': 'Premium services at the comfort of your home • Best care for your loyal friends',
                'hero.ctaContact': 'Book Now',
                'hero.ctaServices': 'Discover Services',
                'about.badge': 'About Us',
                'about.title': 'We Provide All Pet Care Services',
                'about.description': 'We specialize in providing comprehensive care services for all types of pets with the highest quality and professional standards',
                'about.dogs': 'Dogs',
                'about.dogs.desc': 'All breeds and sizes',
                'about.cats': 'Cats',
                'about.cats.desc': 'Special gentle care',
                'about.birds': 'Birds',
                'about.birds.desc': 'Specialized care',
                'about.others': 'Rodents',
                'about.others.desc': 'Comprehensive services',
                'about.feature1.title': 'Professional Services',
                'about.feature1.desc': 'Highest quality standards',
                'about.feature2.title': 'International Cuts',
                'about.feature2.desc': 'Latest modern designs',
                'about.feature3.title': 'Home Services',
                'about.feature3.desc': 'We come to you anywhere',
                'about.feature4.title': 'Equipped Van',
                'about.feature4.desc': 'Fully mobile salon',
                'services.badge': 'Services',
                'services.title': 'What We Offer for Your Pet?',
                'services.description': 'Wide range of professional services designed specifically for your pet\'s comfort and health',
                'services.haircut.title': 'Premium Haircuts',
                'services.haircut.desc': 'Modern professional cuts for all breeds using the latest international techniques',
                'services.shower.title': 'Bathing & Cleaning',
                'services.shower.desc': 'Full baths using high-quality products suitable for every type',
                'services.nails.title': 'Nail Trimming',
                'services.nails.desc': 'Safe and comfortable nail trimming and cleaning',
                'services.brush.title': 'Brushing & Styling',
                'services.brush.desc': 'Professional styling and removal of tangled and dead hair',
                'services.spray.title': 'Perfumes & Fragrance',
                'services.spray.desc': 'Safe perfumes specially made for pets',
                'services.teeth.title': 'Dental Care',
                'services.teeth.desc': 'Teeth cleaning and oral health care',
                'gallery.badge': 'Gallery',
                'gallery.title': 'See Our Professional Work',
                'gallery.description': 'We pride ourselves on delivering the best results for our valued clients',
                'contact.badge': 'Contact',
                'contact.title': 'Get in Touch Now',
                'contact.description': 'We are here to serve you and your pet anytime',
                'contact.phone.title': 'Call Us',
                'contact.phone.hours': 'Available 9 AM - 9 PM',
                'contact.whatsapp.title': 'WhatsApp',
                'contact.whatsapp.cta': 'Chat on WhatsApp',
                'contact.whatsapp.fast': 'Instant response to your inquiries',
                'footer.brand': 'Pet Grooming Salon',
                'footer.tagline': 'We offer the best pet care services at the comfort of your home',
                'footer.quickLinks.title': 'Quick Links',
                'footer.quickLinks.home': 'Home',
                'footer.quickLinks.about': 'About',
                'footer.quickLinks.services': 'Services',
                'footer.quickLinks.gallery': 'Gallery',
                'footer.services.title': 'Our Services',
                'footer.services.haircut': 'Premium Haircuts',
                'footer.services.shower': 'Bath & Cleaning',
                'footer.services.nails': 'Nail Trimming',
                'footer.services.home': 'Home Services',
                'footer.hours.title': 'Working Hours',
                'footer.hours.weekdays': 'Saturday - Thursday: 9 AM - 9 PM',
                'footer.hours.friday': 'Friday: 2 PM - 9 PM',
                'footer.copyright': '© 2024 Pet Grooming Salon. All rights reserved.',
            }
        };
    }
}

// ==========================================
// GALLERY SLIDER
// ==========================================
class GallerySlider {
    constructor() {
        this.container = document.querySelector('.gallery-container');
        this.track = DOM.galleryTrack;
        this.items = this.track?.children || [];
        this.itemWidth = 0;
        this.init();
    }

    init() {
        if (!this.container || !this.track || !this.items.length) return;

        this.updateItemWidth();
        this.bindEvents();
    }

    bindEvents() {
        const prevBtn = document.querySelector('.gallery-prev');
        const nextBtn = document.querySelector('.gallery-next');
        
        prevBtn?.addEventListener('click', () => this.scroll(-1));
        nextBtn?.addEventListener('click', () => this.scroll(1));

        window.addEventListener('resize', () => this.updateItemWidth());
    }

    updateItemWidth() {
        const firstItem = this.items[0];
        if (firstItem) {
            const rect = firstItem.getBoundingClientRect();
            this.itemWidth = rect.width + 16; // include gap
        } else {
            this.itemWidth = this.container.clientWidth * 0.8;
        }
    }

    scroll(direction) {
        const step = this.itemWidth || this.container.clientWidth * 0.8;
        this.container.scrollBy({
            left: direction * step,
            behavior: 'smooth'
        });
    }
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
class Performance {
    static init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Debounce scroll events
        this.optimizeScrollEvents();
    }

    static lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    static optimizeScrollEvents() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new Navigation();
    new SmoothScroll();
    new ScrollToTop();
    new LanguageToggle();
    new GallerySlider();
    new ScrollAnimations();
    Performance.init();

    // Console welcome message
    console.log('%c🐾 صالون الحيوانات الأليفة 🐾', 
        'color: #FF6B6B; font-size: 24px; font-weight: bold;');
    console.log('%c✨ تم تطوير الموقع بأفضل الممارسات الحديثة', 
        'color: #4ECDC4; font-size: 14px;');
});

// ==========================================
// UTILITIES
// ==========================================
const Utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Navigation, SmoothScroll, LanguageToggle, GallerySlider };
}
