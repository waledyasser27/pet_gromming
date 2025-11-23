// ==========================================
// Navigation Menu Toggle with Overlay - FULLY FIXED ✅
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const navbar = document.querySelector('.navbar');

function toggleMenu() {
    if (!navLinks || !menuToggle) return;
    
    const isActive = navLinks.classList.contains('active');
    
    // Toggle menu
    navLinks.classList.toggle('active');
    if (navOverlay) {
        navOverlay.classList.toggle('active');
    }
    
    // Update ARIA attributes
    menuToggle.setAttribute('aria-expanded', (!isActive).toString());
    menuToggle.setAttribute('aria-label', isActive ? 'فتح القائمة' : 'إغلاق القائمة');
    
    // Prevent body scroll when menu is open
    if (!isActive) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    
    // Change icon
    const icon = menuToggle.querySelector('i');
    if (icon) {
        icon.className = isActive ? 'fas fa-bars' : 'fas fa-times';
    }
    
    // Console log for debugging
    console.log('Menu toggled:', !isActive);
}

// Initialize menu toggle
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }
    
    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    console.log('✅ Menu toggle initialized successfully');
} else {
    console.error('❌ Menu toggle or nav links not found!');
}

// ==========================================
// Navbar Scroll Effect
// ==========================================
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// Language Toggle (Arabic / English) - FIXED ✅
// ==========================================
const langToggleBtn = document.getElementById('langToggle');
const langToggleMobileBtn = document.getElementById('langToggleMobile');
const htmlElement = document.documentElement;

