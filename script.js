// ========================================================
// ===  بيانات البورتفوليو (JSON) — عدّل هنا فقط  ===
// ========================================================
let portfolioData = null;

// ========================================================
// ===  حالة التطبيق  ===
// ========================================================
let currentLang = 'ar';
let currentTheme = 'dark';

// ========================================================
// ===  دوال التبديل  ===
// ========================================================
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    const icon = document.querySelector('#themeBtn i');
    icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function toggleLang() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', dir);
    document.getElementById('langBtn').textContent = currentLang === 'ar' ? 'EN' : 'ع';
    document.body.style.fontFamily = currentLang === 'ar' ? "'Cairo', sans-serif" : "'Outfit', sans-serif";
    renderAll();
}

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// ========================================================
// ===  بناء الأقسام  ===
// ========================================================
function d() { return portfolioData[currentLang]; }

function buildNav() {
    const data = d().nav;
    const sections = ['home','education','knowledge','certificates','projects','tools','testing','contact'];
    const ids = ['hero','education','knowledge','certificates','projects','tools','testing','contact'];
    let html = '';
    sections.forEach((s, i) => {
        html += `<a href="#${ids[i]}" class="nav-link" onclick="closeMobile()">${data[s]}</a>`;
    });
    document.getElementById('navLinks').innerHTML = html;
    document.getElementById('mobileNavLinks').innerHTML = html;
    document.getElementById('navLogo').textContent = d().meta.logo;
}

function closeMobile() {
    document.getElementById('mobileMenu').classList.remove('open');
}

