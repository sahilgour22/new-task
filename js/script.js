// Future JavaScript code can go here 

document.addEventListener('DOMContentLoaded', function() {
    const formGroups = document.querySelectorAll('.form-group');
    const form = document.querySelector('.contact-form');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;
    const overlay = document.querySelector('.overlay');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            body.classList.toggle('sidebar-open');
            mobileNavToggle.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            body.classList.remove('sidebar-open');
            mobileNavToggle.classList.remove('active');
        });
    }

    formGroups.forEach(group => {
        const input = group.querySelector('input, select');
        
        const checkValue = () => {
            if (input.value && input.value.length > 0) {
                group.classList.add('has-value');
            } else {
                group.classList.remove('has-value');
            }
        };

        checkValue();

        input.addEventListener('focus', () => {
            group.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            group.classList.remove('focused');
            checkValue();
        });

        // Listen for input on the field
        input.addEventListener('input', () => {
            // If the user starts typing, remove the error class
            if (group.classList.contains('error')) {
                group.classList.remove('error');
            }
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        formGroups.forEach(group => {
            const input = group.querySelector('input, select');
            group.classList.remove('error');

            if (!input.value) {
                isValid = false;
                group.classList.add('error');
            }
        });

        if (isValid) {
            console.log('Form is valid and ready to be submitted.');
            // form.submit(); // You can uncomment this to allow native form submission
        }
    });

    // Testimonial Slider
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevBtn = document.querySelector('.slider-arrow.prev');
        const nextBtn = document.querySelector('.slider-arrow.next');
        const dotsContainer = document.querySelector('.slider-dots');

        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoplayInterval = null;

        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            dot.dataset.slide = i;
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll('.slider-dot');

        function goToSlide(slideIndex) {
            slider.style.transform = `translateX(-${slideIndex * 100}%)`;
            currentSlide = slideIndex;

            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        }

        // Autoplay logic
        function startAutoplay() {
            if (autoplayInterval) clearInterval(autoplayInterval);
            autoplayInterval = setInterval(() => {
                let nextSlide = (currentSlide + 1) % totalSlides;
                goToSlide(nextSlide);
            }, 5000); // Change slide every 5 seconds
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }

        function handleAutoplay() {
            if (window.innerWidth < 1200) {
                if (!autoplayInterval) startAutoplay();
            } else {
                if (autoplayInterval) stopAutoplay();
            }
        }

        nextBtn.addEventListener('click', () => {
            let nextSlide = (currentSlide + 1) % totalSlides;
            goToSlide(nextSlide);
        });

        prevBtn.addEventListener('click', () => {
            let prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(prevSlide);
        });

        dotsContainer.addEventListener('click', e => {
            if (e.target.classList.contains('slider-dot')) {
                const slideIndex = parseInt(e.target.dataset.slide);
                goToSlide(slideIndex);
                if (autoplayInterval) { // Reset timer on manual navigation
                    startAutoplay();
                }
            }
        });

        // Initialize slider
        goToSlide(0);
        window.addEventListener('resize', handleAutoplay);
        handleAutoplay(); // Check on initial load
    }
}); 




document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.play-btn');
    const videoPopup = document.getElementById('video-popup');
    const closeButton = document.getElementById('close-btn');
    const videoIframe = document.getElementById('video-iframe');
    
    // Replace with your YouTube video ID
    const videoId = 'dQw4w9WgXcQ'; 
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    if (playButton) {
        playButton.addEventListener('click', () => {
            if (videoIframe) {
                videoIframe.src = videoSrc;
            }
            if (videoPopup) {
                videoPopup.classList.add('active');
            }
        });
    }

    const closePopup = () => {
        if (videoIframe) {
            videoIframe.src = '';
        }
        if (videoPopup) {
            videoPopup.classList.remove('active');
        }
    };

    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }

    if (videoPopup) {
        // Also close popup if user clicks on the overlay
        videoPopup.addEventListener('click', (e) => {
            if (e.target === videoPopup) {
                closePopup();
            }
        });
    }
    
    // Also close popup if user presses the Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoPopup.classList.contains('active')) {
            closePopup();
        }
    });
});