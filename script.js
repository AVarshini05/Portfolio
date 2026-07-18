document.addEventListener('DOMContentLoaded', () => {
    // 1. Digital Network Canvas Background
    initCanvasBackground();

    // 2. Typing Effect
    initTypingEffect();

    // 3. Navigation Actions
    initNavigation();

    // 5. Project Toasts & Hover micro-interactions
    initProjectToasts();

    // 6. Intersection Observer for Active Nav Highlighting
    initScrollHighlight();

    // 7. Simulated Secure Contact Form Transmission
    initContactForm();

    // 8. 3D Certifications Fan Deck & Secure Modal Decryption
    initCertFanDeck();

    // 9. 3D Coverflow Photo Gallery Carousel
    initCoverflowGallery();
});

// ==========================================
// 1. Digital Network Canvas Background
// ==========================================
// ==========================================
// 1. Neural Web Canvas Background & Interactions
// ==========================================
function initCanvasBackground() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodes = [];
    const nodeCount = 50;
    const maxDistance = 150;
    let clickWaves = [];

    class NeuralNode {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.size = Math.random() * 3 + 1.5;
            this.activation = 0; // fires up to 1.0, decays
            this.pulsePhase = Math.random() * Math.PI * 2;
            
            // AI violet or Cyber Aqua colors
            this.colorType = Math.random() > 0.4 ? 'cyber' : 'ai';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Decelerate if excited by wave
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 1.2) {
                this.vx *= 0.98;
                this.vy *= 0.98;
            }

            // Boundary wrap around
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // Decaying excitation
            if (this.activation > 0) {
                this.activation -= 0.015;
            } else {
                this.activation = 0;
            }
            this.pulsePhase += 0.05;
        }

        draw() {
            ctx.beginPath();
            const glowSize = this.size + (this.activation * 6) + Math.sin(this.pulsePhase) * 1.5;
            ctx.arc(this.x, this.y, Math.max(1, glowSize / 2), 0, Math.PI * 2);
            
            // Color interpolation
            let color = 'rgba(139, 92, 246, 0.45)'; // AI Violet
            if (this.colorType === 'cyber') {
                color = 'rgba(6, 182, 212, 0.45)'; // Cyber Aqua
            }
            if (this.activation > 0.2) {
                // Flash to Amber/White
                color = `rgba(245, 158, 11, ${0.4 + this.activation})`;
            }

            ctx.fillStyle = color;
            ctx.fill();

            // Draw glowing halo around highly active neurons
            if (this.activation > 0.4) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, glowSize * 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 158, 11, ${this.activation * 0.12})`;
                ctx.fill();
            }
        }
    }

    for (let i = 0; i < nodeCount; i++) {
        nodes.push(new NeuralNode());
    }

    // Mouse positioning
    let mouse = { x: null, y: null, activeRadius: 160 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Screen click triggers a neural pulse wave
    window.addEventListener('click', (e) => {
        // Prevent trigger if clicking on links or terminal inputs
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea')) return;

        clickWaves.push({
            x: e.clientX,
            y: e.clientY,
            radius: 0,
            maxRadius: 280,
            speed: 6.5,
            color: Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.6)' : 'rgba(139, 92, 246, 0.6)'
        });
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update & Render Click Waves
        for (let w = clickWaves.length - 1; w >= 0; w--) {
            const wave = clickWaves[w];
            wave.radius += wave.speed;
            
            ctx.beginPath();
            ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            ctx.strokeStyle = wave.color.replace('0.6', (1 - wave.radius / wave.maxRadius).toString());
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Activate nodes hit by the wave
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                const dx = node.x - wave.x;
                const dy = node.y - wave.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Wave collision tolerance zone
                if (Math.abs(dist - wave.radius) < 12 && node.activation < 0.8) {
                    node.activation = 1.0;
                    // Push node outwards from wave center
                    const angle = Math.atan2(dy, dx);
                    node.vx += Math.cos(angle) * 1.5;
                    node.vy += Math.sin(angle) * 1.5;
                }
            }

            if (wave.radius >= wave.maxRadius) {
                clickWaves.splice(w, 1);
            }
        }

        // Draw connections and nodes
        for (let i = 0; i < nodes.length; i++) {
            const n1 = nodes[i];
            n1.update();
            n1.draw();

            // Connect nearest nodes
            for (let j = i + 1; j < nodes.length; j++) {
                const n2 = nodes[j];
                const dx = n1.x - n2.x;
                const dy = n1.y - n2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(n1.x, n1.y);
                    ctx.lineTo(n2.x, n2.y);
                    
                    // Alpha intensity based on distance and activation levels
                    const alpha = (1 - dist / maxDistance) * (0.12 + Math.max(n1.activation, n2.activation) * 0.35);
                    const color = n1.colorType === 'cyber' ? `rgba(6, 182, 212, ${alpha})` : `rgba(139, 92, 246, ${alpha})`;
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 0.5 + (n1.activation + n2.activation) * 0.5;
                    ctx.stroke();

                    // Synapse glowing nerve impulse (pulses along connections)
                    if (dist > 40 && (n1.activation > 0.3 || n2.activation > 0.3)) {
                        const step = (Date.now() * 0.0025) % 1.0;
                        const pulseX = n1.x + (n2.x - n1.x) * step;
                        const pulseY = n1.y + (n2.y - n1.y) * step;
                        ctx.beginPath();
                        ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
                        ctx.fillStyle = '#f59e0b'; // Amber synapse impulse
                        ctx.shadowBlur = 6;
                        ctx.shadowColor = '#f59e0b';
                        ctx.fill();
                        ctx.shadowBlur = 0; // Reset
                    }
                }
            }

            // Connect nodes to mouse cursor
            if (mouse.x !== null && mouse.y !== null) {
                const mDx = n1.x - mouse.x;
                const mDy = n1.y - mouse.y;
                const mDist = Math.sqrt(mDx * mDx + mDy * mDy);

                if (mDist < mouse.activeRadius) {
                    ctx.beginPath();
                    ctx.moveTo(n1.x, n1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    const alpha = (1 - mDist / mouse.activeRadius) * 0.16;
                    ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`; // Amber mouse pull
                    ctx.lineWidth = 0.8;
                    ctx.stroke();

                    // Gentle pull toward mouse cursor (gravitational drift)
                    n1.vx -= (mDx / mDist) * 0.02;
                    n1.vy -= (mDy / mDist) * 0.02;

                    // Excite nodes slightly near cursor
                    if (n1.activation < 0.2) n1.activation += 0.02;
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ==========================================
// 2. Typing Effect (Hero Section)
// ==========================================
function initTypingEffect() {
    const textSpan = document.getElementById('typed-text');
    if (!textSpan) return;

    const roles = [
        'Cognitive Threat Intelligence.',
        'Digital Forensics & Malware Analysis.',
        'Autonomous SecOps Automation.',
        'Deep Learning & Predictive Modeling.'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            textSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            textSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at full word
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            // Brief pause before typing next
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start
    setTimeout(type, 800);
}

// ==========================================
// 3. Responsive Navigation
// ==========================================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// ==========================================

// Function to trigger multiple pulse waves for visual delight
function triggerMultipleCanvasPulses() {
    const eventType = 'click';
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;
    
    // Simulate clicks programmatically on the canvas at random screen points
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const clickEvent = new MouseEvent('click', {
                clientX: Math.random() * window.innerWidth,
                clientY: Math.random() * window.innerHeight,
                bubbles: true
            });
            canvas.dispatchEvent(clickEvent);
        }, i * 250);
    }
}