const translations = {
    ar: {
        'page.title': 'صالون العناية بالحيوانات الأليفة - خدمات احترافية في منزلك',
        'logo.title': 'صالون الحيوانات الأليفة',
        'nav.home': 'الرئيسية',
        'nav.about': 'من نحن',
        'nav.services': 'خدماتنا',
        'nav.gallery': 'معرض الأعمال',
        'nav.contact': 'اتصل بنا',
        'hero.title': 'العناية الاحترافية بحيوانك الأليف',
        'hero.subtitle': 'خدمات متميزة في راحة منزلك',
        'hero.ctaContact': 'احجز موعد',
        'hero.ctaServices': 'خدماتنا',
        'about.title': 'من نحن',
        'about.subtitle': 'نقدم جميع الخدمات الخاصة بالحيوانات الأليفة',
        'about.highlight': 'نحن متخصصون في تقديم خدمات العناية الشاملة لجميع أنواع الحيوانات الأليفة:',
        'about.dogs': 'الكلاب',
        'about.cats': 'القطط',
        'about.birds': 'الطيور',
        'about.others': 'القوارض الأخرى',
        'about.feature1': 'خدمات على أعلى مستوى احترافي',
        'about.feature2': 'قصات الشعر العالمية',
        'about.feature3': 'خدمات منزلية داخل المنزل',
        'about.feature4': 'نمتلك سيارة مجهزة بالكامل',
        'services.title': 'خدماتنا',
        'services.subtitle': 'نقدم مجموعة واسعة من الخدمات الاحترافية لحيوانك الأليف',
        'services.haircut.title': 'قصات الشعر العالمية',
        'services.haircut.desc': 'قصات عصرية واحترافية تناسب جميع السلالات والأنواع بأحدث التقنيات العالمية',
        'services.nails.title': 'قص الأظافر',
        'services.nails.desc': 'قص وتنظيف الأظافر بشكل آمن ومريح لحيوانك الأليف',
        'services.shower.title': 'الاستحمام والتنظيف',
        'services.shower.desc': 'حمامات كاملة باستخدام منتجات عالية الجودة مناسبة لكل نوع',
        'services.brush.title': 'تمشيط وتصفيف الشعر',
        'services.brush.desc': 'تصفيف احترافي وإزالة الشعر المتشابك والميت',
        'services.spray.title': 'العطور والتعطير',
        'services.spray.desc': 'استخدام عطور آمنة وخاصة بالحيوانات الأليفة',
        'services.teeth.title': 'العناية بالأسنان',
        'services.teeth.desc': 'تنظيف الأسنان والعناية بصحة الفم',
        'gallery.title': 'معرض أعمالنا',
        'gallery.subtitle': 'شاهد بعض من أعمالنا الاحترافية',
        'contact.title': 'اتصل بنا',
        'contact.subtitle': 'نحن هنا لخدمتك وخدمة حيوانك الأليف',
        'contact.phone.title': 'اتصل بنا',
        'contact.whatsapp.title': 'واتساب',
        'contact.whatsapp.cta': 'تواصل عبر واتساب',
        'footer.brand': 'صالون الحيوانات الأليفة',
        'footer.tagline': 'نقدم أفضل خدمات العناية بالحيوانات الأليفة في راحة منزلك',
        'footer.quickLinks.title': 'روابط سريعة',
        'footer.quickLinks.home': 'الرئيسية',
        'footer.quickLinks.about': 'من نحن',
        'footer.quickLinks.services': 'خدماتنا',
        'footer.quickLinks.gallery': 'معرض الأعمال',
        'footer.services.title': 'خدماتنا',
        'footer.services.haircut': 'قصات الشعر العالمية',
        'footer.services.nails': 'قص الأظافر',
        'footer.services.shower': 'الاستحمام والتنظيف',
        'footer.services.home': 'خدمات منزلية',
        'footer.copy': '© 2024 صالون الحيوانات الأليفة. جميع الحقوق محفوظة.'
    },
    en: {
        'page.title': 'Pet Care Salon - Professional Services at Your Home',
        'logo.title': 'Pet Grooming Salon',
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.services': 'Services',
        'nav.gallery': 'Gallery',
        'nav.contact': 'Contact Us',
        'hero.title': 'Professional Care for Your Pet',
        'hero.subtitle': 'Premium services at the comfort of your home',
        'hero.ctaContact': 'Book Now',
        'hero.ctaServices': 'Our Services',
        'about.title': 'About Us',
        'about.subtitle': 'We provide all pet care services',
        'about.highlight': 'We specialize in providing full-care services for all kinds of pets:',
        'about.dogs': 'Dogs',
        'about.cats': 'Cats',
        'about.birds': 'Birds',
        'about.others': 'Other Small Pets',
        'about.feature1': 'Top-level professional services',
        'about.feature2': 'International haircut styles',
        'about.feature3': 'In-home mobile services',
        'about.feature4': 'Fully equipped grooming van',
        'services.title': 'Our Services',
        'services.subtitle': 'We offer a wide range of professional services for your pet',
        'services.haircut.title': 'Premium Haircuts',
        'services.haircut.desc': 'Modern, professional cuts for all breeds using the latest techniques',
        'services.nails.title': 'Nail Trimming',
        'services.nails.desc': 'Safe and comfortable nail trimming and cleaning',
        'services.shower.title': 'Bathing & Cleaning',
        'services.shower.desc': 'Full baths using high-quality products for every type',
        'services.brush.title': 'Brushing & Styling',
        'services.brush.desc': 'Professional styling and removal of tangled and dead hair',
        'services.spray.title': 'Perfumes & Fragrance',
        'services.spray.desc': 'Safe perfumes specially made for pets',
        'services.teeth.title': 'Dental Care',
        'services.teeth.desc': 'Teeth cleaning and oral health care',
        'gallery.title': 'Our Work Gallery',
        'gallery.subtitle': 'See some of our professional work',
        'contact.title': 'Contact Us',
        'contact.subtitle': 'We are here to serve you and your pet',
        'contact.phone.title': 'Call Us',
        'contact.whatsapp.title': 'WhatsApp',
        'contact.whatsapp.cta': 'Chat on WhatsApp',
        'footer.brand': 'Pet Grooming Salon',
        'footer.tagline': 'We offer the best pet care services at the comfort of your home',
        'footer.quickLinks.title': 'Quick Links',
        'footer.quickLinks.home': 'Home',
        'footer.quickLinks.about': 'About Us',
        'footer.quickLinks.services': 'Services',
        'footer.quickLinks.gallery': 'Gallery',
        'footer.services.title': 'Our Services',
        'footer.services.haircut': 'Premium haircuts',
        'footer.services.nails': 'Nail trimming',
        'footer.services.shower': 'Bath & cleaning',
        'footer.services.home': 'Home services',
        'footer.copy': '© 2024 Pet Grooming Salon. All rights reserved.'
    }
};

let currentLang = 'ar';

function applyTranslations(lang) {
    const dict = translations[lang];
    if (!dict) return;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
    
    // Update document title
    if (dict['page.title']) {
        document.title = dict['page.title'];
    }
    
    // Update direction and language
    htmlElement.lang = lang === 'ar' ? 'ar' : 'en';
    htmlElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update both button labels
    const buttonText = lang === 'ar' ? 'EN' : 'عربي';
    if (langToggleBtn) {
        langToggleBtn.textContent = buttonText;
    }
    if (langToggleMobileBtn) {
        langToggleMobileBtn.textContent = buttonText;
    }
}

