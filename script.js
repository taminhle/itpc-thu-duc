// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeCarousels();
        initializeSocialLinks();
        initializeScrollEffects();
        initializeMenuToggle();
        initializeLanguageToggle();
        initializePartnersCarousel();
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// Projects Carousel Functionality
function initializeCarousels() {
    try {
        // Projects Carousel
        const projectsTrack = document.getElementById('projectsTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const projectsDots = document.querySelectorAll('.projects .carousel-dots .dot');
        
        if (projectsTrack && prevBtn && nextBtn) {
            let currentProjectIndex = 0;
            const projectCards = projectsTrack.querySelectorAll('.project-card');
            const totalProjectCards = projectCards.length;
            const cardsToShow = getCardsToShow();
            const maxIndex = Math.max(0, totalProjectCards - cardsToShow);

            function getCardsToShow() {
                if (window.innerWidth <= 480) return 1;
                if (window.innerWidth <= 768) return 2;
                return 3;
            }

            function updateProjectsCarousel() {
                const cardWidth = projectCards[0].offsetWidth + 32; // card width + gap
                const translateX = currentProjectIndex * cardWidth;
                projectsTrack.style.transform = `translateX(-${translateX}px)`;
                
                // Update dots
                projectsDots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentProjectIndex);
                });
            }

            prevBtn.addEventListener('click', () => {
                currentProjectIndex = currentProjectIndex <= 0 ? maxIndex : currentProjectIndex - 1;
                updateProjectsCarousel();
            });

            nextBtn.addEventListener('click', () => {
                currentProjectIndex = currentProjectIndex >= maxIndex ? 0 : currentProjectIndex + 1;
                updateProjectsCarousel();
            });

            // Dot navigation
            projectsDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentProjectIndex = Math.min(index, maxIndex);
                    updateProjectsCarousel();
                });
            });

            // Auto-play functionality
            let autoPlayInterval = setInterval(() => {
                nextBtn.click();
            }, 5000);

            // Pause auto-play on hover
            projectsTrack.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });

            projectsTrack.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(() => {
                    nextBtn.click();
                }, 5000);
            });

            // Handle window resize
            window.addEventListener('resize', () => {
                updateProjectsCarousel();
            });

            // Initial update
            updateProjectsCarousel();
        }

        // Events Carousel
        const eventsTrack = document.getElementById('eventsTrack');
        const eventsPrevBtn = document.getElementById('eventsPrevBtn');
        const eventsNextBtn = document.getElementById('eventsNextBtn');
        const eventsDots = document.querySelectorAll('.events .carousel-dots .dot');

        if (eventsTrack && eventsPrevBtn && eventsNextBtn) {
            let currentEventsIndex = 0;
            const eventVideos = eventsTrack.querySelectorAll('.event-video');
            const totalEventVideos = eventVideos.length;
            const videosToShow = getVideosToShow();
            const maxEventsIndex = Math.max(0, totalEventVideos - videosToShow);

            function getVideosToShow() {
                if (window.innerWidth <= 480) return 1;
                if (window.innerWidth <= 768) return 2;
                return 3;
            }

            function updateEventsCarousel() {
                const videoWidth = eventVideos[0].offsetWidth + 32; // video width + gap
                const translateX = currentEventsIndex * videoWidth;
                eventsTrack.style.transform = `translateX(-${translateX}px)`;
                
                // Update dots
                eventsDots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentEventsIndex);
                });
            }

            eventsPrevBtn.addEventListener('click', () => {
                currentEventsIndex = currentEventsIndex <= 0 ? maxEventsIndex : currentEventsIndex - 1;
                updateEventsCarousel();
            });

            eventsNextBtn.addEventListener('click', () => {
                currentEventsIndex = currentEventsIndex >= maxEventsIndex ? 0 : currentEventsIndex + 1;
                updateEventsCarousel();
            });

            // Dot navigation for events
            eventsDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentEventsIndex = Math.min(index, maxEventsIndex);
                    updateEventsCarousel();
                });
            });

            // Initial update
            updateEventsCarousel();

            // Handle window resize
            window.addEventListener('resize', () => {
                updateEventsCarousel();
            });
        }

    } catch (error) {
        console.error('Carousel initialization error:', error);
    }
}

// Partners Carousel Auto-scroll
function initializePartnersCarousel() {
    try {
        const partnersTrack = document.getElementById('partnersTrack');
        if (partnersTrack) {
            // Clone the partners for seamless loop
            const partners = partnersTrack.innerHTML;
            partnersTrack.innerHTML = partners + partners;
            
            // Pause animation on hover
            partnersTrack.addEventListener('mouseenter', () => {
                partnersTrack.style.animationPlayState = 'paused';
            });
            
            partnersTrack.addEventListener('mouseleave', () => {
                partnersTrack.style.animationPlayState = 'running';
            });
        }
    } catch (error) {
        console.error('Partners carousel error:', error);
    }
}

