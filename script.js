let currentSlide = 0;
let currentBuild = 0;
let navigationHidden = false;
let isFullscreen = false;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// HTTP polling for remote control (Vercel-compatible)
let wsReconnectAttempts = 0;
const maxWsReconnectAttempts = 5;

function showSlide(n) {
    console.log('showSlide called with n:', n, 'currentSlide before:', currentSlide);
    
    // Remove active class from current slide (if it exists)
    if (slides[currentSlide] && slides[currentSlide].classList) {
        slides[currentSlide].classList.remove('active');
    }
    
    // Ensure n is within bounds
    if (n < 0) {
        currentSlide = totalSlides - 1;
    } else if (n >= totalSlides) {
        currentSlide = 0;
    } else {
        currentSlide = n;
    }
    
    // Add active class to new slide
    if (slides[currentSlide] && slides[currentSlide].classList) {
        slides[currentSlide].classList.add('active');
        console.log('currentSlide after:', currentSlide);
        
        // Reset build state for new slide
        resetBuildState();
        
        // Reset and trigger animations for the new slide
        triggerSlideAnimations();
        
        // Update navigation and slide indicator
        updateNavigation();
        
        // Send slide update to remote control
        sendRemoteUpdate('slideUpdate', {
            currentSlide: currentSlide,
            totalSlides: totalSlides,
            currentBuild: currentBuild,
            buildItems: getCurrentBuildItemsCount()
        });
    } else {
        console.error('Invalid slide index:', currentSlide);
    }
}

function triggerSlideAnimations() {
    const currentSlideElement = slides[currentSlide];
    const header = currentSlideElement.querySelector('.slide-header');
    const content = currentSlideElement.querySelector('.slide-content');
    
    // Only animate if elements exist
    if (header && content) {
        // Reset animations
        header.style.animation = 'none';
        content.style.animation = 'none';
        
        // Force reflow
        header.offsetHeight;
        content.offsetHeight;
        
        // Re-trigger animations
        header.style.animation = 'fadeInDown 0.8s ease forwards';
        content.style.animation = 'fadeInUp 0.8s ease 0.3s forwards';
    }
}

function resetBuildState() {
    currentBuild = 0;
    const currentSlideElement = slides[currentSlide];
    const buildItems = currentSlideElement.querySelectorAll('.build-item');
    
    // Hide all build items
    buildItems.forEach(item => {
        item.classList.remove('revealed');
    });
    
    // Hide build indicator if no build items
    const buildIndicator = document.getElementById('build-indicator');
    if (buildIndicator) {
        if (buildItems.length === 0) {
            buildIndicator.classList.add('hidden');
        } else {
            buildIndicator.classList.remove('hidden');
            updateBuildProgress();
        }
    }
    
    // Ensure build items are translated if i18n is available
    if (window.i18n && window.i18n.updateSlideContent) {
        window.i18n.updateSlideContent();
    }
}

function nextBuild() {
    const currentSlideElement = slides[currentSlide];
    const buildItems = currentSlideElement.querySelectorAll('.build-item');
    
    if (currentBuild < buildItems.length && buildItems[currentBuild]) {
        buildItems[currentBuild].classList.add('revealed');
        currentBuild++;
        updateBuildProgress();
        
        // Re-translate newly revealed build items if i18n is available
        if (window.i18n && window.i18n.updateSlideContent) {
            window.i18n.updateSlideContent();
        }
        
        // Send build update to remote control
        sendRemoteUpdate('buildUpdate', {
            currentBuild: currentBuild,
            buildItems: buildItems.length
        });
    }
}

function previousBuild() {
    const currentSlideElement = slides[currentSlide];
    const buildItems = currentSlideElement.querySelectorAll('.build-item');
    
    if (currentBuild > 0 && buildItems[currentBuild - 1]) {
        currentBuild--;
        buildItems[currentBuild].classList.remove('revealed');
        updateBuildProgress();
        
        // Re-translate visible build items if i18n is available
        if (window.i18n && window.i18n.updateSlideContent) {
            window.i18n.updateSlideContent();
        }
        
        // Send build update to remote control
        sendRemoteUpdate('buildUpdate', {
            currentBuild: currentBuild,
            buildItems: buildItems.length
        });
    }
}

