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
}); 