function buildHero() {
    const h = d().hero;
    const skillsHtml = h.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
    const idsHtml = h.identities.map(i =>
        `<span class="flex items-center gap-1.5 text-sm" style="color: var(--fg-secondary);">
            <i class="${i.icon}" style="color: var(--accent);"></i> ${i.label}
        </span>`
    ).join('');
    return `
    <section id="hero" class="relative min-h-screen flex items-center pt-20 pb-12">
        <div class="hero-bg"><div class="hero-grid-pattern"></div></div>
        <div class="max-w-6xl mx-auto px-6 relative z-10 w-full">
            <div class="hero-flex flex items-center gap-12 lg:gap-20">
                <div class="flex-1">
                    <p class="text-sm font-semibold mb-2 tracking-wide" style="color: var(--accent);">${h.greeting}</p>
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 leading-tight" style="color: var(--fg);">${h.name}</h1>
                    <p class="text-xl font-bold mb-4" style="color: var(--fg-secondary);">${h.title}</p>
                    <p class="mb-6 max-w-lg" style="color: var(--fg-muted); line-height: 1.8;">${h.bio}</p>

                    <div class="hero-contact-info flex flex-wrap items-center gap-4 mb-5 text-sm" style="color: var(--fg-secondary);">
                        <a href="tel:${h.phone}" class="flex items-center gap-2 hover:text-[var(--accent)]">
                            <i class="fas fa-phone text-xs" style="color: var(--accent);"></i> ${h.phone}
                        </a>
                        <a href="mailto:${h.email}" class="flex items-center gap-2 hover:text-[var(--accent)]">
                            <i class="fas fa-envelope text-xs" style="color: var(--accent);"></i> ${h.email}
                        </a>
                    </div>

                    <div class="flex flex-wrap items-center gap-3 mb-6">
                        ${idsHtml}
                    </div>

                    <div class="hero-skills flex flex-wrap gap-2 mb-8">${skillsHtml}</div>

                    <div class="hero-actions flex flex-wrap gap-3">
                        <a href="${h.cvLink}" class="btn-primary" download>
                            <i class="fas fa-download"></i> ${h.cvBtn}
                        </a>
                        <a href="#projects" class="btn-outline">
                            <i class="fas fa-arrow-down"></i> ${h.worksBtn}
                        </a>
                    </div>
                </div>
                <div class="hero-photo-wrapper flex flex-col items-center gap-5">
                    <div class="photo-frame">
                        <img src="${h.photo}" alt="${h.name}" loading="lazy">
                    </div>
                    <div class="photo-socials flex gap-3">
                        <a href="${h.linkedin}" target="_blank" class="social-icon-btn" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="${h.github}" target="_blank" class="social-icon-btn" aria-label="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="mailto:${h.email}" class="social-icon-btn" aria-label="Email">
                            <i class="fas fa-envelope"></i>
                        </a>
                            <a href="${h.whatsapp}" class="social-icon-btn" aria-label="whatsapp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                        <a href="tel:${h.phone}" class="social-icon-btn" aria-label="Phone">
                            <i class="fas fa-phone"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

function buildEducation() {
    const e = d().education;
    let itemsHtml = '';
    e.items.forEach((item, i) => {
        itemsHtml += `
        <div class="relative pl-12 ${currentLang === 'en' ? 'pl-12' : 'pr-12'} ${currentLang === 'en' ? '' : 'pr-12'} reveal reveal-delay-${i+1}" style="${currentLang === 'ar' ? 'padding-right: 3rem; padding-left: 0;' : 'padding-left: 3rem; padding-right: 0;'}">
            ${i === 0 ? `<div class="timeline-line"></div>` : ''}
            <div class="timeline-dot" style="top: 6px;"></div>
            <div class="card">
                <span class="text-xs font-bold tracking-wider" style="color: var(--accent);">${item.year}</span>
                <h3 class="text-lg font-bold mt-1 mb-1" style="color: var(--fg);">${item.degree}</h3>
                <p class="text-sm font-semibold mb-2" style="color: var(--fg-secondary);">${item.university}</p>
                <p class="text-sm font-bold mb-2" style="color: var(--accent);">${item.gpa}</p>
                <p class="text-sm" style="color: var(--fg-muted);">${item.description}</p>
            </div>
        </div>`;
    });
    // Timeline الخط يغطي جميع العناصر
    const fullTimeline = `<div class="timeline-line" style="top: 6px; bottom: 0;"></div>`;
    itemsHtml = itemsHtml.replace(`<div class="timeline-line"></div>`, fullTimeline);

    return `
    <section id="education" class="py-20">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center reveal">
                <div class="accent-line mx-auto"></div>
                <h2 class="section-title">${e.title}</h2>
                <p class="section-subtitle">${e.subtitle}</p>
            </div>
            <div class="relative space-y-8">
                ${itemsHtml}
            </div>
        </div>
    </section>`;
}

function buildKnowledge() {
    const k = d().knowledge;
    let cardsHtml = '';
    k.categories.forEach((cat, i) => {
        const itemsHtml = cat.items.map(item =>
            `<li class="flex items-center gap-2 text-sm" style="color: var(--fg-secondary);">
                <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background: var(--accent);"></span>
                ${item}
            </li>`
        ).join('');
        cardsHtml += `
        <div class="knowledge-card reveal reveal-delay-${(i % 4) + 1}">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style="background: var(--accent-muted); color: var(--accent);">
                    <i class="${cat.icon}"></i>
                </div>
                <h3 class="font-bold" style="color: var(--fg);">${cat.name}</h3>
            </div>
            <ul class="space-y-2">${itemsHtml}</ul>
        </div>`;
    });
    return `
    <section id="knowledge" class="py-20" style="background: var(--bg-alt);">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center reveal">
                <div class="accent-line mx-auto"></div>
                <h2 class="section-title">${k.title}</h2>
                <p class="section-subtitle">${k.subtitle}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                ${cardsHtml}
            </div>
        </div>
    </section>`;
}

function buildCertificates() {
    const c = d().certificates;
    let itemsHtml = '';
    c.items.forEach((item, i) => {
        itemsHtml += `
        <div class="cert-card reveal reveal-delay-${(i % 4) + 1}">
            <div class="cert-icon"><i class="${item.icon}"></i></div>
            <div class="flex-1">
                <h3 class="font-bold text-sm mb-0.5" style="color: var(--fg);">${item.name}</h3>
                <p class="text-xs mb-1" style="color: var(--fg-secondary);">${item.org}</p>
                <span class="text-xs font-semibold" style="color: var(--accent);">${item.date}</span>
            </div>
        </div>`;
    });
    return `
    <section id="certificates" class="py-20">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center reveal">
                <div class="accent-line mx-auto"></div>
                <h2 class="section-title">${c.title}</h2>
                <p class="section-subtitle">${c.subtitle}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${itemsHtml}
            </div>
        </div>
    </section>`;
}

function buildProjects() {
    const p = d().projects;
    let itemsHtml = '';
    p.items.forEach((item, i) => {
        const tagsHtml = item.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
        itemsHtml += `
        <div class="project-card reveal reveal-delay-${(i % 4) + 1}">
            <div class="overflow-hidden">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="p-5">
                <h3 class="font-bold text-lg mb-2" style="color: var(--fg);">${item.title}</h3>
                <p class="text-sm mb-3" style="color: var(--fg-muted); line-height: 1.7;">${item.description}</p>
                <div class="project-tags mb-4">${tagsHtml}</div>
                <div class="flex gap-3">
                    <a href="${item.link}" class="btn-primary text-sm" style="padding: 0.5rem 1.2rem;">
                        <i class="fas fa-external-link-alt"></i>
                        <span>${currentLang === 'ar' ? 'معاينة' : 'Preview'}</span>
                    </a>
                    <a href="${item.github}" class="btn-outline text-sm" style="padding: 0.5rem 1.2rem;">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                </div>
            </div>
        </div>`;
    });
    return `
    <section id="projects" class="py-20" style="background: var(--bg-alt);">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center reveal">
                <div class="accent-line mx-auto"></div>
                <h2 class="section-title">${p.title}</h2>
                <p class="section-subtitle">${p.subtitle}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${itemsHtml}
            </div>
        </div>
    </section>`;
}

function buildTools() {
    const t = d().tools;
    let itemsHtml = '';
    t.items.forEach((item, i) => {
        itemsHtml += `
        <a href="${item.link}" target="_blank" rel="noopener" class="tool-card reveal reveal-delay-${(i % 4) + 1}">
            <div class="tool-icon-wrap"><i class="${item.icon}"></i></div>
            <h3 class="font-bold mb-1" style="color: var(--fg);">${item.name}</h3>
            <p class="text-xs mb-3" style="color: var(--fg-muted);">${item.desc}</p>
            <span class="text-xs font-semibold" style="color: var(--accent);">
                <i class="fas fa-users text-xs"></i> ${item.users} ${currentLang === 'ar' ? 'مستخدم' : 'users'}
            </span>
        </a>`;
    });
    return `
    <section id="tools" class="py-20">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center reveal">
                <div class="accent-line mx-auto"></div>
                <h2 class="section-title">${t.title}</h2>
                <p class="section-subtitle">${t.subtitle}</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                ${itemsHtml}
            </div>
        </div>
    </section>`;
}

function buildTesting() {
    const t = d().testing;
    const benefitsHtml = t.benefits.map(b =>
        `<div class="benefit-item">
            <div class="benefit-icon"><i class="fas fa-check"></i></div>
            <span class="text-sm" style="color: var(--fg-secondary);">${b}</span>
        </div>`
    ).join('');
    return `
    <section id="testing" class="py-20" style="background: var(--bg-alt);">
        <div class="max-w-4xl mx-auto px-6">
            <div class="testing-section reveal">
                <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="pulse-dot"></span>
                        <span class="text-xs font-bold tracking-wider uppercase" style="color: var(--accent);">
                            ${currentLang === 'ar' ? 'مفتوح للانضمام' : 'Open for Joining'}
                        </span>
                    </div>
                    <h2 class="section-title">${t.title}</h2>
                    <p class="text-sm font-semibold mb-4" style="color: var(--fg-secondary);">${t.subtitle}</p>
                    <p class="text-sm mb-6" style="color: var(--fg-muted); line-height: 1.8;">${t.description}</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        ${benefitsHtml}
                    </div>
                    <a href="${t.btnLink}" class="btn-primary">
                        <i class="fas fa-flask"></i> ${t.btn}
                    </a>
                </div>
            </div>
        </div>
    </section>`;
}

function buildContact() {
    const c = d().contact;
    return `
    <section id="contact" class="py-20">
        <div class="max-w-3xl mx-auto px-6">
            <div class="text-center reveal">
                <div class="accent-line mx-auto"></div>
                <h2 class="section-title">${c.title}</h2>
                <p class="section-subtitle">${c.subtitle}</p>
            </div>
            <form id="contactForm" class="card reveal" onsubmit="handleSubmit(event)" novalidate>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="form-label" for="cName">${c.namePh}</label>
                        <input id="cName" name="name" type="text" class="form-input" placeholder="${c.namePh}" required>
                    </div>
                    <div>
                        <label class="form-label" for="cEmail">${c.emailPh}</label>
                        <input id="cEmail" name="email" type="email" class="form-input" placeholder="${c.emailPh}" required>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label" for="cSubject">${c.subjectPh}</label>
                    <input id="cSubject" name="subject" type="text" class="form-input" placeholder="${c.subjectPh}" required>
                </div>
                <div class="mb-6">
                    <label class="form-label" for="cMessage">${c.messagePh}</label>
                    <textarea id="cMessage" name="message" rows="5" class="form-input" placeholder="${c.messagePh}" required style="resize: vertical;"></textarea>
                </div>
                <button type="submit" class="btn-primary w-full justify-center">
                    <i class="fas fa-paper-plane"></i> ${c.sendBtn}
                </button>
            </form>
        </div>
    </section>`;
}

function buildFooter() {
    const f = d().footer;
    return `
    <div class="flex items-center justify-center gap-2 text-sm" style="color: var(--fg-muted);">
        <span>${f.madeWith}</span>
        <i class="fas fa-heart text-xs" style="color: var(--accent);"></i>
        <span>${f.text}</span>
    </div>`;
}

// ========================================================
// ===  معالجة الفورم  ===
// ========================================================
function handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const subject = document.getElementById('cSubject').value.trim();
    const message = document.getElementById('cMessage').value.trim();
    const c = d().contact;

    if (!name || !email || !subject || !message) {
        showToast(c.errorMsg);
        return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    const originalBtnHtml = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ...`;
    btn.disabled = true;

    // إرسال البيانات إلى FormSubmit عبر AJAX
    fetch("https://formsubmit.co/ajax/mailtomecv12@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        showToast(c.successMsg);
        e.target.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        showToast(currentLang === 'ar' ? 'حدث خطأ أثناء الإرسال.' : 'Error sending message.');
    })
    .finally(() => {
        btn.innerHTML = originalBtnHtml;
        btn.disabled = false;
    });
}

// ========================================================
// ===  عرض الكل  ===
// ========================================================
function renderAll() {
    document.title = d().meta.title;
    buildNav();
    const main = document.getElementById('mainContent');
    main.innerHTML =
        buildHero() +
        '<div class="divider"></div>' +
        buildEducation() +
        buildKnowledge() +
        buildCertificates() +
        buildProjects() +
        buildTools() +
        buildTesting() +
        '<div class="divider"></div>' +
        buildContact();
    document.getElementById('footer').innerHTML = buildFooter();
    // تفعيل أنيميشن الظهور
    initReveal();
    // تحديث النافبار النشط
    initActiveNav();
}

// ========================================================
// ===  أنيميشن الظهور عند التمرير  ===
// ========================================================
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========================================================
// ===  النافبار: تمرير + رابط نشط  ===
// ========================================================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navLinks .nav-link');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`#navLinks a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
    sections.forEach(s => obs.observe(s));
}

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ========================================================
// ===  التهيئة  ===
// ========================================================
async function init() {
    try {
        const res = await fetch('portfolio_data.json');
        portfolioData = await res.json();
        renderAll();
    } catch (err) {
        console.error('Error loading portfolio data:', err);
    }
}
init();
