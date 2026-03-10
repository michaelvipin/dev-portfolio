document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top on page load
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);

    /* --- CUSTOM CURSOR --- */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const links = document.querySelectorAll('a, button, .btn');

    // Make cursor follow mouse with slight delay on outline for smooth effect
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update dot immediately
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });


    // Optimized Mouse Interaction
const head = document.querySelector('.robo-head');
const pupils = document.querySelectorAll('.pupil');

window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // 1. Rotate the Head with extra depth perspective
    // Sensitivity lowered slightly since it's a larger 3D cluster
    const rotX = (clientY - centerY) / 30;
    const rotY = (clientX - centerX) / 30;
    
    // We only update rotation via JS, transitioning is handled via CSS
    if (head) {
        head.style.transform = `rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
    }

    // 2. Make Pupils Track Cursor smoothly
    pupils.forEach(pupil => {
        const rect = pupil.parentElement.getBoundingClientRect(); // Use socket for bounds calculation
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const angle = Math.atan2(clientY - eyeY, clientX - eyeX);
        const distance = 35; 

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

    // Animation loop for smooth outline tracking
    const animateCursor = () => {
        let distX = mouseX - outlineX;
        let distY = mouseY - outlineY;
        
        // Ease the movement
        outlineX += distX * 0.15;
        outlineY += distY * 0.15;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Add hover states to interactable elements
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        link.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });

    /* --- SCROLL EFFECTS --- */
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    
    // Navbar glass effect & scroll progress
    window.addEventListener('scroll', () => {
        // Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Scroll Progress
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    });

    /* --- MOBILE MENU --- */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-menu-overlay .btn');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.replace('ph-list', 'ph-x');
        } else {
            icon.classList.replace('ph-x', 'ph-list');
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
        });
    });

    /* --- REVEAL ON SCROLL --- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Subtly trigger active on page load for elements already in viewport
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);
});
