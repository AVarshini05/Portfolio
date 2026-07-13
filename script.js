document.addEventListener('DOMContentLoaded', () => {
    // 1. Digital Network Canvas Background
    initCanvasBackground();

    // 2. Typing Effect
    initTypingEffect();

    // 3. Navigation Actions
    initNavigation();

    // 4. Interactive Terminal Simulation
    initTerminalSimulator();

    // 5. Project Toasts & Hover micro-interactions
    initProjectToasts();

    // 6. Intersection Observer for Active Nav Highlighting
    initScrollHighlight();
});

// ==========================================
// 1. Digital Network Canvas Background
// ==========================================
function initCanvasBackground() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 45;
    const maxDistance = 140;

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.size = Math.random() * 2 + 1;
            // cyan or purple color spectrum
            this.color = Math.random() > 0.4 ? '#00f0ff' : '#b55fe6';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Boundary collision
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Handle mouse interaction
    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            p1.update();
            p1.draw();

            // Connect particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    // Gradual fade based on distance
                    const alpha = (1 - dist / maxDistance) * 0.15;
                    ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Connect to mouse
            if (mouse.x !== null && mouse.y !== null) {
                const mDx = p1.x - mouse.x;
                const mDy = p1.y - mouse.y;
                const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
                if (mDist < 180) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    const alpha = (1 - mDist / 180) * 0.18;
                    ctx.strokeStyle = `rgba(181, 95, 230, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
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
        'Cybersecurity Engineer.',
        'AI Malware Developer.',
        'Digital Forensics Specialist.',
        'Deep Learning Builder.'
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
// 4. Interactive Terminal Simulation
// ==========================================
function initTerminalSimulator() {
    const outputContainer = document.getElementById('terminalOutput');
    const commandLine = document.getElementById('terminalCommandLine');
    const tabs = document.querySelectorAll('.t-tab');

    if (!outputContainer || !commandLine) return;

    // Custom terminal dataset responses
    const responses = {
        profile: `<p class="terminal-green">>>> INITIALIZING SECURITY ANALYST PROFILE...</p>
                 <p><strong>Name:</strong> Anupolu Varshini</p>
                 <p><strong>Focus:</strong> Cybersecurity, SOC Operations, Malware analysis, Deep Learning</p>
                 <p><strong>Experience:</strong> Digital Forensics Intern at Cyber Crime Police Station (Yandada)</p>
                 <p><strong>Core Tech:</strong> Splunk SIEM, YARA, Python, React, Gemini AI, PostgreSQL</p>
                 <p class="terminal-cyan">>>> SECURE INTERN CREDENTIALS VERIFIED.</p>`,
        system: `<p class="terminal-purple">>>> RUNNING SYSTEM DIAGNOSTICS...</p>
                 <p><strong>Current Session Node:</strong> Visakhapatnam, AP, IN</p>
                 <p><strong>Encryption Protocol:</strong> SHA-256 (Malware Sandboxed Tunnel)</p>
                 <p><strong>AI Model Weights:</strong> Load Success (Blood Report Agent & SOC Agent)</p>
                 <p><strong>Threat Status:</strong> Autopsy Case Audits [ACTIVE]</p>
                 <p><strong>Status Code:</strong> 200 OK | System Integrity Secured</p>`,
        interests: `<p class="terminal-cyan">>>> EXTRACTING INTERESTS DATA...</p>
                    <p>- Reverse engineering Android malware & static analysis</p>
                    <p>- Mapping attack techniques to MITRE ATT&CK vectors</p>
                    <p>- Designing multi-agent AI systems (CrewAI & Gemini API)</p>
                    <p>- Preserving digital evidence and analyzing PCAP logs</p>`,
        help: `<p>Available commands and executables:</p>
               <p><strong>profile</strong>   - Display personal bio and credentials</p>
               <p><strong>system</strong>    - Check system diagnostics and encryption status</p>
               <p><strong>interests</strong> - List active research areas</p>
               <p><strong>skills</strong>    - Scan technical inventory levels</p>
               <p><strong>projects</strong>  - View list of built software portals</p>
               <p><strong>education</strong> - Display academic degrees & CGPA</p>
               <p><strong>contact</strong>   - Print phone & mail access pathways</p>
               <p><strong>clear</strong>     - Clear the console screen</p>`
    };

    // Tab clicks trigger pre-defined commands
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Set active class
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const cmd = tab.getAttribute('data-cmd');
            runTerminalCommand(cmd);
        });
    });

    // Handle command line entry
    commandLine.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const inputVal = commandLine.value.trim().toLowerCase();
            commandLine.value = '';

            if (inputVal === '') return;

            // Clear command output first if needed, otherwise append
            if (inputVal === 'clear') {
                clearConsole();
                return;
            }

            // Run command
            runTerminalCommand(inputVal);
        }
    });

    function clearConsole() {
        outputContainer.innerHTML = '';
        appendInputLine();
    }

    function appendInputLine() {
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-input-line';
        inputLine.innerHTML = `
            <span class="prompt">varshini@cyber-core:~$</span>
            <input type="text" id="terminalCommandLine" placeholder="Type help or click tabs above..." autocomplete="off">
        `;
        outputContainer.appendChild(inputLine);
        
        // Re-focus new input and bind keypress
        const newInput = inputLine.querySelector('input');
        newInput.focus();
        newInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const inputVal = newInput.value.trim().toLowerCase();
                newInput.value = '';
                if (inputVal === 'clear') {
                    clearConsole();
                    return;
                }
                runTerminalCommand(inputVal);
            }
        });

        // Auto scroll to bottom
        outputContainer.scrollTop = outputContainer.scrollHeight;
    }

    function runTerminalCommand(cmd) {
        // Remove active tabs status (since custom typed command may not match tab)
        let foundTab = false;
        tabs.forEach(t => {
            if (t.getAttribute('data-cmd') === cmd) {
                t.classList.add('active');
                foundTab = true;
            } else {
                t.classList.remove('active');
            }
        });
        if (!foundTab && cmd !== 'clear') {
            tabs.forEach(t => t.classList.remove('active'));
        }

        // Clean out previous input line
        const prevInputLine = outputContainer.querySelector('.terminal-input-line');
        if (prevInputLine) prevInputLine.remove();

        // Print command history line
        const historyLine = document.createElement('div');
        historyLine.className = 'terminal-line';
        historyLine.innerHTML = `<span class="prompt">varshini@cyber-core:~$</span> <span class="command-run">${cmd}</span>`;
        outputContainer.appendChild(historyLine);

        // Print command output
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output-block';

        if (responses[cmd]) {
            outputDiv.innerHTML = responses[cmd];
        } else if (cmd === 'skills') {
            outputDiv.innerHTML = `<p class="terminal-cyan">>>> SCANNING TECHNICAL INVENTORY...</p>
                                   <p>- <strong>Languages:</strong> Python, Java, SQL, JavaScript</p>
                                   <p>- <strong>Security:</strong> Splunk SIEM, YARA rules, MITRE ATT&CK, Autopsy, JADX</p>
                                   <p>- <strong>AI & ML:</strong> Machine Learning, Deep Learning, CrewAI, Gemini AI</p>
                                   <p>- <strong>Web & DB:</strong> React, HTML/CSS, PostgreSQL, SQLite, Power BI</p>`;
        } else if (cmd === 'projects') {
            outputDiv.innerHTML = `<p class="terminal-purple">>>> EXPORTING ARCHIVE DATA...</p>
                                   <p>1. <strong>Malware Analysis Platform</strong>: Android static analysis & Splunk SOC platform</p>
                                   <p>2. <strong>CyberSathi-AI</strong>: Multilingual voice-enabled crime reporting portal</p>
                                   <p>3. <strong>Smart Report Analyzer</strong>: CrewAI multi-agent blood report diagnostic parser</p>`;
        } else if (cmd === 'education') {
            outputDiv.innerHTML = `<p class="terminal-green">>>> ACADEMIC RECORDS DETECTED...</p>
                                   <p><strong>B.Tech (CSE-Cyber Security)</strong>: Vignan’s Institute | CGPA 9.56 [2023-2027]</p>
                                   <p><strong>Intermediate (MPC)</strong>: Sri Chaitanya | 95.2% [2021-2023]</p>
                                   <p><strong>CBSE Grade X</strong>: Sri Krishna Vidya Mandir | 83.6% [2020-2021]</p>`;
        } else if (cmd === 'contact') {
            outputDiv.innerHTML = `<p><strong>Email:</strong> varshiniaanupolu2005@gmail.com</p>
                                   <p><strong>Phone:</strong> +91 9182424169</p>
                                   <p><strong>Github:</strong> github.com/AVarshini05</p>`;
        } else {
            outputDiv.innerHTML = `<p class="text-danger"><i class="fas fa-exclamation-triangle"></i> Protocol not found: '${cmd}'. Type 'help' for valid command sequences.</p>`;
        }

        outputContainer.appendChild(outputDiv);
        appendInputLine();
    }
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
