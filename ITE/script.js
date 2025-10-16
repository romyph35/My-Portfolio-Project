const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});


(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    if (!sections.length) return;

    const elementsToObserve = [];

    sections.forEach(section => {
        const container = section.querySelector('.container');
        const children = container ? Array.from(container.children) : Array.from(section.children);
        children.forEach((el, idx) => {

            if (el.tagName && el.tagName.toLowerCase() === 'section') return;
            el.classList.add('reveal');
            el.style.transitionDelay = `${idx * 100}ms`;
            elementsToObserve.push(el);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, { threshold: 0.18 });

    elementsToObserve.forEach(el => observer.observe(el));
})();