// Global helper for system-wide toast notifications
function showNotification(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-terminal';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'warning') iconClass = 'fa-circle-exclamation';

    toast.innerHTML = `
        <i class="fas ${iconClass} toast-icon"></i>
        <div>
            <span>${message}</span>
        </div>
    `;

    // Apply color-overrides inline based on type to avoid stylesheet dependency issues
    if (type === 'success') {
        toast.style.borderColor = 'var(--cyan-accent)';
        toast.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.3)';
    } else if (type === 'warning') {
        toast.style.borderColor = 'var(--amber-accent)';
        toast.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.3)';
    }

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('visible');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4500);
}

// ==========================================
// 5. Project Toasts & Micro-interactions
// ==========================================
function initProjectToasts() {
    const projectCards = document.querySelectorAll('.project-card');
    const toastContainer = document.getElementById('toast-container');

    if (!toastContainer) return;

    projectCards.forEach(card => {
        // Trigger stack notification toast on card click
        card.addEventListener('click', (e) => {
            // Prevent toast triggering twice if user clicks github icon directly
            if (e.target.closest('a')) return;

            const techString = card.getAttribute('data-tech');
            const title = card.querySelector('.project-title').textContent;
            showStackToast(title, techString);
        });

        // Floating hover tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xRotation = ((y - rect.height / 2) / rect.height) * 8; // Max 8 deg
            const yRotation = ((x - rect.width / 2) / rect.width) * -8;

            card.style.transform = `perspective(1000px) scale(1.02) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
        });
    });

    function showStackToast(projectTitle, tech) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="fas fa-microchip toast-icon"></i>
            <div>
                <strong>${projectTitle}</strong><br>
                <span style="color: var(--cyan-accent); font-size: 0.75rem;">Stack: ${tech}</span>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Slide in
        setTimeout(() => {
            toast.classList.add('visible');
        }, 10);

        // Slide out and remove after 4.5 seconds
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4500);
    }
}

// ==========================================
// 6. Intersection Observer for Active Nav Link
// ==========================================
function initScrollHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.35 // 35% section visibility triggers activate
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ==========================================
// 7. Simulated Secure Contact Form Transmission
// ==========================================
function initContactForm() {
    const form = document.getElementById('portfolioContactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.reset();
        showNotification("Message sent successfully! Thank you for reaching out.", "success");
    });
}

// ==========================================
// 8. 3D Certifications Fan Deck & Secure Modal Decryption
// ==========================================
function initCertFanDeck() {
    const deck = document.getElementById('certFanDeck');
    const prevBtn = document.getElementById('prevDeckCard');
    const nextBtn = document.getElementById('nextDeckCard');
    const modal = document.getElementById('secureCertModal');
    const closeModal = document.getElementById('closeCertModal');
    const modalImg = document.getElementById('modalCertImg');
    const modalTitle = document.getElementById('modalCertTitle');
    const modalOrg = document.getElementById('modalCertOrg');

    if (!deck) return;
    
    let cards = Array.from(deck.querySelectorAll('.deck-card'));
    let activeIndex = 2; // Center card (HTML cert) is active initially

    function updateDeckTransforms() {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            card.style.opacity = '';
            
            // Clean inline transform override
            card.style.transform = '';
            
            // Reset index data values to handle hover positions dynamically
            card.setAttribute('data-index', i.toString());
        });
        
        // Set center card active status
        if (cards[activeIndex]) {
            cards[activeIndex].classList.add('active');
        }
    }

    // Previous deck shift handler
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const popped = cards.pop();
            cards.unshift(popped);
            updateDeckTransforms();
        });
    }

    // Next deck shift handler
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const shifted = cards.shift();
            cards.push(shifted);
            updateDeckTransforms();
        });
    }

    // Open decryption Modal on card click
    deck.addEventListener('click', (e) => {
        const card = e.target.closest('.deck-card');
        if (!card) return;

        const imgSrc = card.getAttribute('data-img');
        const title = card.getAttribute('data-title');
        const org = card.getAttribute('data-org');

        if (modal && modalImg) {
            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalOrg.textContent = `Issuing Authority: ${org} | Verified Credential`;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        }
    });

    // Close Modal handler
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        });
        
        // Close on backdrop overlay click
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
}

// ==========================================
// 9. 3D Coverflow Photo Gallery Carousel
// ==========================================
function initCoverflowGallery() {
    const carousel = document.getElementById('photoCoverflow');
    const dotsContainer = document.getElementById('coverflowDots');
    
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.coverflow-slide'));
    const dots = Array.from(dotsContainer.querySelectorAll('.c-dot'));
    let currentIndex = 0;

    function renderCoverflow() {
        slides.forEach((slide, idx) => {
            slide.className = 'coverflow-slide'; // clear previous
            
            if (idx === currentIndex) {
                slide.classList.add('active');
            } else if (idx === currentIndex - 1) {
                slide.classList.add('prev');
            } else if (idx === currentIndex + 1) {
                slide.classList.add('next');
            } else if (idx < currentIndex) {
                slide.classList.add('prev-hidden');
            } else {
                slide.classList.add('next-hidden');
            }
        });

        // Sync control indicators (dots)
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Auto shift every 10 seconds
    let autoShiftInterval = setInterval(nextSlide, 10000);

    function nextSlide() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        renderCoverflow();
    }

    function resetAutoShift() {
        clearInterval(autoShiftInterval);
        autoShiftInterval = setInterval(nextSlide, 10000);
    }

    // Dots navigation hook
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.getAttribute('data-index'), 10);
            renderCoverflow();
            resetAutoShift();
        });
    });

    // Slide direct clicking focus handler
    slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
            if (idx !== currentIndex) {
                currentIndex = idx;
                renderCoverflow();
                resetAutoShift();
            }
        });
    });

    // Setup drag/swipe mechanics for coverflow
    let startX = 0;
    let isDragging = false;

    carousel.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diffX = e.clientX - startX;
        if (Math.abs(diffX) > 60) {
            if (diffX > 0 && currentIndex > 0) {
                currentIndex--;
                renderCoverflow();
                resetAutoShift();
            } else if (diffX < 0 && currentIndex < slides.length - 1) {
                currentIndex++;
                renderCoverflow();
                resetAutoShift();
            }
            isDragging = false; // block multiple shifts in single gesture
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
}