function updateBuildProgress() {
    const currentSlideElement = slides[currentSlide];
    const buildItems = currentSlideElement.querySelectorAll('.build-item');
    const buildProgress = document.getElementById('build-progress');
    
    if (buildItems.length > 0 && buildProgress) {
        buildProgress.textContent = `${currentBuild}/${buildItems.length}`;
    }
}

function toggleNavigation() {
    const navigation = document.querySelector('.global-navigation');
    const toggle = document.getElementById('nav-toggle');
    
    navigationHidden = !navigationHidden;
    
    if (navigationHidden) {
        navigation.classList.add('hidden');
        toggle.textContent = '⌨';
        // Clear timeouts when manually hiding
        clearTimeout(navTimeout);
        clearTimeout(warningTimeout);
        if (navigation) {
            navigation.classList.remove('auto-hide-warning');
        }
    } else {
        navigation.classList.remove('hidden');
        toggle.textContent = '✕';
        // Start auto-hide timer when showing
        resetNavTimeout();
    }
}

// Auto-hide navigation after 8 seconds of inactivity (longer for better UX)
let navTimeout;
let warningTimeout;
function resetNavTimeout() {
    clearTimeout(navTimeout);
    clearTimeout(warningTimeout);
    
    if (!navigationHidden) {
        const navigation = document.querySelector('.global-navigation');
        
        // Remove warning class if it exists
        if (navigation) {
            navigation.classList.remove('auto-hide-warning');
        }
        
        // Show warning after 6 seconds
        warningTimeout = setTimeout(() => {
            if (!navigationHidden && navigation) {
                navigation.classList.add('auto-hide-warning');
            }
        }, 6000);
        
        // Hide after 8 seconds
        navTimeout = setTimeout(() => {
            if (navigation) {
                navigation.classList.remove('auto-hide-warning');
            }
            toggleNavigation();
        }, 8000);
    }
}

// Pause auto-hide when mouse is inside navigation
function pauseNavTimeout() {
    clearTimeout(navTimeout);
    clearTimeout(warningTimeout);
    
    // Remove warning immediately when mouse enters
    const navigation = document.querySelector('.global-navigation');
    if (navigation) {
        navigation.classList.remove('auto-hide-warning');
    }
}

// Resume auto-hide when mouse leaves navigation
function resumeNavTimeout() {
    if (!navigationHidden) {
        resetNavTimeout();
    }
}

function toggleFullscreen() {
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    
    if (!isFullscreen) {
        // Enter fullscreen
        try {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(error => {
                    console.log('Fullscreen request failed:', error.message);
                    // Show user-friendly message
                    if (fullscreenToggle) {
                        fullscreenToggle.title = 'Click manually to enter fullscreen';
                    }
                });
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen().catch(error => {
                    console.log('Fullscreen request failed:', error.message);
                });
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen().catch(error => {
                    console.log('Fullscreen request failed:', error.message);
                });
            }
        } catch (error) {
            console.log('Fullscreen not supported or blocked:', error.message);
        }
    } else {
        // Exit fullscreen
        try {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } catch (error) {
            console.log('Exit fullscreen failed:', error.message);
        }
    }
}

// Handle fullscreen change events
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    
    if (isFullscreen) {
        document.body.classList.add('fullscreen');
        fullscreenToggle.textContent = '⛶';
        fullscreenToggle.title = 'Exit Fullscreen';
        
        // Auto-hide fullscreen toggle after 2 seconds in fullscreen
        setTimeout(() => {
            if (isFullscreen) {
                fullscreenToggle.classList.add('hidden');
            }
        }, 2000);
    } else {
        document.body.classList.remove('fullscreen');
        fullscreenToggle.textContent = '⛶';
        fullscreenToggle.title = 'Enter Fullscreen';
        fullscreenToggle.classList.remove('hidden');
    }
    
    // Send fullscreen update to remote control
    sendRemoteUpdate('fullscreenUpdate', { fullscreen: isFullscreen });
}

