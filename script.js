console.log("Made by _JustHaider");
console.log("visit : https://justhaider.site");


document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen Animation with real loading detection
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingVehicle = document.querySelector('.loading-vehicle');

    // Create vehicle icons
    const vehicles = [
        { icon: 'fa-car', class: 'sports-car' },
        { icon: 'fa-car-side', class: 'sedan' },
        { icon: 'fa-truck-monster', class: 'suv' },
        { icon: 'fa-truck-pickup', class: 'truck' }
    ];

    vehicles.forEach(vehicle => {
        const icon = document.createElement('i');
        icon.className = `fas ${vehicle.icon}`;
        loadingVehicle.appendChild(icon);
    });

    // Real loading progress detection
    function loadAssets() {
        return new Promise((resolve) => {
            // Get all images that should be loaded initially
            const imagesToLoad = Array.from(document.querySelectorAll('img[data-load]'));
            let loadedCount = 0;
            const totalCount = imagesToLoad.length;

            if (totalCount === 0) {
                resolve();
                return;
            }

            imagesToLoad.forEach(img => {
                if (img.complete) {
                    incrementLoader();
                } else {
                    img.addEventListener('load', incrementLoader);
                    img.addEventListener('error', incrementLoader);
                }
            });

            function incrementLoader() {
                loadedCount++;
                const progress = (loadedCount / totalCount) * 100;
                loadingBar.style.width = `${progress}%`;
                
                if (loadedCount === totalCount) {
                    setTimeout(resolve, 500); // Small delay for smooth transition
                }
            }
        });
    }

    // Mark initial images that should block loading
    document.querySelectorAll('.hero-slides .slide, .car-card .main-img').forEach(img => {
        img.setAttribute('data-load', 'true');
    });

    // Start loading process
    loadAssets().then(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    });

    // Hero Slider
    const heroSlides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const indicatorsContainer = document.querySelector('.hero-indicators');
    let currentSlide = 0;
    let slideInterval;

    // Create indicators
    heroSlides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

    function goToSlide(n) {
        heroSlides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        currentSlide = (n + heroSlides.length) % heroSlides.length;
        
        heroSlides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        // Reset animation for the new slide
        const content = heroSlides[currentSlide].querySelector('.slide-content');
        content.querySelector('h1').style.animation = 'none';
        content.querySelector('p').style.animation = 'none';
        content.querySelector('.btn').style.animation = 'none';
        setTimeout(() => {
            content.querySelector('h1').style.animation = '';
            content.querySelector('p').style.animation = '';
            content.querySelector('.btn').style.animation = '';
        }, 10);
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Start slideshow (no pause on hover as requested)
    startSlideShow();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        }
    });

    // Rest of your existing JavaScript (mobile nav, image modal, etc.)
    // ... (keep all the other existing JavaScript code) ...
});


document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Image Modal functionality
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-img');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const imageCounter = document.querySelector('.image-counter');
    
    let currentImageIndex = 0;
    let currentCarImages = [];
    
    // Get all car cards
    const carCards = document.querySelectorAll('.car-card');
    
    carCards.forEach(card => {
        // Get all images for this car (main + thumbnails)
        const mainImg = card.querySelector('.main-img');
        const thumbnails = card.querySelectorAll('.thumbnail');
        
        // Create array of all image sources for this car
        const carImages = [mainImg.src];
        thumbnails.forEach(thumb => carImages.push(thumb.src));
        
        // Add click event to main image
        mainImg.addEventListener('click', function() {
            openModal(carImages, 0);
        });
        
        // Add click events to thumbnails
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                openModal(carImages, index + 1);
            });
        });
    });
    
    function openModal(images, startIndex) {
        currentCarImages = images;
        currentImageIndex = startIndex;
        updateModalImage();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function updateModalImage() {
        modalImg.src = currentCarImages[currentImageIndex];
        imageCounter.textContent = `${currentImageIndex + 1} / ${currentCarImages.length}`;
    }
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + currentCarImages.length) % currentCarImages.length;
        updateModalImage();
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % currentCarImages.length;
        updateModalImage();
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + currentCarImages.length) % currentCarImages.length;
                updateModalImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % currentCarImages.length;
                updateModalImage();
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});