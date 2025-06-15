// Global variables
let currentCardIndex = 0;
const cards = document.querySelectorAll('.greeting-card');
const totalCards = cards.length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentCardSpan = document.getElementById('currentCard');
const totalCardsSpan = document.getElementById('totalCards');
let autoAdvance;

// Initialize the application
function init() {
    totalCardsSpan.textContent = totalCards;
    updateButtons();
    createHeartConfetti();
    startAutoAdvance();
    setupEventListeners();
    addPersonalTouches();
}

// Show a specific card by index
function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.remove('active', 'prev');
        if (i === index) {
            card.classList.add('active');
        } else if (i < index) {
            card.classList.add('prev');
        }
    });
    
    currentCardSpan.textContent = index + 1;
    updateButtons();
}

// Navigate to next card
function nextCard() {
    if (currentCardIndex < totalCards - 1) {
        currentCardIndex++;
        showCard(currentCardIndex);
        createCelebrationEffect();
    }
}

// Navigate to previous card
function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        showCard(currentCardIndex);
    }
}

// Update button states
function updateButtons() {
    prevBtn.disabled = currentCardIndex === 0;
    nextBtn.disabled = currentCardIndex === totalCards - 1;
}

// Setup event listeners
function setupEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextCard();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousCard();
        }
    });

    // Pause auto-advance when user interacts
    document.addEventListener('click', function() {
        pauseAndRestartAutoAdvance();
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next card
                nextCard();
            } else {
                // Swipe right - previous card
                previousCard();
            }
        }
    }
}

// Create heart-themed confetti effect
function createHeartConfetti() {
    const heartSymbols = ['💖', '💕', '💗', '🌸', '✨', '🎀', '🌺', '💐'];
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            // Regular confetti
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
            document.body.appendChild(confetti);

            // Heart symbol confetti
            if (i % 2 === 0) {
                const symbolConfetti = document.createElement('div');
                symbolConfetti.style.cssText = `
                    position: absolute;
                    font-size: 18px;
                    left: ${Math.random() * 100}%;
                    animation: confetti-fall ${Math.random() * 3 + 3}s linear infinite;
                    animation-delay: ${Math.random() * 3}s;
                    z-index: 1;
                `;
                symbolConfetti.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                document.body.appendChild(symbolConfetti);
                
                setTimeout(() => {
                    if (symbolConfetti.parentNode) {
                        symbolConfetti.remove();
                    }
                }, 6000);
            }

            // Remove regular confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 6000);
        }, i * 150);
    }
}

// Add personal touches and effects
function addPersonalTouches() {
    // Add gentle glow effect to photos
    const photos = document.querySelectorAll('.card-photo');
    photos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 35px rgba(255, 154, 158, 0.6)';
            this.style.transform = 'scale(1.05)';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 25px rgba(255, 154, 158, 0.4)';
            this.style.transform = 'scale(1)';
        });
    });

    // Add special effect for Alexis's name
    const titles = document.querySelectorAll('.birthday-title');
    titles.forEach(title => {
        if (title.textContent.includes('Alexis')) {
            title.addEventListener('mouseenter', function() {
                this.style.animation = 'gentleBounce 0.6s ease-in-out 3';
            });
        }
    });
}

// Create celebration effect when advancing cards
function createCelebrationEffect() {
    const celebrationEmojis = ['🎉', '🎊', '💖', '✨', '🌟'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const celebration = document.createElement('div');
            celebration.style.cssText = `
                position: fixed;
                font-size: 2rem;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatingHearts 2s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            celebration.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
            document.body.appendChild(celebration);
            
            setTimeout(() => {
                if (celebration.parentNode) {
                    celebration.remove();
                }
            }, 2000);
        }, i * 100);
    }
}

// Start auto-advance functionality (slower for reading)
function startAutoAdvance() {
    autoAdvance = setInterval(() => {
        if (currentCardIndex < totalCards - 1) {
            nextCard();
        } else {
            currentCardIndex = 0;
            showCard(currentCardIndex);
        }
    }, 12000); // Slower for personal messages
}

// Pause auto-advance and restart after delay
function pauseAndRestartAutoAdvance() {
    clearInterval(autoAdvance);
    setTimeout(() => {
        startAutoAdvance();
    }, 20000); // Longer pause for reading personal messages
}

// Recreate confetti periodically
function startHeartConfettiLoop() {
    setInterval(createHeartConfetti, 15000);
}

// Special birthday message for the final card
function showSpecialMessage() {
    if (currentCardIndex === totalCards - 1) {
        setTimeout(() => {
            const specialMessage = document.createElement('div');
            specialMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff9a9e, #fecfef);
                color: white;
                padding: 20px 30px;
                border-radius: 20px;
                font-size: 1.2rem;
                font-weight: bold;
                text-align: center;
                z-index: 2000;
                animation: fadeInUp 1s ease;
                box-shadow: 0 15px 35px rgba(255, 154, 158, 0.4);
            `;
            specialMessage.innerHTML = '🎂 Happy Birthday, Alexis! 🎂<br>You are truly special! 💖';
            document.body.appendChild(specialMessage);
            
            setTimeout(() => {
                specialMessage.style.animation = 'fadeInUp 1s ease reverse';
                setTimeout(() => {
                    if (specialMessage.parentNode) {
                        specialMessage.remove();
                    }
                }, 1000);
            }, 4000);
        }, 2000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
    startHeartConfettiLoop();
});

// Optional: Add visibility change handler to pause when tab is not active
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        clearInterval(autoAdvance);
    } else {
        startAutoAdvance();
    }
});

// Show special message when reaching the last card
document.addEventListener('click', function() {
    if (currentCardIndex === totalCards - 1) {
        setTimeout(showSpecialMessage, 1000);
    }
});