function goToFirstSlide() {
    console.log('goToFirstSlide called, currentSlide:', currentSlide);
    if (currentSlide !== 0) {
        showSlide(0);
        // Add a subtle visual feedback
        const homeButton = document.getElementById('home-button');
        homeButton.style.transform = 'scale(1.2)';
        setTimeout(() => {
            homeButton.style.transform = 'scale(1)';
        }, 200);
    } else {
        console.log('Already on first slide');
    }
}

function goToLastSlide() {
    if (currentSlide !== totalSlides - 1) {
        showSlide(totalSlides - 1);
    }
}

function updateNavigation() {
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentSlide === 0;
    document.getElementById('next-btn').disabled = currentSlide === totalSlides - 1;
    
    // Update slide indicator
    const slideIndicator = document.getElementById('slide-indicator');
    if (window.i18n && window.i18n.getText) {
        const indicatorText = window.i18n.getText('navigation.slideIndicator')
            .replace('{current}', currentSlide + 1)
            .replace('{total}', totalSlides);
        slideIndicator.textContent = indicatorText;
    } else {
        slideIndicator.textContent = `Slide ${currentSlide + 1} of ${totalSlides}`;
    }
    
    // Update home button state
    const homeButton = document.getElementById('home-button');
    if (currentSlide === 0) {
        homeButton.style.opacity = '0.3';
        if (window.i18n && window.i18n.getText) {
            homeButton.title = window.i18n.getText('navigation.homeAlready');
        } else {
            homeButton.title = 'Already on first slide';
        }
    } else {
        homeButton.style.opacity = '0.7';
        if (window.i18n && window.i18n.getText) {
            homeButton.title = window.i18n.getText('navigation.home');
        } else {
            homeButton.title = 'Go to First Slide';
        }
    }
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    resetNavTimeout(); // Reset auto-hide timeout
    
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        const currentSlideElement = slides[currentSlide];
        const buildItems = currentSlideElement.querySelectorAll('.build-item');
        
        // If there are build items and not all are revealed, advance build
        if (buildItems.length > 0 && currentBuild < buildItems.length) {
            nextBuild();
        } else {
            // Otherwise advance to next slide
            nextSlide();
        }
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const currentSlideElement = slides[currentSlide];
        const buildItems = currentSlideElement.querySelectorAll('.build-item');
        
        // If there are build items and some are revealed, go back in build
        if (buildItems.length > 0 && currentBuild > 0) {
            previousBuild();
        } else {
            // Otherwise go to previous slide
            previousSlide();
        }
    } else if (e.key === 'Home') {
        e.preventDefault();
        goToFirstSlide();
    } else if (e.key === 'End') {
        e.preventDefault();
        goToLastSlide();
    } else if (e.key === 'F11' || (e.key === 'f' && e.ctrlKey)) {
        e.preventDefault();
        toggleFullscreen();
    }
});

// Click to advance (but not on buttons)
document.addEventListener('click', function(e) {
    resetNavTimeout(); // Reset auto-hide timeout
    
    if (!e.target.classList.contains('nav-btn') && !e.target.closest('.global-navigation') && !e.target.closest('.nav-toggle')) {
        const currentSlideElement = slides[currentSlide];
        const buildItems = currentSlideElement.querySelectorAll('.build-item');
        
        // If there are build items and not all are revealed, advance build
        if (buildItems.length > 0 && currentBuild < buildItems.length) {
            nextBuild();
        } else {
            // Otherwise advance to next slide
            nextSlide();
        }
    }
});

// Show fullscreen toggle on mouse movement in fullscreen mode
document.addEventListener('mousemove', function(e) {
    if (isFullscreen) {
        const fullscreenToggle = document.getElementById('fullscreen-toggle');
        fullscreenToggle.classList.remove('hidden');
        
        // Hide again after 3 seconds of no movement
        clearTimeout(fullscreenToggle.hideTimeout);
        fullscreenToggle.hideTimeout = setTimeout(() => {
            if (isFullscreen) {
                fullscreenToggle.classList.add('hidden');
            }
        }, 3000);
    }
});

// Initialize
showSlide(0);

