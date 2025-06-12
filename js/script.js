// Future JavaScript code can go here 

document.addEventListener('DOMContentLoaded', function() {
    const formGroups = document.querySelectorAll('.form-group');
    const form = document.querySelector('.contact-form');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;
    const overlay = document.querySelector('.overlay');

    if (mobileNavToggle) {
        const navIcon = mobileNavToggle.querySelector('.material-symbols-outlined');
        mobileNavToggle.addEventListener('click', function() {
            body.classList.toggle('sidebar-open');
            mobileNavToggle.classList.toggle('active');

            if (mobileNavToggle.classList.contains('active')) {
                navIcon.textContent = 'close';
            } else {
                navIcon.textContent = 'menu';
            }
        });

        if (overlay) {
            overlay.addEventListener('click', function() {
                body.classList.remove('sidebar-open');
                mobileNavToggle.classList.remove('active');
                navIcon.textContent = 'menu';
            });
        }
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

    // Tooltip hover logic for service items
    const serviceItems = document.querySelectorAll('.service-item.has-tooltip');

    serviceItems.forEach(item => {
        const tooltip = item.querySelector('.tooltip');
        if (tooltip) {
            item.addEventListener('mouseenter', () => {
                tooltip.classList.add('show');
            });
            item.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.last-section .play-btn');
    
    if (playButton) {
        const lastSectionMedia = playButton.closest('.last-section__media');
        const videoThumbnail = lastSectionMedia.querySelector('.video-thumbnail');
        const videoContainer = lastSectionMedia.querySelector('.video-container');
        const iframe = lastSectionMedia.querySelector('#video-iframe');
        const videoId = 'JcXKbUIebrU';
        const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

        playButton.addEventListener('click', () => {
            if (iframe) {
                iframe.src = videoSrc;
            }
            if (videoThumbnail) {
                videoThumbnail.style.display = 'none';
            }
            if (videoContainer) {
                videoContainer.style.display = 'block';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    if (form) {
        const formGroups = form.querySelectorAll('.form-group');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let isFormValid = true;

            // Clear previous errors
            formGroups.forEach(group => {
                group.classList.remove('error');
            });

            // --- Validation ---
            const firstName = document.getElementById('first-name');
            if (firstName.value.trim() === '') {
                firstName.closest('.form-group').classList.add('error');
                isFormValid = false;
            }

            const lastName = document.getElementById('last-name');
            if (lastName.value.trim() === '') {
                lastName.closest('.form-group').classList.add('error');
                isFormValid = false;
            }

            const email = document.getElementById('email');
            // Use browser's built-in email validation by checking the input's validity state
            if (!email.validity.valid) {
                email.closest('.form-group').classList.add('error');
                isFormValid = false;
            }

            const company = document.getElementById('company');
            if (company.value.trim() === '') {
                company.closest('.form-group').classList.add('error');
                isFormValid = false;
            }

            const country = document.getElementById('country');
            if (country.value === '') {
                country.closest('.form-group').classList.add('error');
                isFormValid = false;
            }

            // --- Submission ---
            if (isFormValid) {
                window.location.href = 'thank-you.html';
            }
        });

        // Remove error on input
        formGroups.forEach(group => {
            const input = group.querySelector('input, select');
            input.addEventListener('input', () => {
                if (group.classList.contains('error')) {
                    group.classList.remove('error');
                }
            });
        });
    }
});