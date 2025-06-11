// this is script file

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