// Initialize i18n system if available
function initializeI18n() {
    if (window.i18n && window.i18n.updateContent) {
        window.i18n.updateContent();
    }
}

// Wait for i18n system to be ready
function waitForI18n() {
    if (window.i18n && window.i18n.updateContent) {
        console.log('i18n system ready, initializing...');
        initializeI18n();
    } else {
        // Retry after a short delay
        setTimeout(waitForI18n, 50);
    }
}

// Start waiting for i18n
waitForI18n();

        // Initialize language switcher event listeners
        function initializeLanguageSwitcher() {
            const languageSwitcher = document.getElementById('language-switcher');
            if (languageSwitcher) {
                console.log('Language switcher found, adding event listeners...');
                const buttons = languageSwitcher.querySelectorAll('.nav-btn');
                buttons.forEach(button => {
                    button.addEventListener('click', function() {
                        const lang = this.getAttribute('data-lang');
                        console.log('Language button clicked:', lang);
                        if (window.i18n && window.i18n.setLanguage) {
                            console.log('Calling i18n.setLanguage with:', lang);
                            window.i18n.setLanguage(lang);
                        } else {
                            console.warn('i18n system not ready yet');
                        }
                    });
                });
            } else {
                console.warn('Language switcher not found');
            }
        }

// Initialize language switcher when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguageSwitcher);
} else {
    initializeLanguageSwitcher();
}

// Initialize navigation mouse events
function initializeNavigationEvents() {
    const navigation = document.querySelector('.global-navigation');
    if (navigation) {
        // Pause auto-hide when mouse enters navigation
        navigation.addEventListener('mouseenter', pauseNavTimeout);
        // Resume auto-hide when mouse leaves navigation
        navigation.addEventListener('mouseleave', resumeNavTimeout);
    }
}

// Initialize navigation events when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigationEvents);
} else {
    initializeNavigationEvents();
}

// Initialize remote control when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeRemoteControl);
} else {
    initializeRemoteControl();
}

// Trigger initial animation for the first slide
setTimeout(() => {
    triggerSlideAnimations();
}, 100);

// Start auto-hide timer
resetNavTimeout();

// HTTP polling for remote control (Vercel-compatible)
let lastCommandTimestamp = 0;
let pollingInterval;

function startPolling() {
    console.log('Starting HTTP polling for remote commands');
    
    pollingInterval = setInterval(async () => {
        try {
            const response = await fetch('/api/command');
            const data = await response.json();
            
            if (data.lastCommand && data.lastCommand.timestamp > lastCommandTimestamp) {
                lastCommandTimestamp = data.lastCommand.timestamp;
                handleRemoteCommand({ type: 'command', command: data.lastCommand.command });
            }
        } catch (error) {
            console.error('Error polling for commands:', error);
        }
    }, 500); // Poll every 500ms
}

function stopPolling() {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
}

function handleRemoteCommand(data) {
    if (data.type === 'command') {
        console.log('Remote command received:', data.command);
        
        switch (data.command) {
            case 'next':
                nextSlide();
                break;
            case 'previous':
                previousSlide();
                break;
            case 'nextBuild':
                nextBuild();
                break;
            case 'previousBuild':
                previousBuild();
                break;
            case 'home':
                goToFirstSlide();
                break;
            case 'end':
                goToLastSlide();
                break;
            case 'fullscreen':
                toggleFullscreen();
                break;
            default:
                console.warn('Unknown remote command:', data.command);
        }
    }
}

function sendRemoteUpdate(type, data) {
    // HTTP polling approach doesn't need to send updates to server
    // The server polls for commands instead
    console.log('Update:', type, data);
}

function getCurrentBuildItemsCount() {
    const currentSlideElement = slides[currentSlide];
    if (currentSlideElement) {
        return currentSlideElement.querySelectorAll('.build-item').length;
    }
    return 0;
}

// Initialize HTTP polling
function initializeRemoteControl() {
    // Wait a bit for the page to load before starting polling
    setTimeout(() => {
        startPolling();
    }, 1000);
}

// Prevent context menu on right click to avoid interference
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
}); 