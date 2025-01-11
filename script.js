gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation (fade in + scale)
gsap.to('.hero-content', {
    opacity: 1,
    y: 0,
    scale: 1.1, // Slight scale effect for a more impactful intro
    duration: 1,
    delay: 0.5,
    ease: "expo.out"
});

// **New: Phone Animation on Page Load** (Faded In + Slightly Scaled)
gsap.from('.phone-container', {
    opacity: 0,
    scale: 0.8, // Start smaller for an intro effect
    y: 50, // Start lower on Y-axis
    duration: 1.2,
    ease: "expo.out",
    delay: 0.8, // Delay to sync with the hero section animation
});

// Phone Animation on Scroll with Parallax & Rotation
gsap.to('.phone-container', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1, // Make transition more fluid with smoother scroll
    },
    scale: 1.2, // Slightly enlarging phone as we scroll
    rotation: 45, // Rotate the phone on scroll for added effect
    y: -120, // Slightly shift the phone up
    ease: "power3.out" // Smooth easing for rotation and scaling
});

// **Advanced Parallax Effect on All Sections**
gsap.utils.toArray('.hero, .sticky-section').forEach((section) => {
    // Apply parallax for each section when scrolling
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top bottom', // When the section enters the viewport
            end: 'bottom top',  // When the section leaves the viewport
            scrub: true, // Smoothly follow scroll position
            markers: false // Hide scroll markers
        },
        y: (index) => {
            // Apply different parallax effects based on section
            return index % 2 === 0 ? 150 : -150; // Even sections move down, odd sections move up
        },
        ease: "none" // No easing for parallax effect
    });
});

// Removed Sticky Scroll and Opacity Fade Effects for sections below
gsap.utils.toArray('.sticky-section').forEach((section, index) => {
    // Removed pinning effect, so no sticky behavior anymore.
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,  // Smooth scrolling effect
            markers: false,
        }
    });

    // Removed feature fade-in + slide-up and opacity on scroll.
    // Keep just the animation for other features if needed
});

// Scroll Indicator Animation (with more dynamic scaling)
gsap.to('.scroll-line', {
    height: '100%',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        markers: false,
        onUpdate: (self) => {
            const progress = self.progress * 100;
            gsap.set('.scroll-dot', { y: `${progress}%` });
        }
    }
});

// Scroll Indicator Opacity (Fade In)
gsap.to('.scroll-indicator', {
    opacity: 1,
    duration: 1,
    delay: 1,
    ease: "expo.out"
});

// Dynamic Hover Effects on Buttons & Links
gsap.utils.toArray('.cta').forEach((cta) => {
    cta.addEventListener('mouseenter', () => {
        gsap.to(cta, {
            scale: 1.1, // Slightly enlarge on hover
            duration: 0.3,
            ease: "power2.out"
        });
    });

    cta.addEventListener('mouseleave', () => {
        gsap.to(cta, {
            scale: 1, // Reset size after hover
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Smooth Scroll for all internal anchor links (improves the UX on click)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// **Particle Interaction Effect Across the Entire Page**
const particles = [];
const particleCount = 100;

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 10 + 2;
  this.speedX = Math.random() * 0.7 - 0.25;
  this.speedY = Math.random() * 0.7 - 0.25;
  const gradientColors = [
   "rgba(0, 255, 255, 0.8)", // Cyan
  "rgba(128, 0, 128, 0.8)", // Purple
  "rgba(0, 0, 255, 0.8)",   // Blue
  "rgba(255, 165, 0, 0.8)"  // Orange
  ];
  this.color = gradientColors[Math.floor(Math.random() * gradientColors.length)];
}

Particle.prototype.update = function () {
  this.x += this.speedX;
  this.y += this.speedY;
  this.size *= 0.98; // Shrinking the particle
};

Particle.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
};

// Create a full-screen canvas that stays on top of everything
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1'; // Make sure it's in the background
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

// Create particles when mouse moves
function createParticles(event) {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(event.x, event.y));
  }
}

// Animate particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw(ctx);
    if (particle.size <= 0.1) {
      particles.splice(index, 1);
    }
  });
  requestAnimationFrame(animateParticles);
}

// Activate the particle effect on mousemove
window.addEventListener('mousemove', createParticles);
animateParticles();