// Social Links Functionality
function initializeSocialLinks() {
    try {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
                
                // Handle different social media links
                const linkType = link.classList[1]; // email, facebook, tiktok, youtube
                
                switch(linkType) {
                    case 'email':
                        window.location.href = 'mailto:itpc.tpthuduc@tphcm.gov.vn';
                        break;
                    case 'facebook':
                        window.open('https://facebook.com', '_blank');
                        break;
                    case 'tiktok':
                        window.open('https://tiktok.com', '_blank');
                        break;
                    case 'youtube':
                        window.open('https://youtube.com', '_blank');
                        break;
                    default:
                        console.log('Social link clicked:', linkType);
                }
            });
        });
    } catch (error) {
        console.error('Social links initialization error:', error);
    }
}

// Scroll Effects
function initializeScrollEffects() {
    try {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.project-card, .news-item, .document-link, .featured-event');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

    } catch (error) {
        console.error('Scroll effects initialization error:', error);
    }
}

// Menu Toggle Functionality
function initializeMenuToggle() {
    try {
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (menuToggle) {
            let isMenuOpen = false;
            
            menuToggle.addEventListener('click', () => {
                isMenuOpen = !isMenuOpen;
                
                // Animate hamburger menu
                const spans = menuToggle.querySelectorAll('span');
                if (isMenuOpen) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                
                // Here you would typically show/hide a mobile menu
                console.log('Menu toggled:', isMenuOpen ? 'open' : 'closed');
            });
        }
    } catch (error) {
        console.error('Menu toggle initialization error:', error);
    }
}

// Language Toggle Functionality
function initializeLanguageToggle() {
    try {
        const langFlags = document.querySelectorAll('.lang-flag');
        
        langFlags.forEach(flag => {
            flag.addEventListener('click', () => {
                // Remove active class from all flags
                langFlags.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked flag
                flag.classList.add('active');
                
                // Add click animation
                flag.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    flag.style.transform = 'scale(1)';
                }, 150);
                
                // Handle language change
                const isVietnamese = flag.classList.contains('vn-flag');
                console.log('Language changed to:', isVietnamese ? 'Vietnamese' : 'English');
                
                // Here you would implement actual language switching logic
            });
        });
    } catch (error) {
        console.error('Language toggle initialization error:', error);
    }
}

// Video Player Functionality
function initializeVideoPlayers() {
    try {
        const playButtons = document.querySelectorAll('.play-button');
        
        playButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Add click animation
                button.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
                
                // Here you would implement actual video playback
                console.log('Video play button clicked');
                
                // Example: Replace with actual video element
                const videoContainer = button.closest('.event-video');
                if (videoContainer) {
                    videoContainer.innerHTML = `
                        <video controls autoplay style="width: 100%; height: 100%; object-fit: cover;">
                            <source src="placeholder-video.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;
                }
            });
        });
    } catch (error) {
        console.error('Video players initialization error:', error);
    }
}

// Button Click Handlers
function initializeButtonHandlers() {
    try {
        // Primary buttons
        const primaryButtons = document.querySelectorAll('.btn-primary');
        primaryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                button.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
                
                console.log('Primary button clicked:', button.textContent);
            });
        });

        // Secondary buttons
        const secondaryButtons = document.querySelectorAll('.btn-secondary');
        secondaryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                button.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
                
                console.log('Secondary button clicked:', button.textContent);
            });
        });

        // Document links
        const documentLinks = document.querySelectorAll('.document-link');
        documentLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                link.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
                
                console.log('Document link clicked:', link.querySelector('h3').textContent);
            });
        });

        // Project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                // Add click animation
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
                
                console.log('Project card clicked:', card.querySelector('h3').textContent);
            });
        });

    } catch (error) {
        console.error('Button handlers initialization error:', error);
    }
}

// Keyboard Navigation
function initializeKeyboardNavigation() {
    try {
        document.addEventListener('keydown', (e) => {
            // Arrow key navigation for carousels
            if (e.key === 'ArrowLeft') {
                const prevBtn = document.getElementById('prevBtn');
                if (prevBtn && document.activeElement.closest('.projects')) {
                    prevBtn.click();
                }
            } else if (e.key === 'ArrowRight') {
                const nextBtn = document.getElementById('nextBtn');
                if (nextBtn && document.activeElement.closest('.projects')) {
                    nextBtn.click();
                }
            }
            
            // Escape key to close any open modals or menus
            if (e.key === 'Escape') {
                const menuToggle = document.querySelector('.menu-toggle');
                if (menuToggle) {
                    // Close menu if open
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    } catch (error) {
        console.error('Keyboard navigation initialization error:', error);
    }
}

// Performance Optimization
function optimizePerformance() {
    try {
        // Lazy loading for images
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

        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Handle scroll events here
            }, 16); // ~60fps
        });

        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                // Handle resize events here
                initializeCarousels();
            }, 250);
        });

    } catch (error) {
        console.error('Performance optimization error:', error);
    }
}

// Error Handling and Logging
function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeCarousels();
        initializeSocialLinks();
        initializeScrollEffects();
        initializeMenuToggle();
        initializeLanguageToggle();
        initializePartnersCarousel();
        initializeVideoPlayers();
        initializeButtonHandlers();
        initializeKeyboardNavigation();
        optimizePerformance();
        setupErrorHandling();
        
        console.log('ITPC Thu Duc website initialized successfully');
    } catch (error) {
        console.error('Website initialization failed:', error);
    }
});

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeCarousels,
        initializeSocialLinks,
        initializeScrollEffects,
        initializeMenuToggle,
        initializeLanguageToggle,
        initializePartnersCarousel
    };
}
