// ================================================================
//  STATE
// ================================================================
let portfolioData = null;
let currentLang = 'ar';
let currentTheme = 'light';
let mobileOpen = false;

function d() {
    return portfolioData[currentLang];
}

// ================================================================
//  TOGGLES
// ================================================================
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.getElementById('themeIcon').setAttribute(
        'data-icon',
        currentTheme === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'
    );
}

function toggleLang() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.getElementById('langBtn').textContent = currentLang === 'ar' ? 'EN' : 'ع';
    renderAll();
}

function toggleMobileMenu() {
    mobileOpen = !mobileOpen;
    document.getElementById('mobileMenu').classList.toggle('open');
    const l1 = document.getElementById('ml1');
    const l2 = document.getElementById('ml2');
    if (mobileOpen) {
        l1.style.transform = 'rotate(45deg) translate(2px, 2px)';
        l1.style.width = '20px';
        l2.style.transform = 'rotate(-45deg) translate(2px, -2px)';
        l2.style.width = '20px';
        document.body.style.overflow = 'hidden';
    } else {
        l1.style.transform = 'none';
        l1.style.width = '20px';
        l2.style.transform = 'none';
        l2.style.width = '14px';
        document.body.style.overflow = '';
    }
}

function closeMobile() {
    if (!mobileOpen) return;
    toggleMobileMenu();
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// ================================================================
//  NAV
// ================================================================
function buildNav() {
    const data = d().nav;
    const keys = [
        'home', 'education', 'experience', 'knowledge',
        'certificates', 'projects', 'tools', 'testimonials',
        'testing', 'contact'
    ];
    let html = '';
    keys.forEach(k => {
        html += `<a href="#${k}" class="nav-link" onclick="closeMobile()">${data[k]}</a>`;
    });
    document.getElementById('navLinks').innerHTML = html;
    document.getElementById('mobileNavLinks').innerHTML = html;
    document.getElementById('navLogo').textContent = d().meta.logo;
}

// ================================================================
//  HERO — IMPROVED TITLE SIZE
// ================================================================
function buildHero() {
    const h = d().hero;
    const skills = h.skills.map(s => `<span class="skill-pill">${s}</span>`).join('');
    const ids = h.identities.map(i =>
        `<span class="flex items-center gap-1.5 text-sm font-medium" style="color:var(--fg-sec);">
            <span class="iconify" data-icon="${i.icon}" data-width="15" style="color:var(--accent);"></span>
            ${i.label}
        </span>`
    ).join('');
    const isAr = currentLang === 'ar';

    return `
    <section id="hero" class="min-h-screen flex items-end pb-16 lg:pb-24 pt-20">
        <div class="max-w-[1200px] mx-auto px-6 w-full">
            <div class="mb-8 reveal">
                <span class="section-num">${h.greeting}</span>
            </div>
            <div class="hero-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
                <div class="lg:col-span-7">
                    <h1 class="reveal text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.88] tracking-[-0.04em]" style="color:var(--fg);">${h.name}</h1>
                    <p class="reveal reveal-d1 text-xl font-bold mt-3" style="color:var(--fg-sec);">${h.title}</p>
                    <p class="reveal reveal-d2 text-sm mt-4 max-w-lg leading-relaxed" style="color:var(--fg-muted);">${h.bio}</p>
                    <div class="reveal reveal-d3 flex flex-wrap gap-3 mt-5">${ids}</div>
                </div>
                <div class="hero-photo-col lg:col-span-5 flex flex-col items-center gap-6">
                    <div class="reveal aspect-square w-48 lg:w-56 border-2 overflow-hidden" style="border-color:var(--accent);">
                        <img src="${h.photo}" alt="${h.name}" class="w-full h-full object-cover" loading="lazy">
                    </div>
                    <div class="reveal reveal-d1 flex gap-2">
                        <a href="${h.linkedin}" target="_blank" class="social-btn"><span class="iconify" data-icon="mdi:linkedin" data-width="16"></span></a>
                        <a href="${h.github}" target="_blank" class="social-btn"><span class="iconify" data-icon="mdi:github" data-width="16"></span></a>
                        <a href="mailto:${h.email}" class="social-btn"><span class="iconify" data-icon="mdi:email-outline" data-width="16"></span></a>
                        <a href="${h.whatsapp}" target="_blank" class="social-btn"><span class="iconify" data-icon="mdi:whatsapp" data-width="16"></span></a>
                        <a href="tel:${h.phone}" class="social-btn"><span class="iconify" data-icon="mdi:phone-outline" data-width="16"></span></a>
                    </div>
                </div>
            </div>
            <div class="reveal reveal-d3 flex flex-wrap items-center gap-2 mt-10">${skills}</div>
            <div class="reveal reveal-d4 flex flex-wrap gap-3 mt-10 pt-8 border-t" style="border-color:var(--border);">
                <a href="${h.cvLink}" class="btn-accent" download>
                    <span class="iconify" data-icon="mdi:download" data-width="14"></span>
                    ${h.cvBtn}
                </a>
                <a href="#projects" class="btn-swiss">
                    <span class="iconify" data-icon="mdi:arrow-down" data-width="14"></span>
                    ${h.worksBtn}
                </a>
                <div class="hidden sm:flex items-center gap-6 ${isAr ? 'mr-auto' : 'ml-auto'}">
                    <a href="tel:${h.phone}" class="text-xs flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors" style="color:var(--fg-sec);">
                        <span class="iconify" data-icon="mdi:phone-outline" data-width="12" style="color:var(--accent);"></span>
                        ${h.phone}
                    </a>
                    <a href="mailto:${h.email}" class="text-xs flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors" style="color:var(--fg-sec);">
                        <span class="iconify" data-icon="mdi:email-outline" data-width="12" style="color:var(--accent);"></span>
                        ${h.email}
                    </a>
                </div>
            </div>
        </div>
    </section>`;
}

// ================================================================
//  EDUCATION — LARGER DEGREE TEXT
// ================================================================
function buildEducation() {
    const e = d().education;
    const padSide = currentLang === 'ar' ? 'right' : 'left';
    const items = e.items.map((item, i) => `
        <div class="relative reveal reveal-d${i + 1}" style="padding-${padSide}: 2.25rem;">
            <div class="tl-dot"></div>
            <span class="exp-year">${item.year}</span>
            <h3 class="text-lg font-bold mt-1.5" style="color:var(--fg);">${item.degree}</h3>
            <p class="text-sm font-semibold mt-0.5" style="color:var(--fg-sec);">${item.university}</p>
            <p class="text-sm font-bold mt-1" style="color:var(--accent);">${item.gpa}</p>
            <p class="text-sm mt-1" style="color:var(--fg-muted);">${item.description}</p>
        </div>
    `).join('');

    return `
    <section id="education" class="py-20 lg:py-28">
        <div class="max-w-3xl mx-auto px-6">
            <div class="mb-14 reveal">
                <span class="section-num">01 — ${e.title}</span>
                <div class="red-line mt-3"></div>
                <p class="section-sub mt-4">${e.subtitle}</p>
            </div>
            <div class="relative space-y-10">
                <div class="tl-line"></div>
                ${items}
            </div>
        </div>
    </section>`;
}

// ================================================================
//  EXPERIENCE — LARGER ROLE + CURRENT BADGE
// ================================================================
function buildExperience() {
    const e = d().experience;
    const padSide = currentLang === 'ar' ? 'right' : 'left';
    const isAr = currentLang === 'ar';
    const presentText = isAr ? 'حتى الآن' : 'Present';

    const items = e.items.map((item, i) => {
        const tags = item.tags.map(t => `<span class="exp-tag">${t}</span>`).join('');
        const currentBadge = item.current
            ? `<span class="current-badge"><span class="current-badge-dot"></span>${presentText}</span>`
            : '';
        return `
        <div class="relative reveal reveal-d${(i % 4) + 1}" style="padding-${padSide}: 2.25rem;">
            <div class="tl-dot ${item.current ? 'active' : ''}"></div>
            <div class="flex flex-wrap items-center gap-2 mb-1.5">
                <span class="exp-year">${item.year}</span>
                ${currentBadge}
            </div>
            <h3 class="exp-role">${item.role}</h3>
            <p class="exp-company">${item.company}</p>
            <p class="exp-desc">${item.description}</p>
            <div class="exp-tags">${tags}</div>
        </div>`;
    }).join('');

    return `
    <section id="experience" class="py-20 lg:py-28" style="background:var(--bg-alt);">
        <div class="max-w-3xl mx-auto px-6">
            <div class="mb-14 reveal">
                <span class="section-num">02 — ${e.title}</span>
                <div class="red-line mt-3"></div>
                <p class="section-sub mt-4">${e.subtitle}</p>
            </div>
            <div class="relative space-y-14">
                <div class="tl-line"></div>
                ${items}
            </div>
        </div>
    </section>`;
}

// ================================================================
//  KNOWLEDGE — LARGER CATEGORY NAMES
// ================================================================
function buildKnowledge() {
    const k = d().knowledge;
    const cards = k.categories.map((cat, i) => {
        const items = cat.items.map(item =>
            `<li class="flex items-center gap-2 text-sm" style="color:var(--fg-sec);">
                <span class="w-1 h-1 rounded-full flex-shrink-0" style="background:var(--accent);"></span>
                ${item}
            </li>`
        ).join('');
        return `
        <div class="swiss-card p-6 reveal reveal-d${(i % 4) + 1}">
            <div class="flex items-center gap-3 mb-4">
                <span class="iconify" data-icon="${cat.icon}" data-width="20" style="color:var(--accent);"></span>
                <h3 class="text-base font-bold" style="color:var(--fg);">${cat.name}</h3>
            </div>
            <ul class="space-y-2.5">${items}</ul>
        </div>`;
    }).join('');

    return `
    <section id="knowledge" class="py-20 lg:py-28">
        <div class="max-w-[1200px] mx-auto px-6">
            <div class="mb-14 reveal">
                <span class="section-num">03 — ${k.title}</span>
                <div class="red-line mt-3"></div>
                <p class="section-sub mt-4">${k.subtitle}</p>
            </div>
            <div class="knowledge-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style="background:var(--border);">
                ${cards}
            </div>
        </div>
    </section>`;
}

// ================================================================
//  CERTIFICATES — LARGER NAMES
// ================================================================
function buildCertificates() {
    const c = d().certificates;
    const rows = c.items.map((item, i) => `
        <div class="cert-row reveal reveal-d${(i % 4) + 1}">
            <span class="iconify flex-shrink-0" data-icon="${item.icon}" data-width="22" style="color:var(--accent);"></span>
            <div class="flex-1 min-w-0">
                <h3 class="cert-name truncate">${item.name}</h3>
                <p class="text-sm" style="color:var(--fg-sec);">${item.org}</p>
            </div>
            <span class="text-[10px] font-bold tracking-wider flex-shrink-0" style="color:var(--accent);">${item.date}</span>
        </div>
    `).join('');

    return `
    <section id="certificates" class="py-20 lg:py-28" style="background:var(--bg-alt);">
        <div class="max-w-3xl mx-auto px-6">
            <div class="mb-14 reveal">
                <span class="section-num">04 — ${c.title}</span>
                <div class="red-line mt-3"></div>
                <p class="section-sub mt-4">${c.subtitle}</p>
            </div>
            <div class="border-t" style="border-color:var(--border);">${rows}</div>
        </div>
    </section>`;
}

// ================================================================
//  PROJECTS — LARGER TITLES + BIGGER DESCRIPTIONS
// ================================================================
function buildProjects() {
    const p = d().projects;
    const isAr = currentLang === 'ar';
    const arrowIcon = isAr ? 'mdi:arrow-top-left' : 'mdi:arrow-top-right';
    const rows = p.items.map((item, i) => {
        const tags = item.tags.map(t => `<span class="tag">${t}</span>`).join('');
        return `
        <a href="${item.link}" target="_blank" class="proj-row grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-8 lg:py-10 px-2 reveal reveal-d${(i % 4) + 1}">
            <div class="md:col-span-1">
                <span class="proj-num text-sm font-mono transition-colors" style="color:var(--fg-muted);">0${i + 1}</span>
            </div>
            <div class="md:col-span-3">
                <div class="aspect-[9/16] max-h-52 overflow-hidden border" style="border-color:var(--border);">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover object-top opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500" loading="lazy">
                </div>
            </div>
            <div class="md:col-span-5">
                <h3 class="proj-title text-lg lg:text-xl font-black tracking-tight transition-colors" style="color:var(--fg);">${item.title}</h3>
                <p class="text-sm mt-2 leading-relaxed" style="color:var(--fg-muted);">${item.description}</p>
                <div class="flex flex-wrap gap-1.5 mt-3">${tags}</div>
            </div>
            <div class="md:col-span-3 flex items-center gap-3 ${isAr ? 'md:flex-row-reverse' : ''}">
                <a href="${item.github}" target="_blank" onclick="event.stopPropagation();" class="btn-swiss text-[9px]" style="padding:0.5rem 1rem;">
                    <span class="iconify" data-icon="mdi:github" data-width="12"></span> GitHub
                </a>
                <span class="iconify proj-arrow transition-all duration-300" data-icon="${arrowIcon}" data-width="22" style="color:var(--fg-muted);"></span>
            </div>
        </a>`;
    }).join('');

    const allProjectsText = isAr ? 'كل المشاريع على GitHub' : 'All projects on GitHub';
    const arrowDir = isAr ? 'left' : 'right';

    return `
    <section id="projects" class="py-20 lg:py-28">
        <div class="max-w-[1200px] mx-auto px-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
                <div class="reveal">
                    <span class="section-num">05 — ${p.title}</span>
                    <div class="red-line mt-3"></div>
                    <p class="section-sub mt-4">${p.subtitle}</p>
                </div>
                <a href="https://github.com/m4a28" target="_blank" class="reveal group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[var(--accent)] transition-colors" style="color:var(--fg-muted);">
                    <span>${allProjectsText}</span>
                    <span class="iconify transition-transform group-hover:translate-x-1" data-icon="mdi:arrow-${arrowDir}" data-width="12"></span>
                </a>
            </div>
            <div class="border-t" style="border-color:var(--border);">
                ${rows}
            </div>
        </div>
    </section>`;
}

// ================================================================
//  TOOLS — LARGER NAMES
// ================================================================
function buildTools() {
    const t = d().tools;
    const isAr = currentLang === 'ar';
    const userLabel = isAr ? 'مستخدم' : 'users';
    const cards = t.items.map((item, i) => `
        <a href="${item.link}" target="_blank" class="tool-card reveal reveal-d${(i % 4) + 1}">
            <span class="iconify tool-icon transition-colors" data-icon="${item.icon}" data-width="26" style="color:var(--fg-sec);"></span>
            <h3 class="tool-name">${item.name}</h3>
            <p class="tool-desc">${item.desc}</p>
            <span class="tool-users">
                <span class="iconify inline-block align-middle" data-icon="mdi:account-group-outline" data-width="12"></span>
                ${item.users} ${userLabel}
            </span>
        </a>
    `).join('');

    return `
    <section id="tools" class="py-20 lg:py-28" style="background:var(--bg-alt);">
        <div class="max-w-[1200px] mx-auto px-6">
            <div class="mb-14 reveal">
                <span class="section-num">06 — ${t.title}</span>
                <div class="red-line mt-3"></div>
                <p class="section-sub mt-4">${t.subtitle}</p>
            </div>
            <div class="tools-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px" style="background:var(--border);">
                ${cards}
            </div>
        </div>
    </section>`;
}

// ================================================================
//  TESTIMONIALS — BIGGER TEXT
// ================================================================
function buildTestimonials() {
    const t = d().testimonials;
    const cards = t.items.map((item, i) => {
        let stars = '';
        for (let s = 1; s <= 5; s++) {
            stars += `<span class="iconify testi-star ${s > item.rating ? 'empty' : ''}" data-icon="mdi:star" data-width="14"></span>`;
        }
        return `
        <div class="testi-card reveal reveal-d${(i % 4) + 1}">
            <div>
                <div class="testi-stars">${stars}</div>
                <p class="testi-text">"${item.text}"</p>
            </div>
            <div class="testi-author">
                <p class="testi-name">${item.name}</p>
                <p class="testi-role">${item.role}</p>
            </div>
        </div>`;
    }).join('');

    return `
    <section id="testimonials" class="py-20 lg:py-28">
        <div class="max-w-[1200px] mx-auto px-6">
            <div class="mb-14 reveal">
                <span class="section-num">07 — ${t.title}</span>
                <div class="red-line mt-3"></div>
                <p class="section-sub mt-4">${t.subtitle}</p>
            </div>
            <div class="testi-grid">
                ${cards}
            </div>
        </div>
    </section>`;
}

// ================================================================
//  TESTING
// ================================================================
function buildTesting() {
    const t = d().testing;
    const openLabel = currentLang === 'ar' ? 'مفتوح للانضمام' : 'Open for Joining';
    const benefits = t.benefits.map(b =>
        `<div class="flex items-center gap-3">
            <span class="w-5 h-5 flex items-center justify-center flex-shrink-0" style="color:var(--accent);">
                <span class="iconify" data-icon="mdi:check-bold" data-width="12"></span>
            </span>
            <span class="text-sm" style="color:var(--fg-sec);">${b}</span>
        </div>`
    ).join('');

    return `
    <section id="testing" class="py-20 lg:py-28" style="background:var(--bg-alt);">
        <div class="max-w-3xl mx-auto px-6">
            <div class="testing-box p-8 lg:p-12 reveal">
                <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="pulse-dot"></span>
                        <span class="text-[10px] font-bold tracking-widest uppercase" style="color:var(--accent);">${openLabel}</span>
                    </div>
                    <h2 class="section-title">${t.title}</h2>
                    <p class="text-sm font-semibold mt-2" style="color:var(--fg-sec);">${t.subtitle}</p>
                    <p class="text-sm mt-4 leading-relaxed" style="color:var(--fg-muted);">${t.description}</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">${benefits}</div>
                    <div class="mt-8">
                        <a href="${t.btnLink}" target="_blank" class="btn-accent">
                            <span class="iconify" data-icon="mdi:flask-outline" data-width="14"></span>
                            ${t.btn}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

// ================================================================
//  CONTACT — LARGER INFO VALUES
// ================================================================
function buildContact() {
    const c = d().contact;
    const isAr = currentLang === 'ar';
    const labels = {
        email: isAr ? 'بريد إلكتروني' : 'Email',
        phone: isAr ? 'هاتف' : 'Phone',
        github: 'GitHub',
        whatsapp: isAr ? 'أرسل رسالة' : 'Send a message'
    };

    return `
    <section id="contact" class="py-20 lg:py-28">
        <div class="max-w-[1200px] mx-auto px-6">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                <div class="lg:col-span-4">
                    <div class="reveal">
                        <span class="section-num">08 — ${c.title}</span>
                        <div class="red-line mt-3"></div>
                        <p class="section-sub mt-4">${c.subtitle}</p>
                    </div>
                    <div class="reveal reveal-d1 mt-10 space-y-7">
                        <a href="mailto:mohammed.mosa.eg@gmail.com" class="flex items-center gap-3 group">
                            <span class="w-1.5 h-1.5 rounded-full" style="background:var(--fg);"></span>
                            <div>
                                <span class="contact-label">${labels.email}</span>
                                <span class="contact-value block">mohammed.mosa.eg@gmail.com</span>
                            </div>
                        </a>
                        <a href="tel:+966548293542" class="flex items-center gap-3 group">
                            <span class="w-1.5 h-1.5 rounded-full" style="background:var(--fg);"></span>
                            <div>
                                <span class="contact-label">${labels.phone}</span>
                                <span class="contact-value block">+966 54 829 3542</span>
                            </div>
                        </a>
                        <a href="https://github.com/m4a28" target="_blank" class="flex items-center gap-3 group">
                            <span class="w-1.5 h-1.5 rounded-full" style="background:var(--fg);"></span>
                            <div>
                                <span class="contact-label">${labels.github}</span>
                                <span class="contact-value block">github.com/m4a28</span>
                            </div>
                        </a>
                        <a href="https://wa.me/message/MXV75QMVKRYZC1" target="_blank" class="flex items-center gap-3 group">
                            <span class="w-1.5 h-1.5 rounded-full" style="background:var(--fg);"></span>
                            <div>
                                <span class="contact-label">WhatsApp</span>
                                <span class="contact-value block">${labels.whatsapp}</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="lg:col-span-8">
                    <form id="contactForm" class="reveal" onsubmit="handleSubmit(event)" novalidate>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="form-label" for="cName">${c.namePh}</label>
                                <input id="cName" name="name" type="text" class="form-input" placeholder="${c.namePh}" required>
                            </div>
                            <div>
                                <label class="form-label" for="cEmail">${c.emailPh}</label>
                                <input id="cEmail" name="email" type="email" class="form-input" placeholder="${c.emailPh}" required>
                            </div>
                        </div>
                        <div class="mb-6">
                            <label class="form-label" for="cSubject">${c.subjectPh}</label>
                            <input id="cSubject" name="subject" type="text" class="form-input" placeholder="${c.subjectPh}" required>
                        </div>
                        <div class="mb-8">
                            <label class="form-label" for="cMessage">${c.messagePh}</label>
                            <textarea id="cMessage" name="message" rows="4" class="form-input" placeholder="${c.messagePh}" required style="resize:vertical;"></textarea>
                        </div>
                        <button type="submit" class="btn-swiss">
                            <span class="iconify" data-icon="mdi:send" data-width="14"></span>
                            ${c.sendBtn}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>`;
}

// ================================================================
//  FOOTER
// ================================================================
function buildFooter() {
    const f = d().footer;
    return `
    <div class="max-w-[1200px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-xl font-black tracking-tight" style="color:var(--fg);">${d().meta.logo}<span style="color:var(--accent);">.</span></span>
        <span class="text-xs flex items-center gap-1.5" style="color:var(--fg-muted);">
            ${f.madeWith}
            <span class="iconify" data-icon="mdi:heart" data-width="12" style="color:var(--accent);"></span>
            ${f.text}
        </span>
        <span class="text-[10px] font-bold tracking-widest" style="color:var(--fg-muted);">© 2025</span>
    </div>`;
}

// ================================================================
//  FORM HANDLER
// ================================================================
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
    const orig = btn.innerHTML;
    btn.innerHTML = `<span class="iconify animate-spin" data-icon="mdi:loading" data-width="14"></span> ...`;
    btn.disabled = true;

    fetch("https://formsubmit.co/ajax/mohammed.mosa.eg@gmail.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
    })
    .then(r => r.json())
    .then(() => {
        showToast(c.successMsg);
        e.target.reset();
    })
    .catch(() => {
        showToast(currentLang === 'ar' ? 'حدث خطأ أثناء الإرسال.' : 'Error sending message.');
    })
    .finally(() => {
        btn.innerHTML = orig;
        btn.disabled = false;
    });
}

// ================================================================
//  RENDER ALL
// ================================================================
function renderAll() {
    document.title = d().meta.title;
    buildNav();

    document.getElementById('mainContent').innerHTML =
        buildHero() +
        '<div class="divider"></div>' +
        buildEducation() +
        buildExperience() +
        buildKnowledge() +
        buildCertificates() +
        '<div class="divider"></div>' +
        buildProjects() +
        buildTools() +
        '<div class="divider"></div>' +
        buildTestimonials() +
        buildTesting() +
        '<div class="divider"></div>' +
        buildContact();

    document.getElementById('footer').innerHTML = buildFooter();

    initReveal();
    initActiveNav();
}

// ================================================================
//  SCROLL: REVEAL
// ================================================================
function initReveal() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal, .red-line').forEach(el => obs.observe(el));
}

// ================================================================
//  SCROLL: ACTIVE NAV
// ================================================================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('#navLinks .nav-link');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                const a = document.querySelector(`#navLinks a[href="#${entry.target.id}"]`);
                if (a) a.classList.add('active');
            }
        });
    }, { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(s => obs.observe(s));
}

// ================================================================
//  SCROLL: NAVBAR + BACK TO TOP
// ================================================================
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
    document.getElementById('backToTop').classList.toggle('show', window.scrollY > 600);
});

document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================================================================
//  INIT
// ================================================================
async function init() {
    try {
        const res = await fetch('data.json');
        portfolioData = await res.json();
        renderAll();
    } catch (err) {
        console.error('Error loading data.json:', err);
        document.getElementById('mainContent').innerHTML = `
            <div class="min-h-screen flex items-center justify-center">
                <p style="color:var(--fg-muted); font-family:monospace;">Error: Could not load data.json</p>
            </div>`;
    }
}

init();
