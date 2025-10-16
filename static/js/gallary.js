document.addEventListener('DOMContentLoaded', function() {
  
    // --- Gallery Carousel Logic ---
    const realVideoPlayer = document.getElementById('real-video-player');
    const simVideoPlayer = document.getElementById('sim-video-player');
    const galleryCaption = document.getElementById('gallery-caption');
    const galleryContainer = document.querySelector('#gallery-carousel');
    const thumbnails = galleryContainer.querySelectorAll('.thumbnail-item');
    // const thumbnails = document.querySelectorAll('.thumbnail-item');
  
    function updateGallery(thumbnail) {
      if (!thumbnail) return; // Exit if thumbnail doesn't exist
  
      // Get data from the selected thumbnail
      const realVideoSrc = thumbnail.dataset.realVideo;
      const simVideoSrc = thumbnail.dataset.simVideo;
      const captionText = thumbnail.dataset.caption;
  
      // Update video players
      if (realVideoPlayer) realVideoPlayer.src = realVideoSrc;
      if (simVideoPlayer) simVideoPlayer.src = simVideoSrc;
  
      // Update caption
      if (galleryCaption) galleryCaption.textContent = captionText;
      
      // Update active state for styling
      thumbnails.forEach(item => item.classList.remove('is-active'));
      thumbnail.classList.add('is-active');
    }
  
    // Add click event listeners to each thumbnail
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        updateGallery(thumbnail);
      });
    });
  
    // Initialize the Bulma Carousel
    bulmaCarousel.attach('#gallery-carousel', {
        slidesToScroll: 1,
        slidesToShow: 5, // Changed to 4 to show more smaller items
        loop: true,
        pagination: false, // Hides the little dots at the bottom
        breakpoints: [
          { changePoint: 480, slidesToShow: 2, slidesToScroll: 1 }, 
          { changePoint: 640, slidesToShow: 3, slidesToScroll: 1 }
        ]
    });
  
    // Set the initial state to the first video
    if (thumbnails.length > 0) {
      updateGallery(thumbnails[0]);
    }
  
  
    // --- Perturbation Tabs Logic ---
    const perturbationVideoPlayer = document.getElementById('perturbation-video-player');
    const tabs = document.querySelectorAll('#perturbation-tabs li');
    
    // Set initial video for perturbations
    if (tabs.length > 0 && perturbationVideoPlayer) {
      const initialVideo = tabs[0].dataset.video;
      if (initialVideo) {
        perturbationVideoPlayer.src = initialVideo;
      }
    }
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Set the video source from the data attribute
        const videoSrc = tab.dataset.video;
        if (perturbationVideoPlayer && videoSrc) {
          perturbationVideoPlayer.src = videoSrc;
        }
        
        // Update the active tab style
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
      });
    });
  
  });