// Desktop language toggle
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        applyTranslations(currentLang);
    });
}

// Mobile language toggle (sync with desktop)
if (langToggleMobileBtn) {
    langToggleMobileBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        applyTranslations(currentLang);
    });
}

// Apply default language on load
applyTranslations(currentLang);

// ==========================================
// Simple Gallery Slider
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const simpleGalleryImages = [
        { src: 'gallery/Dog1.jfif', alt: 'قصة شعر احترافية' },
        { src: 'gallery/Dog2.jfif', alt: 'تنظيف وتصفيف' },
        { src: 'gallery/Dog3.jfif', alt: 'قص أظافر احترافي' },
        { src: 'gallery/Dog7.jfif', alt: 'استحمام ورعاية' },
        { src: 'gallery/DOG6.jfif', alt: 'تصفيف عصري' },
        { src: 'gallery/dog4.jfif', alt: 'خدمات منزلية' },
        { src: 'gallery/dog5.jfif', alt: 'خدمات منزلية' },
        { src: 'gallery/cat1.jfif', alt: 'قصة شعر احترافية' },
        { src: 'gallery/cat2.jfif', alt: 'تنظيف وتصفيف' },
        { src: 'gallery/cat4.jfif', alt: 'قص أظافر احترافي' },
        { src: 'gallery/cats3.jfif', alt: 'تصفيف عصري' },
        { src: 'gallery/t6xreHxg.jfif', alt: 'خدمات منزلية' }
    ];
    
    const simpleImgEl = document.getElementById('simpleGalleryImage');
    const simplePrevBtn = document.querySelector('.simple-gallery-prev');
    const simpleNextBtn = document.querySelector('.simple-gallery-next');
    const simpleDots = Array.from(document.querySelectorAll('.simple-gallery-dots .simple-dot'));
    let simpleIndex = 0;
    
    function updateSimpleGallery(index) {
        if (!simpleImgEl) return;
        simpleIndex = (index + simpleGalleryImages.length) % simpleGalleryImages.length;
        const item = simpleGalleryImages[simpleIndex];
        simpleImgEl.src = item.src;
        simpleImgEl.alt = item.alt;
        
        simpleDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === simpleIndex);
        });
    }
    
    if (simplePrevBtn) {
        simplePrevBtn.addEventListener('click', () => {
            updateSimpleGallery(simpleIndex - 1);
        });
    }
    
    if (simpleNextBtn) {
        simpleNextBtn.addEventListener('click', () => {
            updateSimpleGallery(simpleIndex + 1);
        });
    }
    
    simpleDots.forEach((dot, i) => {
        dot.addEventListener('click', () => updateSimpleGallery(i));
    });
    
    // Initialize gallery
    if (simpleImgEl) {
        updateSimpleGallery(0);
    }
    
    // Animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(
        '.section-header, .service-card, .pet-card, .feature-item, .info-card, .simple-gallery, .footer-section'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// ==========================================
// Scroll to Top Button
// ==========================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// Make contact cards clickable
// ==========================================
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const anchor = card.querySelector('a[href^="tel"], a[href^="https://wa.me"]');
        if (!anchor) return;
        
        // Avoid double-handling when the actual link is clicked
        if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) return;
        
        if (anchor.href.includes('wa.me')) {
            window.open(anchor.href, '_blank');
        } else {
            window.location.href = anchor.href;
        }
    });
});

// ==========================================
// Console Messages
// ==========================================
console.log('%c🐾 موقع صالون الحيوانات الأليفة! 🐾', 'color: #FF6B6B; font-size: 20px; font-weight: bold;');
console.log('%cتم تطوير الموقع بنجاح ❤️', 'color: #4ECDC4; font-size: 14px;');
console.log('%c✅ All mobile issues FIXED!', 'color: #25D366; font-size: 14px; font-weight: bold;');

// ==========================================
// Unified smooth scroll for all internal links - IMPROVED ✅
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const offset = 90; // Navbar height offset

    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const scroll = () => {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            };

            const menuOpen = navLinks && navLinks.classList.contains('active');
            if (menuOpen) {
                toggleMenu();
                setTimeout(scroll, 350);
            } else {
                scroll();
            }
        });
    });
});
